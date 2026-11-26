/**
 * PWA Service Worker 註冊與「有新版本」提示。
 *
 * 流程（registerType: 'prompt'）：
 *   1. 新版 SW 在背景下載完、進入 waiting → onNeedRefresh
 *   2. 先抓 version.json 比對目前頁面版本，真的比較新才跳提示（擋掉 CDN 殘留舊檔的假更新）
 *   3. 使用者按「立即更新」→ updateSW(true)：waiting SW 接手後自動重新載入一次
 *   4. 開著不關的分頁：每 30 分鐘、以及切回分頁時（最多 5 分鐘一次）主動檢查新版
 *
 * 另有一次性自癒：舊頁面要載入已被刪除的分塊（ChunkLoadError 類錯誤）時，
 * 只清「本站自己的」SW 與快取後重新載入，同一分頁最多一次，避免無限重整。
 */

import {registerSW} from 'virtual:pwa-register';
import {isNewerVersion} from './pwaVersion';

const TOAST_ID = '__monkey_update_toast__';
const ACK_KEY = 'monkey_pwa_ack_version';
const DISMISS_KEY = 'monkey_pwa_dismissed_version';
const CHUNK_RELOAD_KEY = 'monkey_chunk_reload_attempted';
const CHECK_INTERVAL_MS = 30 * 60 * 1000;
const VISIBLE_CHECK_GAP_MS = 5 * 60 * 1000;

interface RemoteVersion {
  version: string;
  notes: string[];
}

let lastAnnounced = '';

function sessionGet(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function sessionSet(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    /* 無痕模式等情況存不了就算了 */
  }
}

async function fetchRemoteVersion(): Promise<RemoteVersion | null> {
  try {
    const res = await fetch(`./version.json?t=${Date.now()}`, {cache: 'no-store'});
    if (!res.ok) return null;
    const data = (await res.json()) as Partial<RemoteVersion>;
    if (typeof data.version !== 'string') return null;
    return {version: data.version, notes: Array.isArray(data.notes) ? data.notes.slice(0, 3) : []};
  } catch {
    return null;
  }
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, css: string, text?: string) {
  const node = document.createElement(tag);
  node.style.cssText = css;
  if (text) node.textContent = text;
  return node;
}

function showUpdateToast(remote: RemoteVersion | null, onAccept: () => void) {
  if (document.getElementById(TOAST_ID)) return;

  const toast = el(
    'div',
    [
      'position:fixed', 'left:50%', 'bottom:18px', 'transform:translateX(-50%)', 'z-index:99999',
      'width:min(440px,calc(100vw - 24px))', 'box-sizing:border-box',
      'padding:16px 18px', 'background:#0000AA', 'color:#fff',
      'border:4px solid #facc15', 'border-radius:12px',
      'box-shadow:6px 6px 0 #000,0 18px 40px rgba(0,0,0,.45)',
      'font-family:"Courier New",Courier,monospace,system-ui', 'font-size:15px', 'line-height:1.5',
    ].join(';'),
  );
  toast.id = TOAST_ID;
  toast.setAttribute('role', 'alert');

  const title = el('div', 'font-size:18px;font-weight:900;color:#facc15', '🍌 遊戲有新版本了！');
  toast.appendChild(title);

  if (remote?.notes.length) {
    const list = el('ul', 'margin:8px 0 0;padding-left:1.2em;font-size:14px;opacity:.95');
    remote.notes.forEach(note => list.appendChild(el('li', 'margin:2px 0', note)));
    toast.appendChild(list);
  } else {
    toast.appendChild(el('div', 'margin-top:6px;font-size:14px;opacity:.9', '更新後就能玩到最新的內容與修正。'));
  }

  toast.appendChild(
    el('div', 'margin-top:8px;font-size:12px;opacity:.7', `${remote ? `v${remote.version.split('-')[0]}・` : ''}對戰進行中可以先打完再更新`),
  );

  const row = el('div', 'display:flex;gap:10px;justify-content:flex-end;margin-top:12px');
  const later = el(
    'button',
    'padding:8px 14px;background:transparent;color:#fff;border:2px solid rgba(255,255,255,.6);border-radius:8px;font:inherit;font-weight:700;cursor:pointer',
    '稍後',
  );
  const accept = el(
    'button',
    'padding:8px 16px;background:#facc15;color:#000;border:2px solid #000;border-radius:8px;box-shadow:3px 3px 0 #000;font:inherit;font-weight:900;cursor:pointer',
    '立即更新',
  );
  later.onclick = () => {
    if (remote) sessionSet(DISMISS_KEY, remote.version);
    toast.remove();
  };
  accept.onclick = () => {
    accept.disabled = true;
    accept.textContent = '更新中…';
    if (remote) sessionSet(ACK_KEY, remote.version);
    onAccept();
  };
  row.appendChild(later);
  row.appendChild(accept);
  toast.appendChild(row);
  document.body.appendChild(toast);
}

/** 只清本站（/monkey/）的 SW 與快取，不碰同網域其他小工具 */
async function clearOwnSwAndCaches() {
  const scope = new URL('./', location.href).href;
  if ('serviceWorker' in navigator) {
    const regs = await navigator.serviceWorker.getRegistrations();
    await Promise.all(regs.filter(r => r.scope === scope).map(r => r.unregister()));
  }
  if ('caches' in window) {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter(k => k.includes(scope) || k.startsWith('monkey-')).map(k => caches.delete(k)),
    );
  }
}

function installChunkErrorSelfHeal() {
  const pattern = /Loading chunk|Failed to fetch dynamically imported module|Importing a module script failed|ChunkLoadError/i;
  const handler = (event: ErrorEvent | PromiseRejectionEvent) => {
    const message = 'reason' in event ? String(event.reason?.message ?? event.reason ?? '') : event.message;
    if (!pattern.test(message || '')) return;
    if (sessionGet(CHUNK_RELOAD_KEY) === '1') return;
    sessionSet(CHUNK_RELOAD_KEY, '1');
    console.warn('[PWA] 偵測到舊版檔案已不存在，清除本站快取後重新載入', message);
    void clearOwnSwAndCaches()
      .catch(() => undefined)
      .then(() => location.reload());
  };
  window.addEventListener('error', handler, true);
  window.addEventListener('unhandledrejection', handler);
}

export function registerServiceWorker() {
  if (import.meta.env.DEV) return;
  installChunkErrorSelfHeal();

  const currentVersion = __APP_VERSION__;
  let retryTimer: number | undefined;

  const gateAndAnnounce = async (attempt: number) => {
    const remote = await fetchRemoteVersion();
    if (remote) {
      if (!isNewerVersion(remote.version, currentVersion)) {
        // 看起來不是新版：可能是 CDN 還給舊的 version.json（約 10 分鐘），
        // 先不提示、也不動 waiting SW，每 2 分鐘再比一次，最多 6 次
        if (attempt < 6) retryTimer = window.setTimeout(() => void gateAndAnnounce(attempt + 1), 2 * 60 * 1000);
        return;
      }
      if (remote.version === lastAnnounced) return;
      if (sessionGet(ACK_KEY) === remote.version) return;
      if (sessionGet(DISMISS_KEY) === remote.version) return;
      lastAnnounced = remote.version;
    }
    // 抓不到 version.json 時照樣提示（寧可多提示，不可擋掉真更新）
    showUpdateToast(remote, () => void updateSW(true));
  };

  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      window.clearTimeout(retryTimer);
      void gateAndAnnounce(0);
    },
    onRegisteredSW(_swUrl, registration) {
      if (!registration) return;
      let lastCheck = Date.now();
      const check = () => {
        if (!navigator.onLine) return;
        lastCheck = Date.now();
        void registration.update().catch(() => undefined);
      };
      setInterval(check, CHECK_INTERVAL_MS);
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && Date.now() - lastCheck > VISIBLE_CHECK_GAP_MS) check();
      });
    },
  });
}
