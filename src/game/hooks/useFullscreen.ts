/**
 * 全螢幕狀態管理 hook。
 *
 * 同時支援：
 * - 真實 Fullscreen API（桌機 / Android Chrome）
 * - Pseudo-fullscreen fallback（iOS Safari 不支援 Fullscreen API）
 *
 * 監聽 fullscreenchange 事件，使用者按 ESC 退出時也會同步狀態。
 */

import {RefObject, useEffect, useState, useCallback} from 'react';

export interface UseFullscreenReturn {
  /** 真實全螢幕或 pseudo 都算 true */
  isFullscreen: boolean;
  /** 是否走 fallback 模式 */
  isPseudoFullscreen: boolean;
  /** 切換全螢幕狀態 */
  toggle: () => void;
  /** 強制進入全螢幕（給「開始遊戲時自動進入」用）*/
  enter: () => void;
}

export function useFullscreen(
  containerRef: RefObject<HTMLElement | null>
): UseFullscreenReturn {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPseudoFullscreen, setIsPseudoFullscreen] = useState(false);

  useEffect(() => {
    const handler = () => {
      const isFull = !!document.fullscreenElement;
      setIsFullscreen(isFull);
      if (!isFull) setIsPseudoFullscreen(false);
    };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const enter = useCallback(() => {
    if (document.fullscreenElement || isPseudoFullscreen) return;
    containerRef.current?.requestFullscreen().catch(err => {
      console.warn(`Real fullscreen failed, using pseudo-fullscreen: ${err.message}`);
      setIsPseudoFullscreen(true);
      setIsFullscreen(true);
    });
  }, [containerRef, isPseudoFullscreen]);

  const toggle = useCallback(() => {
    if (!document.fullscreenElement && !isPseudoFullscreen) {
      enter();
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      setIsPseudoFullscreen(false);
      setIsFullscreen(false);
    }
  }, [enter, isPseudoFullscreen]);

  return {isFullscreen, isPseudoFullscreen, toggle, enter};
}
