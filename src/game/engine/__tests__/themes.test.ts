import {describe, it, expect} from 'vitest';
import {THEMES, THEME_LIST, getTheme} from '../themes';

describe('THEMES registry', () => {
  it('包含 6 個主題（v3.15.0 擴充至 city/space/ocean/school/festive/volcano）', () => {
    expect(Object.keys(THEMES).sort()).toEqual([
      'city', 'festive', 'ocean', 'school', 'space', 'volcano',
    ]);
  });

  it('每個主題都有完整 schema', () => {
    Object.values(THEMES).forEach(theme => {
      expect(theme.id).toBeTruthy();
      expect(theme.label).toBeTruthy();
      expect(theme.emoji).toBeTruthy();
      expect(theme.background.length).toBeGreaterThan(0);
      expect(theme.physics.gravity).toBeGreaterThan(0);
      expect(theme.physics.airResistance).toBeGreaterThan(0);
      expect(theme.physics.airResistance).toBeLessThanOrEqual(1);
      expect(theme.physics.windRange).toHaveLength(2);
      expect(theme.physics.windRange[0]).toBeLessThan(theme.physics.windRange[1]);
      expect(theme.buildings.palette.length).toBeGreaterThan(0);
    });
  });

  it('id 與 key 一致', () => {
    Object.entries(THEMES).forEach(([key, theme]) => {
      expect(theme.id).toBe(key);
    });
  });

  it('city 是最標準的物理（gravity=0.25, airResistance=1.0）', () => {
    expect(THEMES.city.physics.gravity).toBe(0.25);
    expect(THEMES.city.physics.airResistance).toBe(1.0);
  });

  it('space 重力比 city 小（飛超遠效果）', () => {
    expect(THEMES.space.physics.gravity).toBeLessThan(THEMES.city.physics.gravity);
  });

  it('ocean 有空氣阻力（漂浮效果）', () => {
    expect(THEMES.ocean.physics.airResistance).toBeLessThan(1.0);
  });

  it('background 第一層必為 solid 或 gradient', () => {
    Object.values(THEMES).forEach(theme => {
      expect(['solid', 'gradient']).toContain(theme.background[0].kind);
    });
  });
});

describe('getTheme', () => {
  it('傳入有效 id → 對應主題', () => {
    expect(getTheme('space').id).toBe('space');
    expect(getTheme('ocean').id).toBe('ocean');
  });

  it('傳入 undefined → fallback 到 city', () => {
    expect(getTheme(undefined).id).toBe('city');
  });

  it('傳入未知 id → fallback 到 city', () => {
    expect(getTheme('forest' as never).id).toBe('city');
  });

  it('回傳的物件與 THEMES 同參考', () => {
    expect(getTheme('city')).toBe(THEMES.city);
  });
});

describe('THEME_LIST', () => {
  it('長度等於 THEMES 個數', () => {
    expect(THEME_LIST.length).toBe(Object.keys(THEMES).length);
  });

  it('順序為 city → space → ocean → school → festive → volcano', () => {
    expect(THEME_LIST.map(t => t.id)).toEqual([
      'city', 'space', 'ocean', 'school', 'festive', 'volcano',
    ]);
  });
});

describe('bananaTrail (v3.15.0)', () => {
  it('每個主題都有 bananaTrail 設定', () => {
    Object.values(THEMES).forEach(theme => {
      expect(theme.bananaTrail).toBeDefined();
      expect(theme.bananaTrail!.color).toMatch(/^rgba\(/);
      expect(theme.bananaTrail!.width).toBeGreaterThan(0);
    });
  });

  it('festive 主題使用金色拖尾', () => {
    expect(THEMES.festive.bananaTrail!.color).toContain('255, 215, 0');
  });

  it('volcano 主題使用火橘拖尾', () => {
    expect(THEMES.volcano.bananaTrail!.color).toContain('255, 100, 0');
  });
});

describe('新主題物理參數', () => {
  it('school 物理與 city 相同（標準教學環境）', () => {
    expect(THEMES.school.physics.gravity).toBe(THEMES.city.physics.gravity);
    expect(THEMES.school.physics.airResistance).toBe(1.0);
  });

  it('volcano 重力比 city 大（熱浪壓迫感）', () => {
    expect(THEMES.volcano.physics.gravity).toBeGreaterThan(THEMES.city.physics.gravity);
  });

  it('festive 風力範圍比 city 大（雪天感）', () => {
    const [, festiveMax] = THEMES.festive.physics.windRange;
    const [, cityMax] = THEMES.city.physics.windRange;
    expect(festiveMax).toBeGreaterThan(cityMax);
  });
});

describe('explosionStyle (v3.15.1 — C4 第三波)', () => {
  it('city / space / ocean / school 沒設 explosionStyle（用預設）', () => {
    expect(THEMES.city.explosionStyle).toBeUndefined();
    expect(THEMES.space.explosionStyle).toBeUndefined();
    expect(THEMES.ocean.explosionStyle).toBeUndefined();
    expect(THEMES.school.explosionStyle).toBeUndefined();
  });

  it('festive 是 radial 多色煙火', () => {
    const style = THEMES.festive.explosionStyle!;
    expect(style.pattern).toBe('radial');
    expect(style.palette.length).toBeGreaterThanOrEqual(5);
    expect(style.sparkle).toBe(true);
    expect(style.countMultiplier).toBeGreaterThanOrEqual(1.0);
  });

  it('volcano 是 fountain 熔岩噴發', () => {
    const style = THEMES.volcano.explosionStyle!;
    expect(style.pattern).toBe('fountain');
    expect(style.palette.length).toBeGreaterThanOrEqual(4);
    expect(style.sparkle).toBe(true);
  });

  it('volcano palette 全是紅橘黃系（每色至少含一個 R 高、B 低的字元組）', () => {
    THEMES.volcano.explosionStyle!.palette.forEach(c => {
      // 簡單檢查：紅橘色一定以 #F 或 #8B 開頭（R channel 高）
      expect(c.toUpperCase()).toMatch(/^#(F[0-9A-F]|8B)/);
    });
  });
});

describe('新背景圖層 kinds', () => {
  it('festive 含 snow layer', () => {
    expect(THEMES.festive.background.some(l => l.kind === 'snow')).toBe(true);
  });

  it('volcano 含 lavaSparks layer', () => {
    expect(THEMES.volcano.background.some(l => l.kind === 'lavaSparks')).toBe(true);
  });

  it('school 是純漸層無粒子', () => {
    expect(THEMES.school.background.length).toBe(1);
    expect(THEMES.school.background[0].kind).toBe('gradient');
  });
});
