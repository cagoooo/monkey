/**
 * 訂閱 Firestore 排行榜並回傳即時 top N。
 *
 * 用 onSnapshot 串接，hook unmount 時自動取消訂閱。
 * Firebase 內部錯誤已在 firebase.ts 的 onSnapshot 內處理（console.error）。
 */

import {useEffect, useState} from 'react';
import {getTopScores, LeaderboardEntry} from '../../firebase';

export function useLeaderboard(): LeaderboardEntry[] {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const unsubscribe = getTopScores(setLeaderboard);
    return () => unsubscribe();
  }, []);

  return leaderboard;
}
