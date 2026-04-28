/**
 * 物理運算純函式：力的套用、發射計算、軌跡。
 *
 * 設計原則：所有函式皆為 pure，回傳新 Point 而不修改傳入物件。
 * 適合搬到 Web Worker（B3）後仍能無縫使用。
 */

import {Point} from '../types';

/**
 * 對速度套用「重力 + 風 + 空氣阻力」並回傳新速度。
 *
 * @param vel 當前速度
 * @param gravity 每幀垂直加速度（向下為正）
 * @param wind 每幀水平加速度（向右為正）
 * @param airResistance 阻力係數，1.0 = 無阻力（預設）
 */
export function applyForces(
  vel: Point,
  gravity: number,
  wind: number,
  airResistance: number = 1.0
): Point {
  return {
    x: (vel.x + wind) * airResistance,
    y: (vel.y + gravity) * airResistance,
  };
}

/**
 * 對位置套用速度，回傳新位置。
 */
export function step(pos: Point, vel: Point): Point {
  return {
    x: pos.x + vel.x,
    y: pos.y + vel.y,
  };
}

/**
 * 從拖曳起點與當前點計算發射力道（純量）。
 *
 * 拖得越遠 → 力道越大，但有上限。
 */
export function calcDragPower(
  start: Point,
  current: Point,
  scale: number = 2.55,
  maxPower: number = 255
): number {
  const dx = current.x - start.x;
  const dy = current.y - start.y;
  return Math.min(Math.sqrt(dx * dx + dy * dy) * scale, maxPower);
}

/**
 * 從拖曳起點與當前點計算發射角度（弧度）。
 *
 * @param mirrorX 是否水平鏡像（玩家 2 會 mirror）
 */
export function calcDragAngle(
  start: Point,
  current: Point,
  mirrorX: boolean = false
): number {
  const dx = current.x - start.x;
  const dy = current.y - start.y;
  return Math.atan2(dy, mirrorX ? dx : -dx);
}
