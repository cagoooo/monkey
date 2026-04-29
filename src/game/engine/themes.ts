/**
 * 主題註冊表（C4 多地圖系統，第二波擴充）。
 *
 * 設計原則：
 * - 主題只改「視覺 + 物理參數」，不動 game logic 本體
 * - 加新主題只要在 THEMES 加一筆 + 給個 emoji 即可
 * - StartScreen 自動列出所有 THEMES
 *
 * 6 個主題：
 *   🏙 city    — 預設經典城市天際線
 *   🚀 space   — 低重力 + 深紫黑天空 + 星星
 *   🌊 ocean   — 高阻力 + 深藍漸層 + 飄浮感
 *   🏫 school  — 黑板綠 + 教學樓配色（v3.15.0 新增）
 *   🎄 festive — 紅金漸層 + 飄雪（v3.15.0 新增）
 *   🌋 volcano — 火紅漸層 + 飛揚火星（v3.15.0 新增）
 */

export type ThemeId = 'city' | 'space' | 'ocean' | 'school' | 'festive' | 'volcano';

export interface BackgroundLayer {
  /**
   * 圖層類型：
   * - solid     純色
   * - gradient  垂直漸層
   * - stars     太空星空（白點 + 閃爍）
   * - bubbles   海底氣泡（從下往上）
   * - snow      飄雪（從上往下）
   * - lavaSparks 火星（從下往上 + 紅橘色）
   */
  kind: 'solid' | 'gradient' | 'stars' | 'bubbles' | 'snow' | 'lavaSparks';
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

  /** 香蕉飛行拖尾顏色（v3.15.0 新增主題化）*/
  bananaTrail?: {
    /** 拖尾線條顏色（rgba 格式）*/
    color: string;
    /** 線寬 */
    width: number;
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
    bananaTrail: {
      color: 'rgba(255, 255, 255, 0.3)',
      width: 1.5,
    },
  },

  space: {
    id: 'space',
    label: '外太空',
    emoji: '🚀',
    description: '低重力 + 漫天星辰，香蕉飛超遠',
    background: [
      {kind: 'gradient', colors: ['#0a0a2e', '#000000']},
      {kind: 'stars'},
    ],
    physics: {
      gravity: 0.10,
      airResistance: 1.0,
      windRange: [-0.05, 0.05],
    },
    buildings: {
      palette: ['#5a4a8a', '#7a6aaa', '#9a8aca'],
      enabled: true,
    },
    bananaTrail: {
      color: 'rgba(180, 230, 255, 0.55)', // 太空藍光
      width: 2,
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
      gravity: 0.18,
      airResistance: 0.985,
      windRange: [-0.08, 0.08],
    },
    buildings: {
      palette: ['#4a7a8a', '#6a4a4a', '#8a6a4a'],
      enabled: true,
    },
    bananaTrail: {
      color: 'rgba(150, 220, 255, 0.5)', // 海底淺藍泡沫
      width: 2,
    },
  },

  school: {
    id: 'school',
    label: '校園決鬥',
    emoji: '🏫',
    description: '黑板綠背景 + 教學樓配色，課間爭霸',
    background: [
      {kind: 'gradient', colors: ['#2d4a2d', '#1a2e1a']},
    ],
    physics: {
      gravity: 0.25, // 標準
      airResistance: 1.0,
      windRange: [-0.08, 0.08],
    },
    buildings: {
      // 教學樓：紅磚 / 灰水泥 / 黃色涼亭
      palette: ['#8B4513', '#999999', '#DAA520', '#A0522D'],
      enabled: true,
    },
    bananaTrail: {
      color: 'rgba(255, 255, 255, 0.4)', // 粉筆白
      width: 1.5,
    },
  },

  festive: {
    id: 'festive',
    label: '節慶煙火',
    emoji: '🎄',
    description: '紅金漸層 + 飄雪，節慶氣氛',
    background: [
      {kind: 'gradient', colors: ['#3a0d0d', '#1a0505']},
      {kind: 'snow'},
    ],
    physics: {
      gravity: 0.22, // 略低（雪天感）
      airResistance: 1.0,
      windRange: [-0.12, 0.12], // 風更大（雪花飄）
    },
    buildings: {
      // 節慶配色：聖誕紅 / 金 / 雪白屋頂
      palette: ['#8B0000', '#B8860B', '#F5F5F5', '#228B22'],
      enabled: true,
    },
    bananaTrail: {
      color: 'rgba(255, 215, 0, 0.6)', // 金色閃光
      width: 2.5,
    },
  },

  volcano: {
    id: 'volcano',
    label: '火山熔岩',
    emoji: '🌋',
    description: '紅橘漸層 + 飄落火星，岩漿戰場',
    background: [
      {kind: 'gradient', colors: ['#5a1a0a', '#1a0505']},
      {kind: 'lavaSparks'},
    ],
    physics: {
      gravity: 0.30, // 較重（熱浪壓迫感）
      airResistance: 1.0,
      windRange: [-0.06, 0.06],
    },
    buildings: {
      // 火山岩 / 玄武岩 / 熔岩流
      palette: ['#3a2a2a', '#5a3a3a', '#8B4513', '#FF4500'],
      enabled: true,
    },
    bananaTrail: {
      color: 'rgba(255, 100, 0, 0.55)', // 火橘
      width: 2,
    },
  },
};

/** 安全的查表 helper，傳入 unknown id 時回退到 city */
export function getTheme(id: ThemeId | string | undefined): Theme {
  if (!id) return THEMES.city;
  return (THEMES as Record<string, Theme>)[id] ?? THEMES.city;
}

/** UI 列表用：所有可選主題（依 ThemeId 順序）*/
export const THEME_LIST: readonly Theme[] = [
  'city', 'space', 'ocean', 'school', 'festive', 'volcano',
].map(id => THEMES[id as ThemeId]);
