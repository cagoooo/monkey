/**
 * 純裝飾用 component（沒有遊戲狀態，純動畫 / 純樣式）。
 *
 * 集中放在這裡讓主要 UI component 檔案可以乾淨地 import，
 * 不必把 sprite 邏輯混在 screen 檔內。
 */

import {useEffect, useState} from 'react';
import {motion} from 'motion/react';

/**
 * 像素風猩猩，會週期性「捶胸」（手臂上下擺動）。
 * 用在勝利畫面上方裝飾。
 */
export function BeatingGorilla({color}: {color: string}) {
  const [beat, setBeat] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => setBeat(b => !b), 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-16 h-16 scale-150">
      {/* Head */}
      <div style={{backgroundColor: color}} className="absolute left-1/2 -translate-x-1/2 top-0 w-6 h-5" />
      {/* Eyes */}
      <div className="absolute left-1/2 -translate-x-1/2 top-2 w-4 h-1 bg-black" />
      {/* Body */}
      <div style={{backgroundColor: color}} className="absolute left-1/2 -translate-x-1/2 top-5 w-10 h-4" />
      <div style={{backgroundColor: color}} className="absolute left-1/2 -translate-x-1/2 top-9 w-8 h-8" />
      {/* Arms */}
      {beat ? (
        <>
          <div style={{backgroundColor: color}} className="absolute left-0 top-2 w-3 h-6" />
          <div style={{backgroundColor: color}} className="absolute right-0 top-2 w-3 h-6" />
        </>
      ) : (
        <>
          <div style={{backgroundColor: color}} className="absolute left-1 top-6 w-4 h-3" />
          <div style={{backgroundColor: color}} className="absolute right-1 top-6 w-4 h-3" />
        </>
      )}
      {/* Legs */}
      <div style={{backgroundColor: color}} className="absolute left-2 bottom-0 w-3 h-6" />
      <div style={{backgroundColor: color}} className="absolute right-2 bottom-0 w-3 h-6" />
    </div>
  );
}

/**
 * 一根香蕉繞橢圓軌道飛。`delay` 用來錯開 4 根香蕉的相位。
 */
function OrbitingBanana({
  delay = 0,
  rx = 300,
  ry = 100,
  speed = 5,
}: {
  delay?: number;
  rx?: number;
  ry?: number;
  speed?: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none w-10 h-10"
      animate={{
        x: [
          Math.cos(0) * rx,
          Math.cos(Math.PI / 2) * rx,
          Math.cos(Math.PI) * rx,
          Math.cos(3 * Math.PI / 2) * rx,
          Math.cos(2 * Math.PI) * rx,
        ],
        y: [
          Math.sin(0) * ry,
          Math.sin(Math.PI / 2) * ry,
          Math.sin(Math.PI) * ry,
          Math.sin(3 * Math.PI / 2) * ry,
          Math.sin(2 * Math.PI) * ry,
        ],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: 'linear',
        delay: -delay,
      }}
      style={{
        left: '50%',
        top: '50%',
        marginLeft: -20,
        marginTop: -20,
      }}
    >
      <motion.div
        className="w-full h-full flex items-center justify-center"
        animate={{rotate: [0, 360]}}
        transition={{duration: 1, repeat: Infinity, ease: 'linear'}}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19.5 3.5C18.5 2.5 16 2.5 14 4.5C12 6.5 11 9.5 11 12.5C11 15.5 12 18.5 14 20.5C16 22.5 18.5 22.5 19.5 21.5C20.5 20.5 20.5 18 18.5 16C16.5 14 13.5 13 10.5 13C7.5 13 4.5 14 2.5 16C0.5 18 0.5 20.5 1.5 21.5"
            stroke="#FACC15"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

/**
 * 4 根香蕉繞著大標題打轉的開場特效。
 */
export function BananaOrbit() {
  const rx = 340;
  const ry = 100;
  const speed = 6;

  return (
    <div className="absolute inset-0 pointer-events-none">
      <OrbitingBanana delay={0} rx={rx} ry={ry} speed={speed} />
      <OrbitingBanana delay={speed * 0.25} rx={rx} ry={ry} speed={speed} />
      <OrbitingBanana delay={speed * 0.5} rx={rx} ry={ry} speed={speed} />
      <OrbitingBanana delay={speed * 0.75} rx={rx} ry={ry} speed={speed} />
    </div>
  );
}
