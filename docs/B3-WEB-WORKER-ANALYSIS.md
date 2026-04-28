# B3 分析：Web Worker 對本專案的 ROI 評估

> 寫於 2026-04-29，B6 完成後評估 B3 階段該怎麼做。

## TL;DR

**原本 B3 提案（把物理運算搬到 Web Worker）不建議做**，原因：
1. 本專案的 game loop **不是 CPU bound**，瓶頸在 Canvas 繪圖與 React reconciliation
2. Worker 訊息傳遞 overhead ≈ 1-2 ms/tick，反而比現有計算還慢
3. 沒有實測數據前，盲目搬 Worker 會增加 ~500 行複雜度但效能不變甚至倒退

## 量化分析

### 目前 game loop 工作量

```
useGameLoop tick (每 20ms 一次):
├── particles update          ~0.1-0.5ms（依粒子數，平均 50，峰值 300）
├── building falling check    ~0.05ms
├── sun falling check         ~0.02ms
├── window flicker            ~0.1ms（每 2s 一次）
├── meteor shower             ~0.3ms（流星雨期間）
├── banana flight + 碰撞      ~0.2-0.5ms（飛行中時）
└── explosion 推進            ~0.1ms
─────────────────────────────────────
總計：典型 ~0.5ms，峰值 ~2-3ms（大爆炸時）
```

### Web Worker 訊息成本

```
postMessage gameState (含 particles[300]) 結構化複製：~1-2ms
postMessage back nextState：                          ~1-2ms
─────────────────────────────────────
單次往返：2-4ms（比目前主執行緒計算還慢！）
```

### 真正的瓶頸在哪？

| 階段 | 主執行緒成本（iPhone 11 估計）|
|---|---|
| game loop 計算 | 0.5-3ms |
| **Canvas 繪圖**（畫 300 粒子 + 建築 + 太陽 + 雲）| **8-15ms** ⚠️ |
| **React reconciliation**（setGameState 觸發 render）| **3-8ms** ⚠️ |

**真兇是繪圖與 React，不是物理**。

## 為什麼會有「Web Worker 解決掉幀」的誤解？

最初 v3.6.x 時代的 `DEVELOPMENT_PROGRESS.md` 寫了：
> B3 Web Worker 物理運算 — iPhone 11 連續 5 次大爆炸不掉幀

那時還沒拆 engine，game loop 內聯 535 行，被認為是 CPU bound。**但實際分析後發現粒子數最多 300，現代手機 V8 引擎連 10 萬個 object 都跑得飛快**。當時的擔憂是「直覺」而非實測。

## 真正能改善 iPhone 11 流暢度的方案（按 ROI 排序）

### 🥇 Option A — 量測先行（推薦，0 成本）

不做任何重構，先加 frame timing 工具，**部署後在實際手機測量**：

```ts
// 在 useGameLoop 加 perf 記錄
const start = performance.now();
setGameState(prev => { /* ... */ });
const elapsed = performance.now() - start;
if (elapsed > 16) console.warn('Slow tick:', elapsed.toFixed(2), 'ms');
```

如果實際測下來典型 < 5ms，就**證明 Worker 不必要**，可以省下兩天工。
如果發現 > 16ms，再針對發生時的場景優化（很可能是繪圖而非計算）。

### 🥈 Option B — 降低 Canvas 繪圖頻率（可做）

目前 canvas 每次 gameState 改變都重畫。改成 RAF 節流：

```ts
useEffect(() => {
  let pendingDraw = false;
  const draw = () => {
    if (!pendingDraw) return;
    pendingDraw = false;
    // ... 現有繪圖邏輯
  };
  pendingDraw = true;
  const id = requestAnimationFrame(draw);
  return () => cancelAnimationFrame(id);
}, [gameState]);
```

**預估收益**：高負載場景下 setState 頻率高於 60Hz 時節省繪圖呼叫，幀數可能從 30 → 50 fps。
**成本**：1-2 小時。

### 🥉 Option C — 粒子改 useRef（更激進）

把 particles 從 React state 拉出來放 useRef，避免每幀都觸發 React reconciliation：

```ts
const particlesRef = useRef<Particle[]>([]);
// game loop 直接 mutate ref
// canvas draw 直接從 ref 讀
```

**預估收益**：消除 50 FPS × 8ms reconciliation = 大幅降低 React 端開銷。
**成本**：1 天，要小心 React 狀態與 ref 同步邏輯。

### 🏆 Option D — OffscreenCanvas（最激進）

把整個 canvas 繪圖搬到 Web Worker，主執行緒只負責 input + state。
**收益**：理論上幀率上限翻倍。
**成本**：2-3 天 + Safari 兼容性問題（需 fallback 到主執行緒繪圖）。

### ❌ Option E — 原 B3 提案（物理進 Worker）

不推薦，理由見上。**就算做了，使用者也感受不到**。

## 結論與建議

### 立即執行（這次 commit）

1. ✅ 加 **frame timing 開發者工具**（dev mode only，console.warn 慢 tick）
2. ✅ 寫這份分析文件，未來任何人重提 B3 都先看這個

### 等實測後再決定

3. ⏳ 部署後請使用者用 iPhone 11 / 舊裝置玩一場大爆炸場景，看 console 有無 `Slow tick` 警告
4. ⏳ 如果掉幀明顯 → 走 Option B（最 CP 值）
5. ⏳ 如果還不夠 → 走 Option C
6. ⏳ Option D 留到專案規模真的需要時再說（多人對戰 / 100+ 粒子等級提升）

## 寫進 progress 表

把原本 B3 描述改成「B3 效能監控與漸進優化」，明確以「量測先行」為原則。
