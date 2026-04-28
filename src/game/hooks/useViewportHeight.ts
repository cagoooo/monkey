/**
 * 維護 `--vh` CSS 變數對應 1% 視窗高度。
 *
 * 為什麼：iOS Safari 的 `100vh` 包含被 URL bar 遮住的區域，
 * 導致 fullscreen 下容器超出可視範圍。改用 `calc(var(--vh) * 100)`
 * 並在 resize / orientationchange 時即時更新即可解決。
 */

import {useEffect} from 'react';

export function useViewportHeight() {
  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);

    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);
}
