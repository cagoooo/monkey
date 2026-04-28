/**
 * 遊戲主迴圈 hook（每 20ms 推進一次，相當於 50 FPS）。
 *
 * 負責：
 * - 粒子物理（smoke / spark / debris / normal 各自有不同重力與阻力）
 * - 螢幕震動衰減
 * - 玩家落下（建築被炸毀時往下掉到下一個地面）
 * - 太陽掉落爆炸（被打 5 次後）
 * - 建築窗戶閃爍（每 2 秒切換）
 * - 流星雨狀態（meteor 寶箱觸發）
 * - 香蕉飛行 + 碰撞檢測（寶箱 / 出界 / 太陽 / 猴子 / 建築）
 * - 爆炸動畫推進與結束處理
 *
 * 依賴：
 * - status: gameState?.status（用來決定 effect 是否啟動）
 * - setGameState: 全域狀態更新
 * - initGame: 重新初始化（太陽爆炸後 1 秒呼叫）
 *
 * 設計：lastWindowToggleRef 由 hook 內部持有，App.tsx 不需要管。
 */

import {Dispatch, SetStateAction, useEffect, useRef} from 'react';
import {GameState, Meteor, Particle, ParticleType} from '../types';
import {CANVAS_WIDTH, CANVAS_HEIGHT, MONKEY_SIZE} from '../constants';
import {soundService} from '../../services/soundService';
import {getGroundY} from '../engine/terrain';
import {calculateScore} from '../engine/scoring';
import {handleTurnTransition} from '../engine/turnTransition';
import {getPowerUp} from '../engine/powerups';

const TICK_MS = 20;
/** dev mode 下，tick 超過此 ms 數會 warn — 用於追蹤 iPhone 等舊裝置的掉幀 */
const SLOW_TICK_THRESHOLD_MS = 16;

interface UseGameLoopArgs {
  status: GameState['status'] | undefined;
  setGameState: Dispatch<SetStateAction<GameState | null>>;
  initGame: (gravity?: number, resetScores?: boolean) => void;
}

export function useGameLoop({status, setGameState, initGame}: UseGameLoopArgs) {
  const lastWindowToggle = useRef<number>(0);

  useEffect(() => {
    if (!status) return;

    const interval = setInterval(() => {
      // dev-only frame timing：超過 16ms 就 warn（B3 量測先行策略）
      const tickStart = import.meta.env.DEV ? performance.now() : 0;

      setGameState(prev => {
        if (!prev) return null;

        const next: GameState = {...prev};

        // ── Update Particles ──
        next.particles = prev.particles
          .map(p => {
            const nextVel = {...p.vel};
            const nextPos = {x: p.pos.x + p.vel.x, y: p.pos.y + p.vel.y};
            const nextRotation = (p.rotation || 0) + (p.rotationVel || 0);

            if (p.type === 'smoke') {
              nextVel.x *= 0.95;
              nextVel.y -= 0.05; // Smoke rises
            } else if (p.type === 'spark') {
              nextVel.x *= 0.99;
              nextVel.y += 0.05; // Sparks are light
            } else if (p.type === 'debris') {
              nextVel.x *= 0.99;
              nextVel.y += 0.2; // Debris is heavy
            } else {
              nextVel.x *= 0.98;
              nextVel.y += 0.1; // Normal gravity
            }

            return {
              ...p,
              pos: nextPos,
              vel: nextVel,
              rotation: nextRotation,
              life: p.life - 1,
            };
          })
          .filter(p => p.life > 0);

        // ── Update Shake ──
        next.shake = Math.max(0, prev.shake - 0.5);

        // ── Update Players (Falling) ──
        const p1TargetY = getGroundY(prev.player1Pos.x, prev.buildings, prev.destructions);
        if (prev.player1Pos.y < p1TargetY) {
          next.player1Pos = {...prev.player1Pos, y: Math.min(prev.player1Pos.y + 4, p1TargetY)};
        }

        const p2TargetY = getGroundY(prev.player2Pos.x, prev.buildings, prev.destructions);
        if (prev.player2Pos.y < p2TargetY) {
          next.player2Pos = {...prev.player2Pos, y: Math.min(prev.player2Pos.y + 4, p2TargetY)};
        }

        // ── Update Sun (Falling) ──
        if (prev.sunState === 'falling') {
          next.sunPos = {...prev.sunPos, y: prev.sunPos.y + 8};

          const groundY = getGroundY(next.sunPos.x, prev.buildings, prev.destructions);

          // Explode if hit building or ground
          if (next.sunPos.y >= groundY - 20 || next.sunPos.y > CANVAS_HEIGHT - 50) {
            const explosionPos = {x: next.sunPos.x, y: Math.min(next.sunPos.y, groundY)};
            const newParticles = Array.from({length: 300}).map(() => ({
              id: Math.random(),
              pos: {...explosionPos},
              vel: {x: (Math.random() - 0.5) * 40, y: (Math.random() - 0.5) * 40},
              life: 100 + Math.random() * 50,
              maxLife: 150,
              color: '#FFCC00',
              size: 5 + Math.random() * 10,
            }));

            next.destructions = [...prev.destructions, {pos: explosionPos, radius: 1000}];
            next.particles = [...next.particles, ...newParticles];
            next.shake = 100;
            next.status = 'exploding';
            next.explosion = {pos: explosionPos, radius: 0, maxRadius: 1000, type: 'giant'};
            next.sunState = 'normal';
            next.sunHits = 0;
            soundService.playHit();
            soundService.playExplosion();
          }
        }

        // ── Update Windows every 2 seconds ──
        const now = Date.now();
        if (now - lastWindowToggle.current > 2000) {
          lastWindowToggle.current = now;
          next.buildings = prev.buildings.map(b => ({
            ...b,
            windows: b.windows.map(row =>
              row.map(w => (Math.random() > 0.05 ? w : !w))
            ),
          }));
        }

        // ── Meteor Shower ──
        if (prev.status === 'meteorShower' && prev.meteorShower) {
          const elapsed = Date.now() - prev.meteorShower.startTime;

          if (elapsed > prev.meteorShower.duration) {
            return handleTurnTransition(prev, next);
          }

          // Warning period (first 1s)
          if (elapsed < 1000) return next;

          // Falling period
          const activeMeteors = [...prev.meteorShower.meteors];
          if (Math.random() > 0.6) {
            activeMeteors.push({
              id: Math.random(),
              pos: {
                x: prev.meteorShower.centerX + (Math.random() - 0.5) * 150 * 5,
                y: -50,
              },
              vel: {x: (Math.random() - 0.5) * 4, y: 12 + Math.random() * 8},
            });
          }

          const updatedMeteors: Meteor[] = [];
          const newDestructions = [...prev.destructions];
          const newParticles = [...next.particles];

          for (const m of activeMeteors) {
            const nextPos = {x: m.pos.x + m.vel.x, y: m.pos.y + m.vel.y};

            let hitBuilding = false;
            for (const b of prev.buildings) {
              if (nextPos.x >= b.x && nextPos.x <= b.x + b.width && nextPos.y >= b.y) {
                const inHole = newDestructions.some(d =>
                  Math.sqrt((nextPos.x - d.pos.x) ** 2 + (nextPos.y - d.pos.y) ** 2) < d.radius
                );

                if (!inHole) {
                  hitBuilding = true;
                  newDestructions.push({pos: nextPos, radius: 25});

                  for (let i = 0; i < 15; i++) {
                    newParticles.push({
                      id: Math.random(),
                      pos: {...nextPos},
                      vel: {x: (Math.random() - 0.5) * 12, y: (Math.random() - 0.5) * 12 - 5},
                      life: 30 + Math.random() * 30,
                      maxLife: 60,
                      color: b.color,
                      size: 2 + Math.random() * 4,
                      type: 'debris',
                    });
                  }
                  soundService.playHit();
                  break;
                }
              }
            }

            if (!hitBuilding && nextPos.y < CANVAS_HEIGHT + 50) {
              updatedMeteors.push({...m, pos: nextPos});
            }
          }

          // Check for hits
          const p1Hit =
            prev.meteorShower.protectedPlayer !== 1 &&
            updatedMeteors.some(
              m =>
                Math.sqrt(
                  (m.pos.x - prev.player1Pos.x) ** 2 + (m.pos.y - prev.player1Pos.y) ** 2
                ) < MONKEY_SIZE
            );
          const p2Hit =
            prev.meteorShower.protectedPlayer !== 2 &&
            updatedMeteors.some(
              m =>
                Math.sqrt(
                  (m.pos.x - prev.player2Pos.x) ** 2 + (m.pos.y - prev.player2Pos.y) ** 2
                ) < MONKEY_SIZE
            );

          if (p1Hit || p2Hit) {
            const winner = p1Hit ? 2 : 1;
            const newScores: [number, number] = [prev.scores[0], prev.scores[1]];
            newScores[winner - 1]++;
            const newPoints = [...prev.currentRoundPoints] as [number, number];
            newPoints[winner - 1] += 100;
            newPoints[p1Hit ? 0 : 1] = 0;
            return {
              ...next,
              status: 'celebrating',
              winner,
              scores: newScores,
              currentRoundPoints: newPoints,
              meteorShower: undefined,
              destructions: newDestructions,
              particles: newParticles,
            };
          }

          return {
            ...next,
            destructions: newDestructions,
            particles: newParticles,
            meteorShower: {...prev.meteorShower, meteors: updatedMeteors},
          };
        }

        if (prev.status === 'aiming' || prev.status === 'roundOver' || prev.status === 'tournamentOver') {
          return next;
        }

        // ── Banana flying ──
        if (prev.status === 'throwing' && prev.banana) {
          const newPos = {
            x: prev.banana.pos.x + prev.banana.vel.x,
            y: prev.banana.pos.y + prev.banana.vel.y,
          };
          const newVel = {
            x: prev.banana.vel.x + prev.wind,
            y: prev.banana.vel.y + prev.gravity,
          };
          const newAngle = prev.banana.angle + 0.3;

          // 0. Hit Treasure
          const treasureIdx = next.treasures.findIndex(
            t =>
              t.active &&
              Math.sqrt((newPos.x - t.pos.x) ** 2 + (newPos.y - t.pos.y) ** 2) < 35
          );
          if (treasureIdx !== -1) {
            const hitTreasure = next.treasures[treasureIdx];
            next.treasures = next.treasures.map((t, i) =>
              i === treasureIdx ? {...t, active: false} : t
            );

            if (prev.currentPlayer === 1) {
              next.player1Projectile = hitTreasure.type;
            } else {
              next.player2Projectile = hitTreasure.type;
            }
            soundService.playThrow(); // Re-use throw sound for pickup
          }

          // 1. Out of bounds
          if (newPos.x < 0 || newPos.x > CANVAS_WIDTH || newPos.y > CANVAS_HEIGHT) {
            return handleTurnTransition(prev, next);
          }

          // 1.5 Hit Sun
          const distToSun = Math.sqrt(
            (newPos.x - prev.sunPos.x) ** 2 + (newPos.y - prev.sunPos.y) ** 2
          );
          let newSunState = prev.sunState;
          let newSunHits = prev.sunHits;
          let hasHitSun = prev.banana.hasHitSun;

          if (distToSun < 35 && !hasHitSun && prev.sunState !== 'falling') {
            newSunHits = prev.sunHits + 1;
            hasHitSun = true;
            soundService.playSunHit();
            if (newSunHits === 1) newSunState = 'surprised';
            else if (newSunHits === 2) newSunState = 'sunglasses';
            else if (newSunHits === 3) newSunState = 'dead';
            else if (newSunHits === 4) newSunState = 'skull';
            else if (newSunHits >= 5) newSunState = 'falling';
          }

          // 2. Hit Monkey
          const targetMonkey = prev.currentPlayer === 1 ? prev.player2Pos : prev.player1Pos;
          const selfMonkey = prev.currentPlayer === 1 ? prev.player1Pos : prev.player2Pos;

          const distToTarget = Math.sqrt(
            (newPos.x - targetMonkey.x) ** 2 + (newPos.y - targetMonkey.y) ** 2
          );
          const distToSelf = Math.sqrt(
            (newPos.x - selfMonkey.x) ** 2 + (newPos.y - selfMonkey.y) ** 2
          );

          if (
            distToTarget < MONKEY_SIZE ||
            (distToSelf < MONKEY_SIZE && prev.banana.trail.length > 10)
          ) {
            const isSelfHit = distToSelf < MONKEY_SIZE;
            const newScores: [number, number] = [prev.scores[0], prev.scores[1]];

            if (isSelfHit) {
              const winner = prev.currentPlayer === 1 ? 2 : 1;
              newScores[winner - 1]++;
              const newPoints = [...prev.currentRoundPoints] as [number, number];
              newPoints[prev.currentPlayer - 1] = 0;
              return {
                ...next,
                status: 'celebrating',
                winner,
                scores: newScores,
                currentRoundPoints: newPoints,
                banana: undefined,
              };
            } else {
              newScores[prev.currentPlayer - 1]++;
            }

            const newPoints = [...prev.currentRoundPoints] as [number, number];
            newPoints[prev.currentPlayer - 1] += 100;

            const monkeySpec = getPowerUp(prev.banana?.type);
            const newParticles: Particle[] = Array.from({length: monkeySpec.monkeyHit.particleCount}).flatMap(() => {
              const base = {
                id: Math.random(),
                pos: {...newPos},
                vel: {x: (Math.random() - 0.5) * 20, y: (Math.random() - 0.5) * 20},
                life: 50 + Math.random() * 40,
                maxLife: 90,
                color: monkeySpec.monkeyHit.coreColor,
                size: 2 + Math.random() * 6,
                type: 'normal' as ParticleType,
              };

              const results: Particle[] = [base];

              if (Math.random() > 0.6) {
                results.push({
                  ...base,
                  id: Math.random(),
                  color: 'rgba(100, 100, 100, 0.5)',
                  type: 'smoke' as ParticleType,
                  size: 10 + Math.random() * 10,
                  vel: {x: (Math.random() - 0.5) * 5, y: (Math.random() - 0.5) * 5 - 2},
                });
              }

              if (Math.random() > 0.8) {
                results.push({
                  ...base,
                  id: Math.random(),
                  color: '#FFFF00',
                  type: 'spark' as ParticleType,
                  size: 1 + Math.random() * 2,
                  vel: {x: (Math.random() - 0.5) * 30, y: (Math.random() - 0.5) * 30},
                });
              }

              return results;
            });

            return {
              ...next,
              status: 'exploding',
              scores: newScores,
              currentRoundPoints: newPoints,
              explosion: {
                pos: newPos,
                radius: 0,
                maxRadius: monkeySpec.monkeyHit.maxRadius,
                type: prev.banana.type,
              },
              particles: [...next.particles, ...newParticles],
              shake: monkeySpec.monkeyHit.shake,
            };
          }

          // 3. Hit Building
          for (const b of prev.buildings) {
            if (newPos.x >= b.x && newPos.x <= b.x + b.width && newPos.y >= b.y) {
              const inHole = prev.destructions.some(
                d => Math.sqrt((newPos.x - d.pos.x) ** 2 + (newPos.y - d.pos.y) ** 2) < d.radius
              );

              if (!inHole) {
                const buildSpec = getPowerUp(prev.banana?.type);
                const newParticles: Particle[] = Array.from({length: buildSpec.buildingHit.particleCount}).flatMap(
                  () => {
                    const isAcid = prev.banana?.type === 'acid';
                    const isGiant = prev.banana?.type === 'giant';

                    const base = {
                      id: Math.random(),
                      pos: {...newPos},
                      vel: {
                        x: (Math.random() - 0.5) * (isGiant ? 25 : 15),
                        y: (Math.random() - 0.5) * (isGiant ? 25 : 15),
                      },
                      life: (isAcid ? 80 : 40) + Math.random() * 40,
                      maxLife: isAcid ? 120 : 80,
                      color: isAcid ? '#00FF00' : isGiant ? '#FFD700' : b.color,
                      size: (isGiant ? 4 : 2) + Math.random() * 5,
                      sparkle: isGiant && Math.random() > 0.5,
                      type: 'normal' as ParticleType,
                    };

                    const results: Particle[] = [base];

                    if (Math.random() > 0.4) {
                      results.push({
                        ...base,
                        id: Math.random(),
                        color: b.color,
                        type: 'debris' as ParticleType,
                        size: 3 + Math.random() * 5,
                        rotation: Math.random() * Math.PI * 2,
                        rotationVel: (Math.random() - 0.5) * 0.5,
                        vel: {x: (Math.random() - 0.5) * 12, y: (Math.random() - 0.5) * 12 - 5},
                      });
                    }

                    if (Math.random() > 0.6) {
                      results.push({
                        ...base,
                        id: Math.random(),
                        color: 'rgba(150, 150, 150, 0.4)',
                        type: 'smoke' as ParticleType,
                        size: 15 + Math.random() * 15,
                        vel: {x: (Math.random() - 0.5) * 4, y: (Math.random() - 0.5) * 4 - 3},
                      });
                    }

                    return results;
                  }
                );

                if (prev.banana.type === 'meteor') {
                  return {
                    ...next,
                    status: 'meteorShower',
                    meteorShower: {
                      centerX: newPos.x,
                      startTime: Date.now(),
                      duration: 4000, // 1s warning + 3s falling
                      meteors: [],
                      protectedPlayer: prev.currentPlayer,
                    },
                    banana: undefined,
                    explosion: undefined,
                    particles: [...next.particles, ...newParticles],
                    shake: 50,
                  };
                }

                return {
                  ...next,
                  status: 'exploding',
                  explosion: {
                    pos: newPos,
                    radius: 0,
                    maxRadius: buildSpec.buildingHit.maxRadius,
                    type: prev.banana.type,
                  },
                  currentRoundPoints: (() => {
                    const p = [...prev.currentRoundPoints] as [number, number];
                    p[prev.currentPlayer - 1] += calculateScore(newPos, selfMonkey, targetMonkey);
                    return p;
                  })(),
                  destructions: [
                    ...prev.destructions,
                    {pos: newPos, radius: buildSpec.buildingHit.destructionRadius},
                  ],
                  particles: [...next.particles, ...newParticles],
                  shake: buildSpec.buildingHit.shake,
                };
              }
            }
          }

          // Add weapon-specific trail particles
          const weaponParticles: Particle[] = [];
          if (prev.banana.type === 'acid' && Math.random() > 0.5) {
            weaponParticles.push({
              id: Math.random(),
              pos: {...newPos},
              vel: {x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2},
              life: 20 + Math.random() * 20,
              maxLife: 40,
              color: '#00FF00',
              size: 2 + Math.random() * 3,
            });
          } else if (prev.banana.type === 'giant' && Math.random() > 0.3) {
            weaponParticles.push({
              id: Math.random(),
              pos: {...newPos},
              vel: {x: (Math.random() - 0.5) * 1, y: (Math.random() - 0.5) * 1},
              life: 30 + Math.random() * 30,
              maxLife: 60,
              color: '#FFD700',
              size: 1 + Math.random() * 2,
            });
          }

          return {
            ...next,
            sunState: newSunState,
            sunHits: newSunHits,
            particles: [...next.particles, ...weaponParticles],
            banana: {
              pos: newPos,
              vel: newVel,
              trail: [...prev.banana.trail, newPos].slice(-20),
              angle: newAngle,
              type: prev.banana.type,
              hasHitSun,
            },
          };
        }

        // ── Exploding ──
        if (prev.status === 'exploding' && prev.explosion) {
          if (prev.explosion.radius >= prev.explosion.maxRadius) {
            if (prev.explosion.maxRadius >= 1000) {
              // Sun explosion: restart game
              setTimeout(() => initGame(undefined, true), 1000);
              return {...next, status: 'roundOver', explosion: undefined};
            }

            const p1Hit =
              Math.sqrt(
                (prev.explosion.pos.x - prev.player1Pos.x) ** 2 +
                  (prev.explosion.pos.y - prev.player1Pos.y) ** 2
              ) < MONKEY_SIZE;
            const p2Hit =
              Math.sqrt(
                (prev.explosion.pos.x - prev.player2Pos.x) ** 2 +
                  (prev.explosion.pos.y - prev.player2Pos.y) ** 2
              ) < MONKEY_SIZE;

            if (p1Hit || p2Hit) {
              const winner = p1Hit ? 2 : 1;
              return {...next, status: 'celebrating', winner, explosion: undefined};
            }

            return handleTurnTransition(prev, next);
          }
          return {
            ...next,
            explosion: {
              ...prev.explosion,
              radius: prev.explosion.radius + (prev.explosion.maxRadius > 100 ? 10 : 3),
            },
          };
        }

        return next;
      });

      if (import.meta.env.DEV) {
        const elapsed = performance.now() - tickStart;
        if (elapsed > SLOW_TICK_THRESHOLD_MS) {
          console.warn(`[useGameLoop] Slow tick: ${elapsed.toFixed(2)}ms`);
        }
      }
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [status, setGameState, initGame]);
}
