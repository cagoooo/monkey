import {describe, it, expect} from 'vitest';
import {calculateScore} from '../scoring';

describe('calculateScore', () => {
  it('hit 在目標正中央 → 滿分 100', () => {
    const score = calculateScore({x: 100, y: 50}, {x: 0, y: 50}, {x: 100, y: 50});
    expect(score).toBe(100);
  });

  it('hit 在目標旁 50% 距離 → 50 分', () => {
    const score = calculateScore(
      {x: 50, y: 50},  // hit pos at midpoint between shooter and target
      {x: 0, y: 50},   // shooter at 0
      {x: 100, y: 50}, // target at 100
    );
    expect(score).toBe(50);
  });

  it('hit 在 shooter 旁 < 30px → 0 分（防自殺式打分）', () => {
    const score = calculateScore({x: 5, y: 0}, {x: 0, y: 0}, {x: 200, y: 0});
    expect(score).toBe(0);
  });

  it('shooter 與 target 同位置 → 0 分（防除以 0）', () => {
    const score = calculateScore({x: 50, y: 50}, {x: 100, y: 100}, {x: 100, y: 100});
    expect(score).toBe(0);
  });

  it('hit 距離目標比射擊起點還遠 → 0 分（負值被 clamp 到 0）', () => {
    const score = calculateScore({x: 200, y: 0}, {x: 0, y: 0}, {x: 100, y: 0});
    expect(score).toBe(0);
  });

  it('回傳整數', () => {
    const score = calculateScore({x: 70, y: 0}, {x: 0, y: 0}, {x: 100, y: 0});
    expect(Number.isInteger(score)).toBe(true);
  });
});
