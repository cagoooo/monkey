/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 遊戲常數中央集中區。
 *
 * 規範：所有「不會在 runtime 變動的數值」都應放在這裡，避免散落在 App.tsx
 * 與各 hook 中變成魔術數字。修改本檔等同於調整遊戲平衡。
 */

// ─── Canvas / 畫面 ─────────────────────────────────────────────
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

// ─── 物理參數 ──────────────────────────────────────────────────
export const GRAVITY = 0.25;
/** 空氣阻力倍率（每幀套用）— 1.0 = 無阻力 */
export const AIR_RESISTANCE = 1.0;

// ─── 角色 / 投射物尺寸 ─────────────────────────────────────────
export const MONKEY_SIZE = 24;

// ─── 回合 / 賽制 ───────────────────────────────────────────────
/** 每回合瞄準階段倒數秒數 */
export const TURN_TIME_SECONDS = 10;
/** 比賽勝利所需的勝場數（先達到者贏） */
export const MATCH_WIN_SCORE = 2;
/** 太陽被擊中幾次後爆炸 */
export const SUN_MAX_HITS = 5;
/** 命中對手的單發加分 */
export const HIT_SCORE = 100;

// ─── 排行榜 ────────────────────────────────────────────────────
/** 顯示與允許上傳的最高分上限（與 firestore.rules 同步）*/
export const LEADERBOARD_SCORE_MAX = 9999;
export const LEADERBOARD_TOP_N = 5;

// ─── 視覺色彩 ──────────────────────────────────────────────────
/** 玩家代表色：[中性, 玩家 1, 玩家 2] */
export const PLAYER_COLORS = ['#AAAAAA', '#00AAAA', '#AA0000'] as const;

// ─── 預設玩家資料（給排行榜佔位用）───────────────────────────
export const DEFAULT_LEADERBOARD_NAMES = [
  '王小明',
  '林大華',
  '陳美麗',
  '張志強',
  '李雅婷',
] as const;
