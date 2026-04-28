/**
 * 命中分數計算（純函式）。
 *
 * 規則：
 * - 命中位置距離自己太近（< 30px）= 0 分（防止自殺式打分）
 * - 否則：距離目標越近分數越高，最多 100 分
 * - shooter 與 target 距離本身極近時（< 1px，理論不可能但安全網）= 0 分
 */

import {Point} from '../types';

export function calculateScore(
  hitPos: Point,
  shooterPos: Point,
  targetPos: Point
): number {
  const distBetween = Math.sqrt(
    (shooterPos.x - targetPos.x) ** 2 + (shooterPos.y - targetPos.y) ** 2
  );
  if (distBetween < 1) return 0;

  const distToTarget = Math.sqrt(
    (hitPos.x - targetPos.x) ** 2 + (hitPos.y - targetPos.y) ** 2
  );
  const distToSelf = Math.sqrt(
    (hitPos.x - shooterPos.x) ** 2 + (hitPos.y - shooterPos.y) ** 2
  );
  if (distToSelf < 30) return 0;

  return Math.max(0, Math.floor(100 * (1 - distToTarget / distBetween)));
}
