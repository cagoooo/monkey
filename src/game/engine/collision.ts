/**
 * 碰撞 / 距離相關純函式。
 *
 * 在 game loop 熱迴圈中盡量用 `distSq` 比較（省一個 Math.sqrt），
 * 只有真的需要實際距離數字時才用 `distance`。
 */

import {Point} from '../types';

/**
 * 兩點直線距離（會做 sqrt）。
 */
export function distance(a: Point, b: Point): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * 兩點距離平方（不做 sqrt，比較用）。
 *
 * 範例：要判斷「距離 < radius」改用 `distSq(a, b) < radius * radius`，
 * 比 `distance(a, b) < radius` 快約 30%。
 */
export function distSq(a: Point, b: Point): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

/**
 * 判斷 point 是否在 center 為圓心、radius 為半徑的圓內。
 */
export function isWithin(point: Point, center: Point, radius: number): boolean {
  return distSq(point, center) < radius * radius;
}

/**
 * 角度與向量轉換 helper（之後 physics 會用到）。
 */
export function vecFromAngle(angleRad: number, magnitude: number): Point {
  return {
    x: Math.cos(angleRad) * magnitude,
    y: Math.sin(angleRad) * magnitude,
  };
}
