/**
 * 直立模式提示徽章。
 *
 * 顯示時機：
 *   - 裝置處於 portrait orientation
 *   - 寬度小於 900px（手機/小平板）
 *   - 使用者尚未在本次 session 關閉提示
 *
 * 使用者按 ✕ 後在 sessionStorage 記住，重新整理才會再出現。
 */

import {useEffect, useState} from 'react';

const DISMISS_KEY = 'monkey-portrait-hint-dismissed';

function detectPortrait(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(orientation: portrait)').matches &&
    window.innerWidth < 900
  );
}

export function PortraitHint() {
  const [isPortrait, setIsPortrait] = useState(detectPortrait);
  const [dismissed, setDismissed] = useState(
    () => typeof sessionStorage !== 'undefined' &&
          sessionStorage.getItem(DISMISS_KEY) === '1'
  );

  useEffect(() => {
    const mq = window.matchMedia('(orientation: portrait)');
    const handler = () => setIsPortrait(detectPortrait());
    mq.addEventListener('change', handler);
    window.addEventListener('resize', handler);
    return () => {
      mq.removeEventListener('change', handler);
      window.removeEventListener('resize', handler);
    };
  }, []);

  if (!isPortrait || dismissed) return null;

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, '1');
    setDismissed(true);
  };

  return (
    <div className="portrait-hint" role="status" aria-live="polite">
      <span>📱 橫向體驗更佳</span>
      <button onClick={dismiss} aria-label="關閉提示">✕</button>
    </div>
  );
}
