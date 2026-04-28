/**
 * 高分提交流程的封裝。
 *
 * 包含：
 * - Modal 顯示狀態（showScoreEntry）
 * - 待提交分數（pendingScore）
 * - 三個輸入欄位（年級 / 班級 / 座號）
 * - 提交時的 loading 與 error 狀態
 * - 10 秒 timeout 機制
 * - 成功後自動清空表單
 *
 * 名稱組合規則：`${grade}年${class}班${number}號`，必須符合 firestore.rules
 * 的 regex：`^\d{1,2}年\d{1,3}班\d{1,3}號$`
 */

import {useState, useCallback} from 'react';
import {saveHighScore, LeaderboardEntry} from '../../firebase';

const SUBMIT_TIMEOUT_MS = 10_000;
const TOP_N = 5;

export interface UseScoreSubmissionReturn {
  // 狀態（給 modal UI 用）
  showScoreEntry: boolean;
  pendingScore: {name: string; score: number} | null;
  gradeInput: string;
  classInput: string;
  numberInput: string;
  isSubmitting: boolean;
  submissionError: string | null;

  // 設定 input
  setGradeInput: (v: string) => void;
  setClassInput: (v: string) => void;
  setNumberInput: (v: string) => void;

  // 流程動作
  /** 比賽結束時呼叫，會自動判斷是否擠進 top N，是的話跳出 modal */
  checkHighScore: (
    leaderboard: LeaderboardEntry[],
    score: number,
    name: string
  ) => void;
  /** 送出表單到 Firestore */
  submitHighScore: () => Promise<void>;
  /** 取消 / 重置（給「重新開始」按鈕用）*/
  reset: () => void;
}

export function useScoreSubmission(): UseScoreSubmissionReturn {
  const [showScoreEntry, setShowScoreEntry] = useState(false);
  const [pendingScore, setPendingScore] = useState<
    {name: string; score: number} | null
  >(null);
  const [gradeInput, setGradeInput] = useState('');
  const [classInput, setClassInput] = useState('');
  const [numberInput, setNumberInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const checkHighScore = useCallback(
    (leaderboard: LeaderboardEntry[], score: number, name: string) => {
      const isTopN =
        leaderboard.length < TOP_N ||
        score > leaderboard[leaderboard.length - 1].score;
      if (isTopN && score > 0) {
        setPendingScore({name, score});
        setShowScoreEntry(true);
      }
    },
    []
  );

  const submitHighScore = useCallback(async () => {
    if (!gradeInput || !classInput || !numberInput || !pendingScore) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error('傳送超時，請檢查網路連線')),
        SUBMIT_TIMEOUT_MS
      )
    );

    try {
      const fullName = `${gradeInput}年${classInput}班${numberInput}號`;
      await Promise.race([
        saveHighScore(fullName, pendingScore.score),
        timeoutPromise,
      ]);
      setShowScoreEntry(false);
      setPendingScore(null);
      setGradeInput('');
      setClassInput('');
      setNumberInput('');
    } catch (err) {
      console.error('Failed to submit score:', err);
      setSubmissionError(
        err instanceof Error ? err.message : '傳送失敗，請稍後再試'
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [gradeInput, classInput, numberInput, pendingScore]);

  const reset = useCallback(() => {
    setShowScoreEntry(false);
    setPendingScore(null);
    setSubmissionError(null);
  }, []);

  return {
    showScoreEntry,
    pendingScore,
    gradeInput,
    classInput,
    numberInput,
    isSubmitting,
    submissionError,
    setGradeInput,
    setClassInput,
    setNumberInput,
    checkHighScore,
    submitHighScore,
    reset,
  };
}
