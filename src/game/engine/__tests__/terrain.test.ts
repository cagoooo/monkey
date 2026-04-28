import {describe, it, expect} from 'vitest';
import {
  getGroundY,
  isPointDestroyed,
  generateWindowGrid,
  MONKEY_FOOT_OFFSET,
} from '../terrain';
import {Building, Destruction} from '../../types';
import {CANVAS_HEIGHT} from '../../constants';

describe('isPointDestroyed', () => {
  it('在 destruction 圓內 → true', () => {
    const destructions: Destruction[] = [{pos: {x: 100, y: 100}, radius: 50}];
    expect(isPointDestroyed(100, 100, destructions)).toBe(true);
  });

  it('正好在邊界外 → false', () => {
    const destructions: Destruction[] = [{pos: {x: 0, y: 0}, radius: 10}];
    expect(isPointDestroyed(11, 0, destructions)).toBe(false);
  });

  it('完全遠離所有 destruction → false', () => {
    const destructions: Destruction[] = [{pos: {x: 0, y: 0}, radius: 5}];
    expect(isPointDestroyed(500, 500, destructions)).toBe(false);
  });

  it('多個 destructions 任一命中即 true', () => {
    const destructions: Destruction[] = [
      {pos: {x: 0, y: 0}, radius: 5},
      {pos: {x: 100, y: 100}, radius: 50},
    ];
    expect(isPointDestroyed(80, 80, destructions)).toBe(true);
  });

  it('空 destructions → false', () => {
    expect(isPointDestroyed(50, 50, [])).toBe(false);
  });
});

describe('getGroundY', () => {
  it('沒任何建築 → 回傳地平線（CANVAS_HEIGHT - 腳底 offset）', () => {
    expect(getGroundY(50, [], [])).toBe(CANVAS_HEIGHT - MONKEY_FOOT_OFFSET);
  });

  it('建築頂面 → 回傳建築頂面 y - 腳底 offset', () => {
    const buildings: Building[] = [
      {x: 0, y: 400, width: 100, height: 200, color: '#fff', windows: []},
    ];
    expect(getGroundY(50, buildings, [])).toBe(400 - MONKEY_FOOT_OFFSET);
  });

  it('x 落在建築範圍外 → 地平線', () => {
    const buildings: Building[] = [
      {x: 0, y: 400, width: 100, height: 200, color: '#fff', windows: []},
    ];
    expect(getGroundY(200, buildings, [])).toBe(CANVAS_HEIGHT - MONKEY_FOOT_OFFSET);
  });

  it('建築被完全炸穿 → 落到底部地面', () => {
    const buildings: Building[] = [
      {x: 0, y: 100, width: 100, height: 500, color: '#fff', windows: []},
    ];
    // 一個 huge destruction 覆蓋整個建築
    const destructions: Destruction[] = [{pos: {x: 50, y: 350}, radius: 9999}];
    const groundY = getGroundY(50, buildings, destructions);
    // 因為 destruction 半徑超大，整棟樓都被挖空，落到地平線
    expect(groundY).toBe(CANVAS_HEIGHT - MONKEY_FOOT_OFFSET);
  });

  it('部分爆炸坑：只挖掉頂部，monkey 站在坑底', () => {
    const buildings: Building[] = [
      {x: 0, y: 100, width: 100, height: 500, color: '#fff', windows: []},
    ];
    // 直徑 50 的小坑在頂部
    const destructions: Destruction[] = [{pos: {x: 50, y: 100}, radius: 50}];
    const groundY = getGroundY(50, buildings, destructions);
    // 坑底大概在 y=150 處
    expect(groundY).toBeGreaterThan(100 - MONKEY_FOOT_OFFSET);
    expect(groundY).toBeLessThan(200);
  });
});

describe('generateWindowGrid', () => {
  it('產生正確尺寸的二維陣列', () => {
    const grid = generateWindowGrid(3, 4);
    expect(grid).toHaveLength(3);
    grid.forEach(row => expect(row).toHaveLength(4));
  });

  it('所有元素都是 boolean', () => {
    const grid = generateWindowGrid(5, 5);
    grid.forEach(row => row.forEach(cell => expect(typeof cell).toBe('boolean')));
  });

  it('lightProb=1 → 全亮', () => {
    const grid = generateWindowGrid(10, 10, 1);
    grid.forEach(row => row.forEach(cell => expect(cell).toBe(true)));
  });

  it('lightProb=0 → 全暗', () => {
    const grid = generateWindowGrid(10, 10, 0);
    grid.forEach(row => row.forEach(cell => expect(cell).toBe(false)));
  });

  it('rows=0 → 空陣列', () => {
    expect(generateWindowGrid(0, 5)).toEqual([]);
  });
});

describe('MONKEY_FOOT_OFFSET', () => {
  it('是合理範圍內的數值', () => {
    expect(MONKEY_FOOT_OFFSET).toBeGreaterThan(0);
    expect(MONKEY_FOOT_OFFSET).toBeLessThan(50);
  });
});
