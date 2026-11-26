/**
 * 比賽結束畫面（status === 'tournamentOver'）。
 *
 * 左側：勝者宣告 + 每回合得分表 + 重新開始按鈕
 * 右側：英雄榜（Leaderboard）
 * Modal：高分提交（ScoreEntryModal，擠進 top 5 時自動跳出）
 *
 * 為了把 App.tsx 縮短，所有狀態與 callback 都用 props 傳進來。
 */

import {Trophy} from 'lucide-react';
import {motion} from 'motion/react';
import {GameState} from '../types';
import {LeaderboardEntry} from '../../firebase';
import {BeatingGorilla} from './decorations';
import {Leaderboard} from './Leaderboard';
import {ScoreEntryModal} from './ScoreEntryModal';

interface WinnerScreenProps {
  gameState: GameState;
  leaderboard: LeaderboardEntry[];
  onResetToStart: () => void;

  // ScoreEntryModal props（從 useScoreSubmission 傳遞）
  showScoreEntry: boolean;
  pendingScore: {name: string; score: number} | null;
  gradeInput: string;
  classInput: string;
  numberInput: string;
  isSubmitting: boolean;
  submissionError: string | null;
  onGradeChange: (v: string) => void;
  onClassChange: (v: string) => void;
  onNumberChange: (v: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export function WinnerScreen({
  gameState,
  leaderboard,
  onResetToStart,
  showScoreEntry,
  pendingScore,
  gradeInput,
  classInput,
  numberInput,
  isSubmitting,
  submissionError,
  onGradeChange,
  onClassChange,
  onNumberChange,
  onSubmit,
  onCancel,
}: WinnerScreenProps) {
  const winnerName =
    gameState.tournamentWinner === 1
      ? gameState.playerNames[0]
      : gameState.playerNames[1];

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      // 遊戲框夠寬（≥ 672px，@2xl 容器查詢）時：上方「獎盃＋恭喜贏家」橫排，
      // 下方左欄得分表與重新開始、右欄英雄榜；字級用 cqw 跟著遊戲框放大，一個畫面放得下。
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#0000AA] z-[60] overflow-y-auto py-12 @2xl:py-[2cqw] @2xl:px-[4cqw]"
    >
      <div className="relative flex flex-col items-center gap-12 @2xl:gap-[2cqw] max-w-6xl @2xl:max-w-none w-full px-8 @2xl:px-0">
        {/* 上方：獎盃＋勝者宣告 */}
        <div className="flex flex-col items-center @2xl:flex-row @2xl:justify-center @2xl:gap-[3.5cqw]">
          <div className="flex flex-col items-center shrink-0">
            {/* Gorilla on top of Trophy */}
            <div className="mb-[-10px] z-10">
              <BeatingGorilla color="#FFCC99" />
            </div>
            <Trophy size={160} className="text-yellow-400 drop-shadow-2xl @2xl:w-[10cqw] @2xl:h-[10cqw]" />
          </div>

          <div className="flex flex-col items-center @2xl:items-start">
            <motion.h2
              initial={{y: 20, opacity: 0}}
              animate={{y: 0, opacity: 1}}
              transition={{delay: 0.5}}
              className="text-4xl md:text-6xl @2xl:text-[7cqw] font-bold text-white mt-8 mb-4 @2xl:mt-0 @2xl:mb-[0.8cqw] drop-shadow-lg text-center @2xl:text-left leading-tight"
            >
              恭喜贏家
            </motion.h2>

            <motion.p
              initial={{scale: 0.5, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
              transition={{delay: 0.8}}
              className="text-2xl md:text-3xl @2xl:text-[3.8cqw] text-yellow-400 font-bold text-center @2xl:text-left"
            >
              {winnerName} 統治了城市！
            </motion.p>
          </div>
        </div>

        {/* 下方：左欄得分表＋按鈕，右欄英雄榜 */}
        <div className="flex flex-col items-center gap-12 @2xl:gap-[3cqw] w-full @2xl:flex-row @2xl:items-stretch">
        <div className="flex flex-col items-center flex-1 w-full @2xl:justify-center @2xl:gap-[2.5cqw]">
          {/* Round History Table */}
          <motion.div
            initial={{y: 20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{delay: 1}}
            className="bg-black/40 border-2 border-white/30 p-4 @2xl:p-[2cqw] mb-8 @2xl:mb-0 w-full max-w-md @2xl:max-w-none"
          >
            <h3 className="text-sm @2xl:text-[max(14px,2cqw)] font-bold opacity-80 mb-4 @2xl:mb-[1.2cqw] text-center">每回合得分比較</h3>
            <div className="grid grid-cols-3 gap-4 text-center border-b border-white/20 pb-2 mb-2 @2xl:pb-[0.8cqw] @2xl:mb-[0.8cqw]">
              <div className="text-[10px] @2xl:text-[max(13px,1.8cqw)] uppercase opacity-60">回合</div>
              <div className="text-xs @2xl:text-[max(13px,1.8cqw)] font-bold truncate text-cyan-300">{gameState.playerNames[0]}</div>
              <div className="text-xs @2xl:text-[max(13px,1.8cqw)] font-bold truncate text-red-300">{gameState.playerNames[1]}</div>
            </div>
            <div className="max-h-40 @2xl:max-h-[18cqw] overflow-y-auto custom-scrollbar">
              {gameState.roundHistory.p1.map((p1Score, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-3 gap-4 text-center py-1 @2xl:py-[0.5cqw] border-b border-white/5 last:border-0"
                >
                  <div className="text-xs @2xl:text-[max(14px,2.2cqw)] opacity-50">{idx + 1}</div>
                  <div
                    className={`text-sm @2xl:text-[max(14px,2.4cqw)] ${
                      p1Score > gameState.roundHistory.p2[idx]
                        ? 'text-yellow-400 font-bold'
                        : 'text-white'
                    }`}
                  >
                    {p1Score}
                  </div>
                  <div
                    className={`text-sm @2xl:text-[max(14px,2.4cqw)] ${
                      gameState.roundHistory.p2[idx] > p1Score
                        ? 'text-yellow-400 font-bold'
                        : 'text-white'
                    }`}
                  >
                    {gameState.roundHistory.p2[idx]}
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 text-center pt-2 mt-2 @2xl:pt-[0.8cqw] @2xl:mt-[0.8cqw] border-t border-white/20 font-bold">
              <div className="text-xs @2xl:text-[max(13px,1.8cqw)] uppercase opacity-60 self-center">總計</div>
              <div className="text-yellow-400 @2xl:text-[max(18px,3cqw)]">
                {gameState.roundHistory.p1.reduce((a, b) => a + b, 0)}
              </div>
              <div className="text-yellow-400 @2xl:text-[max(18px,3cqw)]">
                {gameState.roundHistory.p2.reduce((a, b) => a + b, 0)}
              </div>
            </div>
          </motion.div>

          <button
            onClick={onResetToStart}
            className="retro-button text-xl md:text-2xl @2xl:text-[3cqw] px-8 md:px-12 @2xl:px-[4cqw] py-4 md:py-6 @2xl:py-[1.3cqw]"
          >
            重新開始新賽局
          </button>
        </div>

        {/* Right Side: Leaderboard */}
        <motion.div
          initial={{x: 50, opacity: 0}}
          animate={{x: 0, opacity: 1}}
          transition={{delay: 1.2}}
          className="flex-1 w-full max-w-md @2xl:max-w-none flex"
        >
          <Leaderboard entries={leaderboard} compact className="text-base @2xl:text-[max(13px,1.55cqw)]" />
        </motion.div>
        </div>
      </div>

      {/* High Score Entry Modal */}
      <ScoreEntryModal
        show={showScoreEntry}
        pendingScore={pendingScore}
        gradeInput={gradeInput}
        classInput={classInput}
        numberInput={numberInput}
        isSubmitting={isSubmitting}
        submissionError={submissionError}
        onGradeChange={onGradeChange}
        onClassChange={onClassChange}
        onNumberChange={onNumberChange}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </motion.div>
  );
}
