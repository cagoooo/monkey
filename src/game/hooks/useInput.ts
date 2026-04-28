/**
 * Canvas 輸入處理 hook：滑鼠 + 觸控的 down / move / up。
 *
 * 設計原則：
 * - 6 個 handler 都用 `setGameState(prev => ...)` 同步更新狀態，不直接讀 gameState
 *   因此 hook 不需要把 gameState 當依賴，避免不必要的 re-binding
 * - 玩家 1 限左半邊、玩家 2 限右半邊（兩種 input 都各自實作）
 * - drag 距離計算 → 拋射角度與初速（彈弓概念，拖越遠力越大）
 * - 拖曳力道 < 10 視為點按，不發射只取消瞄準
 */

import {Dispatch, RefObject, SetStateAction, useCallback} from 'react';
import {GameState} from '../types';
import {CANVAS_WIDTH, CANVAS_HEIGHT} from '../constants';
import {soundService} from '../../services/soundService';

interface UseInputArgs {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  setGameState: Dispatch<SetStateAction<GameState | null>>;
  setMessage: (msg: string) => void;
}

export function useInput({canvasRef, setGameState, setMessage}: UseInputArgs) {
  /** 從 client 座標換算到 canvas 內部座標 */
  const toCanvasCoords = useCallback(
    (clientX: number, clientY: number) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return null;
      return {
        x: (clientX - rect.left) * (CANVAS_WIDTH / rect.width),
        y: (clientY - rect.top) * (CANVAS_HEIGHT / rect.height),
      };
    },
    [canvasRef]
  );

  /** 處理「按下」共用邏輯 — 檢查回合是 aiming + 玩家在自己半邊 */
  const startAim = useCallback(
    (x: number, y: number) => {
      setGameState(prev => {
        if (!prev || prev.status !== 'aiming') return prev;

        // Control area restriction
        if (prev.currentPlayer === 1 && x > CANVAS_WIDTH / 2) {
          setMessage('玩家一只能觸控左半邊螢幕！');
          setTimeout(() => setMessage(`${prev.playerNames[0]} 的回合`), 1500);
          return prev;
        }
        if (prev.currentPlayer === 2 && x < CANVAS_WIDTH / 2) {
          setMessage('玩家二只能觸控右半邊螢幕！');
          setTimeout(() => setMessage(`${prev.playerNames[1]} 的回合`), 1500);
          return prev;
        }

        soundService.playPull();

        return {
          ...prev,
          dragStart: {x, y},
          dragCurrent: {x, y},
        };
      });
    },
    [setGameState, setMessage]
  );

  /** 處理「拖曳」共用邏輯 — 限制 dragCurrent 在自己半邊內 */
  const moveAim = useCallback(
    (x: number, y: number) => {
      setGameState(prev => {
        if (!prev) return null;

        if (prev.status === 'aiming' && prev.dragStart) {
          const finalX =
            prev.currentPlayer === 1
              ? Math.min(x, CANVAS_WIDTH / 2)
              : Math.max(x, CANVAS_WIDTH / 2);

          return {...prev, dragCurrent: {x: finalX, y}};
        }
        return prev;
      });
    },
    [setGameState]
  );

  /** 放開 → 計算發射 */
  const releaseAim = useCallback(() => {
    setGameState(prev => {
      if (!prev || prev.status !== 'aiming' || !prev.dragStart || !prev.dragCurrent) {
        return prev;
      }

      const dx = prev.dragCurrent.x - prev.dragStart.x;
      const dy = prev.dragCurrent.y - prev.dragStart.y;

      const angleRad = Math.atan2(dy, prev.currentPlayer === 1 ? -dx : dx);
      const angleDeg = angleRad * (180 / Math.PI);

      const dist = Math.sqrt(dx * dx + dy * dy);
      const velocity = Math.min(dist * 2.55, 255);

      // 力道 < 10 視為點按，不發射
      if (velocity <= 10) {
        return {...prev, dragStart: null, dragCurrent: null};
      }

      const rad =
        (prev.currentPlayer === 1 ? -angleDeg : angleDeg + 180) * (Math.PI / 180);
      const vx = Math.cos(rad) * (velocity / 8);
      const vy = Math.sin(rad) * (velocity / 8);

      const startPos =
        prev.currentPlayer === 1 ? {...prev.player1Pos} : {...prev.player2Pos};
      const currentWeapon =
        prev.currentPlayer === 1 ? prev.player1Projectile : prev.player2Projectile;

      return {
        ...prev,
        status: 'throwing',
        roundCount: prev.roundCount + 1,
        throwStartTime: Date.now(),
        dragStart: null,
        dragCurrent: null,
        player1Projectile: prev.currentPlayer === 1 ? 'normal' : prev.player1Projectile,
        player2Projectile: prev.currentPlayer === 2 ? 'normal' : prev.player2Projectile,
        banana: {
          pos: startPos,
          vel: {x: vx, y: vy},
          trail: [startPos],
          angle: 0,
          type: currentWeapon,
          hasHitSun: false,
        },
      };
    });
  }, [setGameState]);

  // ── 滑鼠事件 ──
  const handleCanvasMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const pos = toCanvasCoords(e.clientX, e.clientY);
      if (!pos) return;
      startAim(pos.x, pos.y);
    },
    [toCanvasCoords, startAim]
  );

  const handleCanvasMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const pos = toCanvasCoords(e.clientX, e.clientY);
      if (!pos) return;

      // 處理 cursor 樣式（瞄準太陽用 pointer，否則 default）
      setGameState(prev => {
        if (!prev) return prev;
        if (prev.status === 'aiming' && prev.dragStart) {
          // 拖曳中走 moveAim 邏輯
          const finalX =
            prev.currentPlayer === 1
              ? Math.min(pos.x, CANVAS_WIDTH / 2)
              : Math.max(pos.x, CANVAS_WIDTH / 2);
          return {...prev, dragCurrent: {x: finalX, y: pos.y}};
        }
        // 沒拖曳時更新 cursor
        const dx = pos.x - prev.sunPos.x;
        const dy = pos.y - prev.sunPos.y;
        canvas.style.cursor = dx * dx + dy * dy < 35 * 35 ? 'pointer' : 'default';
        return prev;
      });
    },
    [canvasRef, toCanvasCoords, setGameState]
  );

  const handleCanvasMouseUp = useCallback(() => {
    releaseAim();
  }, [releaseAim]);

  // ── 觸控事件 ──
  const handleCanvasTouchStart = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      const touch = e.touches[0];
      const pos = toCanvasCoords(touch.clientX, touch.clientY);
      if (!pos) return;
      startAim(pos.x, pos.y);
    },
    [toCanvasCoords, startAim]
  );

  const handleCanvasTouchMove = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      const touch = e.touches[0];
      const pos = toCanvasCoords(touch.clientX, touch.clientY);
      if (!pos) return;
      moveAim(pos.x, pos.y);
    },
    [toCanvasCoords, moveAim]
  );

  const handleCanvasTouchEnd = useCallback(() => {
    releaseAim();
  }, [releaseAim]);

  return {
    handleCanvasMouseDown,
    handleCanvasMouseMove,
    handleCanvasMouseUp,
    handleCanvasTouchStart,
    handleCanvasTouchMove,
    handleCanvasTouchEnd,
  };
}
