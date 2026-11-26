/**
 * 高分提交 Modal — 比賽結束且擠進 top 5 時跳出。
 *
 * 純展示元件，狀態與動作從 useScoreSubmission hook 傳入。
 * 名稱組合規則：「N年N班N號」必須符合 firestore.rules 的 regex。
 */

import {Medal, Send} from 'lucide-react';
import {motion, AnimatePresence} from 'motion/react';

interface ScoreEntryModalProps {
  show: boolean;
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

export function ScoreEntryModal({
  show,
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
}: ScoreEntryModalProps) {
  const canSubmit = !!gradeInput && !!classInput && !!numberInput && !isSubmitting;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{scale: 0.9, y: 20}}
            animate={{scale: 1, y: 0}}
            className="bg-[#0000AA] border-8 border-white p-[2em] max-w-[28em] w-full shadow-2xl text-center text-base @2xl:text-[max(16px,1.7cqw)]"
          >
            <Medal className="w-[3em] h-[3em] text-yellow-400 mx-auto mb-[1em] animate-bounce" />
            <h2 className="text-[1.875em] font-bold mb-[0.3em]">榮登英雄榜！</h2>
            <p className="text-[1.125em] mb-[1.3em]">
              恭喜獲得 <span className="text-yellow-400 font-bold">{pendingScore?.score}</span> 分
            </p>

            <div className="space-y-[1em] mb-[2em]">
              <p className="text-[0.875em] opacity-80">請輸入您的個人資料：</p>
              <div className="flex gap-[0.5em] justify-center items-center">
                <div className="flex flex-col gap-1">
                  <input
                    type="number"
                    placeholder="年級"
                    value={gradeInput}
                    onChange={e => onGradeChange(e.target.value)}
                    className="retro-input w-[4em] text-center text-[1.25em]"
                  />
                  <span className="text-[0.8em] opacity-60">年級</span>
                </div>
                <span className="text-[1.25em] font-bold">-</span>
                <div className="flex flex-col gap-1">
                  <input
                    type="number"
                    placeholder="班級"
                    value={classInput}
                    onChange={e => onClassChange(e.target.value)}
                    className="retro-input w-[4em] text-center text-[1.25em]"
                  />
                  <span className="text-[0.8em] opacity-60">班級</span>
                </div>
                <span className="text-[1.25em] font-bold">-</span>
                <div className="flex flex-col gap-1">
                  <input
                    type="number"
                    placeholder="座號"
                    value={numberInput}
                    onChange={e => onNumberChange(e.target.value)}
                    className="retro-input w-[4em] text-center text-[1.25em]"
                  />
                  <span className="text-[0.8em] opacity-60">座號</span>
                </div>
              </div>

              {submissionError && (
                <p className="text-red-400 text-[0.875em] font-bold animate-pulse">{submissionError}</p>
              )}
            </div>

            <div className="flex flex-col gap-[0.75em]">
              <button
                onClick={onSubmit}
                disabled={!canSubmit}
                className="retro-button w-full flex items-center justify-center gap-[0.5em] py-[1em] text-[1.1em] disabled:opacity-50"
              >
                {isSubmitting ? '傳送中...' : <><Send className="w-[1.2em] h-[1.2em]" /> 登錄英雄榜</>}
              </button>

              {!isSubmitting && (
                <button
                  onClick={onCancel}
                  className="text-white/60 hover:text-white text-[0.875em] underline"
                >
                  暫不登錄
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
