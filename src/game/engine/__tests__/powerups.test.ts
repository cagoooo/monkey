import {describe, it, expect} from 'vitest';
import {POWERUPS, getPowerUp} from '../powerups';

describe('POWERUPS registry', () => {
  it('包含所有 5 種 ProjectileType', () => {
    const expected = ['normal', 'giant', 'acid', 'beam', 'meteor'];
    expected.forEach(t => {
      expect(POWERUPS).toHaveProperty(t);
    });
  });

  it('每個 spec 都有 monkeyHit 與 buildingHit', () => {
    Object.values(POWERUPS).forEach(spec => {
      expect(spec.monkeyHit).toBeDefined();
      expect(spec.buildingHit).toBeDefined();
      expect(typeof spec.monkeyHit.maxRadius).toBe('number');
      expect(typeof spec.monkeyHit.shake).toBe('number');
      expect(typeof spec.monkeyHit.particleCount).toBe('number');
      expect(typeof spec.buildingHit.destructionRadius).toBe('number');
    });
  });

  it('giant 比 normal 威力大（建築爆炸半徑）', () => {
    expect(POWERUPS.giant.buildingHit.maxRadius).toBeGreaterThan(
      POWERUPS.normal.buildingHit.maxRadius
    );
    expect(POWERUPS.giant.buildingHit.destructionRadius).toBeGreaterThan(
      POWERUPS.normal.buildingHit.destructionRadius
    );
  });

  it('acid 介於 normal 與 giant 之間', () => {
    expect(POWERUPS.acid.buildingHit.maxRadius).toBeGreaterThan(
      POWERUPS.normal.buildingHit.maxRadius
    );
    expect(POWERUPS.acid.buildingHit.maxRadius).toBeLessThan(
      POWERUPS.giant.buildingHit.maxRadius
    );
  });

  it('每個 spec 有非空 label', () => {
    Object.values(POWERUPS).forEach(spec => {
      expect(spec.label).toBeTypeOf('string');
      expect(spec.label.length).toBeGreaterThan(0);
    });
  });

  it('id 與 key 一致', () => {
    Object.entries(POWERUPS).forEach(([key, spec]) => {
      expect(spec.id).toBe(key);
    });
  });

  it('acid 與 giant 有 trailParticle，normal 沒有', () => {
    expect(POWERUPS.acid.trailParticle).toBeDefined();
    expect(POWERUPS.giant.trailParticle).toBeDefined();
    expect(POWERUPS.normal.trailParticle).toBeUndefined();
  });
});

describe('getPowerUp', () => {
  it('傳入有效 type → 對應 spec', () => {
    expect(getPowerUp('giant').id).toBe('giant');
    expect(getPowerUp('acid').id).toBe('acid');
  });

  it('傳入 undefined → fallback 到 normal', () => {
    expect(getPowerUp(undefined).id).toBe('normal');
  });

  it('回傳的 spec 與 POWERUPS 同一參考', () => {
    expect(getPowerUp('giant')).toBe(POWERUPS.giant);
  });
});
