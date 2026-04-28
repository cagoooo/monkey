/**
 * submitScore — 高分提交 Cloud Function（取代前端直寫 Firestore）。
 *
 * 三層防線：
 * 1. **Schema 驗證**：name 必須符合「N年N班N號」regex；score 必須整數 0–9999
 * 2. **Rate limit**：同一個 name 60 秒內只能提交 1 次（防腳本連發）
 * 3. **可疑值偵測**：score 過高（>5000）或同 name 短時間多次都登 log，方便事後追查
 *
 * 因為由 Function 寫入而非前端，未來可以讓 firestore.rules 完全 deny client write，
 * 達到 A5 規則層的進化版（B6 目標）。
 *
 * 注意：Cloud Functions 免費層每月 200 萬次叫用，教學用排行榜（一場玩 10 分鐘
 * 才送 1 次分數）一個月用不到 1000 次，永遠不會收費。
 */

import {onCall, HttpsError} from 'firebase-functions/v2/https';
import {logger} from 'firebase-functions/v2';
import {getFirestore, FieldValue} from 'firebase-admin/firestore';

const NAME_REGEX = /^\d{1,2}年\d{1,3}班\d{1,3}號$/;
const MIN_SCORE = 0;
const MAX_SCORE = 9999;
const SUSPICIOUS_SCORE_THRESHOLD = 5000;
const RATE_LIMIT_SECONDS = 60;

interface SubmitScoreData {
  name?: unknown;
  score?: unknown;
}

export const submitScore = onCall<SubmitScoreData>(async request => {
  const {name, score} = request.data;

  // ── 1. Schema 驗證 ──
  if (typeof name !== 'string') {
    throw new HttpsError('invalid-argument', 'name must be a string');
  }
  if (!NAME_REGEX.test(name)) {
    throw new HttpsError(
      'invalid-argument',
      'name must match pattern: ^\\d{1,2}年\\d{1,3}班\\d{1,3}號$'
    );
  }

  if (typeof score !== 'number' || !Number.isInteger(score)) {
    throw new HttpsError('invalid-argument', 'score must be an integer');
  }
  if (score < MIN_SCORE || score > MAX_SCORE) {
    throw new HttpsError(
      'invalid-argument',
      `score must be between ${MIN_SCORE} and ${MAX_SCORE}`
    );
  }

  const db = getFirestore();

  // ── 2. Rate limit：同 name 60 秒內只能提交 1 次 ──
  const recentCutoff = new Date(Date.now() - RATE_LIMIT_SECONDS * 1000);
  const recentQuery = await db
    .collection('leaderboard')
    .where('name', '==', name)
    .where('timestamp', '>', recentCutoff)
    .limit(1)
    .get();

  if (!recentQuery.empty) {
    logger.warn('Rate limit hit', {name, ip: request.rawRequest.ip});
    throw new HttpsError(
      'resource-exhausted',
      `Same name submitted within ${RATE_LIMIT_SECONDS}s. Please wait.`
    );
  }

  // ── 3. 可疑值偵測（不擋，但記 log）──
  if (score > SUSPICIOUS_SCORE_THRESHOLD) {
    logger.info('High score submission', {
      name,
      score,
      ip: request.rawRequest.ip,
    });
  }

  // ── 4. 寫入 Firestore（server timestamp 由 admin 強制注入）──
  await db.collection('leaderboard').add({
    name,
    score,
    timestamp: FieldValue.serverTimestamp(),
  });

  logger.info('Score submitted', {name, score});

  return {ok: true, name, score};
});
