/**
 * 開始畫面（顯示在 showStartScreen 為 true 時）。
 *
 * 功能：玩家命名、重力值設定、音效切換、全螢幕、開始遊戲。
 * 純展示元件，所有狀態與動作都從父層用 props 傳入。
 */

import {Volume2, VolumeX} from 'lucide-react';
import {motion} from 'motion/react';
import {BananaOrbit} from './decorations';

interface StartScreenProps {
  p1NameInput: string;
  p2NameInput: string;
  gravityInput: string;
  isMuted: boolean;
  isFullscreen: boolean;
  onP1NameChange: (v: string) => void;
  onP2NameChange: (v: string) => void;
  onGravityChange: (v: string) => void;
  onStartGame: () => void;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
}

export function StartScreen({
  p1NameInput,
  p2NameInput,
  gravityInput,
  isMuted,
  isFullscreen,
  onP1NameChange,
  onP2NameChange,
  onGravityChange,
  onStartGame,
  onToggleMute,
  onToggleFullscreen,
}: StartScreenProps) {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      className="absolute inset-0 bg-[#0000AA] z-50 flex flex-col items-center justify-start md:justify-center p-4 md:p-8 overflow-y-auto"
    >
      <div className="relative mb-4 md:mb-12 mt-4 md:mt-0">
        <BananaOrbit />
        <motion.h1
          initial={{y: -50, scale: 0.5}}
          animate={{y: 0, scale: 1}}
          className="text-5xl md:text-9xl font-bold text-yellow-400 drop-shadow-[0_4px_0_rgba(0,0,0,1)] md:drop-shadow-[0_8px_0_rgba(0,0,0,1)] text-center relative z-10"
        >
          猴子丟香蕉
        </motion.h1>
      </div>

      <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.9}}
        onClick={onStartGame}
        className="retro-button text-2xl md:text-4xl px-8 md:px-12 py-4 md:py-6 mb-4 md:mb-12"
      >
        開始遊戲
      </motion.button>

      <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.9}}
        onClick={onToggleMute}
        className="retro-button flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 mb-4 md:mb-12 text-sm md:text-base"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        {isMuted ? '音效: 關閉' : '音效: 開啟'}
      </motion.button>

      <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-4 md:mb-12 w-full max-w-2xl px-4">
        <div className="flex-1 flex flex-col gap-1 md:gap-2">
          <label className="text-[10px] md:text-sm uppercase opacity-70 text-center">玩家一 名稱</label>
          <input
            type="text"
            value={p1NameInput}
            onChange={e => onP1NameChange(e.target.value)}
            placeholder="玩家一"
            className="retro-input w-full text-center text-lg md:text-xl"
          />
        </div>
        <div className="flex-1 flex flex-col gap-1 md:gap-2">
          <label className="text-[10px] md:text-sm uppercase opacity-70 text-center">玩家二 名稱</label>
          <input
            type="text"
            value={p2NameInput}
            onChange={e => onP2NameChange(e.target.value)}
            placeholder="玩家二"
            className="retro-input w-full text-center text-lg md:text-xl"
          />
        </div>
      </div>

      <div className="mt-auto w-full flex flex-col items-center gap-2 md:gap-4 pb-8 md:pb-0">
        <div className="flex flex-col items-center gap-1 md:gap-2">
          <label className="text-[10px] md:text-sm uppercase opacity-70">重力值設定</label>
          <div className="flex items-center gap-2 md:gap-3">
            <input
              type="number"
              step="0.1"
              value={gravityInput}
              onChange={e => onGravityChange(e.target.value)}
              placeholder="預設地球Ｇ=9.8"
              className="retro-input w-32 md:w-48 text-center text-lg md:text-xl"
            />
            <span className="text-lg md:text-xl opacity-50">m/s²</span>
          </div>
        </div>

        <button
          onClick={onToggleFullscreen}
          className="retro-button text-xs md:text-sm px-4 md:px-6 py-2 mt-2 md:mt-4"
        >
          {isFullscreen ? '退出全螢幕' : '全螢幕'}
        </button>
      </div>

      <div className="absolute bottom-4 right-4 text-xs opacity-50 text-right">
        <div>ＡＮＴＹＥＨ修正</div>
        <div className="text-[10px] mt-1">v1.3.0</div>
      </div>
    </motion.div>
  );
}
