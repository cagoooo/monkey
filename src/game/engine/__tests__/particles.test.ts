import {describe, it, expect} from 'vitest';
import {makeExplosionParticles} from '../particles';
import {THEMES} from '../themes';

describe('makeExplosionParticles', () => {
  it('沒設 explosionStyle 時用 fallbackColor', () => {
    const particles = makeExplosionParticles({
      pos: {x: 100, y: 100},
      baseCount: 10,
      fallbackColor: '#FF00FF',
      theme: THEMES.city, // city 沒設 explosionStyle
    });
    const main = particles.filter(p => p.type === 'normal');
    main.forEach(p => expect(p.color).toBe('#FF00FF'));
  });

  it('festive 主題用 multi-color palette', () => {
    const particles = makeExplosionParticles({
      pos: {x: 100, y: 100},
      baseCount: 50,
      fallbackColor: '#000000',
      theme: THEMES.festive,
    });
    const main = particles.filter(p => p.type === 'normal');
    const colors = new Set(main.map(p => p.color));
    // 50 顆粒子隨機抽 6 色，應該至少看到 3 種以上
    expect(colors.size).toBeGreaterThanOrEqual(3);
    colors.forEach(c => {
      expect(THEMES.festive.explosionStyle!.palette).toContain(c);
    });
  });

  it('volcano 主題用熔岩色 palette', () => {
    const particles = makeExplosionParticles({
      pos: {x: 100, y: 100},
      baseCount: 50,
      fallbackColor: '#000000',
      theme: THEMES.volcano,
    });
    const main = particles.filter(p => p.type === 'normal');
    main.forEach(p => {
      expect(THEMES.volcano.explosionStyle!.palette).toContain(p.color);
    });
  });

  it('volcano fountain pattern → 大部分粒子向上（vy < 0）', () => {
    const particles = makeExplosionParticles({
      pos: {x: 100, y: 100},
      baseCount: 100,
      fallbackColor: '#000000',
      theme: THEMES.volcano,
    });
    const main = particles.filter(p => p.type === 'normal');
    const upward = main.filter(p => p.vel.y < 0).length;
    // fountain 應有 >80% 粒子向上
    expect(upward / main.length).toBeGreaterThan(0.8);
  });

  it('city radial pattern → 上下 ~50/50', () => {
    const particles = makeExplosionParticles({
      pos: {x: 100, y: 100},
      baseCount: 100,
      fallbackColor: '#000000',
      theme: THEMES.city,
    });
    const main = particles.filter(p => p.type === 'normal');
    const upward = main.filter(p => p.vel.y < 0).length;
    // radial 應接近一半上半
    expect(upward / main.length).toBeGreaterThan(0.3);
    expect(upward / main.length).toBeLessThan(0.7);
  });

  it('countMultiplier 影響粒子數', () => {
    const cityParticles = makeExplosionParticles({
      pos: {x: 100, y: 100},
      baseCount: 100,
      fallbackColor: '#000',
      theme: THEMES.city,
    });
    const festiveParticles = makeExplosionParticles({
      pos: {x: 100, y: 100},
      baseCount: 100,
      fallbackColor: '#000',
      theme: THEMES.festive,
    });
    const cityMain = cityParticles.filter(p => p.type === 'normal');
    const festiveMain = festiveParticles.filter(p => p.type === 'normal');
    // festive countMultiplier=1.5
    expect(festiveMain.length).toBe(150);
    expect(cityMain.length).toBe(100);
  });

  it('ignoreThemeStyle:true → 即使在 festive 也用 fallbackColor', () => {
    const particles = makeExplosionParticles({
      pos: {x: 100, y: 100},
      baseCount: 30,
      fallbackColor: '#00FF00', // 模擬 acid 道具
      theme: THEMES.festive,
      ignoreThemeStyle: true,
    });
    const main = particles.filter(p => p.type === 'normal');
    main.forEach(p => expect(p.color).toBe('#00FF00'));
  });

  it('debrisColor 設定時會生 debris 粒子', () => {
    const particles = makeExplosionParticles({
      pos: {x: 0, y: 0},
      baseCount: 50,
      fallbackColor: '#000',
      debrisColor: '#AAAAAA',
      theme: THEMES.city,
    });
    const debris = particles.filter(p => p.type === 'debris');
    expect(debris.length).toBeGreaterThan(0);
    debris.forEach(p => expect(p.color).toBe('#AAAAAA'));
  });

  it('沒給 debrisColor 時不生 debris（猴子爆炸用）', () => {
    const particles = makeExplosionParticles({
      pos: {x: 0, y: 0},
      baseCount: 50,
      fallbackColor: '#000',
      theme: THEMES.city,
    });
    const debris = particles.filter(p => p.type === 'debris');
    expect(debris.length).toBe(0);
  });
});
