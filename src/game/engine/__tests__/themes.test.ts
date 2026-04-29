import {describe, it, expect} from 'vitest';
import {THEMES, THEME_LIST, getTheme} from '../themes';

describe('THEMES registry', () => {
  it('包含 3 個主題：city / space / ocean', () => {
    expect(Object.keys(THEMES).sort()).toEqual(['city', 'ocean', 'space']);
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

  it('順序為 city → space → ocean', () => {
    expect(THEME_LIST.map(t => t.id)).toEqual(['city', 'space', 'ocean']);
  });
});
