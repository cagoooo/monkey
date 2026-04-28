import {describe, it, expect} from 'vitest';
import {applyForces, step, calcDragPower, calcDragAngle} from '../physics';

describe('applyForces', () => {
  it('套用重力後 y 速度增加', () => {
    const next = applyForces({x: 0, y: 0}, 0.25, 0);
    expect(next.y).toBe(0.25);
    expect(next.x).toBe(0);
  });

  it('套用風後 x 速度改變', () => {
    const next = applyForces({x: 0, y: 0}, 0, 0.05);
    expect(next.x).toBe(0.05);
    expect(next.y).toBe(0);
  });

  it('正風 + 重力同時套用', () => {
    const next = applyForces({x: 1, y: -2}, 0.25, 0.05);
    expect(next.x).toBeCloseTo(1.05);
    expect(next.y).toBeCloseTo(-1.75);
  });

  it('air resistance < 1 時兩軸都衰減', () => {
    const next = applyForces({x: 10, y: 0}, 0, 0, 0.9);
    expect(next.x).toBeCloseTo(9);
    expect(next.y).toBe(0);
  });

  it('預設 air resistance = 1.0（無阻力）', () => {
    const next = applyForces({x: 10, y: 0}, 0, 0);
    expect(next.x).toBe(10);
  });

  it('回傳新物件，不修改原 vel', () => {
    const original = {x: 1, y: 2};
    applyForces(original, 0.25, 0);
    expect(original).toEqual({x: 1, y: 2});
  });
});

describe('step', () => {
  it('位置 = 原位置 + 速度', () => {
    expect(step({x: 100, y: 50}, {x: 5, y: -3})).toEqual({x: 105, y: 47});
  });

  it('靜止時位置不變', () => {
    expect(step({x: 10, y: 20}, {x: 0, y: 0})).toEqual({x: 10, y: 20});
  });

  it('回傳新物件', () => {
    const pos = {x: 1, y: 2};
    step(pos, {x: 0, y: 0});
    expect(pos).toEqual({x: 1, y: 2});
  });
});

describe('calcDragPower', () => {
  it('起點 = 終點 → 力道 0', () => {
    expect(calcDragPower({x: 0, y: 0}, {x: 0, y: 0})).toBe(0);
  });

  it('力道與拖曳距離成正比（依預設 scale 2.55）', () => {
    expect(calcDragPower({x: 0, y: 0}, {x: 10, y: 0})).toBeCloseTo(25.5);
  });

  it('自訂 scale', () => {
    expect(calcDragPower({x: 0, y: 0}, {x: 10, y: 0}, 1)).toBe(10);
  });

  it('超過 maxPower 時截斷', () => {
    expect(calcDragPower({x: 0, y: 0}, {x: 1000, y: 0})).toBe(255); // 預設 max
  });

  it('斜對角拖曳的 hypotenuse', () => {
    expect(calcDragPower({x: 0, y: 0}, {x: 3, y: 4}, 1)).toBe(5);
  });
});

describe('calcDragAngle', () => {
  it('水平向右拖曳（mirrorX=false 玩家 1）回傳 π（向後拋）', () => {
    // dx=10, dy=0; mirrorX=false → atan2(0, -10) = π
    const angle = calcDragAngle({x: 0, y: 0}, {x: 10, y: 0}, false);
    expect(angle).toBeCloseTo(Math.PI);
  });

  it('水平向右拖曳（mirrorX=true 玩家 2）回傳 0', () => {
    const angle = calcDragAngle({x: 0, y: 0}, {x: 10, y: 0}, true);
    expect(angle).toBeCloseTo(0);
  });

  it('垂直向下拖曳 mirrorX=false → atan2(10, 0) = π/2', () => {
    const angle = calcDragAngle({x: 0, y: 0}, {x: 0, y: 10}, false);
    expect(angle).toBeCloseTo(Math.PI / 2);
  });
});
