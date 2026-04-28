/**
 * PWA Service Worker 註冊與更新提示。
 *
 * 透過 vite-plugin-pwa 的 registerSW，當偵測到新版本時：
 *   1. 顯示一個固定底部的橫幅提示「有新版本，重新整理」
 *   2. 點按鈕觸發 updateSW(true) → SW 取代 + 自動 reload
 *
 * Cache-Bust 策略：
 *   - HTML：NetworkFirst（見 vite.config.ts 的 runtimeCaching）
 *   - 靜態資源：Vite 產出的 hash 檔名天然防快取
 *   - Firestore：NetworkOnly，永遠不快取
 */

import {registerSW} from 'virtual:pwa-register';

const BANNER_ID = '__pwa_update_banner__';

function showUpdateBanner(onAccept: () => void) {
  if (document.getElementById(BANNER_ID)) return;

  const banner = document.createElement('div');
  banner.id = BANNER_ID;
  banner.style.cssText = [
    'position:fixed', 'left:50%', 'bottom:16px', 'transform:translateX(-50%)',
    'z-index:99999',
    'padding:12px 18px',
    'background:#facc15', 'color:#1a1a1a',
    'border:2px solid #1a1a1a', 'border-radius:6px',
    'font-family:system-ui, sans-serif', 'font-size:14px', 'font-weight:bold',
    'box-shadow:0 4px 12px rgba(0,0,0,0.4)',
    'display:flex', 'align-items:center', 'gap:12px',
    'cursor:default',
  ].join(';');

  const text = document.createElement('span');
  text.textContent = '🎮 有新版本可用';

  const btn = document.createElement('button');
  btn.textContent = '立即更新';
  btn.style.cssText = [
    'padding:6px 12px',
    'background:#1a1a1a', 'color:#facc15',
    'border:none', 'border-radius:4px',
    'font-weight:bold', 'cursor:pointer',
  ].join(';');
  btn.onclick = () => {
    btn.disabled = true;
    btn.textContent = '更新中…';
    onAccept();
  };

  banner.appendChild(text);
  banner.appendChild(btn);
  document.body.appendChild(banner);
}

export function registerServiceWorker() {
  if (import.meta.env.DEV) return;

  const updateSW = registerSW({
    onNeedRefresh() {
      showUpdateBanner(() => updateSW(true));
    },
    onOfflineReady() {
      console.warn('[PWA] 已可離線使用');
    },
  });
}
