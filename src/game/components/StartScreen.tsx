/**
 * 開始畫面（顯示在 showStartScreen 為 true 時）。
 *
 * 功能：玩家命名、重力值設定、音效切換、全螢幕、開始遊戲。
 * 純展示元件，所有狀態與動作都從父層用 props 傳入。
 */

import {Volume2, VolumeX} from 'lucide-react';
import {motion} from 'motion/react';
import {BananaOrbit} from './decorations';
import {THEME_LIST, ThemeId} from '../engine/themes';

interface StartScreenProps {
  p1NameInput: string;
  p2NameInput: string;
  gravityInput: string;
  themeId: ThemeId;
  isMuted: boolean;
  isFullscreen: boolean;
  onP1NameChange: (v: string) => void;
  onP2NameChange: (v: string) => void;
  onGravityChange: (v: string) => void;
  onThemeChange: (v: ThemeId) => void;
  onStartGame: () => void;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
}

export function StartScreen({
  p1NameInput,
  p2NameInput,
  gravityInput,
  themeId,
  isMuted,
  isFullscreen,
  onP1NameChange,
  onP2NameChange,
  onGravityChange,
  onThemeChange,
  onStartGame,
  onToggleMute,
  onToggleFullscreen,
}: StartScreenProps) {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      // RWD 修正：永遠 justify-start（從上往下排），避免 md:justify-center
      // 在 6 主題版面變大時把標題推出可視區外。
      // overflow-y-auto 讓內容可捲動但永遠從頂部開始。
      // 遊戲框夠寬（≥ 672px，@2xl 容器查詢）時改成兩欄：標題橫跨上方，
      // 左欄開始／音效／重力，右欄主題與玩家名稱，一個畫面放得下不必捲動。
      // 字級用 cqw（遊戲框寬度的 1%），框越大字越大。
      className="absolute inset-0 bg-[#0000AA] z-50 flex flex-col items-center justify-start p-4 md:p-6 overflow-y-auto @2xl:grid @2xl:grid-cols-2 @2xl:content-center @2xl:items-start @2xl:gap-x-[4cqw] @2xl:gap-y-[2cqw] @2xl:px-[4cqw] @2xl:py-[2.5cqw]"
    >
      {/*
        標題容器：用 flex-shrink-0 防止內容多時被擠扁。
        BananaOrbit 用 absolute 定位，不影響標題佔的高度。
      */}
      <div className="relative flex-shrink-0 mb-4 md:mb-8 mt-2 md:mt-4 w-full max-w-2xl flex justify-center items-center @2xl:col-span-2 @2xl:max-w-none @2xl:m-0 @2xl:py-[1cqw]" style={{minHeight: '5rem'}}>
        <BananaOrbit />
        <motion.h1
          initial={{y: -50, scale: 0.5}}
          animate={{y: 0, scale: 1}}
          className="text-5xl md:text-7xl @2xl:text-[7.5cqw] font-bold text-yellow-400 drop-shadow-[0_4px_0_rgba(0,0,0,1)] md:drop-shadow-[0_6px_0_rgba(0,0,0,1)] text-center relative z-10"
        >
          猴子丟香蕉
        </motion.h1>
      </div>

      {/* 左欄：開始、音效、重力、全螢幕 */}
      <div className="flex flex-col items-center w-full @2xl:justify-center @2xl:gap-[2.2cqw] @2xl:h-full">
        <motion.button
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.9}}
          onClick={onStartGame}
          className="retro-button text-2xl md:text-4xl @2xl:text-[3.8cqw] px-8 md:px-12 @2xl:px-[5cqw] py-4 md:py-6 @2xl:py-[1.4cqw] mb-4 md:mb-12 @2xl:mb-0"
        >
          開始遊戲
        </motion.button>

        <div className="flex flex-col items-center @2xl:flex-row @2xl:gap-[1.5cqw]">
          <motion.button
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            onClick={onToggleMute}
            className="retro-button flex items-center gap-3 px-6 md:px-8 @2xl:px-[2cqw] py-3 md:py-4 @2xl:py-[0.9cqw] mb-4 md:mb-12 @2xl:mb-0 text-sm md:text-base @2xl:text-[max(14px,1.8cqw)]"
          >
            {isMuted ? <VolumeX className="w-[1.3em] h-[1.3em]" /> : <Volume2 className="w-[1.3em] h-[1.3em]" />}
            {isMuted ? '音效: 關閉' : '音效: 開啟'}
          </motion.button>

          <button
            onClick={onToggleFullscreen}
            className="retro-button hidden @2xl:block @2xl:text-[max(14px,1.8cqw)] @2xl:px-[2cqw] @2xl:py-[0.9cqw]"
          >
            {isFullscreen ? '退出全螢幕' : '全螢幕'}
          </button>
        </div>

        <div className="hidden @2xl:flex flex-col items-center gap-[0.6cqw]">
          <label className="text-[max(14px,1.6cqw)] opacity-80">重力值設定</label>
          <div className="flex items-center gap-[1cqw]">
            <input
              type="number"
              step="0.1"
              value={gravityInput}
              onChange={e => onGravityChange(e.target.value)}
              placeholder="預設地球Ｇ=9.8"
              className="retro-input w-[16cqw] text-center text-[max(16px,2.2cqw)]"
            />
            <span className="text-[max(14px,2cqw)] opacity-60">m/s²</span>
          </div>
        </div>
      </div>

      {/* 右欄：主題、玩家名稱 */}
      <div className="w-full flex flex-col items-center @2xl:gap-[2cqw]">
        {/* 主題選單（C4 多地圖系統）*/}
        <div className="w-full max-w-2xl px-4 mb-4 md:mb-8 @2xl:max-w-none @2xl:px-0 @2xl:mb-0">
          <label className="block text-[10px] md:text-sm @2xl:text-[max(14px,1.6cqw)] uppercase opacity-70 @2xl:opacity-80 text-center mb-2 @2xl:mb-[0.8cqw]">
            🗺 戰場主題
          </label>
          <div className="grid grid-cols-3 gap-2 md:gap-3 @2xl:gap-[1.2cqw]">
            {THEME_LIST.map(t => (
              <button
                key={t.id}
                onClick={() => onThemeChange(t.id)}
                className={`retro-button flex flex-col items-center justify-center gap-1 py-3 px-2 @2xl:py-[1.1cqw] transition-all ${
                  themeId === t.id
                    ? 'ring-4 ring-yellow-400 scale-105'
                    : 'opacity-60 hover:opacity-100'
                }`}
                aria-label={`選擇主題：${t.label}`}
              >
                <span className="text-2xl md:text-3xl @2xl:text-[3.2cqw] leading-none">{t.emoji}</span>
                <span className="text-xs md:text-sm @2xl:text-[max(13px,1.6cqw)] font-bold">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 @2xl:gap-[2cqw] mb-4 md:mb-12 @2xl:mb-0 w-full max-w-2xl @2xl:max-w-none px-4 @2xl:px-0">
          <div className="flex-1 flex flex-col gap-1 md:gap-2">
            <label className="text-[10px] md:text-sm @2xl:text-[max(14px,1.6cqw)] uppercase opacity-70 @2xl:opacity-80 text-center">玩家一 名稱</label>
            <input
              type="text"
              value={p1NameInput}
              onChange={e => onP1NameChange(e.target.value)}
              placeholder="玩家一"
              className="retro-input w-full text-center text-lg md:text-xl @2xl:text-[max(16px,2.2cqw)]"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 md:gap-2">
            <label className="text-[10px] md:text-sm @2xl:text-[max(14px,1.6cqw)] uppercase opacity-70 @2xl:opacity-80 text-center">玩家二 名稱</label>
            <input
              type="text"
              value={p2NameInput}
              onChange={e => onP2NameChange(e.target.value)}
              placeholder="玩家二"
              className="retro-input w-full text-center text-lg md:text-xl @2xl:text-[max(16px,2.2cqw)]"
            />
          </div>
        </div>
      </div>

      {/* 底部設定區（小畫面才顯示重力與全螢幕；大畫面已移到左欄）*/}
      <div className="w-full flex flex-col items-center gap-3 md:gap-4 pb-12 md:pb-16 mt-2 @2xl:col-span-2 @2xl:p-0 @2xl:m-0">
        <div className="flex flex-col items-center gap-1 md:gap-2 @2xl:hidden">
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
          className="retro-button text-xs md:text-sm px-4 md:px-6 py-2 @2xl:hidden"
        >
          {isFullscreen ? '退出全螢幕' : '全螢幕'}
        </button>

        {/* v3.16.1：網站頁尾（作者署名連阿凱老師教育科技創新專區），版本號一併收進來 */}
        <footer className="w-full max-w-2xl @2xl:max-w-none mt-4 @2xl:mt-0 border-2 border-white rounded-lg bg-black/40 px-4 py-3 md:py-4 @2xl:py-[1cqw] text-center">
          <p className="text-yellow-400 font-bold text-sm md:text-base @2xl:text-[max(14px,1.6cqw)]">🍌 猴子丟香蕉・雙人回合制拋物線對戰</p>
          <p className="mt-2 @2xl:mt-[0.4cqw] text-xs md:text-sm @2xl:text-[max(12px,1.4cqw)] leading-relaxed">
            Made with <span aria-label="愛心">❤️</span> by{' '}
            <a
              href="https://cagoooo.github.io/Akai/"
              target="_blank"
              rel="noopener noreferrer"
              title="阿凱老師教育科技創新專區"
              className="font-bold text-yellow-300 underline decoration-dotted underline-offset-4 hover:text-white"
            >
              阿凱老師
            </a>
            <span className="hidden sm:inline" aria-hidden="true"> ・</span>
            <span className="block sm:inline">桃園市龍潭區石門國民小學</span>
          </p>
          <p className="mt-2 @2xl:mt-[0.4cqw] text-[10px] @2xl:text-[max(12px,1.1cqw)] opacity-50">
            <span>ＡＮＴＹＥＨ修正</span>
            <span className="mx-2">·</span>
            <span>v1.3.0</span>
          </p>
        </footer>
      </div>
    </motion.div>
  );
}
