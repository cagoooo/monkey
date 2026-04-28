/**
 * 排行榜面板（用在比賽結束畫面右側）。
 *
 * 純展示元件。沒有取得資料的責任 — 由父層呼叫 `useLeaderboard()` 後 props 傳進來，
 * 排行榜空時會 fallback 顯示 placeholder（預設 5 條）。
 */

import {Medal} from 'lucide-react';
import {LeaderboardEntry} from '../../firebase';

const PLACEHOLDER: LeaderboardEntry[] = Array(5)
  .fill(null)
  .map((_, i) => ({
    id: `default-${i}`,
    name: '301-27號',
    score: 100,
    timestamp: new Date(),
  }));

export function Leaderboard({entries}: {entries: LeaderboardEntry[]}) {
  const displayBoard = entries.length > 0 ? entries : PLACEHOLDER;

  return (
    <div className="flex-1 w-full max-w-md bg-black/50 border-4 border-yellow-400 p-6 shadow-[0_0_20px_rgba(250,204,21,0.3)]">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Medal className="text-yellow-400" size={32} />
        <h3 className="text-3xl font-black text-white italic tracking-tighter">英雄榜</h3>
      </div>

      <div className="space-y-3">
        {displayBoard.map((entry, idx) => (
          <div
            key={entry.id}
            className={`flex items-center justify-between p-3 border-2 ${
              idx === 0 ? 'bg-yellow-400/20 border-yellow-400' : 'bg-white/5 border-white/20'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className={`text-xl font-black w-6 ${idx === 0 ? 'text-yellow-400' : 'text-white/50'}`}>
                {idx + 1}
              </span>
              <span className="text-lg font-bold text-white truncate max-w-[180px]">{entry.name}</span>
            </div>
            <span className="text-2xl font-black text-yellow-400 font-mono">{entry.score}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white/20 text-center">
        <p className="text-[10px] uppercase tracking-widest opacity-50">只有最強的猩猩才能名留青史</p>
      </div>
    </div>
  );
}
