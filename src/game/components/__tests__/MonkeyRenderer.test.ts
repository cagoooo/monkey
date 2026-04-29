import {describe, it, expect} from 'vitest';
import {derivePose} from '../MonkeyRenderer';

describe('derivePose 狀態優先級', () => {
  // 預期優先級（高到低）：
  //   dead > celebrating > throwing > struggling > aiming > idle

  it('dead 蓋過所有狀態', () => {
    expect(
      derivePose({
        isDead: true,
        isWinner: true,
        isThrowing: true,
        isStruggling: true,
        isActive: true,
      })
    ).toBe('dead');
  });

  it('celebrating 蓋過 throwing / struggling / aiming', () => {
    expect(
      derivePose({
        isDead: false,
        isWinner: true,
        isThrowing: true,
        isStruggling: true,
        isActive: true,
      })
    ).toBe('celebrating');
  });

  it('throwing 蓋過 struggling / aiming', () => {
    expect(
      derivePose({
        isDead: false,
        isWinner: false,
        isThrowing: true,
        isStruggling: true,
        isActive: true,
      })
    ).toBe('throwing');
  });

  it('struggling 蓋過 aiming', () => {
    expect(
      derivePose({
        isDead: false,
        isWinner: false,
        isThrowing: false,
        isStruggling: true,
        isActive: true,
      })
    ).toBe('struggling');
  });

  it('isActive 但沒其他狀態 → aiming', () => {
    expect(
      derivePose({
        isDead: false,
        isWinner: false,
        isThrowing: false,
        isStruggling: false,
        isActive: true,
      })
    ).toBe('aiming');
  });

  it('全部 false → idle（非當前回合的待機狀態）', () => {
    expect(
      derivePose({
        isDead: false,
        isWinner: false,
        isThrowing: false,
        isStruggling: false,
        isActive: false,
      })
    ).toBe('idle');
  });
});
