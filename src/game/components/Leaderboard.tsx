/**
 * 排行榜面板（比賽結束畫面右側、寬螢幕側欄）。
 *
 * 純展示元件。沒有取得資料的責任 — 由父層呼叫 `useLeaderboard()` 後 props 傳進來，
 * 排行榜空時會 fallback 顯示 placeholder（預設 5 條）。
 * 內部尺寸都用 em：父層用 className 改根字級，整塊就等比放大縮小（預設 16px）。
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

export function Leaderboard({
  entries,
  compact = false,
  className = 'text-base',
}: {
  entries: LeaderboardEntry[];
  compact?: boolean;
  className?: string;
}) {
  const displayBoard = entries.length > 0 ? entries : PLACEHOLDER;

  return (
    <div
      className={`flex-1 w-full bg-black/50 border-4 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)] ${
        compact ? 'p-[1.25em]' : 'p-[1.5em]'
      } ${className}`}
    >
      <div className={`flex items-center justify-center gap-[0.75em] ${compact ? 'mb-[1em]' : 'mb-[1.25em]'}`}>
        <Medal className="text-yellow-400 w-[2em] h-[2em]" />
        <h3 className="text-[1.875em] font-black text-white italic tracking-tighter">英雄榜</h3>
      </div>

      <div className="space-y-[0.75em]">
        {displayBoard.map((entry, idx) => (
          <div
            key={entry.id}
            className={`flex items-center justify-between gap-[0.5em] px-[0.75em] py-[0.6em] border-2 ${
              idx === 0 ? 'bg-yellow-400/20 border-yellow-400' : 'bg-white/5 border-white/20'
            }`}
          >
            <div className="flex items-center gap-[0.75em] min-w-0">
              <span className={`text-[1.25em] font-black w-[1.2em] shrink-0 ${idx === 0 ? 'text-yellow-400' : 'text-white/50'}`}>
                {idx + 1}
              </span>
              <span className="text-[1.125em] font-bold text-white truncate">{entry.name}</span>
            </div>
            <span className="text-[1.5em] font-black text-yellow-400 font-mono shrink-0">{entry.score}</span>
          </div>
        ))}
      </div>

      <div className={`border-t border-white/20 text-center ${compact ? 'mt-[1.25em] pt-[1em]' : 'mt-[1.5em] pt-[1.25em]'}`}>
        <p className="text-[0.875em] tracking-widest opacity-60">只有最強的猩猩才能名留青史</p>
      </div>
    </div>
  );
}
