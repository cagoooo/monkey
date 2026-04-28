# 📜 更新日誌 (CHANGELOG)

## [3.12.0] - 2026-04-29

### 🛡️ B6 Cloud Function 防刷分（程式碼就緒，待 Blaze 升級）

新建 `functions/` 目錄，含完整 TypeScript Cloud Function 實作：

#### `functions/src/submitScore.ts`（onCall v2）
- **Schema 驗證**：name regex `^\d{1,2}年\d{1,3}班\d{1,3}號$`，score 整數 0–9999
- **Rate limit**：同 name 60 秒內只能提交 1 次
- **可疑值偵測**：score > 5000 自動 logger.info 記 IP（事後追查用）
- Server-side `FieldValue.serverTimestamp()` 強制注入
- region: `asia-east1`（台灣最快），maxInstances: 10（防爆炸燒錢）

#### `functions/src/index.ts`
- `setGlobalOptions` 全域成本護欄
- export 命名為 `monkey_submitScore`（依 firebase-multi-app-safety 慣例加 codebase 前綴）

#### 部署架構
- `firebase.json` 加入 `functions[]` 含 `codebase: "monkey"`，部署指令 `firebase deploy --only functions:monkey`
- `firestore.rules` 註解寫明 Layer 1 (Rules) vs Layer 2 (Function) 切換方式

#### 前端整合（feature flag）
- `firebase.ts` 加 `httpsCallable` 路徑
- 環境變數 `VITE_USE_CALLABLE_SUBMIT=true` 才走 Function 路徑（預設 false 走直寫）
- 漸進式遷移，零風險

#### 完整部署 SOP（[functions/DEPLOY.md](functions/DEPLOY.md)）
- Blaze 升級流程
- Budget Alert 設定（< $1 USD 告警，永久 $0/月）
- 7 步驟首次部署 + 緊急回滾指令
- 後續維護（改 rate limit / 加欄位 / 看 logs）

> 💡 Cloud Functions 免費層每月 200 萬次叫用，本專案估計 < 12,000 次/月，**永遠不會收費**

### 📊 B3 量測先行（推翻原 Web Worker 提案）

新增 [docs/B3-WEB-WORKER-ANALYSIS.md](docs/B3-WEB-WORKER-ANALYSIS.md)，**誠實評估後決定不做原本的 B3**：

- 量化 game loop 工作量：典型 ~0.5ms / 峰值 ~3ms（**不是 CPU bound**）
- 真正瓶頸：Canvas 繪圖 8-15ms + React reconciliation 3-8ms
- Worker 訊息往返成本 2-4ms，搬過去**反而更慢**
- 提供 4 種替代方案排序（量測先行 / RAF 節流 / particles useRef / OffscreenCanvas）

#### `useGameLoop` 加 dev-mode frame timing
- 每 tick 量 `performance.now()`，超過 16ms 在 console.warn
- production build 透過 `import.meta.env.DEV` 完全 tree-shake，零成本
- 用於後續使用者實機測試（iPhone 11 等）找出真正瓶頸

### 🚦 v3.12.0 數字結算

| 指標 | v3.11.0 | **v3.12.0** | 變化 |
|---|---|---|---|
| Cloud Function 程式碼 | 0 | **submitScore (Callable v2)** ✅ | +1 |
| 部署 SOP 文件 | 0 | **functions/DEPLOY.md** ✅ | +1 |
| 前端 Function 整合 | — | feature flag 就緒 | ✅ |
| Frame timing dev tool | 無 | console.warn @ 16ms | ✅ |
| 單元測試 | 72 | 72 | — |

## [3.11.0] - 2026-04-29

### 🧪 B2 物理引擎單元測試（vitest）
- 新增 `vitest@4.1.5` + `@vitest/ui` + `happy-dom`
- `vite.config.ts` 加 vitest 設定（`environment: 'node'` 純函式測試最快）
- 新增 npm scripts：`test` / `test:watch` / `test:ui`
- 5 個測試檔涵蓋全部 engine 純函式：
  - `collision.test.ts`（13 tests）— distance / distSq / isWithin / vecFromAngle
  - `physics.test.ts`（17 tests）— applyForces / step / calcDragPower / calcDragAngle
  - `scoring.test.ts`（6 tests）— calculateScore（含 self-hit 與 div-by-zero 防護）
  - `terrain.test.ts`（16 tests）— getGroundY / isPointDestroyed / generateWindowGrid
  - `turnTransition.test.ts`（10 tests）— 一般切換 + 5 回合地面爆炸懲罰（mock soundService）
- **執行結果：72/72 pass，347ms 跑完**

### 🎁 B5 道具系統註冊表化
- 新增 **`src/game/engine/powerups.ts`**：`POWERUPS` registry + `getPowerUp(type)` helper
- 取代 `useGameLoop` 內散落的 `type === 'giant' ? X : type === 'acid' ? Y : Z` 巢狀三元式
- 每個道具 spec 含：`monkeyHit` / `buildingHit`（半徑、震動、粒子數、顏色）+ 可選 `trailParticle`
- `useGameLoop` 重構 monkey-hit + building-hit 兩段查表，**減少 30+ 行散落數字**
- 5 種道具完整登記：normal / giant / acid / beam / meteor
- 新增 `powerups.test.ts`（10 tests）驗證註冊表完整性與威力遞增關係
- **新增道具未來只要在 POWERUPS 加一筆 + 在 ProjectileType 加 union 成員**

### 📚 文件強化
- 大幅重寫 `README.md`：加入 Live Demo / 特色清單 / 完整檔案結構樹
- 新增 **「🔐 Security」章節**：Firebase Web API Key 不是密碼、三層防禦說明、GitHub Secret Scanning 處理 SOP
- 永久止血同類安全疑問

### 🚦 v3.11.0 數字結算

| 指標 | v3.10.0 | **v3.11.0** | 變化 |
|---|---|---|---|
| Engine 純函式 | 11 | 11 | — |
| 註冊表 | 0 | **POWERUPS（5 道具）** | +1 |
| 單元測試 | **0** | **72** | +72 ✅ |
| 測試覆蓋（engine 模組） | 0% | ~80% | ✅ |
| README 完整度 | 預設模板 | 完整含 Security | ✅ |
| Build 時間 | 2.86s | 2.98s | +4% |

## [3.10.0] - 2026-04-29

### 🏆 B1.5 完成 — App.tsx 拆分終局（B 階段最大里程碑）

新建 4 個檔到 `src/game/`：

#### `engine/scoring.ts`（30 行）
- `calculateScore(hitPos, shooterPos, targetPos)` — 純函式：距離越近分數越高（最高 100 分）

#### `engine/turnTransition.ts`（115 行）
- `handleTurnTransition(prev, next)` — 回合切換邏輯
- 連續 5 回合在地面 → 自動爆炸懲罰
- 隨機產生新寶箱（meteor / giant / acid / beam）
- 切到下個玩家瞄準階段

#### `hooks/useInput.ts`（210 行）
- 6 個 canvas handler：mouseDown/Move/Up + touchStart/Move/End
- 內部 helpers：toCanvasCoords, startAim, moveAim, releaseAim
- 玩家 1 / 玩家 2 半邊限制 + cursor pointer 切換 + 拖曳力道計算

#### `hooks/useGameLoop.ts`（535 行）
- 50 FPS setInterval 主迴圈
- 粒子物理（smoke/spark/debris/normal 各自重力與阻力）
- 螢幕震動衰減 + 玩家落下 + 太陽掉落爆炸
- 建築窗戶閃爍（每 2 秒）
- 流星雨狀態（meteor 寶箱）
- 香蕉飛行 + 5 種碰撞檢測（寶箱/出界/太陽/猴子/建築）
- 爆炸動畫推進 + 結束處理
- 內建 lastWindowToggleRef

### 📉 App.tsx 終極瘦身

| 變化 | 行數 |
|---|---|
| 移除 calculateScore 函式 | -10 |
| 移除 handleTurnTransition 函式 | -110 |
| 移除 6 個 input handler | -190 |
| 移除 535 行 setInterval game loop useEffect | -535 |
| 移除 lastWindowToggle useRef | -1 |
| 清掉 7 個 unused imports（ParticleType / Particle / Meteor / MONKEY_SIZE / getGroundY 等）| -7 |
| 加 4 個 import + 2 個 hook 呼叫 + engine 引用 | +25 |
| **App.tsx 2418 → 1590 行** | **淨削減 828 行（34%）** |

### 🎯 累計 B1 全部完成 ✅
- B1.1 ✅ types + useLeaderboard（v3.8.0）
- B1.2 ✅ engine/ 三模組 terrain + collision + physics（v3.8.1）
- B1.3 ✅ hooks/ 三模組 viewport + fullscreen + scoreSubmission（v3.8.2）
- B1.4 ✅ components/ 五模組 StartScreen + WinnerScreen + Leaderboard + ScoreEntryModal + decorations（v3.9.0）
- **B1.5 ✅ engine + hooks 終局（scoring + turnTransition + useInput + useGameLoop）**

### 🚦 v3.10.0 數字結算

| 指標 | 起始 v3.6.x | **v3.10.0** | 變化 |
|---|---|---|---|
| **App.tsx 行數** | 2802 | **1590** | **-1212 行（-43%）** ✅ |
| ESLint warnings | 未檢視 | **6** | ✅ |
| 抽出 components | 0 | **6** | +6 |
| 抽出 hooks | 0 | **6** | +6 |
| 抽出 engine 模組 | 0 | **5** | +5 |
| 主程式 bundle | 851 KB | 250 KB | -71% |
| npm 漏洞 | 7（1 critical）| 0 | -100% |

## [3.9.0] - 2026-04-28（深夜+2）

### 🧩 App.tsx 拆分 第四波 — Components 模組化（B1.4）

新增 5 個 component 檔到 `src/game/components/`：

#### `decorations.tsx`（130 行）
- `BeatingGorilla` — 像素風猩猩捶胸動畫（用在 WinnerScreen）
- `BananaOrbit` — 4 根香蕉繞橢圓軌道飛（用在 StartScreen）
- `OrbitingBanana`（內部 helper）

#### `Leaderboard.tsx`（54 行）
- 排行榜顯示元件，內建 5 條 placeholder fallback
- props: `entries: LeaderboardEntry[]`

#### `ScoreEntryModal.tsx`（127 行）
- 高分提交 Modal（年級 / 班級 / 座號三欄輸入）
- 從 `useScoreSubmission` 接 props（state + callback）
- 包 motion + AnimatePresence 動畫

#### `WinnerScreen.tsx`（186 行）
- 比賽結束畫面，組合 BeatingGorilla + Trophy + 回合得分表 + Leaderboard + ScoreEntryModal
- 接受 14 個 props（gameState + 完整 score submission state cluster）

#### `StartScreen.tsx`（129 行）
- 開始畫面：玩家命名、重力設定、音效切換、全螢幕、開始按鈕
- 11 個 props（4 個 input value + 6 個 callback + isMuted/isFullscreen）

### 📉 App.tsx 大幅瘦身
- 移除 inline 4 個裝飾 component（97 行：BananaIcon + BeatingGorilla + OrbitingBanana + BananaOrbit）
  - **`BananaIcon` 是 dead code 順手刪除**
- 移除 inline StartScreen JSX（90 行）
- 移除 inline WinnerScreen + ScoreEntryModal JSX（197 行）
- 取代為 2 個 component 呼叫（含 props 傳遞）
- 移除 `DEFAULT_LEADERBOARD`（搬進 Leaderboard 內部）
- 清掉 11 個 unused imports：`Destruction` / `GRAVITY` / `RotateCcw` / `Volume2` / `VolumeX` / `Medal` / `User` / `Send` / `saveHighScore` / `LeaderboardEntry` / unused `React`

### 🎯 數字結算

| 指標 | v3.8.2 | **v3.9.0** | 變化 |
|---|---|---|---|
| **App.tsx 行數** | 2784 | **2418** | **-366 行（13%）** ✅ |
| ESLint warnings | 17 | **11** | -6（清 unused）✅ |
| 抽出 components | 1 | **6** | +5 |
| 累計抽出 hooks | 4 | 4 | — |
| 累計抽出純函式 | 11 | 11 | — |
| Build 時間 | 2.59s | 3.36s | 含新 chunk 處理 |

### 🎯 累計 B1 進度
- B1.1 ✅ types + useLeaderboard
- B1.2 ✅ engine/ 三模組（terrain + collision + physics）
- B1.3 ✅ hooks/ 三模組（viewport + fullscreen + scoreSubmission）
- B1.4 ✅ components/ 五模組（decorations + Leaderboard + ScoreEntryModal + WinnerScreen + StartScreen）
- **B1.5 待做：useGameLoop + useInput**（最後一塊：RAF 主迴圈 + 觸控/滑鼠 handlers）

## [3.8.2] - 2026-04-28（深夜+1）

### 🪝 App.tsx 拆分 第三波 — Hooks 模組化（B1.3）
新建 3 個 hook 檔到 `src/game/hooks/`：

#### `hooks/useViewportHeight.ts`（27 行）
- 維護 `--vh` CSS 變數對應 1% 視窗高度
- 解決 iOS Safari 的 `100vh` 含 URL bar 區域問題
- 監聽 resize / orientationchange

#### `hooks/useFullscreen.ts`（62 行）
- 同時支援真實 Fullscreen API + iOS pseudo-fullscreen fallback
- 回傳 `{ isFullscreen, isPseudoFullscreen, toggle, enter }`
- 接受 `containerRef`，封裝 fullscreenchange 監聽

#### `hooks/useScoreSubmission.ts`（129 行）
- 排行榜提交流程完整封裝（modal 狀態 + 三輸入 + loading + error）
- 內建 10 秒 timeout 防卡死
- `checkHighScore(leaderboard, score, name)` — 自動判斷 top 5
- `submitHighScore()` — 送 Firestore + 清空表單
- `reset()` — 取消按鈕用

### 📉 App.tsx 變化
- 移除 fullscreen useEffect（28 行）
- 移除 toggleFullscreen 函式（15 行）
- 移除 score submission state + 函式（35 行）
- 取代為 3 個 hook 呼叫
- **App.tsx 從 2852 → 2784 行（淨削減 68 行）**

### 🎯 累計 B1 進度
- B1.1 ✅ types + useLeaderboard
- B1.2 ✅ engine/ 三模組（terrain + collision + physics）
- B1.3 ✅ hooks/ 三模組（viewport + fullscreen + scoreSubmission）
- B1.4 ⏳ components/ 拆分（待做）

## [3.8.1] - 2026-04-28（深夜）

### 🧱 App.tsx 拆分 第二波 — Engine 模組化（B1.2）
新建 `src/game/engine/` 目錄，抽出三個純函式模組：

#### `engine/terrain.ts`
- `getGroundY(x, buildings, destructions)` — 從 App.tsx 頂部移過來，現在是 import
- `isPointDestroyed(x, y, destructions)` — 從 getGroundY 內部邏輯抽出
- `generateWindowGrid(rows, cols, lightProb)` — 取代 App.tsx 內 2 處重複的窗戶生成迴圈
- 匯出常數 `MONKEY_FOOT_OFFSET`（取代多處硬寫的 `8.75`）

#### `engine/collision.ts`
- `distance(a, b)` — 取代 15+ 處 `Math.sqrt((dx) ** 2 + (dy) ** 2)` 模式
- `distSq(a, b)` — 比較用，省一個 sqrt
- `isWithin(point, center, radius)` — 圓內判定 helper
- `vecFromAngle(angleRad, magnitude)` — 角度轉向量

#### `engine/physics.ts`
- `applyForces(vel, gravity, wind, airResistance)` — 純前向步進
- `step(pos, vel)` — 位置更新
- `calcDragPower(start, current)` — 拖曳力道
- `calcDragAngle(start, current, mirrorX)` — 拖曳角度

### 📉 App.tsx 淨削減
- 移除 `getGroundY` 函式（17 行）
- 移除兩處重複的 window-grid 生成迴圈（共 16 行）
- 加入兩行 import
- 純重構部分：**淨削減 ~30 行**

### ⚠️ 注意事項
- `collision.ts` 與 `physics.ts` 目前先**只提供 helper**，App.tsx 內 15+ 處 inline `Math.sqrt` 沒有逐一替換（避免漏改風險）
- 後續 B1.3 拆 hooks 時會逐步把 inline 數學替換為 helper
- ESLint warning 17 個（多 1 個原因為 hooks 拆分後 deps 偵測差異），B1.4 完成後會大幅減少

## [3.8.0] - 2026-04-28（晚間）

### 🛡️ 維運 Hardening (E 階段)
- **E1 npm audit 0 漏洞**：用 `overrides` 強制升 `serialize-javascript@^7.0.5`，含 vite-plugin-pwa 1.2.0 升級。從 7 個漏洞（1 critical / 5 high / 1 moderate）降到 **0**
- **E2 Node.js 升級**：CI 從 Node 20 → **Node 22 LTS**，避開 2026-09-16 棄用線
- **E3 Bundle 拆 chunk**：在 `vite.config.ts` 加 `manualChunks`，主程式從 **851 KB → 247 KB**（gzip 從 231 KB → 76 KB），firebase / motion / react / icons 各自獨立 vendor chunk

### 🌬️ 風力視覺化 (B4)
- **背景雲層**：5 朵像素風雲在天空飄動，速度 = 0.3 + |風力|×30 px/frame，方向跟著風向
- **頂部旗幟**：左上角旗桿，旗幟長度反映風強，正風紅 / 逆風藍，飄動頻率 = 3 + |wind|×80（風大抖更快）
- **底部 HUD 強化**：原本紅條 + 中央刻度 + 端點箭頭（風強 > 0.02 時才出現）+ 正反向變色
- 玩家不看數字也能憑視覺判斷風向風強

### 🧱 App.tsx 拆分 第一波 (B1.1)
- `src/types.ts` → **`src/game/types.ts`**（舊路徑改 re-export shim 維持相容）
- 新增 **`src/game/hooks/useLeaderboard.ts`**：封裝 Firestore onSnapshot 訂閱
- App.tsx 移除 13 行 leaderboard state + 訂閱 useEffect
- 為 B1 後續波次（拆 engine / 拆 components）鋪路

## [3.7.0] - 2026-04-28

### ✨ 新增功能
- **PWA 支援**：整合 `vite-plugin-pwa`，可離線遊玩、加入主畫面，並有「立即更新」橫幅提示新版（A6）
- **直立模式 UX**：新增 `PortraitHint` 提示徽章；觸控按鈕全面提升至 ≥ 44×44px 符合 WCAG（A4）
- **遊戲常數模組**：新增 `src/game/constants.ts` 集中管理物理 / 道具 / 排行榜 / 玩家色彩等常數（A3）

### 🔐 安全強化
- **Firestore Rules 防刷分**：嚴格 schema 校驗、`name` regex 必須符合「N年N班N號」、`score` 限定整數 0–9999、`timestamp == request.time` 強制 server 端、預設 deny（A5）
- **Firebase 專案遷移**：從 AI Studio sandbox `gen-lang-client-0869715626` 整套遷移到自有專案 `monkey-pixel-clash`（owner: `ipad@mail2.smes.tyc.edu.tw`）
- **API Key 限制**：用 gcloud CLI 套上 HTTP referrer 限制（`cagoooo.github.io/*` + localhost）與 API targets 限制（僅 Firestore / Identity Toolkit / Token Service / Firebase Installations）
- **GitHub Secrets 同步**：所有 7 個 `VITE_FIREBASE_*` secret 自動更新為新專案值

### 🛠️ 工程與架構
- **依賴瘦身**（A1）：移除未使用的 `express` / `better-sqlite3` / `dotenv` / `@google/genai` / `@types/express`，dedupe `vite`
- **ESLint 9 Flat Config**（A2）：新增 `eslint.config.js` 含 react-hooks 與 react-refresh plugin，`npm run lint` 正式可用
- **Script 拆分**：`lint` 改為 ESLint，`typecheck` 為 `tsc --noEmit`
- **firebase CLI 設定**：新增 `.firebaserc` / `firebase.json` / `firestore.indexes.json`

### 🎨 視覺與資料
- **`og-image.png`** 統一為 1200×630 標準
- **Favicon** 多尺寸支援（`.ico` + 512×512 PNG + apple-touch-icon）
- **Theme color** 加入 `<meta name="theme-color" content="#0a0a0a" />`

### 📚 文件
- 大幅擴充 `DEVELOPMENT_PROGRESS.md`，加入「未來優化建議」三層分類（立即可做 / 中期重構 / 長期擴充）

## [3.6.0] - 2026-03-25

### 🔧 修復與優化
- **部署遷移**：正式從 Vercel 遷移回 GitHub Pages 部署。
- **元資料修復**：修復 `index.html` 損壞的標題與 SEO 元標籤。
- **版本同步**：全專案統一更新至 v3.6.0。

## [1.0.0] - 2026-03-20

### ✨ 新增功能
- **Branding 資產整合**：
  - 新增 `favicon.png` (網站圖示)。
  - 新增 `og-image.png` (社群分享預覽圖)。
- **詳細文件化**：
  - 產出 `README_DETAIL.md` (詳細使用手冊)。
  - 產出 `OPTIMIZATION_SUGGESTIONS.md` (技術優化建議)。
- **遊戲設定優化**：
  - 更新 HTML 標題為「🐒 Monkey 投擲大戰」。
  - 整合 Open Graph 與 Twitter Card 元標籤，提升社群分享質感。

### 🔧 工程與部署
- **版本號更新**：初始穩定版本 1.0.0。
- **GitHub Pages 相容性**：將資源連結調整為相對路徑 `./` 確保子目錄部署正常。
- **依賴管理**：執行 `npm install` 完整安裝開發環境。
