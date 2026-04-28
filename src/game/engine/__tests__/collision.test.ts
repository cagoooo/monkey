import {describe, it, expect} from 'vitest';
import {distance, distSq, isWithin, vecFromAngle} from '../collision';

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
