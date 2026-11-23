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

/** 每個子步最大位移（px），須明顯小於猴子命中半徑，避免高速穿透 */
export const SWEEP_MAX_STEP = 8;

/**
 * 把 from → to 的位移切成多個等距子步，回傳每一步的落點（最後一點必為 to）。
 * 用於高速物體的連續碰撞檢測；軌跡本身（位置、速度）不受影響。
 */
export function sweepPoints(from: Point, to: Point, maxStep: number = SWEEP_MAX_STEP): Point[] {
  const dist = distance(from, to);
  const n = Math.max(1, Math.ceil(dist / maxStep));
  const pts: Point[] = [];
  for (let i = 1; i <= n; i++) {
    const t = i / n;
    pts.push({x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t});
  }
  return pts;
}

/**
 * 沿 from → to 逐子步呼叫 test，回傳第一個命中的子步位置與 test 的結果；都沒命中回傳 null。
 */
export function firstSweepHit<T>(
  from: Point,
  to: Point,
  test: (p: Point) => T | null | undefined | false,
  maxStep: number = SWEEP_MAX_STEP
): {pos: Point; hit: T} | null {
  for (const p of sweepPoints(from, to, maxStep)) {
    const hit = test(p);
    if (hit) return {pos: p, hit};
  }
  return null;
}
