import {describe, expect, it} from 'vitest';
import {isNewerVersion} from '../pwaVersion';

describe('isNewerVersion', () => {
  it('完全相同 → 不是新版', () => {
    expect(isNewerVersion('3.17.0-abc1234', '3.17.0-abc1234')).toBe(false);
  });
  it('semver 較新 → 新版', () => {
    expect(isNewerVersion('3.18.0-aaa1111', '3.17.0-bbb2222')).toBe(true);
  });
  it('semver 較舊（CDN 殘留）→ 忽略', () => {
    expect(isNewerVersion('3.16.2-aaa1111', '3.17.0-bbb2222')).toBe(false);
  });
  it('同 semver 不同雜湊（沒升版的新 commit）→ 新版', () => {
    expect(isNewerVersion('3.17.0-ccc3333', '3.17.0-abc1234')).toBe(true);
  });
  it('數值比較：3.10.0 比 3.9.9 新', () => {
    expect(isNewerVersion('3.10.0-a1', '3.9.9-b2')).toBe(true);
    expect(isNewerVersion('3.9.9-b2', '3.10.0-a1')).toBe(false);
  });
  it('解析不了 → 寬鬆放行；空字串 → 不是新版', () => {
    expect(isNewerVersion('weird', '3.17.0-abc1234')).toBe(true);
    expect(isNewerVersion('', '3.17.0-abc1234')).toBe(false);
  });
});
