/**
 * 道具系統註冊表（registry pattern）。
 *
 * 取代 useGameLoop 內散落的 `type === 'giant' ? X : type === 'acid' ? Y : Z` 巢狀三元式。
 * 新增道具只要在 POWERUPS 加一筆即可，不需要改 game loop。
 *
 * 不在這裡的特殊行為：
 * - `meteor` 命中建築會切到 meteorShower 狀態（結構差太多無法泛化）
 * - `acid` 強酸的綠色粒子拖尾
 * - `giant` 金色閃爍粒子拖尾
 *   → 上述特殊邏輯仍寫在 useGameLoop 裡，但常數值改從這裡查
 */

import {ProjectileType} from '../types';

export interface PowerUpSpec {
  id: ProjectileType;
  /** 顯示名稱（給 UI / debug 用）*/
  label: string;

  // 命中猴子時的爆炸參數
  monkeyHit: {
    maxRadius: number;
    shake: number;
    particleCount: number;
    coreColor: string;
  };

  // 命中建築時的爆炸參數
  buildingHit: {
    /** 視覺爆炸半徑 */
    maxRadius: number;
    /** 實際挖洞半徑（破壞地形）*/
    destructionRadius: number;
    shake: number;
    particleCount: number;
  };

  /** 飛行時拖尾粒子（acid 綠 / giant 金，normal 無）*/
  trailParticle?: {
    color: string;
    /** 每幀生成機率（0-1），越高拖尾越濃 */
    probability: number;
    velocityScatter: number;
    sizeMin: number;
    sizeRange: number;
  };
}

/**
 * 註冊表本體。新增道具請在這裡加一筆 + 在 ProjectileType 加 union 成員。
 */
export const POWERUPS: Record<ProjectileType, PowerUpSpec> = {
  normal: {
    id: 'normal',
    label: '一般香蕉',
    monkeyHit: {
      maxRadius: 40,
      shake: 25,
      particleCount: 60,
      coreColor: '#FFCC99',
    },
    buildingHit: {
      maxRadius: 30,
      destructionRadius: 15,
      shake: 15,
      particleCount: 40,
    },
  },

  giant: {
    id: 'giant',
    label: '10X 巨大化',
    monkeyHit: {
      maxRadius: 350,
      shake: 60,
      particleCount: 150,
      coreColor: '#FFCC99',
    },
    buildingHit: {
      maxRadius: 300,
      destructionRadius: 150,
      shake: 45,
      particleCount: 120,
    },
    trailParticle: {
      color: '#FFD700',
      probability: 0.7, // > 0.3 條件下生成
      velocityScatter: 1,
      sizeMin: 1,
      sizeRange: 2,
    },
  },

  acid: {
    id: 'acid',
    label: 'ACID 強酸',
    monkeyHit: {
      maxRadius: 180,
      shake: 40,
      particleCount: 100,
      coreColor: '#00FF00',
    },
    buildingHit: {
      maxRadius: 150,
      destructionRadius: 80,
      shake: 45,
      particleCount: 100,
    },
    trailParticle: {
      color: '#00FF00',
      probability: 0.5, // > 0.5 條件下生成
      velocityScatter: 2,
      sizeMin: 2,
      sizeRange: 3,
    },
  },

  beam: {
    id: 'beam',
    label: '雷射光束',
    // 暫時 fallback 到 giant 規格，未來實作 beam 邏輯時改寫
    monkeyHit: {
      maxRadius: 350,
      shake: 60,
      particleCount: 150,
      coreColor: '#FFFFFF',
    },
    buildingHit: {
      maxRadius: 300,
      destructionRadius: 150,
      shake: 45,
      particleCount: 120,
    },
  },

  meteor: {
    id: 'meteor',
    label: '流星雨',
    // meteor 不直接爆炸，而是切到 meteorShower 狀態。這裡僅記參數做完整性。
    monkeyHit: {
      maxRadius: 0,
      shake: 0,
      particleCount: 0,
      coreColor: '#8B4513',
    },
    buildingHit: {
      maxRadius: 0,
      destructionRadius: 0,
      shake: 50, // 切到 meteorShower 時的螢幕震動
      particleCount: 0,
    },
  },
};

/** 安全的查表 helper，傳入 unknown type 時回退到 normal */
export function getPowerUp(type: ProjectileType | undefined): PowerUpSpec {
  if (!type) return POWERUPS.normal;
  return POWERUPS[type] ?? POWERUPS.normal;
}
