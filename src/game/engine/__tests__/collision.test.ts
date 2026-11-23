import {describe, it, expect} from 'vitest';
import {distance, distSq, isWithin, vecFromAngle, sweepPoints, firstSweepHit} from '../collision';

describe('distance', () => {
  it('returns 0 when points are identical', () => {
    expect(distance({x: 5, y: 7}, {x: 5, y: 7})).toBe(0);
  });

  it('computes Euclidean distance', () => {
    expect(distance({x: 0, y: 0}, {x: 3, y: 4})).toBe(5);
  });

  it('is commutative', () => {
    const a = {x: 1, y: 2};
    const b = {x: 7, y: -3};
    expect(distance(a, b)).toBe(distance(b, a));
  });
});

describe('distSq', () => {
  it('returns square of distance (no sqrt)', () => {
    expect(distSq({x: 0, y: 0}, {x: 3, y: 4})).toBe(25);
  });

  it('is faster proxy for "distance < r" comparison', () => {
    const a = {x: 0, y: 0};
    const b = {x: 3, y: 4};
    const r = 6;
    expect(distSq(a, b) < r * r).toBe(distance(a, b) < r);
  });
});

describe('isWithin', () => {
  it('returns true when inside circle', () => {
    expect(isWithin({x: 1, y: 1}, {x: 0, y: 0}, 5)).toBe(true);
  });

  it('returns false when outside circle', () => {
    expect(isWithin({x: 10, y: 10}, {x: 0, y: 0}, 5)).toBe(false);
  });

  it('returns false on the boundary (strict <)', () => {
    expect(isWithin({x: 3, y: 4}, {x: 0, y: 0}, 5)).toBe(false);
  });

  it('handles negative coordinates', () => {
    expect(isWithin({x: -1, y: -1}, {x: 0, y: 0}, 2)).toBe(true);
  });
});

describe('vecFromAngle', () => {
  it('0 rad → unit x vector', () => {
    const v = vecFromAngle(0, 1);
    expect(v.x).toBeCloseTo(1);
    expect(v.y).toBeCloseTo(0);
  });

  it('π/2 rad → unit y vector', () => {
    const v = vecFromAngle(Math.PI / 2, 1);
    expect(v.x).toBeCloseTo(0);
    expect(v.y).toBeCloseTo(1);
  });

  it('scales magnitude', () => {
    const v = vecFromAngle(0, 10);
    expect(v.x).toBeCloseTo(10);
    expect(v.y).toBeCloseTo(0);
  });

  it('π rad → negative x', () => {
    const v = vecFromAngle(Math.PI, 5);
    expect(v.x).toBeCloseTo(-5);
    expect(v.y).toBeCloseTo(0);
  });
});

describe('sweepPoints / firstSweepHit（高速穿透防護）', () => {
  it('每個子步位移不超過 8px，且最後一點為終點', () => {
    const pts = sweepPoints({x: 0, y: 0}, {x: 32, y: 0});
    expect(pts.length).toBe(4);
    expect(pts[pts.length - 1]).toEqual({x: 32, y: 0});
    let prev = {x: 0, y: 0};
    for (const p of pts) {
      expect(distance(prev, p)).toBeLessThanOrEqual(8 + 1e-9);
      prev = p;
    }
  });

  it('位移為 0 時仍回傳終點一個點', () => {
    expect(sweepPoints({x: 3, y: 4}, {x: 3, y: 4})).toEqual([{x: 3, y: 4}]);
  });

  it('高速香蕉（32px/tick）從猴子正中間穿過，終點在猴子外也要判定命中', () => {
    const monkey = {x: 100, y: 50};
    const from = {x: 84, y: 50};
    const to = {x: 116, y: 50}; // 終點距離猴子 16 < 24 仍在內；改用更大位移測穿透
    const farTo = {x: 132, y: 50}; // 終點距離 32 > MONKEY_SIZE(24)，舊做法會漏判
    expect(isWithin(farTo, monkey, 24)).toBe(false);
    expect(isWithin(to, monkey, 24)).toBe(true);
    const r = firstSweepHit(from, farTo, p => isWithin(p, monkey, 24));
    expect(r).not.toBeNull();
    expect(distance(r!.pos, monkey)).toBeLessThan(24);
  });

  it('沒穿過任何目標時回傳 null；多個目標時回傳最先碰到的', () => {
    expect(firstSweepHit({x: 0, y: 0}, {x: 32, y: 0}, p => isWithin(p, {x: 16, y: 100}, 24))).toBeNull();
    const r = firstSweepHit({x: 0, y: 0}, {x: 32, y: 0}, p => (p.x >= 8 ? 'A' : null));
    expect(r!.hit).toBe('A');
    expect(r!.pos.x).toBeCloseTo(8);
  });
});
