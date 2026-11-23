/**
 * 震動回饋（僅支援 navigator.vibrate 的裝置，iOS Safari 不支援會自動略過）。
 * 尊重遊戲的靜音設定：靜音時不震動。
 */
import {soundService} from './soundService';

export function vibrate(pattern: number | number[]): void {
  try {
    if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return;
    if (soundService.isMuted()) return;
    navigator.vibrate(pattern);
  } catch {
    // 某些瀏覽器在非使用者互動時會拋錯，直接忽略
  }
}
