/**
 * 回合切換邏輯：算出下一回合該誰、地面停留次數、寶箱掉落、爆炸懲罰。
 *
 * 規則：
 * - 如果某玩家在地面（building 倒光）連續 5 回合 → 直接觸發大爆炸，對方贏
 * - 否則切到下個玩家瞄準階段
 * - 切回合時隨機產生新寶箱（meteor / giant / acid / beam，比例隨 roundCount 變動）
 *
 * 純邏輯函式，但會呼叫 soundService（發爆炸音效）。
 */

import {GameState, Treasure} from '../types';
import {CANVAS_WIDTH, CANVAS_HEIGHT} from '../constants';
import {getGroundY} from './terrain';
import {soundService} from '../../services/soundService';

const GROUND_TURN_LIMIT = 5;
const GROUND_THRESHOLD = CANVAS_HEIGHT - 10;
const TURN_TIME_DEFAULT = 10;

export function handleTurnTransition(
  prev: GameState,
  next: GameState
): GameState {
  const nextPlayer = prev.currentPlayer === 1 ? 2 : 1;

  const p1GroundY = getGroundY(next.player1Pos.x, next.buildings, next.destructions);
  const p2GroundY = getGroundY(next.player2Pos.x, next.buildings, next.destructions);

  const p1IsOnGround = p1GroundY >= GROUND_THRESHOLD;
  const p2IsOnGround = p2GroundY >= GROUND_THRESHOLD;

  let p1Turns = next.p1GroundTurns;
  let p2Turns = next.p2GroundTurns;

  // 累計地面停留回合（只在自己回合算）
  if (p1IsOnGround) {
    if (nextPlayer === 1) p1Turns++;
  } else {
    p1Turns = 0;
  }

  if (p2IsOnGround) {
    if (nextPlayer === 2) p2Turns++;
  } else {
    p2Turns = 0;
  }

  // 玩家 1 連續 5 回合在地面 → 爆炸（玩家 2 贏）
  if (p1Turns >= GROUND_TURN_LIMIT) {
    const newScores: [number, number] = [next.scores[0], next.scores[1]];
    newScores[1]++;
    soundService.playExplosion();
    return {
      ...next,
      status: 'exploding',
      winner: 2,
      scores: newScores,
      explosion: {pos: next.player1Pos, radius: 0, maxRadius: 300, type: 'giant'},
      shake: 50,
      p1GroundTurns: 0,
      p2GroundTurns: 0,
      banana: undefined,
    };
  }

  // 玩家 2 連續 5 回合在地面 → 爆炸（玩家 1 贏）
  if (p2Turns >= GROUND_TURN_LIMIT) {
    const newScores: [number, number] = [next.scores[0], next.scores[1]];
    newScores[0]++;
    soundService.playExplosion();
    return {
      ...next,
      status: 'exploding',
      winner: 1,
      scores: newScores,
      explosion: {pos: next.player2Pos, radius: 0, maxRadius: 300, type: 'giant'},
      shake: 50,
      p1GroundTurns: 0,
      p2GroundTurns: 0,
      banana: undefined,
    };
  }

  // 隨機生成下一回合寶箱
  const newTreasures: Treasure[] = [];
  let treasureType: 'giant' | 'acid' | 'beam' | 'meteor';
  const rand = Math.random();
  if (next.roundCount >= 9) {
    if (rand < 0.07) treasureType = 'meteor';
    else if (rand < 0.38) treasureType = 'giant';
    else if (rand < 0.69) treasureType = 'acid';
    else treasureType = 'beam';
  } else {
    if (rand < 0.07) treasureType = 'meteor';
    else if (rand < 0.535) treasureType = 'giant';
    else treasureType = 'acid';
  }
  newTreasures.push({
    id: Date.now(),
    pos: {
      x: 100 + Math.random() * (CANVAS_WIDTH - 200),
      y: 50 + Math.random() * 250,
    },
    type: treasureType,
    active: true,
  });

  return {
    ...next,
    status: 'aiming',
    currentPlayer: nextPlayer,
    p1GroundTurns: p1Turns,
    p2GroundTurns: p2Turns,
    p1Struggling: p1Turns >= GROUND_TURN_LIMIT - 1,
    p2Struggling: p2Turns >= GROUND_TURN_LIMIT - 1,
    turnTimeLeft: TURN_TIME_DEFAULT,
    treasures: newTreasures,
    banana: undefined,
    explosion: undefined,
  };
}
