/* 猴子丟香蕉 Service Worker 擴充（由 vite.config.ts 的 workbox.importScripts 載入）
 *
 * 3.18.0 起改成「有新版先提示、使用者按了才更新」。但 3.17.0 以前的舊版 SW 是自動更新模式，
 * 舊頁面不會送「請接手」訊息，新版 SW 會一直卡在等待。
 * 這裡讓新版 SW 安裝時先問目前的 SW「你認得 MONKEY_SW_PING 嗎？」：
 *   - 有回答 → 是 3.18 以後的版本，照正常流程等使用者按「立即更新」
 *   - 沒回答 → 是舊版，直接接手一次（舊頁面會自動重新載入），之後都走提示流程
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'MONKEY_SW_PING' && event.ports[0]) {
    event.ports[0].postMessage({ ok: true });
  }
});

self.addEventListener('install', (event) => {
  const active = self.registration.active;
  if (!active) return;
  event.waitUntil(
    new Promise((resolve) => {
      const channel = new MessageChannel();
      const timer = setTimeout(() => {
        self.skipWaiting();
        resolve();
      }, 3000); // 給閒置被關掉的 SW 足夠時間醒來回答，避免把新版誤判成舊版
      channel.port1.onmessage = () => {
        clearTimeout(timer);
        resolve();
      };
      try {
        active.postMessage({ type: 'MONKEY_SW_PING' }, [channel.port2]);
      } catch (e) {
        clearTimeout(timer);
        self.skipWaiting();
        resolve();
      }
    }),
  );
});
