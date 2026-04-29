/**
 * Monkey 像素風 sprite 渲染器（v3.16.0，C5 完整版）。
 *
 * 取代原本內聯在 App.tsx 的 200 行 drawMonkey。
 * 改用「狀態機 + 命名動畫幀」架構，讓未來容易：
 *   1. 換成真實 PNG sprite sheet（Kenney CC0 等）
 *   2. 加新動作（受傷反應、嘲諷、瞄準等）
 *   3. 單元測試動畫狀態邏輯
 *
 * 換 PNG sprite 路徑（未來）：
 *   把 drawHead / drawArms 等子函式換成 ctx.drawImage(sheet, sx, sy, ...) 即可。
 *   詳見 docs/SPRITES-SETUP.md
 */

import {Point} from '../types';

// ─── 狀態機 ────────────────────────────────────────────────────

export type MonkeyPose =
  | 'idle'          // 站著沒事
  | 'aiming'        // 玩家當前回合（active 還會加金光）
  | 'throwing'      // 投擲中（arm-up phase）
  | 'celebrating'   // 贏了當回合
  | 'dead'          // 被擊中
  | 'struggling';   // 5 回合站地面快爆炸

export interface MonkeyDrawState {
  pose: MonkeyPose;
  isPlayer1: boolean;
  isActive: boolean;       // 當前回合（顯示金色箭頭）
  hasUmbrella: boolean;    // 流星雨保護
  groundTurns: number;     // 地面停留回合（>0 顯示倒數）
  throwStartTime?: number; // 投擲開始時間（ms），用於計算 arm-up phase
}

// ─── 配色 ─────────────────────────────────────────────────────

const FACE_COLOR = '#FFCC99';
const SHADOW = 'rgba(0,0,0,0.2)';
const HIGHLIGHT = 'rgba(255,255,255,0.2)';

// ─── Pixel scale ──────────────────────────────────────────────
const P = 2.5;

// ─── 主入口 ────────────────────────────────────────────────────

export function drawMonkey(
  ctx: CanvasRenderingContext2D,
  pos: Point,
  color: string,
  state: MonkeyDrawState,
): void {
  const {pose, isActive, isPlayer1, hasUmbrella, groundTurns} = state;
  const isDead = pose === 'dead';
  const isWinner = pose === 'celebrating';
  const isThrowing = pose === 'throwing';
  const isStruggling = pose === 'struggling';

  // 1. Active 玩家頭頂金色箭頭
  if (isActive && !isDead) {
    drawActiveArrow(ctx, pos);
  }

  // 2. Ground turn countdown（5 回合警告）
  if (groundTurns > 0 && !isDead && !isWinner) {
    drawGroundCountdown(ctx, pos, groundTurns);
  }

  // 3. 主體繪圖：套用 transform 後切換 pose
  ctx.save();
  const shake = isStruggling ? randShake(8) : {x: 0, y: 0};
  const idleBob = pose === 'idle' || pose === 'aiming'
    ? Math.sin(Date.now() / 600) * 0.8
    : 0;

  ctx.translate(pos.x + shake.x, pos.y + shake.y + idleBob);

  if (isDead) {
    ctx.rotate(isPlayer1 ? -Math.PI / 2 : Math.PI / 2);
    ctx.translate(0, 10);
  }

  drawBody(ctx, color);
  drawHead(ctx, color, isDead);
  drawArmsForPose(ctx, color, state);
  drawLegs(ctx, color);
  drawFinishingTouches(ctx);

  if (hasUmbrella) drawUmbrella(ctx);

  ctx.restore();
}

// ─── 子函式：Active arrow + countdown ─────────────────────────

function drawActiveArrow(ctx: CanvasRenderingContext2D, pos: Point) {
  ctx.save();
  const bounce = Math.sin(Date.now() / 150) * 5;
  ctx.fillStyle = '#FFD700';
  ctx.shadowBlur = 10;
  ctx.shadowColor = '#FFD700';
  ctx.beginPath();
  ctx.moveTo(pos.x - 6, pos.y - 45 + bounce);
  ctx.lineTo(pos.x + 6, pos.y - 45 + bounce);
  ctx.lineTo(pos.x, pos.y - 35 + bounce);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawGroundCountdown(ctx: CanvasRenderingContext2D, pos: Point, groundTurns: number) {
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

// ─── 子函式：Body / Head / Arms / Legs ────────────────────────

function drawHead(ctx: CanvasRenderingContext2D, fur: string, isDead: boolean) {
  // 1. Ears
  ctx.fillStyle = fur;
  ctx.fillRect(-3.5 * P, -9.5 * P, 1.5 * P, 2 * P);
  ctx.fillRect(2 * P, -9.5 * P, 1.5 * P, 2 * P);

  // 2. Head
  ctx.fillStyle = fur;
  ctx.fillRect(-2.5 * P, -10.5 * P, 5 * P, 4.5 * P);

  // 3. Face mask
  ctx.fillStyle = FACE_COLOR;
  ctx.fillRect(-1.5 * P, -8.5 * P, 3 * P, 2.5 * P);

  // 4. Eyes — 眨眼動畫（每 ~3s 閉一次 0.2s）
  ctx.fillStyle = '#000';
  const blinkCycle = (Date.now() / 1000) % 3;
  const isBlinking = !isDead && blinkCycle < 0.2;
  const eyeH = isBlinking ? 0.15 * P : 0.8 * P;
  const eyeY = isBlinking ? -7.0 * P : -7.5 * P;
  ctx.fillRect(-1 * P, eyeY, 0.8 * P, eyeH);
  ctx.fillRect(0.2 * P, eyeY, 0.8 * P, eyeH);
}

function drawBody(ctx: CanvasRenderingContext2D, fur: string) {
  ctx.fillStyle = fur;
  ctx.fillRect(-4 * P, -6 * P, 8 * P, 6 * P);
  ctx.fillStyle = FACE_COLOR;
  ctx.fillRect(-2.5 * P, -5 * P, 5 * P, 4 * P);
}

function drawLegs(ctx: CanvasRenderingContext2D, fur: string) {
  ctx.fillStyle = fur;
  ctx.fillRect(-3.5 * P, 0 * P, 2.5 * P, 4 * P);
  ctx.fillRect(1 * P, 0 * P, 2.5 * P, 4 * P);
  ctx.fillStyle = FACE_COLOR;
  ctx.fillRect(-4.5 * P, 4 * P, 3.5 * P, 1.5 * P);
  ctx.fillRect(1 * P, 4 * P, 3.5 * P, 1.5 * P);
}

function drawFinishingTouches(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = HIGHLIGHT;
  ctx.fillRect(-2 * P, -10 * P, 1 * P, 1 * P);
  ctx.fillRect(-3.5 * P, -5.5 * P, 1 * P, 1 * P);
  ctx.fillStyle = SHADOW;
  ctx.fillRect(-3.5 * P, -1 * P, 2.5 * P, 0.5 * P);
  ctx.fillRect(1 * P, -1 * P, 2.5 * P, 0.5 * P);
}

// ─── Arm pose 切換 ────────────────────────────────────────────

function drawArmsForPose(
  ctx: CanvasRenderingContext2D,
  fur: string,
  state: MonkeyDrawState,
) {
  ctx.fillStyle = fur;
  switch (state.pose) {
    case 'celebrating':
      drawCelebrateArms(ctx, fur);
      break;
    case 'throwing':
      drawThrowArms(ctx, fur, state.isPlayer1, state.throwStartTime);
      break;
    default:
      drawIdleArms(ctx, fur);
      break;
  }
}

function drawCelebrateArms(ctx: CanvasRenderingContext2D, fur: string) {
  const beat = Math.sin(Date.now() / 150) > 0;
  ctx.fillStyle = fur;
  if (beat) {
    // Arms up (Victory)
    ctx.fillRect(-6 * P, -11 * P, 2.5 * P, 6 * P);
    ctx.fillRect(3.5 * P, -11 * P, 2.5 * P, 6 * P);
    ctx.fillStyle = FACE_COLOR;
    ctx.fillRect(-6 * P, -12 * P, 2.5 * P, 1.5 * P);
    ctx.fillRect(3.5 * P, -12 * P, 2.5 * P, 1.5 * P);
  } else {
    // Arms down (alternate beat frame)
    ctx.fillRect(-7 * P, -7 * P, 3.5 * P, 3 * P);
    ctx.fillRect(3.5 * P, -7 * P, 3.5 * P, 3 * P);
    ctx.fillRect(-7 * P, -4 * P, 2 * P, 5 * P);
    ctx.fillRect(5 * P, -4 * P, 2 * P, 5 * P);
    ctx.fillStyle = FACE_COLOR;
    ctx.fillRect(-7 * P, 1 * P, 2 * P, 1.5 * P);
    ctx.fillRect(5 * P, 1 * P, 2 * P, 1.5 * P);
  }
}

/**
 * 投擲動畫：3 階段
 *   0-200ms: windup  — 手臂蓄力（向後）
 *   200-400ms: release — 手臂高舉
 *   400ms+: follow-through — 手臂垂下
 */
function drawThrowArms(
  ctx: CanvasRenderingContext2D,
  fur: string,
  isPlayer1: boolean,
  throwStartTime: number | undefined,
) {
  const elapsed = Date.now() - (throwStartTime || 0);
  const phase: 'windup' | 'release' | 'follow' =
    elapsed < 200 ? 'windup' :
    elapsed < 400 ? 'release' :
    'follow';

  ctx.fillStyle = fur;

  if (isPlayer1) {
    // Player 1（左手投擲）
    if (phase === 'windup') {
      // 手臂後拉（往身後 + 略下）
      ctx.fillRect(-7 * P, -5 * P, 2.5 * P, 5 * P);
      ctx.fillStyle = FACE_COLOR;
      ctx.fillRect(-7 * P, -0.5 * P, 2.5 * P, 1.5 * P);
      ctx.fillStyle = fur;
    } else if (phase === 'release') {
      // 手臂高舉（最大力道瞬間）
      ctx.fillRect(-6 * P, -12 * P, 2.5 * P, 7 * P);
      ctx.fillStyle = FACE_COLOR;
      ctx.fillRect(-6 * P, -13 * P, 2.5 * P, 1.5 * P);
      ctx.fillStyle = fur;
    } else {
      // 跟手 follow-through（垂下）
      ctx.fillRect(-7 * P, -7 * P, 3.5 * P, 4 * P);
    }
    // Right arm 不動（叉腰）
    ctx.fillRect(4 * P, -7 * P, 3 * P, 3 * P);
    ctx.fillRect(5 * P, -4 * P, 2 * P, 4 * P);
    ctx.fillStyle = FACE_COLOR;
    ctx.fillRect(3.5 * P, -1 * P, 2 * P, 1.5 * P);
  } else {
    // Player 2（右手投擲，鏡像）
    if (phase === 'windup') {
      ctx.fillRect(4.5 * P, -5 * P, 2.5 * P, 5 * P);
      ctx.fillStyle = FACE_COLOR;
      ctx.fillRect(4.5 * P, -0.5 * P, 2.5 * P, 1.5 * P);
      ctx.fillStyle = fur;
    } else if (phase === 'release') {
      ctx.fillRect(3.5 * P, -12 * P, 2.5 * P, 7 * P);
      ctx.fillStyle = FACE_COLOR;
      ctx.fillRect(3.5 * P, -13 * P, 2.5 * P, 1.5 * P);
      ctx.fillStyle = fur;
    } else {
      ctx.fillRect(3.5 * P, -7 * P, 3.5 * P, 4 * P);
    }
    // Left arm 不動（叉腰）
    ctx.fillRect(-7 * P, -7 * P, 3 * P, 3 * P);
    ctx.fillRect(-7 * P, -4 * P, 2 * P, 4 * P);
    ctx.fillStyle = FACE_COLOR;
    ctx.fillRect(-5.5 * P, -1 * P, 2 * P, 1.5 * P);
  }
}

function drawIdleArms(ctx: CanvasRenderingContext2D, fur: string) {
  ctx.fillStyle = fur;
  ctx.fillRect(-7 * P, -7 * P, 3.5 * P, 3 * P);
  ctx.fillRect(-7 * P, -4 * P, 2 * P, 4 * P);
  ctx.fillStyle = FACE_COLOR;
  ctx.fillRect(-5.5 * P, -1 * P, 2 * P, 1.5 * P);

  ctx.fillStyle = fur;
  ctx.fillRect(3.5 * P, -7 * P, 3.5 * P, 3 * P);
  ctx.fillRect(5 * P, -4 * P, 2 * P, 4 * P);
  ctx.fillStyle = FACE_COLOR;
  ctx.fillRect(3.5 * P, -1 * P, 2 * P, 1.5 * P);
}

// ─── Umbrella ─────────────────────────────────────────────────

function drawUmbrella(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.translate(0, -15 * P);

  ctx.strokeStyle = '#8B4513';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -25);
  ctx.stroke();

  ctx.fillStyle = '#FF4444';
  ctx.beginPath();
  ctx.arc(0, -25, 40, Math.PI, 0);
  ctx.fill();

  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 2;
  for (let i = 1; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(0, -25);
    const angle = Math.PI + (i * Math.PI) / 4;
    ctx.lineTo(Math.cos(angle) * 40, -25 + Math.sin(angle) * 40);
    ctx.stroke();
  }

  ctx.fillStyle = '#FFD700';
  ctx.beginPath();
  ctx.arc(0, -65, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// ─── Helpers ──────────────────────────────────────────────────

function randShake(magnitude: number): Point {
  return {
    x: (Math.random() - 0.5) * magnitude,
    y: (Math.random() - 0.5) * magnitude,
  };
}

// ─── 狀態推導 helper ──────────────────────────────────────────
// 給 App.tsx 用：把 GameState 各旗標（isWinner / isThrowing 等）
// 轉成統一的 MonkeyPose enum。

export function derivePose(args: {
  isThrowing: boolean;
  isWinner: boolean;
  isDead: boolean;
  isStruggling: boolean;
  isActive: boolean;
}): MonkeyPose {
  if (args.isDead) return 'dead';
  if (args.isWinner) return 'celebrating';
  if (args.isThrowing) return 'throwing';
  if (args.isStruggling) return 'struggling';
  if (args.isActive) return 'aiming';
  return 'idle';
}
