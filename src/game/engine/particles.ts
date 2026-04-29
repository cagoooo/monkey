/**
 * 爆炸粒子產生器（v3.15.1，C4 第三波）。
 *
 * 取代原本散落在 useGameLoop 的 inline 粒子生成邏輯。
 * 依 theme.explosionStyle 切換：
 *   - 沒設 → 預設行為（debris + smoke + spark）
 *   - radial → 360° 全方位煙火（festive）
 *   - fountain → 主要往上噴的熔岩（volcano）
 */

import {Point, Particle, ParticleType} from '../types';
import {Theme} from './themes';

export interface MakeParticlesOpts {
  /** 爆炸點位置 */
  pos: Point;
  /** 粒子基礎數量（會被 theme.explosionStyle.countMultiplier 乘）*/
  baseCount: number;
  /** 預設粒子顏色（theme 沒設 explosionStyle 時用）*/
  fallbackColor: string;
  /** 預設碎片顏色（建築爆炸用 b.color；猴子爆炸用 fallbackColor）*/
  debrisColor?: string;
  theme: Theme;
  /**
   * 忽略 theme.explosionStyle，強制使用 fallbackColor（道具優先級高時用）。
   * 例如 acid 強酸、giant 巨大化的視覺辨識度比主題重要。
   */
  ignoreThemeStyle?: boolean;
}

/** 從 palette 隨機抽一色 */
function pickColor(palette: string[]): string {
  return palette[Math.floor(Math.random() * palette.length)];
}

/**
 * 計算粒子初速：
 *   - radial：完全隨機 360°
 *   - fountain：往上偏（y < 0），左右散開
 */
function calcVelocity(pattern: 'radial' | 'fountain', spread: number): Point {
  if (pattern === 'fountain') {
    return {
      x: (Math.random() - 0.5) * spread,
      // 大部分向上（-spread*0.7 到 -spread*0.2），少數打橫
      y: -Math.random() * spread * 0.8 - 2,
    };
  }
  // radial
  return {
    x: (Math.random() - 0.5) * spread,
    y: (Math.random() - 0.5) * spread,
  };
}

export function makeExplosionParticles(opts: MakeParticlesOpts): Particle[] {
  const {pos, baseCount, fallbackColor, debrisColor, theme, ignoreThemeStyle} = opts;
  const style = ignoreThemeStyle ? undefined : theme.explosionStyle;

  // 主題化參數（沒設就 fallback 到預設）
  const count = Math.round(baseCount * (style?.countMultiplier ?? 1));
  const pattern: 'radial' | 'fountain' = style?.pattern ?? 'radial';
  const palette = style?.palette;

  return Array.from({length: count}).flatMap(() => {
    const baseColor = palette ? pickColor(palette) : fallbackColor;
    const base: Particle = {
      id: Math.random(),
      pos: {...pos},
      vel: calcVelocity(pattern, 20),
      life: 50 + Math.random() * 40,
      maxLife: 90,
      color: baseColor,
      size: 2 + Math.random() * 6,
      type: 'normal' as ParticleType,
    };

    const results: Particle[] = [base];

    // smoke（所有主題都有，讓爆炸有「重量感」）
    if (Math.random() > 0.6) {
      results.push({
        ...base,
        id: Math.random(),
        color: 'rgba(100, 100, 100, 0.5)',
        type: 'smoke' as ParticleType,
        size: 10 + Math.random() * 10,
        vel: {x: (Math.random() - 0.5) * 5, y: (Math.random() - 0.5) * 5 - 2},
      });
    }

    // spark — 預設或 sparkle:true 才生
    const wantSparkle = style ? style.sparkle : true;
    if (wantSparkle && Math.random() > 0.8) {
      results.push({
        ...base,
        id: Math.random(),
        color: palette ? pickColor(palette) : '#FFFF00',
        type: 'spark' as ParticleType,
        size: 1 + Math.random() * 2,
        vel: calcVelocity(pattern, 30),
      });
    }

    // debris（建築爆炸用，猴子爆炸沒傳就略過）
    if (debrisColor && Math.random() > 0.4) {
      results.push({
        ...base,
        id: Math.random(),
        color: debrisColor,
        type: 'debris' as ParticleType,
        size: 3 + Math.random() * 5,
        rotation: Math.random() * Math.PI * 2,
        rotationVel: (Math.random() - 0.5) * 0.5,
        vel: calcVelocity(pattern, 12),
      });
    }

    return results;
  });
}
