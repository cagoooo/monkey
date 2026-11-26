/**
 * 版本字串比對（純函式，方便測試）。
 *
 * 版本格式：`3.17.0-abc1234`（package.json 版本 - git 短雜湊），本機開發是 `3.17.0-dev`。
 * 用途：SW 說「有新版」時，先比對伺服器 version.json 與目前頁面的版本，
 * 只有真的較新才跳提示，避免 CDN 殘留舊檔造成「更新完又跳」的假更新循環。
 */

function parse(v: string): {semver: [number, number, number]; hash: string} | null {
  const m = v.match(/^(\d+)\.(\d+)\.(\d+)(?:-([0-9a-z]+))?/i);
  if (!m) return null;
  return {semver: [Number(m[1]), Number(m[2]), Number(m[3])], hash: m[4] ?? ''};
}

/** candidate 是否比 base 新。解析不了時寬鬆放行（寧可多提示，不可擋掉真更新）。 */
export function isNewerVersion(candidate: string, base: string): boolean {
  if (!candidate || !base || candidate === base) return false;
  const c = parse(candidate);
  const b = parse(base);
  if (!c || !b) return true;
  for (let i = 0; i < 3; i++) {
    if (c.semver[i] > b.semver[i]) return true;
    if (c.semver[i] < b.semver[i]) return false;
  }
  return c.hash !== b.hash;
}
