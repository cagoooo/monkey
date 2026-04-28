/**
 * Cloud Functions for monkey-pixel-clash
 *
 * 設計原則（依 gemini-free-tier-first 與 firebase-multi-app-safety skill）：
 * - region: asia-east1（台灣最快）
 * - maxInstances: 10（防爆炸燒錢）
 * - codebase 命名前綴 monkey_*（未來同專案多 app 不衝突）
 * - 部署指令：firebase deploy --only functions:monkey
 */

import {setGlobalOptions} from 'firebase-functions/v2';
import {initializeApp} from 'firebase-admin/app';

// 全域成本護欄（每個 function 都繼承）
setGlobalOptions({
  region: 'asia-east1',
  maxInstances: 10, // 教學用排行榜，10 個並發夠用
  memory: '256MiB', // 預設 256MB 即可
  timeoutSeconds: 30,
});

initializeApp();

// 把所有 functions export 出來，前端用 monkey_submitScore 之類的名字呼叫
export {submitScore as monkey_submitScore} from './submitScore';
