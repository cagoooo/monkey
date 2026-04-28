/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { Building, GameState, Point, Treasure, ProjectileType } from './types';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PLAYER_COLORS,
} from './game/constants';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Wind, Play, Maximize, Minimize } from 'lucide-react';
import { soundService } from './services/soundService';
import { PortraitHint } from './game/components/PortraitHint';
import { StartScreen } from './game/components/StartScreen';
import { WinnerScreen } from './game/components/WinnerScreen';
import { useLeaderboard } from './game/hooks/useLeaderboard';
import { useViewportHeight } from './game/hooks/useViewportHeight';
import { useFullscreen } from './game/hooks/useFullscreen';
import { useScoreSubmission } from './game/hooks/useScoreSubmission';
import { useInput } from './game/hooks/useInput';
import { useGameLoop } from './game/hooks/useGameLoop';
import { generateWindowGrid } from './game/engine/terrain';

const COLORS = PLAYER_COLORS;

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [gravityInput, setGravityInput] = useState('9.8');
  const [p1NameInput, setP1NameInput] = useState('玩家一');
  const [p2NameInput, setP2NameInput] = useState('玩家二');
  const [message, setMessage] = useState<string>('');
  const [isMuted, setIsMuted] = useState(soundService.isMuted());
  const leaderboard = useLeaderboard();

  // 全螢幕 + viewport-height 由 hook 管理
  useViewportHeight();
  const {
    isFullscreen,
    isPseudoFullscreen,
    toggle: toggleFullscreen,
    enter: enterFullscreen,
  } = useFullscreen(gameContainerRef);

  // 排行榜提交流程由 hook 管理
  const {
    showScoreEntry,
    pendingScore,
    gradeInput,
    classInput,
    numberInput,
    isSubmitting,
    submissionError,
    setGradeInput,
    setClassInput,
    setNumberInput,
    checkHighScore,
    submitHighScore,
    reset: resetScoreSubmission,
  } = useScoreSubmission();

  const nextGameStarter = useRef<1 | 2>(1);
  const hasCheckedHighScore = useRef(false);
  const isInitialMount = useRef(true); // 用於區分「初次載入」vs「使用者互動後返回」

  // calculateScore / handleTurnTransition 已搬到 src/game/engine/

  useEffect(() => {
    if (!gameState || gameState.status !== 'aiming') return;

    const timer = setInterval(() => {
      setGameState(prev => {
        if (!prev || prev.status !== 'aiming') return prev;
        
        const newTime = prev.turnTimeLeft - 1;
        
        if (newTime <= 0) {
          // Player dies
          const currentPlayer = prev.currentPlayer;
          const explosionPos = currentPlayer === 1 ? prev.player1Pos : prev.player2Pos;
          const newScores: [number, number] = [prev.scores[0], prev.scores[1]];
          newScores[currentPlayer === 1 ? 1 : 0]++; // Opponent wins
          
          soundService.playExplosion();
          
          return {
            ...prev,
            status: 'exploding',
            winner: currentPlayer === 1 ? 2 : 1,
            scores: newScores,
            explosion: {
              pos: explosionPos,
              radius: 0,
              maxRadius: 300,
              type: 'giant'
            },
            shake: 50,
            turnTimeLeft: 0,
            banana: undefined
          };
        }
        
        return {
          ...prev,
          turnTimeLeft: newTime
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState?.status, gameState?.currentPlayer]);

  // fullscreen / viewport-height 邏輯已搬到 useFullscreen / useViewportHeight hooks

  useEffect(() => {
    if (gameState?.status === 'tournamentOver' && !hasCheckedHighScore.current) {
      const winnerIdx = gameState.tournamentWinner === 1 ? 0 : 1;
      const winnerScore = gameState.roundHistory[winnerIdx === 0 ? 'p1' : 'p2'].reduce((a, b) => a + b, 0);
      const winnerName = gameState.playerNames[winnerIdx];
      checkHighScore(leaderboard, winnerScore, winnerName);
      hasCheckedHighScore.current = true;
    } else if (gameState?.status !== 'tournamentOver') {
      hasCheckedHighScore.current = false;
    }
  }, [gameState?.status, gameState?.tournamentWinner, gameState?.roundHistory, gameState?.playerNames, leaderboard, checkHighScore]);

  useEffect(() => {
    // Stop BGM on unmount
    return () => {
      soundService.stopBGM();
    };
  }, []);

  // toggleFullscreen / enterFullscreen 由 useFullscreen hook 提供

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    soundService.setMuted(newMuted);
  };

  // Initialize Game
  const initGame = (customGravity?: number, resetScores: boolean = false) => {
    const buildings: Building[] = [];
    let currentX = 0;
    while (currentX < CANVAS_WIDTH) {
      const width = 60 + Math.random() * 60;
      const height = 100 + Math.random() * 300;
      
      const windows = generateWindowGrid(
        Math.floor(height / 15),
        Math.floor(width / 10)
      );

      buildings.push({
        x: currentX,
        y: CANVAS_HEIGHT - height,
        width: Math.min(width, CANVAS_WIDTH - currentX),
        height,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        windows,
      });
      currentX += width;
    }

    // Place monkeys (1-2 buildings away from boundaries)
    const p1BuildingIdx = 1 + Math.floor(Math.random() * 2);
    const p2BuildingIdx = buildings.length - 2 - Math.floor(Math.random() * 2);

    const p1B = buildings[p1BuildingIdx];
    const p2B = buildings[p2BuildingIdx];

    // Ensure there's at least one building between them that is taller than both players
    const minMiddleIdx = p1BuildingIdx + 1;
    const maxMiddleIdx = p2BuildingIdx - 1;
    
    if (minMiddleIdx <= maxMiddleIdx) {
      const maxHeight = Math.max(p1B.height, p2B.height) + 40; // Add some buffer for monkey height
      const middleIndices = [];
      for (let i = minMiddleIdx; i <= maxMiddleIdx; i++) middleIndices.push(i);
      
      const hasTallBuilding = middleIndices.some(idx => buildings[idx].height > maxHeight);
      
      if (!hasTallBuilding) {
        // Pick a random building in the middle and make it tall
        const targetIdx = middleIndices[Math.floor(Math.random() * middleIndices.length)];
        const newHeight = maxHeight + 20 + Math.random() * 100;
        const b = buildings[targetIdx];

        buildings[targetIdx] = {
          ...b,
          height: newHeight,
          y: CANVAS_HEIGHT - newHeight,
          windows: generateWindowGrid(
            Math.floor(newHeight / 15),
            Math.floor(b.width / 10)
          ),
        };
      }
    }

    // Position so feet are on top (feet bottom is pos.y + 8.75)
    const p1Pos = { x: p1B.x + p1B.width / 2, y: p1B.y - 8.75 };
    const p2Pos = { x: p2B.x + p2B.width / 2, y: p2B.y - 8.75 };

    const starter = nextGameStarter.current;
    nextGameStarter.current = starter === 1 ? 2 : 1;

    // Spawn random treasure
    const treasures: Treasure[] = [];
    const rand = Math.random();
    let treasureType: 'giant' | 'acid' | 'beam' | 'meteor';
    if (rand < 0.07) treasureType = 'meteor';
    else if (rand < 0.535) treasureType = 'giant';
    else treasureType = 'acid';
    treasures.push({
      id: Date.now(),
      pos: {
        x: 100 + Math.random() * (CANVAS_WIDTH - 200),
        y: 50 + Math.random() * 250
      },
      type: treasureType,
      active: true
    });

    setGameState(prev => {
      const g = typeof customGravity === 'number' ? customGravity : (prev?.gravity || 0.25);
      // If resetScores is true, it's a full game restart (or sun explosion)
      const shouldResetSun = resetScores || (prev?.sunHits || 0) >= 5;
      
      return {
        player1Pos: p1Pos,
        player2Pos: p2Pos,
        sunPos: { x: CANVAS_WIDTH / 2 + (Math.random() * 100 - 50), y: 50 + Math.random() * 50 },
        sunState: shouldResetSun ? 'normal' : (prev?.sunState || 'normal'),
        sunHits: shouldResetSun ? 0 : (prev?.sunHits || 0),
        buildings,
        destructions: [],
        particles: [],
        shake: 0,
        currentPlayer: starter,
        wind: (Math.random() * 2 - 1) * 0.1,
        scores: resetScores ? [0, 0] : (prev?.scores || [0, 0]),
        playerNames: [p1NameInput || '玩家一', p2NameInput || '玩家二'],
        gravity: g,
        status: 'aiming',
        winner: undefined,
        roundCount: 0,
        dragStart: null,
        dragCurrent: null,
        treasures,
        player1Projectile: prev?.player1Projectile || 'normal',
        player2Projectile: prev?.player2Projectile || 'normal',
        roundHistory: resetScores ? { p1: [], p2: [] } : (prev?.roundHistory || { p1: [], p2: [] }),
        currentRoundPoints: [0, 0],
        p1GroundTurns: 0,
        p2GroundTurns: 0,
        p1Struggling: false,
        p2Struggling: false,
        turnTimeLeft: 10,
      };
    });
    const pNames = [p1NameInput || '玩家一', p2NameInput || '玩家二'];
    setMessage(`${pNames[starter - 1]} 的回合`);
    setShowStartScreen(false);
  };

  const handleStartGame = () => {
    // 在 user gesture 同步路徑內解鎖 AudioContext（雙保險，main.tsx 也有全域 listener）
    soundService.unlock();

    const gVal = parseFloat(gravityInput) || 9.8;
    // Scale 9.8 to 0.25
    const scaledG = gVal * (0.25 / 9.8);
    initGame(scaledG);

    // 開始遊戲時自動進入全螢幕
    enterFullscreen();
  };

  const handleResetToStart = () => {
    setGameState(null);
    setShowStartScreen(true);
    resetScoreSubmission();
  };

  // checkHighScore / submitHighScore 由 useScoreSubmission hook 提供

  useEffect(() => {
    // Don't auto-init on mount, wait for start screen
  }, []);

  // Update Message based on turn
  useEffect(() => {
    if (!gameState) return;
    if (gameState.status === 'aiming') {
      const name = gameState.currentPlayer === 1 ? gameState.playerNames[0] : gameState.playerNames[1];
      setMessage(`${name} 的回合`);
    }
  }, [gameState?.currentPlayer, gameState?.status, gameState?.playerNames]);

  // Sound Effects Trigger
  // ⚠️ isInitialMount：初次載入時瀏覽器尚未收到使用者互動，
  //    AudioContext 不允許自動播放，因此跳過第一次的 playIntro()
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      soundService.stopBGM();
      return; // 初次 mount 靜音，等使用者點選後才觸發
    }
    if (showStartScreen) {
      soundService.playIntro();
      soundService.stopBGM();
    } else if (gameState) {
      soundService.startBGM();
    } else {
      soundService.stopBGM();
    }
  }, [showStartScreen, !!gameState]);

  useEffect(() => {
    if (!gameState) return;

    if (gameState.status === 'throwing') {
      soundService.playThrow();
    } else if (gameState.status === 'exploding') {
      if (gameState.explosion?.type === 'acid') {
        soundService.playMelting();
      } else if (gameState.explosion && gameState.explosion.maxRadius > 35) {
        soundService.playHit();
      } else {
        soundService.playExplosion();
      }
    } else if (gameState.status === 'celebrating') {
      soundService.playVictory();
      const timer = setTimeout(() => {
        setGameState(prev => {
          if (!prev) return null;
          
          const newHistory = {
            p1: [...prev.roundHistory.p1, prev.currentRoundPoints[0]],
            p2: [...prev.roundHistory.p2, prev.currentRoundPoints[1]]
          };

          const winner1 = prev.scores[0] >= 2;
          const winner2 = prev.scores[1] >= 2;
          if (winner1 || winner2) {
            return { ...prev, status: 'tournamentOver', tournamentWinner: winner1 ? 1 : 2, roundHistory: newHistory };
          }
          return { ...prev, status: 'roundOver', roundHistory: newHistory };
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [gameState?.status]);

  // Game Loop（每 20ms 推進，已抽到 useGameLoop hook）
  useGameLoop({
    status: gameState?.status,
    setGameState,
    initGame,
  });

  // Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !gameState) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.fillStyle = '#0000AA';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const time = Date.now() / 1000;

    // ────────────────────────────────────────────────
    // Wind Visualization Layer 1: 背景雲層（風力推動）
    // 雲速 = 基礎 0.3 px/frame + 風力強度，方向跟著 wind 正負
    // ────────────────────────────────────────────────
    const windVal = gameState.wind;
    const cloudSpeed = (0.3 + Math.abs(windVal) * 30) * (windVal >= 0 ? 1 : -1);
    const cloudOffset = Date.now() / 50 * cloudSpeed;
    const clouds = [
      { baseX:  50, y: 60,  w: 32, h: 12 },
      { baseX: 230, y: 35,  w: 26, h: 10 },
      { baseX: 410, y: 95,  w: 38, h: 14 },
      { baseX: 580, y: 55,  w: 30, h: 12 },
      { baseX: 720, y: 80,  w: 34, h: 12 },
    ];
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    const wrapW = CANVAS_WIDTH + 200;
    clouds.forEach(c => {
      const x = ((c.baseX + cloudOffset) % wrapW + wrapW) % wrapW - 100;
      // 像素風雲：上下兩條 + 兩端圓潤一點的小方塊
      ctx.fillRect(x, c.y, c.w, c.h);
      ctx.fillRect(x + c.w * 0.2, c.y - c.h * 0.4, c.w * 0.6, c.h * 0.5);
      ctx.fillRect(x + c.w * 0.4, c.y - c.h * 0.7, c.w * 0.3, c.h * 0.4);
    });

    // Apply Screen Shake
    if (gameState.shake > 0) {
      const sx = (Math.random() - 0.5) * gameState.shake;
      const sy = (Math.random() - 0.5) * gameState.shake;
      ctx.save();
      ctx.translate(sx, sy);
    }

    // Draw Buildings
    gameState.buildings.forEach(b => {
      ctx.fillStyle = b.color;
      ctx.fillRect(b.x, b.y, b.width, b.height);
      
      // Draw Windows
      const winW = 4;
      const winH = 6;
      const gapX = 10;
      const gapY = 15;
      b.windows.forEach((row, r) => {
        row.forEach((isOn, c) => {
          if (isOn) {
            // Random flicker based on position and time
            const flicker = Math.sin(time * 2 + (b.x + c) * 0.5 + (b.y + r) * 0.3);
            const alpha = flicker > 0.8 ? 0.3 : 1.0; // Occasional dimming
            ctx.fillStyle = `rgba(255, 255, 85, ${alpha})`;
          } else {
            ctx.fillStyle = '#000000';
          }
          ctx.fillRect(b.x + 5 + c * gapX, b.y + 10 + r * gapY, winW, winH);
        });
      });
    });

    // Draw Destructions (Holes)
    ctx.fillStyle = '#0000AA';
    gameState.destructions.forEach(d => {
      ctx.beginPath();
      ctx.arc(d.pos.x, d.pos.y, d.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw Meteor Shower Warning & Meteors
    if (gameState.status === 'meteorShower' && gameState.meteorShower) {
      const elapsed = Date.now() - gameState.meteorShower.startTime;
      const range = 150 * 5;
      const startX = gameState.meteorShower.centerX - range / 2;
      
      // Sky Warning
      if (elapsed < 1000) {
        const alpha = Math.sin(elapsed / 100) * 0.3 + 0.3;
        ctx.fillStyle = `rgba(255, 0, 0, ${alpha})`;
        ctx.fillRect(startX, 0, range, 100);
      } else {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
        ctx.fillRect(startX, 0, range, 50);
      }
      
      // Meteors
      gameState.meteorShower.meteors.forEach(m => {
        ctx.save();
        ctx.translate(m.pos.x, m.pos.y);
        
        // Trail
        const trailGradient = ctx.createLinearGradient(0, 0, -m.vel.x * 5, -m.vel.y * 5);
        trailGradient.addColorStop(0, 'rgba(255, 69, 0, 0.8)');
        trailGradient.addColorStop(1, 'transparent');
        ctx.strokeStyle = trailGradient;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-m.vel.x * 5, -m.vel.y * 5);
        ctx.stroke();
        
        // Meteor head
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#FF4500';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.restore();
      });
    }

    // Draw Sun
    ctx.save();
    const sunX = gameState.sunPos.x;
    const sunY = gameState.sunPos.y;

    // Breathing effect for normal sun
    const breathing = (gameState.sunState === 'normal' || gameState.sunState === 'surprised') ? Math.sin(time * 3) * 1.2 : 0;
    const baseRadius = 20 + breathing;

    // Sun rays (animated rotation for non-skull)
    if (gameState.sunState !== 'skull') {
      ctx.strokeStyle = '#FFFF55';
      ctx.lineWidth = 3;
      const rayRotation = time * 0.5;
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6 + rayRotation;
        // Rays also pulse slightly
        const rayPulse = (gameState.sunState === 'normal' || gameState.sunState === 'surprised') ? Math.sin(time * 3 + 0.5) * 3 : 0;
        const rayLen = gameState.sunState === 'falling' ? 45 : 35 + rayPulse;
        ctx.beginPath();
        ctx.moveTo(sunX + Math.cos(angle) * (baseRadius + 5), sunY + Math.sin(angle) * (baseRadius + 5));
        ctx.lineTo(sunX + Math.cos(angle) * rayLen, sunY + Math.sin(angle) * rayLen);
        ctx.stroke();
      }
    }

    // Main Sun Body
    if (gameState.sunState === 'skull') {
      // Draw Detailed Skull
      ctx.fillStyle = '#F0F0F0';
      // Subtle gradient for depth
      const grad = ctx.createRadialGradient(sunX - 5, sunY - 5, 5, sunX, sunY, 25);
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(1, '#D0D0D0');
      ctx.fillStyle = grad;
      
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.beginPath();
      ctx.arc(sunX, sunY, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Eye Sockets
      ctx.fillStyle = '#1a1a1a';
      ctx.beginPath();
      ctx.ellipse(sunX - 8, sunY - 5, 6, 8, 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(sunX + 8, sunY - 5, 6, 8, -0.2, 0, Math.PI * 2);
      ctx.fill();
      
      // Faint red glow in eyes
      ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
      ctx.beginPath();
      ctx.arc(sunX - 8, sunY - 3, 2, 0, Math.PI * 2);
      ctx.arc(sunX + 8, sunY - 3, 2, 0, Math.PI * 2);
      ctx.fill();

      // Nose Hole
      ctx.fillStyle = '#1a1a1a';
      ctx.beginPath();
      ctx.moveTo(sunX, sunY + 3);
      ctx.lineTo(sunX - 3, sunY + 8);
      ctx.lineTo(sunX + 3, sunY + 8);
      ctx.closePath();
      ctx.fill();

      // Teeth/Jaw
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sunX - 10, sunY + 14);
      ctx.lineTo(sunX + 10, sunY + 14);
      ctx.stroke();
      for (let i = -8; i <= 8; i += 4) {
        ctx.beginPath();
        ctx.moveTo(sunX + i, sunY + 10);
        ctx.lineTo(sunX + i, sunY + 18);
        ctx.stroke();
      }

      // Cracks
      ctx.strokeStyle = 'rgba(0,0,0,0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      // Top crack
      ctx.moveTo(sunX - 5, sunY - 20);
      ctx.lineTo(sunX - 2, sunY - 15);
      ctx.lineTo(sunX - 6, sunY - 12);
      // Side crack
      ctx.moveTo(sunX + 15, sunY - 10);
      ctx.lineTo(sunX + 10, sunY - 5);
      ctx.lineTo(sunX + 12, sunY + 2);
      // Bottom crack
      ctx.moveTo(sunX - 12, sunY + 10);
      ctx.lineTo(sunX - 15, sunY + 15);
      ctx.stroke();
    } else {
      // Normal/Animated Sun
      const jitter = gameState.sunState === 'falling' ? Math.sin(time * 50) * 3 : 0;
      ctx.fillStyle = gameState.sunState === 'dead' ? '#DDDD99' : '#FFFF55';
      ctx.beginPath();
      ctx.arc(sunX + jitter, sunY + jitter, baseRadius, 0, Math.PI * 2);
      ctx.fill();

      // Sweat drops for falling state
      if (gameState.sunState === 'falling') {
        ctx.fillStyle = '#33AAFF';
        for (let i = 0; i < 3; i++) {
          const dropX = sunX + (i === 0 ? -25 : i === 1 ? 25 : 0) + Math.sin(time * 10 + i) * 5;
          const dropY = sunY - 10 + ((time * 20 + i * 10) % 40);
          ctx.beginPath();
          ctx.arc(dropX, dropY, 3, 0, Math.PI * 2);
          ctx.fill();
          // Drop tip
          ctx.beginPath();
          ctx.moveTo(dropX - 3, dropY);
          ctx.lineTo(dropX, dropY - 6);
          ctx.lineTo(dropX + 3, dropY);
          ctx.fill();
        }
      }

      // Eyes
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      if (gameState.sunState === 'sunglasses') {
        // Cool Sunglasses
        ctx.fillStyle = '#111';
        ctx.beginPath();
        ctx.roundRect(sunX - 16, sunY - 8, 14, 10, 2);
        ctx.roundRect(sunX + 2, sunY - 8, 14, 10, 2);
        ctx.fill();
        // Bridge
        ctx.beginPath();
        ctx.moveTo(sunX - 2, sunY - 3);
        ctx.lineTo(sunX + 2, sunY - 3);
        ctx.stroke();
        // Reflection
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.beginPath();
        ctx.moveTo(sunX - 14, sunY - 6);
        ctx.lineTo(sunX - 10, sunY - 2);
        ctx.moveTo(sunX + 4, sunY - 6);
        ctx.lineTo(sunX + 8, sunY - 2);
        ctx.stroke();
      } else if (gameState.sunState === 'dead') {
        // X Eyes
        const drawX = (x: number, y: number) => {
          ctx.beginPath();
          ctx.moveTo(x - 5, y - 5); ctx.lineTo(x + 5, y + 5);
          ctx.moveTo(x + 5, y - 5); ctx.lineTo(x - 5, y + 5);
          ctx.stroke();
        };
        drawX(sunX - 8, sunY - 5);
        drawX(sunX + 8, sunY - 5);
      } else if (gameState.sunState === 'falling') {
        // Panicked Eyes
        const eyeJitter = Math.sin(time * 40) * 4;
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(sunX - 8, sunY - 5, 7, 0, Math.PI * 2);
        ctx.arc(sunX + 8, sunY - 5, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(sunX - 8 + eyeJitter, sunY - 5 + eyeJitter, 3, 0, Math.PI * 2);
        ctx.arc(sunX + 8 - eyeJitter, sunY - 5 - eyeJitter, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Eyebrows
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sunX - 15, sunY - 15 + Math.sin(time * 20) * 2);
        ctx.lineTo(sunX - 5, sunY - 12);
        ctx.moveTo(sunX + 15, sunY - 15 + Math.sin(time * 20 + 1) * 2);
        ctx.lineTo(sunX + 5, sunY - 12);
        ctx.stroke();
      } else {
        // Normal/Surprised
        const isBlinking = Math.sin(time * 0.5) > 0.98;
        if (isBlinking && gameState.sunState === 'normal') {
          ctx.beginPath();
          ctx.moveTo(sunX - 12, sunY - 5); ctx.lineTo(sunX - 4, sunY - 5);
          ctx.moveTo(sunX + 4, sunY - 5); ctx.lineTo(sunX + 12, sunY - 5);
          ctx.stroke();
        } else {
          const eyeSize = gameState.sunState === 'surprised' ? 4 : 2;
          ctx.fillStyle = '#000';
          ctx.beginPath();
          ctx.arc(sunX - 8, sunY - 5, eyeSize, 0, Math.PI * 2);
          ctx.arc(sunX + 8, sunY - 5, eyeSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Mouth
      ctx.strokeStyle = '#000';
      if (gameState.sunState === 'falling') {
        // Large Screaming Mouth with shake
        ctx.fillStyle = '#400';
        const mouthShake = Math.sin(time * 60) * 2;
        ctx.beginPath();
        ctx.ellipse(sunX + mouthShake, sunY + 10, 9, 12, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // Tongue
        ctx.fillStyle = '#f55';
        ctx.beginPath();
        ctx.arc(sunX + mouthShake, sunY + 18, 5, 0, Math.PI, true);
        ctx.fill();
      } else if (gameState.sunState === 'surprised') {
        ctx.beginPath();
        ctx.arc(sunX, sunY + 8, 5, 0, Math.PI * 2);
        ctx.stroke();
      } else if (gameState.sunState === 'dead') {
        ctx.beginPath();
        ctx.moveTo(sunX - 10, sunY + 10);
        ctx.bezierCurveTo(sunX - 5, sunY + 5, sunX + 5, sunY + 15, sunX + 10, sunY + 10);
        ctx.stroke();
      } else {
        // Smile
        ctx.beginPath();
        ctx.arc(sunX, sunY + 5, 8, 0.1 * Math.PI, 0.9 * Math.PI);
        ctx.stroke();
      }

      // Sweat drops for falling
      if (gameState.sunState === 'falling') {
        ctx.fillStyle = '#AAF';
        for (let i = 0; i < 3; i++) {
          const dropX = sunX + Math.sin(time * 10 + i) * 25;
          const dropY = sunY - 20 - i * 10;
          ctx.beginPath();
          ctx.moveTo(dropX, dropY);
          ctx.lineTo(dropX - 3, dropY + 6);
          ctx.arc(dropX, dropY + 6, 3, Math.PI, 0, true);
          ctx.closePath();
          ctx.fill();
        }
      }
    }
    ctx.restore();

    // Draw Treasures
    gameState.treasures.forEach(t => {
      if (!t.active) return;
      ctx.save();
      ctx.translate(t.pos.x, t.pos.y);
      const bounce = Math.sin(Date.now() / 200) * 5;
      ctx.translate(0, bounce);
      
      if (t.type === 'giant') {
        // Draw Golden Sun Icon for 10x
        const time = Date.now() / 200;
        ctx.fillStyle = '#FFD700'; // Gold
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#FFD700';
        
        // Draw Sun Shape
        ctx.beginPath();
        ctx.arc(0, 0, 15, 0, Math.PI * 2);
        ctx.fill();
        
        // Rays
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 4 + time;
          ctx.beginPath();
          ctx.moveTo(Math.cos(angle) * 18, Math.sin(angle) * 18);
          ctx.lineTo(Math.cos(angle) * 25, Math.sin(angle) * 25);
          ctx.stroke();
        }
        
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('10X', 0, 4);
      } else if (t.type === 'acid') {
        // Draw Acid Bottle Icon
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(-8, -10, 16, 20);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(-4, -14, 8, 4);
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('ACID', 0, 4);
      } else if (t.type === 'beam') {
        // Draw Flashlight Icon
        ctx.fillStyle = '#444444'; // Dark Gray body
        ctx.fillRect(-12, -4, 18, 8);
        ctx.fillStyle = '#666666'; // Head
        ctx.fillRect(6, -7, 6, 14);
        ctx.fillStyle = '#FFFF00'; // Lens
        ctx.fillRect(12, -5, 2, 10);
        
        // Light beam effect
        ctx.fillStyle = 'rgba(255, 255, 0, 0.3)';
        ctx.beginPath();
        ctx.moveTo(14, -5);
        ctx.lineTo(30, -15);
        ctx.lineTo(30, 15);
        ctx.lineTo(14, 5);
        ctx.fill();
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 8px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('BEAM', 0, 3);
      } else if (t.type === 'meteor') {
        // Draw Irregular Burning Stone
        ctx.fillStyle = '#8B4513'; // SaddleBrown
        ctx.beginPath();
        ctx.moveTo(-10, -10);
        ctx.lineTo(12, -8);
        ctx.lineTo(15, 5);
        ctx.lineTo(5, 15);
        ctx.lineTo(-12, 10);
        ctx.lineTo(-15, -5);
        ctx.closePath();
        ctx.fill();
        
        // Fire/Glow
        ctx.strokeStyle = '#FF4500'; // OrangeRed
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Cracks/Details
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-5, -5);
        ctx.lineTo(5, 5);
        ctx.moveTo(5, -5);
        ctx.lineTo(-5, 5);
        ctx.stroke();
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 8px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('METEOR', 0, 3);
      }
      ctx.restore();
    });

    // Draw Particles
    gameState.particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life / p.maxLife;
      
      if (p.type === 'debris') {
        ctx.save();
        ctx.translate(p.pos.x, p.pos.y);
        ctx.rotate(p.rotation || 0);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      } else if (p.type === 'smoke') {
        ctx.beginPath();
        ctx.arc(p.pos.x, p.pos.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.sparkle || p.type === 'spark') {
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.pos.x, p.pos.y, p.size * 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      } else {
        ctx.beginPath();
        ctx.arc(p.pos.x, p.pos.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.globalAlpha = 1.0;

    // Draw Aiming UI (Slingshot)
    if (gameState.status === 'aiming' && gameState.dragStart && gameState.dragCurrent) {
      const playerPos = gameState.currentPlayer === 1 ? gameState.player1Pos : gameState.player2Pos;
      const dx = gameState.dragCurrent.x - gameState.dragStart.x;
      const dy = gameState.dragCurrent.y - gameState.dragStart.y;
      
      // Calculate angle and velocity
      const angleRad = Math.atan2(dy, gameState.currentPlayer === 1 ? -dx : dx);
      let angleDeg = Math.round(angleRad * (180 / Math.PI));
      
      const dist = Math.sqrt(dx * dx + dy * dy);
      const velocity = Math.min(dist * 2.55, 255);

      // Draw Power Line (Dashed)
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(playerPos.x, playerPos.y);
      ctx.lineTo(playerPos.x + dx, playerPos.y + dy);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Angle Text above monkey
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${angleDeg}°`, playerPos.x, playerPos.y - 40);
      ctx.fillText(`力: ${Math.round(velocity)}`, playerPos.x, playerPos.y - 25);

      // Draw Trajectory Prediction (First 4 rounds = 8 turns, OR if beam is active)
      const currentWeapon = gameState.currentPlayer === 1 ? gameState.player1Projectile : gameState.player2Projectile;
      if (gameState.roundCount < 8 || currentWeapon === 'beam') {
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = currentWeapon === 'beam' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 0, 0.4)';
        ctx.beginPath();
        
        const rad = (gameState.currentPlayer === 1 ? -angleDeg : angleDeg + 180) * (Math.PI / 180);
        let px = playerPos.x;
        let py = playerPos.y;
        let vx = Math.cos(rad) * (velocity / 8);
        let vy = Math.sin(rad) * (velocity / 8);
        
        ctx.moveTo(px, py);
        const steps = currentWeapon === 'beam' ? 100 : 50;
        for (let i = 0; i < steps; i++) {
          px += vx;
          py += vy;
          vx += gameState.wind;
          vy += gameState.gravity;
          ctx.lineTo(px, py);
          if (py > CANVAS_HEIGHT || px < 0 || px > CANVAS_WIDTH) break;
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // Draw Monkeys
    const drawMonkey = (pos: Point, color: string, isThrowing: boolean, isPlayer1: boolean, isWinner: boolean, isDead: boolean, isActive: boolean, hasUmbrella: boolean = false, groundTurns: number = 0, isStruggling: boolean = false) => {
      if (isActive && !isDead) {
        ctx.save();
        const bounce = Math.sin(Date.now() / 150) * 5;
        ctx.fillStyle = '#FFD700'; // Gold
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#FFD700';
        
        // Draw inverted triangle above head
        ctx.beginPath();
        ctx.moveTo(pos.x - 6, pos.y - 45 + bounce);
        ctx.lineTo(pos.x + 6, pos.y - 45 + bounce);
        ctx.lineTo(pos.x, pos.y - 35 + bounce);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // Countdown display
      if (groundTurns > 0 && !isDead && !isWinner) {
        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.fillStyle = groundTurns >= 4 ? '#FF0000' : '#FFFFFF';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#000000';
        ctx.fillText(`${5 - groundTurns}`, 0, -60);
        ctx.restore();
      }

      ctx.save();
      
      // Struggle animation (shaking)
      let shakeX = 0;
      let shakeY = 0;
      if (isStruggling) {
        shakeX = (Math.random() - 0.5) * 8;
        shakeY = (Math.random() - 0.5) * 8;
      }
      
      ctx.translate(pos.x + shakeX, pos.y + shakeY);
      
      if (isDead) {
        ctx.rotate(isPlayer1 ? -Math.PI / 2 : Math.PI / 2);
        ctx.translate(0, 10);
      }

      // Refined Gorilla Drawing
      const p = 2.5; 
      const furColor = color; // Main fur color
      const faceColor = '#FFCC99'; // Lighter face/chest color
      const shadowColor = 'rgba(0,0,0,0.2)';
      const highlightColor = 'rgba(255,255,255,0.2)';

      // 1. Ears
      ctx.fillStyle = furColor;
      ctx.fillRect(-3.5 * p, -9.5 * p, 1.5 * p, 2 * p); // Left ear
      ctx.fillRect(2 * p, -9.5 * p, 1.5 * p, 2 * p);  // Right ear

      // 2. Head
      ctx.fillStyle = furColor;
      ctx.fillRect(-2.5 * p, -10.5 * p, 5 * p, 4.5 * p); // Main head shape
      
      // 3. Face Mask
      ctx.fillStyle = faceColor;
      ctx.fillRect(-1.5 * p, -8.5 * p, 3 * p, 2.5 * p); // Face area
      
      // 4. Eyes
      ctx.fillStyle = '#000';
      ctx.fillRect(-1 * p, -7.5 * p, 0.8 * p, 0.8 * p); // Left eye
      ctx.fillRect(0.2 * p, -7.5 * p, 0.8 * p, 0.8 * p); // Right eye
      
      // 5. Body
      ctx.fillStyle = furColor;
      ctx.fillRect(-4 * p, -6 * p, 8 * p, 6 * p); // Main torso
      
      // 6. Chest Patch
      ctx.fillStyle = faceColor;
      ctx.fillRect(-2.5 * p, -5 * p, 5 * p, 4 * p); // Chest area
      
      // 7. Arms
      ctx.fillStyle = furColor;
      if (isWinner) {
        const beat = Math.sin(Date.now() / 150) > 0;
        if (beat) {
          // Arms up (Victory)
          ctx.fillRect(-6 * p, -11 * p, 2.5 * p, 6 * p); // Left arm up
          ctx.fillRect(3.5 * p, -11 * p, 2.5 * p, 6 * p);  // Right arm up
          // Hands
          ctx.fillStyle = faceColor;
          ctx.fillRect(-6 * p, -12 * p, 2.5 * p, 1.5 * p);
          ctx.fillRect(3.5 * p, -12 * p, 2.5 * p, 1.5 * p);
        } else {
          // Arms down/bent
          ctx.fillRect(-7 * p, -7 * p, 3.5 * p, 3 * p); // Left shoulder
          ctx.fillRect(3.5 * p, -7 * p, 3.5 * p, 3 * p);  // Right shoulder
          ctx.fillRect(-7 * p, -4 * p, 2 * p, 5 * p); // Left arm down
          ctx.fillRect(5 * p, -4 * p, 2 * p, 5 * p);  // Right arm down
          // Hands
          ctx.fillStyle = faceColor;
          ctx.fillRect(-7 * p, 1 * p, 2 * p, 1.5 * p);
          ctx.fillRect(5 * p, 1 * p, 2 * p, 1.5 * p);
        }
      } else if (isThrowing) {
        const elapsed = Date.now() - (gameState.throwStartTime || 0);
        const armUp = elapsed < 400;
        if (isPlayer1) {
          // Player 1 throwing (Left arm up)
          if (armUp) {
            ctx.fillRect(-6 * p, -12 * p, 2.5 * p, 7 * p);
            ctx.fillStyle = faceColor;
            ctx.fillRect(-6 * p, -13 * p, 2.5 * p, 1.5 * p);
            ctx.fillStyle = furColor;
          } else {
            ctx.fillRect(-7 * p, -7 * p, 3.5 * p, 4 * p);
          }
          
          // Right arm on hip
          ctx.fillRect(4 * p, -7 * p, 3 * p, 3 * p);
          ctx.fillRect(5 * p, -4 * p, 2 * p, 4 * p);
          ctx.fillStyle = faceColor;
          ctx.fillRect(3.5 * p, -1 * p, 2 * p, 1.5 * p);
        } else {
          // Player 2 throwing (Right arm up)
          if (armUp) {
            ctx.fillRect(3.5 * p, -12 * p, 2.5 * p, 7 * p);
            ctx.fillStyle = faceColor;
            ctx.fillRect(3.5 * p, -13 * p, 2.5 * p, 1.5 * p);
            ctx.fillStyle = furColor;
          } else {
            ctx.fillRect(3.5 * p, -7 * p, 3.5 * p, 4 * p);
          }
          
          // Left arm on hip
          ctx.fillRect(-7 * p, -7 * p, 3 * p, 3 * p);
          ctx.fillRect(-7 * p, -4 * p, 2 * p, 4 * p);
          ctx.fillStyle = faceColor;
          ctx.fillRect(-5.5 * p, -1 * p, 2 * p, 1.5 * p);
        }
      } else {
        // Hands on hips
        // Left arm
        ctx.fillRect(-7 * p, -7 * p, 3.5 * p, 3 * p); // Shoulder
        ctx.fillRect(-7 * p, -4 * p, 2 * p, 4 * p); // Arm down
        ctx.fillStyle = faceColor;
        ctx.fillRect(-5.5 * p, -1 * p, 2 * p, 1.5 * p); // Hand
        
        // Right arm
        ctx.fillStyle = furColor;
        ctx.fillRect(3.5 * p, -7 * p, 3.5 * p, 3 * p); // Shoulder
        ctx.fillRect(5 * p, -4 * p, 2 * p, 4 * p); // Arm down
        ctx.fillStyle = faceColor;
        ctx.fillRect(3.5 * p, -1 * p, 2 * p, 1.5 * p); // Hand
      }
      
      // 8. Legs
      ctx.fillStyle = furColor;
      ctx.fillRect(-3.5 * p, 0 * p, 2.5 * p, 4 * p); // Left leg
      ctx.fillRect(1 * p, 0 * p, 2.5 * p, 4 * p);  // Right leg
      
      // 9. Feet
      ctx.fillStyle = faceColor;
      ctx.fillRect(-4.5 * p, 4 * p, 3.5 * p, 1.5 * p); // Left foot
      ctx.fillRect(1 * p, 4 * p, 3.5 * p, 1.5 * p);  // Right foot

      // 10. Shading/Highlights (Subtle)
      ctx.fillStyle = highlightColor;
      ctx.fillRect(-2 * p, -10 * p, 1 * p, 1 * p); // Head highlight
      ctx.fillRect(-3.5 * p, -5.5 * p, 1 * p, 1 * p); // Shoulder highlight
      
      ctx.fillStyle = shadowColor;
      ctx.fillRect(-3.5 * p, -1 * p, 2.5 * p, 0.5 * p); // Leg shadow
      ctx.fillRect(1 * p, -1 * p, 2.5 * p, 0.5 * p);  // Leg shadow

      // 11. Umbrella (if protected during meteor shower)
      if (hasUmbrella) {
        ctx.save();
        ctx.translate(0, -15 * p); // Move above head
        
        // Handle
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -25);
        ctx.stroke();
        
        // Canopy
        const umbrellaColor = '#FF4444';
        ctx.fillStyle = umbrellaColor;
        ctx.beginPath();
        ctx.arc(0, -25, 40, Math.PI, 0);
        ctx.fill();
        
        // Ribs/Details
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 2;
        for (let i = 1; i < 4; i++) {
          ctx.beginPath();
          ctx.moveTo(0, -25);
          const angle = Math.PI + (i * Math.PI) / 4;
          ctx.lineTo(Math.cos(angle) * 40, -25 + Math.sin(angle) * 40);
          ctx.stroke();
        }
        
        // Top point
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(0, -65, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }

      ctx.restore();
    };

    const p1Throwing = gameState.status === 'throwing' && gameState.currentPlayer === 1;
    const p2Throwing = gameState.status === 'throwing' && gameState.currentPlayer === 2;
    const p1Winner = (gameState.status === 'roundOver' || gameState.status === 'tournamentOver' || gameState.status === 'celebrating') && gameState.winner === 1;
    const p2Winner = (gameState.status === 'roundOver' || gameState.status === 'tournamentOver' || gameState.status === 'celebrating') && gameState.winner === 2;
    const p1Dead = (gameState.status === 'roundOver' || gameState.status === 'tournamentOver' || gameState.status === 'celebrating') && gameState.winner === 2;
    const p2Dead = (gameState.status === 'roundOver' || gameState.status === 'tournamentOver' || gameState.status === 'celebrating') && gameState.winner === 1;
    const p1Active = gameState.currentPlayer === 1 && (gameState.status === 'aiming' || gameState.status === 'throwing');
    const p2Active = gameState.currentPlayer === 2 && (gameState.status === 'aiming' || gameState.status === 'throwing');

    const p1HasUmbrella = gameState.status === 'meteorShower' && gameState.meteorShower?.protectedPlayer === 1;
    const p2HasUmbrella = gameState.status === 'meteorShower' && gameState.meteorShower?.protectedPlayer === 2;

    drawMonkey(gameState.player1Pos, '#FFB84D', p1Throwing, true, p1Winner, p1Dead, p1Active, p1HasUmbrella, gameState.p1GroundTurns, gameState.p1Struggling);
    drawMonkey(gameState.player2Pos, '#FFB84D', p2Throwing, false, p2Winner, p2Dead, p2Active, p2HasUmbrella, gameState.p2GroundTurns, gameState.p2Struggling);

    // Draw Banana
    if (gameState.banana) {
      const drawProjectile = (x: number, y: number, angle: number, type: ProjectileType) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        
        if (type === 'giant') {
          // Draw Golden Sun for 10x
          const time = Date.now() / 100;
          const pulse = Math.sin(time) * 5;
          
          ctx.fillStyle = '#FFD700';
          ctx.shadowBlur = 25 + pulse;
          ctx.shadowColor = '#FFD700';
          
          // Outer glow circle
          ctx.beginPath();
          ctx.arc(0, 0, 18 + pulse / 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 215, 0, 0.15)';
          ctx.fill();
          
          // Core
          ctx.beginPath();
          ctx.arc(0, 0, 14, 0, Math.PI * 2);
          ctx.fillStyle = '#FFD700';
          ctx.fill();
          
          // Rays with flickering length
          ctx.strokeStyle = '#FFD700';
          ctx.lineWidth = 3;
          for (let i = 0; i < 12; i++) {
            const a = (i * Math.PI) / 6 + time * 0.5;
            const rayLen = 20 + Math.random() * 15 + pulse;
            ctx.beginPath();
            ctx.moveTo(Math.cos(a) * 16, Math.sin(a) * 16);
            ctx.lineTo(Math.cos(a) * rayLen, Math.sin(a) * rayLen);
            ctx.stroke();
          }
          
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#000000';
          ctx.font = 'bold 10px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('10X', 0, 4);
        } else if (type === 'acid') {
          // Draw Acid Bottle
          const time = Date.now() / 100;
          const shake = Math.sin(time * 10) * 1;
          
          ctx.translate(shake, 0);
          
          // Bottle body
          ctx.fillStyle = '#00FF00';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#00FF00';
          ctx.beginPath();
          ctx.roundRect(-5, -7, 10, 14, 2);
          ctx.fill();
          
          // Liquid inside (darker green)
          ctx.fillStyle = '#008800';
          const liquidLevel = Math.sin(time * 2) * 2 + 2;
          ctx.fillRect(-5, liquidLevel - 7, 10, 14 - liquidLevel);
          
          // Label
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(-4, -2, 8, 5);
          ctx.fillStyle = '#000000';
          ctx.font = 'bold 4px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('☠', 0, 2);
          
          // Bottle neck
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(-3, -10, 6, 3);
          
          // Acid Bubbles/Drips
          ctx.fillStyle = '#00FF00';
          for (let i = 0; i < 3; i++) {
            const bx = Math.sin(time + i) * 8;
            const by = 10 + (time * 10 + i * 10) % 20;
            ctx.beginPath();
            ctx.arc(bx, by, 2, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.shadowBlur = 0;
        } else {
          // Normal Banana
          ctx.beginPath();
          ctx.strokeStyle = '#FFFF55';
          ctx.lineWidth = 3;
          ctx.lineCap = 'round';
          ctx.arc(0, 0, 6, 0.1 * Math.PI, 0.9 * Math.PI);
          ctx.stroke();
          
          // Stem
          ctx.fillStyle = '#8B4513';
          ctx.save();
          ctx.rotate(0.1 * Math.PI);
          ctx.fillRect(5, -1, 3, 2);
          ctx.restore();
        }
        
        ctx.restore();
      };

      // Draw spinning projectiles (2 for normal/giant/acid)
      const offset = gameState.banana.type === 'giant' ? 15 : 6;
      drawProjectile(
        gameState.banana.pos.x + Math.cos(gameState.banana.angle) * offset,
        gameState.banana.pos.y + Math.sin(gameState.banana.angle) * offset,
        gameState.banana.angle * 2,
        gameState.banana.type
      );
      drawProjectile(
        gameState.banana.pos.x - Math.cos(gameState.banana.angle) * offset,
        gameState.banana.pos.y - Math.sin(gameState.banana.angle) * offset,
        gameState.banana.angle * 2 + Math.PI,
        gameState.banana.type
      );

      // Trail
      ctx.strokeStyle = gameState.banana.type === 'acid' ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      gameState.banana.trail.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
    }

    // Draw Explosion
    if (gameState.explosion) {
      if (gameState.explosion.type === 'acid') {
        // Corrosion/Melting effect: Greenish bubbles
        ctx.fillStyle = '#00FF00';
        ctx.beginPath();
        ctx.arc(gameState.explosion.pos.x, gameState.explosion.pos.y, gameState.explosion.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Bubbles inside
        ctx.fillStyle = '#CCFF00';
        const bubbleCount = 8;
        for (let i = 0; i < bubbleCount; i++) {
          const angle = (i / bubbleCount) * Math.PI * 2 + (gameState.explosion.radius * 0.1);
          const dist = (gameState.explosion.radius * 0.5) * (1 + Math.sin(gameState.explosion.radius * 0.2 + i));
          const bx = gameState.explosion.pos.x + Math.cos(angle) * dist;
          const by = gameState.explosion.pos.y + Math.sin(angle) * dist;
          const br = (gameState.explosion.radius * 0.2) * (0.5 + Math.abs(Math.cos(gameState.explosion.radius * 0.1 + i)));
          ctx.beginPath();
          ctx.arc(bx, by, br, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        ctx.fillStyle = '#FF5555';
        ctx.beginPath();
        ctx.arc(gameState.explosion.pos.x, gameState.explosion.pos.y, gameState.explosion.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#FFFF55';
        ctx.beginPath();
        ctx.arc(gameState.explosion.pos.x, gameState.explosion.pos.y, gameState.explosion.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (gameState.shake > 0) {
      ctx.restore();
    }

    // ────────────────────────────────────────────────
    // Wind Visualization Layer 2: 頂部旗幟（風向風強）
    // wind 範圍 -0.1 ~ +0.1：旗幟長度 |wind|×500，左右翻轉
    // 飄動頻率 = 3 + |wind|×80（風大抖更快）
    // ────────────────────────────────────────────────
    const flagPoleX = 30;
    const flagPoleY = 18;
    const flagPoleH = 50;
    ctx.fillStyle = '#888';
    ctx.fillRect(flagPoleX, flagPoleY, 3, flagPoleH);
    // Pole top knob
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(flagPoleX - 1, flagPoleY - 3, 5, 4);

    if (Math.abs(windVal) > 0.001) {
      const flagDir = windVal >= 0 ? 1 : -1;
      const flagW = Math.min(Math.abs(windVal) * 350, 50);
      const flagH = 14;
      const flutter = Math.sin(time * (3 + Math.abs(windVal) * 80)) * 3;
      ctx.fillStyle = windVal > 0 ? '#FF4444' : '#44AAFF';
      ctx.beginPath();
      ctx.moveTo(flagPoleX + 3, flagPoleY + 2);
      ctx.lineTo(flagPoleX + 3 + flagDir * flagW, flagPoleY + 2 + flutter);
      ctx.lineTo(flagPoleX + 3 + flagDir * flagW, flagPoleY + 2 + flagH + flutter);
      ctx.lineTo(flagPoleX + 3, flagPoleY + 2 + flagH);
      ctx.closePath();
      ctx.fill();
    }

    // ────────────────────────────────────────────────
    // Wind Visualization Layer 3: 底部 HUD 強化版
    // 條狀指示 + 兩端方向箭頭 + 數字
    // ────────────────────────────────────────────────
    const windX = CANVAS_WIDTH / 2;
    const windY = CANVAS_HEIGHT - 30;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(windX - 50, windY);
    ctx.lineTo(windX + 50, windY);
    ctx.stroke();
    // Center tick
    ctx.beginPath();
    ctx.moveTo(windX, windY - 6);
    ctx.lineTo(windX, windY + 6);
    ctx.stroke();

    // Power bar
    ctx.fillStyle = windVal > 0 ? '#FF5555' : '#5555FF';
    const windPower = windVal * 500;
    ctx.fillRect(windX, windY - 5, windPower, 10);

    // 端點箭頭：當風力夠強才出現（| > 0.02），方向與風一致
    if (Math.abs(windVal) > 0.02) {
      const arrowDir = windVal > 0 ? 1 : -1;
      const arrowX = windX + arrowDir * 55;
      ctx.fillStyle = windVal > 0 ? '#FF8888' : '#88AAFF';
      ctx.beginPath();
      ctx.moveTo(arrowX, windY);
      ctx.lineTo(arrowX - arrowDir * 8, windY - 6);
      ctx.lineTo(arrowX - arrowDir * 8, windY + 6);
      ctx.closePath();
      ctx.fill();
    }

  }, [gameState]);

  // 滑鼠 / 觸控 handlers 已搬到 useInput hook
  const {
    handleCanvasMouseDown,
    handleCanvasMouseMove,
    handleCanvasMouseUp,
    handleCanvasTouchStart,
    handleCanvasTouchMove,
    handleCanvasTouchEnd,
  } = useInput({canvasRef, setGameState, setMessage});

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-0 md:p-4 bg-[#0000AA]">
      <PortraitHint />
      <div
        ref={gameContainerRef}
        className={`game-container relative bg-black md:border-4 border-[#AAAAAA] shadow-2xl overflow-hidden ${isFullscreen || isPseudoFullscreen ? 'pseudo-fullscreen' : ''}`}
      >
        <div className="game-content relative w-full h-full flex flex-col items-center justify-center">
          {/* Header / Scores & Controls */}
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-20 pointer-events-none">
          {/* Player 1 Side */}
          <div className="flex items-start gap-2">
            <div className="bg-black/80 p-2 border-2 border-white pointer-events-auto flex flex-col items-center">
              <div className="text-[10px] uppercase opacity-70 leading-none mb-1">{gameState?.playerNames[0] || '玩家 1'}</div>
              <div className="text-xl font-bold text-yellow-400 leading-none mb-2">{gameState?.scores[0]}</div>
              {gameState?.status === 'aiming' && gameState.currentPlayer === 1 && (
                <div className={`text-2xl font-black mb-2 animate-pulse ${gameState.turnTimeLeft <= 3 ? 'text-red-500' : 'text-white'}`}>
                  {gameState.turnTimeLeft}
                </div>
              )}
              {gameState && (
                <div className={`text-[10px] px-1 font-bold ${gameState.player1Projectile !== 'normal' ? 'bg-yellow-400 text-black animate-pulse' : 'bg-white/20 text-white'}`}>
                  {gameState.player1Projectile === 'giant' ? '十倍大香蕉' : gameState.player1Projectile === 'acid' ? '硫酸瓶' : gameState.player1Projectile === 'beam' ? '導引光束' : gameState.player1Projectile === 'meteor' ? '火熱隕石' : '香蕉'}
                </div>
              )}
              {gameState && (
                <div className="mt-1 text-[10px] bg-blue-600/40 text-white px-1 font-bold border-t border-white/20 pt-1">
                  本回合得分: {gameState.currentRoundPoints[0]}
                </div>
              )}
            </div>
          </div>

          {/* Player 2 Side */}
          <div className="flex items-start gap-2">
            <div className="bg-black/80 p-2 border-2 border-white text-right pointer-events-auto flex flex-col items-center">
              <div className="text-[10px] uppercase opacity-70 leading-none mb-1">{gameState?.playerNames[1] || '玩家 2'}</div>
              <div className="text-xl font-bold text-yellow-400 leading-none mb-2">{gameState?.scores[1]}</div>
              {gameState?.status === 'aiming' && gameState.currentPlayer === 2 && (
                <div className={`text-2xl font-black mb-2 animate-pulse ${gameState.turnTimeLeft <= 3 ? 'text-red-500' : 'text-white'}`}>
                  {gameState.turnTimeLeft}
                </div>
              )}
              {gameState && (
                <div className={`text-[10px] px-1 font-bold inline-block ${gameState.player2Projectile !== 'normal' ? 'bg-yellow-400 text-black animate-pulse' : 'bg-white/20 text-white'}`}>
                  {gameState.player2Projectile === 'giant' ? '十倍大香蕉' : gameState.player2Projectile === 'acid' ? '硫酸瓶' : gameState.player2Projectile === 'beam' ? '導引光束' : gameState.player2Projectile === 'meteor' ? '火熱隕石' : '香蕉'}
                </div>
              )}
              {gameState && (
                <div className="mt-1 text-[10px] bg-blue-600/40 text-white px-1 font-bold border-t border-white/20 pt-1">
                  本回合得分: {gameState.currentRoundPoints[1]}
                </div>
              )}
            </div>
            {/* Fullscreen toggle during game */}
            <button 
              onClick={toggleFullscreen}
              className="bg-black/80 p-2 border-2 border-white text-white pointer-events-auto hover:bg-white/20 transition-colors flex items-center justify-center"
              title={isFullscreen ? '退出全螢幕' : '全螢幕'}
            >
              {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            </button>
          </div>
        </div>

          {/* Game Canvas */}
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onTouchStart={handleCanvasTouchStart}
            onTouchMove={handleCanvasTouchMove}
            onTouchEnd={handleCanvasTouchEnd}
            className="max-w-full h-auto touch-none"
          />

          {/* Wind Indicator at Bottom Center */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
            <div className="bg-black/80 px-4 py-1 border-2 border-white rounded-full flex items-center gap-2 text-xs font-bold">
              <Wind size={14} className="text-blue-400" />
              風向: {Math.abs((gameState?.wind || 0) * 1000).toFixed(0)} { (gameState?.wind || 0) > 0 ? '→' : '←' }
            </div>
          </div>

          <AnimatePresence>
          {showStartScreen && (
            <StartScreen
              p1NameInput={p1NameInput}
              p2NameInput={p2NameInput}
              gravityInput={gravityInput}
              isMuted={isMuted}
              isFullscreen={isFullscreen}
              onP1NameChange={setP1NameInput}
              onP2NameChange={setP2NameInput}
              onGravityChange={setGravityInput}
              onStartGame={handleStartGame}
              onToggleMute={toggleMute}
              onToggleFullscreen={toggleFullscreen}
            />
          )}

          {/* 已移除旋轉裝置限制，直立與橫向皆可遊玩 */}

          {gameState?.status === 'roundOver' && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-30"
            >
              <div className="bg-[#0000AA] p-10 border-8 border-white text-center shadow-2xl">
                <Trophy size={64} className="text-yellow-400 mx-auto mb-4" />
                <h2 className="text-4xl font-bold mb-2">轟隆！</h2>
                <p className="text-xl mb-2">
                  {gameState.winner === 1 ? gameState.playerNames[0] : gameState.playerNames[1]} 贏得本回合！
                </p>
                {gameState.winner !== gameState.currentPlayer && (
                  <p className="text-sm text-red-400 mb-6 italic">哎呀！打到自己了！</p>
                )}
                <div className="mb-8">
                  <div className="text-sm opacity-70 uppercase mb-2">本回合得分</div>
                  <div className="flex justify-center gap-8 mb-4">
                    <div className="text-center">
                      <div className="text-[10px] opacity-70">{gameState.playerNames[0]}</div>
                      <div className="text-2xl font-bold text-white">{gameState.currentRoundPoints[0]}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] opacity-70">{gameState.playerNames[1]}</div>
                      <div className="text-2xl font-bold text-white">{gameState.currentRoundPoints[1]}</div>
                    </div>
                  </div>
                  <div className="text-sm opacity-70 uppercase mb-2">目前總比分</div>
                  <div className="text-3xl font-bold text-yellow-400">
                    {gameState.scores[0]} : {gameState.scores[1]}
                  </div>
                </div>
                <button
                  onClick={() => initGame()}
                  className="retro-button flex items-center gap-2 mx-auto"
                >
                  <Play size={20} />
                  下一回合
                </button>
              </div>
            </motion.div>
          )}

          {gameState?.status === 'tournamentOver' && (
            <WinnerScreen
              gameState={gameState}
              leaderboard={leaderboard}
              onResetToStart={handleResetToStart}
              showScoreEntry={showScoreEntry}
              pendingScore={pendingScore}
              gradeInput={gradeInput}
              classInput={classInput}
              numberInput={numberInput}
              isSubmitting={isSubmitting}
              submissionError={submissionError}
              onGradeChange={setGradeInput}
              onClassChange={setClassInput}
              onNumberChange={setNumberInput}
              onSubmit={submitHighScore}
              onCancel={resetScoreSubmission}
            />
          )}
        </AnimatePresence>
      </div>
    </div>

      <div className="mt-8 text-center max-w-lg">
        <p className="text-sm opacity-60 leading-relaxed">
          啟發自 1991 年 QBASIC 經典遊戲。調整角度與力量來擊中對手的猩猩。 
          注意風向與重力的影響！
        </p>
      </div>
    </div>
  );
}
