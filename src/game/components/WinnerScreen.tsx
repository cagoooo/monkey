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
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#0000AA] z-[60] overflow-y-auto py-12"
    >
      <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-12 max-w-6xl w-full px-8">
        {/* Left Side: Winner Info */}
        <div className="flex flex-col items-center flex-1">
          {/* Gorilla on top of Trophy */}
          <div className="mb-[-10px] z-10">
            <BeatingGorilla color="#FFCC99" />
          </div>

          {/* Trophy */}
          <div className="relative">
            <Trophy size={160} className="text-yellow-400 drop-shadow-2xl" />
          </div>

          <motion.h2
            initial={{y: 20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{delay: 0.5}}
            className="text-4xl md:text-6xl font-bold text-white mt-8 mb-4 drop-shadow-lg text-center"
          >
            恭喜贏家
          </motion.h2>

          <motion.p
            initial={{scale: 0.5, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            transition={{delay: 0.8}}
            className="text-2xl md:text-3xl text-yellow-400 font-bold mb-8 text-center"
          >
            {winnerName} 統治了城市！
          </motion.p>

          {/* Round History Table */}
          <motion.div
            initial={{y: 20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{delay: 1}}
            className="bg-black/40 border-2 border-white/30 p-4 mb-8 w-full max-w-md"
          >
            <h3 className="text-sm uppercase opacity-70 mb-4 text-center">每回合得分比較</h3>
            <div className="grid grid-cols-3 gap-4 text-center border-b border-white/20 pb-2 mb-2">
              <div className="text-[10px] uppercase opacity-50">回合</div>
              <div className="text-xs font-bold truncate">{gameState.playerNames[0]}</div>
              <div className="text-xs font-bold truncate">{gameState.playerNames[1]}</div>
            </div>
            <div className="max-h-40 overflow-y-auto custom-scrollbar">
              {gameState.roundHistory.p1.map((p1Score, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-3 gap-4 text-center py-1 border-b border-white/5 last:border-0"
                >
                  <div className="text-xs opacity-50">{idx + 1}</div>
                  <div
                    className={`text-sm ${
                      p1Score > gameState.roundHistory.p2[idx]
                        ? 'text-yellow-400 font-bold'
                        : 'text-white'
                    }`}
                  >
                    {p1Score}
                  </div>
                  <div
                    className={`text-sm ${
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
            <div className="grid grid-cols-3 gap-4 text-center pt-2 mt-2 border-t border-white/20 font-bold">
              <div className="text-xs uppercase opacity-50">總計</div>
              <div className="text-yellow-400">
                {gameState.roundHistory.p1.reduce((a, b) => a + b, 0)}
              </div>
              <div className="text-yellow-400">
                {gameState.roundHistory.p2.reduce((a, b) => a + b, 0)}
              </div>
            </div>
          </motion.div>

          <button
            onClick={onResetToStart}
            className="retro-button text-xl md:text-2xl px-8 md:px-12 py-4 md:py-6"
          >
            重新開始新賽局
          </button>
        </div>

        {/* Right Side: Leaderboard */}
        <motion.div
          initial={{x: 50, opacity: 0}}
          animate={{x: 0, opacity: 1}}
          transition={{delay: 1.2}}
          className="flex-1 w-full max-w-md"
        >
          <Leaderboard entries={leaderboard} />
        </motion.div>
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
