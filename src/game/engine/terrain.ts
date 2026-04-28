/**
 * 地形相關純函式：建築物頂面查詢、窗戶生成、爆炸破壞檢查。
 *
 * 所有函式皆為 pure：給相同 input 必回相同 output，不修改傳入物件。
 */

import {Building, Destruction} from '../types';
import {CANVAS_HEIGHT} from '../constants';

/**
 * 猴子腳底相對於 sprite 中心點的 Y offset。
 * pos.y 是猴子身體中心，腳底在 pos.y + MONKEY_FOOT_OFFSET。
 */
export const MONKEY_FOOT_OFFSET = 8.75;

/**
 * 給定 x 座標，回傳猴子應該站立的 y 座標（已扣除腳底 offset）。
 *
 * - 若該 x 沒任何建築 → 回傳地平線（CANVAS_HEIGHT - foot offset）
 * - 若該 x 有建築 → 從建築頂面往下找第一個沒被爆炸破壞的點
 */
export function getGroundY(
  x: number,
  buildings: Building[],
  destructions: Destruction[]
): number {
  const building = buildings.find(b => x >= b.x && x <= b.x + b.width);
  if (!building) return CANVAS_HEIGHT - MONKEY_FOOT_OFFSET;

  for (let y = building.y; y < CANVAS_HEIGHT; y += 2) {
    if (!isPointDestroyed(x, y, destructions)) {
      return y - MONKEY_FOOT_OFFSET;
    }
  }
  return CANVAS_HEIGHT - MONKEY_FOOT_OFFSET;
}

/**
 * 檢查 (x, y) 是否落在任何爆炸坑洞範圍內。
 */
export function isPointDestroyed(
  x: number,
  y: number,
  destructions: Destruction[]
): boolean {
  return destructions.some(d => {
    const dx = x - d.pos.x;
    const dy = y - d.pos.y;
    return dx * dx + dy * dy < d.radius * d.radius;
  });
}

/**
 * 為建築生成窗戶開關矩陣。
 *
 * @param rows 樓層數
 * @param cols 每層窗戶數
 * @param lightProb 窗戶亮起機率（預設 0.7）
 */
export function generateWindowGrid(
  rows: number,
  cols: number,
  lightProb: number = 0.7
): boolean[][] {
  const grid: boolean[][] = [];
  for (let r = 0; r < rows; r++) {
    grid[r] = [];
    for (let c = 0; c < cols; c++) {
      grid[r][c] = Math.random() < lightProb;
    }
  }
  return grid;
}
