/**
 * 主題註冊表（C4 多地圖系統第一波）。
 *
 * 設計原則：
 * - 主題只改「視覺 + 物理參數」，不動 game logic 本體
 * - 加新主題只要在 THEMES 加一筆 + 給個 emoji 即可
 * - StartScreen 自動列出所有 THEMES
 *
 * 第一波 3 個主題（v3.14.0）：
 *   🏙 city  — 預設經典城市天際線，與 v3.13.x 完全相容
 *   🚀 space — 低重力 + 深紫黑天空 + 星星
 *   🌊 ocean — 高阻力 + 深藍漸層 + 飄浮感（香蕉飛得慢）
 *
 * 後續可擴充（v3.14.x+）：
 *   🏫 校園 / 🎄 聖誕 / 🌃 城市夜景 / 🔥 火山
 */

export type ThemeId = 'city' | 'space' | 'ocean';

export interface BackgroundLayer {
  /** 圖層類型：純色 / 漸層 / 星星粒子 / 氣泡粒子 */
  kind: 'solid' | 'gradient' | 'stars' | 'bubbles';
  /** 純色或漸層用 */
  colors?: string[];
}

export interface Theme {
  id: ThemeId;
  label: string;
  emoji: string;
  description: string;

  /** 背景圖層（從後往前繪）*/
  background: BackgroundLayer[];

  physics: {
    /**
     * 預設重力（base scale 0.25 = 地球 9.8）。
     * 玩家在 StartScreen 仍可微調，但這個值會作為主題建議。
     */
    gravity: number;
    /** 每幀速度衰減倍率（1.0 = 無阻力，<1 = 有阻力）*/
    airResistance: number;
    /** 風力範圍 [min, max]，城市為 ±0.1 */
    windRange: [number, number];
  };

  /** 建築色盤（純城市才用，太空 / 海底沒建築）*/
  buildings: {
    palette: string[];
    /** 是否生成建築（太空 / 海底可能改成漂浮平台）*/
    enabled: boolean;
  };
}

export const THEMES: Record<ThemeId, Theme> = {
  city: {
    id: 'city',
    label: '城市天際線',
    emoji: '🏙',
    description: '經典模式：1991 年 GORILLAS.BAS 致敬',
    background: [
      {kind: 'solid', colors: ['#0000AA']},
    ],
    physics: {
      gravity: 0.25,
      airResistance: 1.0,
      windRange: [-0.1, 0.1],
    },
    buildings: {
      palette: ['#AAAAAA', '#00AAAA', '#AA0000'],
      enabled: true,
    },
  },

  space: {
    id: 'space',
    label: '外太空',
    emoji: '🚀',
    description: '低重力 + 漫天星辰，香蕉飛超遠',
    background: [
      {kind: 'gradient', colors: ['#0a0a2e', '#000000']},
      {kind: 'stars'}, // 由 canvas 繪圖層產生
    ],
    physics: {
      gravity: 0.10, // 約地球 40%
      airResistance: 1.0,
      windRange: [-0.05, 0.05], // 太空真空，風力小一點
    },
    buildings: {
      // 太空站灰紫色調
      palette: ['#5a4a8a', '#7a6aaa', '#9a8aca'],
      enabled: true,
    },
  },

  ocean: {
    id: 'ocean',
    label: '深海戰場',
    emoji: '🌊',
    description: '高阻力 + 氣泡背景，香蕉漂浮飛',
    background: [
      {kind: 'gradient', colors: ['#003366', '#001a33']},
      {kind: 'bubbles'},
    ],
    physics: {
      gravity: 0.18,           // 比城市稍小（浮力效果）
      airResistance: 0.985,    // 每幀衰減 1.5%
      windRange: [-0.08, 0.08],
    },
    buildings: {
      // 海底珊瑚 / 沉船配色
      palette: ['#4a7a8a', '#6a4a4a', '#8a6a4a'],
      enabled: true,
    },
  },
};

/** 安全的查表 helper，傳入 unknown id 時回退到 city */
export function getTheme(id: ThemeId | string | undefined): Theme {
  if (!id) return THEMES.city;
  return (THEMES as Record<string, Theme>)[id] ?? THEMES.city;
}

/** UI 列表用：所有可選主題（依 ThemeId 順序）*/
export const THEME_LIST: readonly Theme[] = ['city', 'space', 'ocean'].map(
  id => THEMES[id as ThemeId]
);
