import {describe, it, expect, vi, beforeEach} from 'vitest';
import {handleTurnTransition} from '../turnTransition';
import {MONKEY_FOOT_OFFSET} from '../terrain';
import {GameState} from '../../types';
import {CANVAS_HEIGHT} from '../../constants';

// soundService 在 node 測試環境沒有 AudioContext，整個 mock 掉
vi.mock('../../../services/soundService', () => ({
  soundService: {
    playExplosion: vi.fn(),
  },
}));

// 「在地面」的 y 座標 — 玩家腳底剛好踩到 canvas 底部
const ON_GROUND_Y = CANVAS_HEIGHT - MONKEY_FOOT_OFFSET;
// x 座標選在兩棟建築之間（預設建築 50-150 與 650-750），確保不被建築擋
const NO_BUILDING_X = 400;

/** 建立一個合理的測試 base state */
function makeState(overrides: Partial<GameState> = {}): GameState {
  return {
    themeId: 'city',
    player1Pos: {x: 100, y: 200},
    player2Pos: {x: 700, y: 200},
    sunPos: {x: 400, y: 100},
    sunState: 'normal',
    sunHits: 0,
    buildings: [
      {x: 50, y: 250, width: 100, height: 350, color: '#fff', windows: []},
      {x: 650, y: 250, width: 100, height: 350, color: '#fff', windows: []},
    ],
    destructions: [],
    particles: [],
    shake: 0,
    currentPlayer: 1,
    wind: 0,
    scores: [0, 0],
    playerNames: ['玩家一', '玩家二'],
    gravity: 0.25,
    status: 'throwing',
    roundCount: 0,
    dragStart: null,
    dragCurrent: null,
    treasures: [],
    player1Projectile: 'normal',
    player2Projectile: 'normal',
    roundHistory: {p1: [], p2: []},
    currentRoundPoints: [0, 0],
    p1GroundTurns: 0,
    p2GroundTurns: 0,
    p1Struggling: false,
    p2Struggling: false,
    turnTimeLeft: 10,
    ...overrides,
  };
}

describe('handleTurnTransition — 一般切換', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('切到下個玩家（player 1 → player 2）', () => {
    const prev = makeState({currentPlayer: 1});
    const next = handleTurnTransition(prev, makeState());
    expect(next.currentPlayer).toBe(2);
    expect(next.status).toBe('aiming');
  });

  it('切到下個玩家（player 2 → player 1）', () => {
    const prev = makeState({currentPlayer: 2});
    const next = handleTurnTransition(prev, makeState());
    expect(next.currentPlayer).toBe(1);
  });

  it('重置 turnTimeLeft 為 10', () => {
    const prev = makeState();
    const next = handleTurnTransition(prev, makeState({turnTimeLeft: 0}));
    expect(next.turnTimeLeft).toBe(10);
  });

  it('清除 banana 與 explosion', () => {
    const prev = makeState();
    const next = handleTurnTransition(prev, makeState());
    expect(next.banana).toBeUndefined();
    expect(next.explosion).toBeUndefined();
  });

  it('生出新寶箱（恰 1 個）', () => {
    const prev = makeState();
    const next = handleTurnTransition(prev, makeState({treasures: []}));
    expect(next.treasures).toHaveLength(1);
    expect(next.treasures[0].active).toBe(true);
  });

  it('寶箱類型隨機落在 4 種裡', () => {
    const prev = makeState();
    const types = new Set<string>();
    for (let i = 0; i < 200; i++) {
      const next = handleTurnTransition(prev, makeState({treasures: []}));
      types.add(next.treasures[0].type);
    }
    types.forEach(t => expect(['giant', 'acid', 'beam', 'meteor']).toContain(t));
  });
});

describe('handleTurnTransition — 5 回合地面爆炸懲罰', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('p1 連續 4 回合在地面 + 切回 p1 → 第 5 次 → 爆炸（p2 贏）', async () => {
    // currentPlayer=2 切到 p1 → p1Turns 從 4 變 5 → 觸發爆炸
    const prev = makeState({currentPlayer: 2});
    const next = handleTurnTransition(
      prev,
      makeState({
        player1Pos: {x: NO_BUILDING_X, y: ON_GROUND_Y},
        p1GroundTurns: 4,
      })
    );
    expect(next.status).toBe('exploding');
    expect(next.winner).toBe(2);
    expect(next.scores[1]).toBe(1); // p2 +1
    const {soundService} = await import('../../../services/soundService');
    expect(soundService.playExplosion).toHaveBeenCalled();
  });

  it('p2 連續 5 回合在地面 → 爆炸（p1 贏）', () => {
    const prev = makeState({currentPlayer: 1});
    const next = handleTurnTransition(
      prev,
      makeState({
        player2Pos: {x: NO_BUILDING_X, y: ON_GROUND_Y},
        p2GroundTurns: 4,
      })
    );
    expect(next.status).toBe('exploding');
    expect(next.winner).toBe(1);
    expect(next.scores[0]).toBe(1);
  });

  it('沒有任何玩家在地面 → 不觸發爆炸', () => {
    // 玩家在建築頂面（不算地面）
    const prev = makeState({currentPlayer: 1});
    const next = handleTurnTransition(prev, makeState({p1GroundTurns: 4, p2GroundTurns: 4}));
    expect(next.status).toBe('aiming');
    expect(next.winner).toBeUndefined();
  });

  it('在地面但沒到 5 回合 → 累計但不爆炸', () => {
    const prev = makeState({currentPlayer: 2}); // 切到 p1
    const next = handleTurnTransition(
      prev,
      makeState({
        player1Pos: {x: NO_BUILDING_X, y: ON_GROUND_Y},
        p1GroundTurns: 2,
      })
    );
    expect(next.status).toBe('aiming');
    expect(next.p1GroundTurns).toBe(3);
  });
});
