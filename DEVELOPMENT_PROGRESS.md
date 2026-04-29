# 📈 專案開發進度表 (DEVELOPMENT_PROGRESS.md)

> 最後更新：2026-04-29
> 目前版本：**v3.15.1** ✅ 已部署上線（C4 第三波 🎆 主題化爆炸粒子）

---

## 🏆 已完成里程碑 (Completed Milestones)

### 🟢 Phase 1：基礎架構與核心邏輯
- [x] React 19 + Vite 6 + TypeScript 開發環境
- [x] Canvas 2D 遊戲引擎（拋物線、重力、風力）
- [x] 隨機建築地形生成 + 像素級碰撞檢測
- [x] 地形破壞（爆炸挖洞）系統
- [x] 雙人本地對戰（回合制 + 角度/力道瞄準）
- [x] 道具系統：10X 巨大化香蕉、ACID 強酸彈
- [x] Web Audio API 即時合成音效

### 🔵 Phase 2：Branding 與部署優化（2026-03-20 ~ 03-25）
- [x] Favicon / OG Image 設計
- [x] HTML 標題、Meta、Open Graph、Twitter Card 設定
- [x] 版本號正式定為 **v1.0.0**
- [x] GitHub Actions CI/CD 自動建置
- [x] GitHub Pages 部署（修正 base path `./`）
- [x] 撰寫 `README_DETAIL.md` / `OPTIMIZATION_SUGGESTIONS.md` / `FUTURE_ROADMAP.md`

### 🟣 Phase 3：穩定性與整合（2026-03-25 ~ 04-28）
- [x] **v3.6.0** 部署遷移：Vercel → GitHub Pages
- [x] **Firebase 雲端排行榜**（Firestore + Serverless 安全部署）
- [x] **AudioContext 自動播放警告修復**（兩次 patch）
- [x] **Favicon 404 修復** + **OG 社群卡片** 1200×630
- [x] **直立模式開放**：移除強制橫向遮罩
- [x] **音效服務模組化**：`src/services/soundService.ts`

### 🟡 Phase 4：A 階段全面優化 + Firebase 自有化遷移（2026-04-28 完成）✨
- [x] **A1 依賴瘦身**：移除 `express` / `better-sqlite3` / `dotenv` / `@google/genai` / `@types/express`，dedupe vite。`node_modules` 從 686 → 562 packages
- [x] **A2 ESLint 9 Flat Config**：含 `react-hooks` + `react-refresh` plugin，`npm run lint` 正式可用（0 error / 16 warning，warnings 為 hooks deps，B1 重構時收掉）
- [x] **A3 抽常數**：建立 `src/game/constants.ts` 集中 GRAVITY / CANVAS / TURN_TIME / PLAYER_COLORS / LEADERBOARD_*
- [x] **A4 直立模式 UX 補強**：`PortraitHint` 提示徽章（sessionStorage 記憶 dismiss）+ 觸控按鈕全面 ≥ 44×44px（WCAG）
- [x] **A5 Firestore Rules 防刷分**：嚴格 schema、name regex `^\d{1,2}年\d{1,3}班\d{1,3}號$`、score 整數 0–9999、`timestamp == request.time`、預設 deny
- [x] **A6 PWA**：`vite-plugin-pwa` autoUpdate + HTML NetworkFirst + Firestore NetworkOnly + 「立即更新」橫幅
- [x] **🔥 Firebase 遷移**：`gen-lang-client-0869715626`（AI Studio sandbox）→ `monkey-pixel-clash`（owner: `ipad@mail2.smes.tyc.edu.tw`）
- [x] **🔐 API Key 限制**：gcloud 套用 referrer (`cagoooo.github.io/*` + 3 個 localhost) + 4 個 API targets
- [x] **🔑 GitHub Secrets**：7 個 `VITE_FIREBASE_*` 值用 `gh secret set` + `printf '%s'` pipe 自動同步
- [x] **🔧 firebase CLI 設定檔**：`.firebaserc` / `firebase.json` / `firestore.indexes.json`
- [x] **📦 部署驗證**：commit `e7aa2fc` push 成功，Actions 32s 部署，PWA 資產（manifest / sw.js）線上 200

### 🟤 Phase 5：自動化基礎建設（2026-04-28，跨專案）
- [x] **新建 skill** `firebase-stack-automation`：firebase + gcloud + gh 三角串聯工作流
- [x] **更新 skill** `gcp-api-key-secure-create`：加入交叉引用
- [x] **跨專案 CLAUDE.md**：寫入兩個 Google 帳號分工（`cagooo@gmail.com` 個人 / `ipad@mail2.smes.tyc.edu.tw` 學校 owner）
- [x] **專案 memory**：`firebase_project_owner.md` 記錄 monkey-pixel-clash 擁有者
- [x] **OAuth 非互動式繞過**：發現並文件化用 PowerShell `Start-Process` 開新 cmd 視窗的解法

### 🟧 Phase 6：v3.8.0 維運 Hardening + 風力視覺化 + App 拆分第一波（2026-04-28 深夜）✨
- [x] **E1 npm audit 0 漏洞**：用 `overrides` 強制 `serialize-javascript@^7.0.5`，升 vite-plugin-pwa 0.21 → 1.2.0，從 7 漏洞（1 critical）降到 **0**
- [x] **E2 Node.js 22 LTS**：CI workflow 升級，避開 2026-09-16 棄用線
- [x] **E3 Bundle 拆 chunk**：主程式 **851 KB → 247 KB**（gzip 231 → 76 KB），firebase / motion / react / icons 各自 vendor chunk
- [x] **B4 風力視覺化三層**：背景雲層（速度跟風）+ 頂部旗幟（紅藍變色 + 抖動頻率）+ 底部 HUD 強化（中央刻度 + 端點箭頭）
- [x] **B1.1 App.tsx 拆分第一波**：
  - `src/types.ts` → `src/game/types.ts`（舊路徑 re-export shim）
  - 新增 `src/game/hooks/useLeaderboard.ts`

### 🟦 Phase 7：v3.8.1 B1.2 Engine 模組化（2026-04-28 深夜）✨
- [x] **`src/game/engine/terrain.ts`**：`getGroundY` / `isPointDestroyed` / `generateWindowGrid` / `MONKEY_FOOT_OFFSET`
- [x] **`src/game/engine/collision.ts`**：`distance` / `distSq` / `isWithin` / `vecFromAngle`
- [x] **`src/game/engine/physics.ts`**：`applyForces` / `step` / `calcDragPower` / `calcDragAngle`
- [x] App.tsx 接入 `getGroundY` + `generateWindowGrid`（淨削減 ~30 行）
- [x] Build 3.43s pass，typecheck pass，lint 0 error

### 🟫 Phase 8：v3.8.2 B1.3 Hooks 模組化（2026-04-28 深夜+1）✨
- [x] **`src/game/hooks/useViewportHeight.ts`**：iOS Safari 的 `--vh` CSS 變數維護
- [x] **`src/game/hooks/useFullscreen.ts`**：真實 + pseudo fullscreen 統一介面 `{ isFullscreen, isPseudoFullscreen, toggle, enter }`
- [x] **`src/game/hooks/useScoreSubmission.ts`**：排行榜提交完整流程（modal + 表單 + timeout + error）
- [x] App.tsx 移除 28 行 useEffect + 15 行 toggleFullscreen + 35 行 submission 邏輯
- [x] **App.tsx 2852 → 2784 行（淨削減 68 行）**
- [x] Build 2.59s pass，typecheck pass，lint 0 error

### 🟥 Phase 9：v3.9.0 B1.4 Components 模組化（2026-04-28 深夜+2）✨
- [x] **`src/game/components/decorations.tsx`**：BeatingGorilla + BananaOrbit（裝飾用）
- [x] **`src/game/components/Leaderboard.tsx`**：排行榜顯示，內建 placeholder
- [x] **`src/game/components/ScoreEntryModal.tsx`**：高分提交 Modal
- [x] **`src/game/components/WinnerScreen.tsx`**：比賽結束畫面（組合 Leaderboard + Modal）
- [x] **`src/game/components/StartScreen.tsx`**：開始畫面
- [x] App.tsx 移除 4 個 inline 裝飾元件（含 dead code BananaIcon）+ 大塊 JSX
- [x] **App.tsx 2784 → 2418 行（淨削減 366 行 = 13%）**
- [x] 清掉 11 個 unused imports（lint warnings 21 → 11）
- [x] Build 3.36s pass，typecheck pass

### 🎆 Phase 16：v3.15.1 C4 第三波 主題化爆炸粒子（2026-04-29）✨
- [x] **Theme 加 `explosionStyle` 可選欄位**（palette + pattern + countMultiplier + sparkle）
- [x] festive：radial + 6 色彩虹煙火 + 1.5x 粒子數
- [x] volcano：fountain + 4 色火系熔岩 + 1.3x 粒子數
- [x] **新模組 `src/game/engine/particles.ts`**：`makeExplosionParticles` helper
- [x] `ignoreThemeStyle` flag：acid / giant 道具特殊配色保留（道具 > 主題優先級）
- [x] useGameLoop 重構：monkey-hit + building-hit 共用 helper（-40 行 inline）
- [x] **新測試：particles.test.ts (10 tests) + themes 補 4 tests，總 94 → 107**

### 🎨 Phase 15：v3.15.0 C4 第二波 + C5 sprite 輕量版（2026-04-29）✨
- [x] **3 個新主題**：🏫 校園 / 🎄 節慶 / 🌋 火山
- [x] **bananaTrail 主題化**：每主題獨立配色與線寬（acid 仍保留綠色覆蓋）
- [x] **新 bgLayer kinds**：`snow`（60 顆飄雪）/ `lavaSparks`（40 顆火星）
- [x] **C5 sprite 輕量版**：idle 呼吸（sin bob）+ 眨眼動畫（~3s 一次）
- [x] `GameState.themeId` type 拓展至 6 主題
- [x] themes.test.ts 從 13 → 22 tests，總測試 85 → 94

### 🗺 Phase 14：v3.14.0 C4 多地圖主題系統（2026-04-29）✨
- [x] **`src/game/engine/themes.ts`** registry（city / space / ocean）
- [x] `GameState.themeId` type-level 鎖定 3 個可選值
- [x] **`StartScreen` 新增 3 格主題選按鈕**（emoji + 黃框 ring 標示選中）
- [x] App.tsx initGame 接 theme：building palette / 預設 gravity / wind range
- [x] Canvas 重寫背景：solid / gradient + 星星閃爍（80 顆）+ 氣泡上升（25 顆）
- [x] **useGameLoop banana flying 套用 `theme.physics.airResistance`**（深海漂浮效果）
- [x] `themes.test.ts` 13 tests（schema / 物理合理性 / fallback）
- [x] **總測試 72 → 85**

### 🛡️ Phase 13：v3.13.0 B6 Cloud Function 正式部署上線（2026-04-29）✨
- [x] Blaze 計費啟用 + 5 個 Cloud Functions v2 必要 IAM 角色加好
- [x] `firebase deploy --only functions:monkey` 成功（asia-east1, Node 22, Gen 2）
- [x] Firestore composite index 部署完成（leaderboard name+timestamp）
- [x] **端對端測試 3 個場景全綠**（合法 / rate limit / invalid）
- [x] Firestore Rules 收緊：client `allow create: if false`，強制走 Function
- [x] GitHub Secret `VITE_USE_CALLABLE_SUBMIT=true` + workflow 注入
- [x] **防刷分 3 層防禦完整就緒**（前端 + Function + Rules）

### 🟪 Phase 12：v3.12.0 B6 Cloud Function 就緒 + B3 量測先行（2026-04-29）✨
- [x] **B6 functions/ 目錄完整建立**
  - `submitScore.ts` Callable v2（schema + rate limit + 可疑值 logging）
  - `setGlobalOptions` 成本護欄（asia-east1 + maxInstances 10）
  - `firebase.json` codebase: monkey 命名
- [x] **firebase.ts feature flag**：`VITE_USE_CALLABLE_SUBMIT=true` 才走 Function 路徑（預設 false 直寫）
- [x] **完整部署 SOP**：[functions/DEPLOY.md](functions/DEPLOY.md)（Blaze 升級 / Budget Alert / 緊急回滾）
- [x] **B3 誠實評估**：[docs/B3-WEB-WORKER-ANALYSIS.md](docs/B3-WEB-WORKER-ANALYSIS.md)
  - 量化分析：game loop 不是 CPU bound（典型 0.5ms / 峰值 3ms）
  - Worker 訊息往返 2-4ms 反而更慢，**推翻原 B3 提案**
  - 改採量測先行：useGameLoop 加 dev-mode frame timing（>16ms 警告）
  - 真正瓶頸是 Canvas 繪圖 + React reconciliation，列 4 種替代方案

### 🟧 Phase 11：v3.11.0 B2 單元測試 + B5 道具註冊表（2026-04-29）✨
- [x] **B2 vitest 4.1.5 + 6 個測試檔（72 tests / 347ms）**
  - collision.test.ts（13）/ physics.test.ts（17）/ scoring.test.ts（6）
  - terrain.test.ts（16）/ turnTransition.test.ts（10，mock soundService）
  - powerups.test.ts（10，B5 同步補測試）
- [x] **B5 `src/game/engine/powerups.ts`** registry pattern + `getPowerUp(type)` helper
- [x] useGameLoop 重構 monkey-hit + building-hit 用註冊表查表（消除 30+ 行散落數字）
- [x] README 大幅重寫含完整檔案結構與 **Security 章節**
- [x] npm scripts: `test` / `test:watch` / `test:ui`

### 🏆 Phase 10：v3.10.0 B1.5 App.tsx 拆分終局（2026-04-29）✨
- [x] **`src/game/engine/scoring.ts`**：`calculateScore(hitPos, shooterPos, targetPos)` 純函式
- [x] **`src/game/engine/turnTransition.ts`**：`handleTurnTransition(prev, next)` 回合切換邏輯
- [x] **`src/game/hooks/useInput.ts`**：6 個 canvas handler（mouse + touch）封裝
- [x] **`src/game/hooks/useGameLoop.ts`**：535 行 setInterval 主迴圈完整移植
- [x] App.tsx 移除：calculateScore（10 行）+ handleTurnTransition（110 行）+ 6 個 handler（190 行）+ game loop useEffect（535 行）+ lastWindowToggle ref + 7 個 unused imports
- [x] **App.tsx 2418 → 1590 行（淨削減 828 行 = 34%）**
- [x] **B 階段拆分 100% 完成 — 從 2802 → 1590 = -43%**
- [x] ESLint warnings 11 → 6（清掉 5 個 unused 後）
- [x] Build 2.86s pass，typecheck pass

---

## 🛠️ 目前狀態 (Current Status)

| 項目 | 狀態 |
|---|---|
| **版本** | `v3.15.1` ✅ |
| **正式站** | https://cagoooo.github.io/monkey/ |
| **Firebase 專案** | `monkey-pixel-clash`（自有） |
| **CI/CD** | GitHub Actions（Node 22 LTS） |
| **PWA** | ✅ 可離線、可加入主畫面、有更新橫幅 |
| **Lint** | ✅ ESLint 9 Flat Config（0 error / 16 warning）|
| **Type Check** | ✅ pass |
| **Bundle Size** | ✅ **主程式 247 KB / gzip 76 KB**（已拆 firebase/motion/react/icons 4 個 vendor chunks）|
| **npm audit** | ✅ **0 漏洞** |
| **App.tsx 行數** | **1590 行**（B1.5 又削減 828 行，**累計從 2802 → 1590 = -43%**）🏆 |
| **`src/game/`** | constants ✅ types ✅ **engine/ (5 模組) ✅** **hooks/ (6 hooks) ✅** **components/ (6 元件) ✅**，worker/ 仍空 |
| **抽出 engine 模組** | 6 個（terrain / collision / physics / scoring / turnTransition / **powerups** ✅）|
| **單元測試** | **72 個** pass / 347ms（vitest）✅ |
| **抽出 hooks** | 6 個（useLeaderboard / useViewportHeight / useFullscreen / useScoreSubmission / useInput / useGameLoop）|
| **抽出 components** | 6 個（PortraitHint + decorations + Leaderboard + ScoreEntryModal + WinnerScreen + StartScreen）|
| **ESLint warnings** | 6 個（從 17 一路清到 6）|
| **GitHub Actions runtime** | ⚠️ `actions/checkout@v4` 內部仍 Node 20（要等官方釋出 v5，這是 GitHub 端的事，無法在我們專案修）|

---

# 🚀 未來優化與開發建議（v3.7.0 後新版藍圖）

> 重新依**目前狀態**排列優先級。原 A 階段已全部完成，所以 B 階段升級為「下一個立即可做」群組，新加入「🅴 維運 Hardening」應對這次 build 後出現的 audit / bundle size / Node.js 棄用警告。

---

## 🅴 維運 Hardening（v3.7.0 後立即補，2 小時內可收斂）

### E1. `npm audit fix` — 處理 7 個漏洞 ⭐⭐⭐⭐
**為什麼**：`npm install` 後跳出 `7 vulnerabilities (1 moderate, 5 high, 1 critical)`，雖然多半是傳遞依賴，但 critical 不該放著。
**怎麼做**：
```bash
npm audit                    # 先看是哪些套件
npm audit fix                # 先試非破壞性修復
npm run typecheck && npm run build   # 確認沒壞
# 若還剩 high/critical：
npm audit fix --force        # 接受可能的 breaking change
npm run build                # 再驗一次
```
**驗收**：`npm audit` 顯示 `0 critical / 0 high`。

### E2. 升級 GitHub Actions Node.js 20 → 24 ⭐⭐⭐
**為什麼**：CI log 警告 `Node.js 20 actions are deprecated. Will be removed 2026-09-16.`。提早升避免某天突然紅燈。
**怎麼做**：編輯 `.github/workflows/deploy.yml`：
```yaml
- name: Setup Node.js ⚙️
  uses: actions/setup-node@v4
  with:
    node-version: 22       # 或 24 LTS
    cache: 'npm'
```
然後本地也跑：
```bash
nvm use 22                 # 或 fnm / volta
npm ci && npm run build    # 確認 build 不壞
```
**驗收**：CI run 不再有 Node 20 deprecation annotation。

### E3. Bundle Size 優化（841 KB → 拆 chunk）⭐⭐⭐
**為什麼**：vite 警告 `chunks larger than 500 kB`。手機上首次載入慢，PWA precache 也膨脹。
**怎麼做**：在 `vite.config.ts` 加 `manualChunks`：
```ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor':    ['react', 'react-dom'],
        'firebase-vendor': ['firebase/app', 'firebase/firestore', 'firebase/auth'],
        'motion-vendor':   ['motion/react'],
        'icons-vendor':    ['lucide-react'],
      },
    },
  },
}
```
最大效益是把 `firebase` 拆出來（用戶玩遊戲時不需要等它）。
**驗收**：主 chunk < 400 KB，總大小不變但首屏快很多。

### E4. Firestore Indexes 規劃 ⭐⭐
**為什麼**：目前 `getTopScores` 用 `orderBy('score', 'desc').limit(5)`，單欄位排序不需 composite index。但未來加「依年級篩選」「依月份篩選」就會需要。
**怎麼做**：先預留 `firestore.indexes.json`（已建空），需要時：
```json
{
  "indexes": [
    {
      "collectionGroup": "leaderboard",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "grade", "order": "ASCENDING" },
        { "fieldPath": "score", "order": "DESCENDING" }
      ]
    }
  ]
}
```
然後 `firebase deploy --only firestore:indexes`。

### E5. Sentry 或 Firebase Crashlytics ⭐⭐
**為什麼**：目前 production 錯誤完全黑盒。學生回報「我玩到一半當掉了」根本查不到原因。
**怎麼做**（任一）：
- **Sentry 免費 5000 events/月**：`@sentry/react` SDK，5 行設定
- **Firebase Crashlytics**：已有 Firebase 專案，更整合
**驗收**：故意 throw 一個 error，能在 dashboard 看到。

---

## 🅱️ 中期重構（B 階段，1～2 週）— 下一個重點

### B1. **拆分 `App.tsx`**（最高優先）⭐⭐⭐⭐⭐
**現況**：`App.tsx` 仍 2802 行單檔，所有 state / 物理 / 繪圖 / UI 混在一起。
**目標結構**（已建好空殼）：
```
src/
├── game/
│   ├── constants.ts           ✅ 已完成（A3）
│   ├── types.ts               # 從 src/types.ts 搬進來
│   ├── engine/
│   │   ├── physics.ts         # 拋物線 / 重力 / 風 / 阻力
│   │   ├── collision.ts       # 像素碰撞 / AABB
│   │   ├── terrain.ts         # 地形生成 / 破壞
│   │   └── ai.ts              # （C3 用）電腦對手
│   ├── hooks/
│   │   ├── useGameLoop.ts     # requestAnimationFrame
│   │   ├── useInput.ts        # 觸控 / 滑鼠 / 鍵盤
│   │   ├── useGameState.ts    # 回合 / 分數 / 道具
│   │   └── useFullscreen.ts   # 已有邏輯抽出
│   ├── components/
│   │   ├── PortraitHint.tsx   ✅ 已完成（A4）
│   │   ├── CanvasStage.tsx    # 純繪圖
│   │   ├── HUD.tsx            # 角度 / 力道 / 風向
│   │   ├── StartScreen.tsx
│   │   ├── WinnerScreen.tsx
│   │   ├── Leaderboard.tsx
│   │   └── ScoreEntryModal.tsx
│   └── worker/
│       └── physics.worker.ts  # （B3 用）
├── services/
│   ├── soundService.ts        ✅
│   └── leaderboardService.ts  # 包 firebase 呼叫
├── App.tsx                    # 縮到 ≤ 200 行（只剩 Provider/路由）
└── main.tsx
```
**做法紀律**：每次 commit 只搬一個檔，跑一次遊戲確認沒壞，再搬下一個。**禁止一次大爆炸式重構**。
**驗收**：`App.tsx` ≤ 200 行；ESLint warnings 從 16 降至 < 5。

### B2. 為物理引擎寫單元測試 ⭐⭐⭐⭐
**為什麼**：拋物線、風力、碰撞是純函式，最容易測也最容易回歸。B1 拆完就立刻補測試鎖住正確性。
**怎麼做**：
```bash
npm i -D vitest @vitest/ui
```
測試 `calcTrajectory`、`pixelCollide`、`getGroundY` 等核心數學函式。
**驗收**：CI 跑測試，物理層覆蓋率 ≥ 60%。

### B3. Web Worker 物理運算 ⭐⭐⭐
**為什麼**：地形破壞要重算 ImageData，大爆炸時 Canvas 會掉幀。
**怎麼做**：`physics.worker.ts` 收 `{ map, x, y, radius }` → 回 `{ newMap, affectedRegions }`，主執行緒只畫畫。
**驗收**：iPhone 11 連續 5 次大爆炸不掉幀。

### B4. 風力視覺化 ⭐⭐⭐⭐ ⚡ CP 值最高
**為什麼**：目前風力只是冷數字，玩家很難「感覺」風。
**怎麼做**：
- 螢幕上方畫旗幟，飄動角度 = 風力 × 30°
- 強風時背景雲飄得更快
- 香蕉飛行時加微弱橫向粒子流
**驗收**：玩家不看數字也能判斷風向。

### B5. 道具系統可擴充化 ⭐⭐⭐
**為什麼**：現在 10X / ACID 是 if-else 寫死，新增道具改一堆地方。
**怎麼做**：改成註冊表
```ts
type PowerUp = {
  id: string;
  name: string;
  icon: string;
  apply: (banana: Banana) => Banana;
  onHit?: (ctx: GameContext) => void;
};
const POWERUPS: Record<string, PowerUp> = { giant: {...}, acid: {...} };
```
**驗收**：3 行內加新道具。

### B6. **Cloud Function 防刷分（A5 的進化版）** ⭐⭐⭐⭐
**為什麼**：A5 的 Rules 防護擋不住「合法格式但短時間連續灌假分」。要徹底防刷分必須加伺服端驗證。
**怎麼做**：
1. 升 Firebase Blaze 方案（Cloud Functions 必要 — 注意配 Budget Alert）
2. 寫 `submitScore` Callable Function：前端送 replay log（每回合的角度/力道/結果）
3. 後端用相同物理引擎重播驗證 → 合理才寫入
4. 改 `firestore.rules`：`allow create: if false`（只允許 Function 寫入）
**驗收**：直接打 Firestore REST API 寫不進去；用 DevTools 改前端送假分被擋。

> ⚠️ 升 Blaze 前看 `gemini-free-tier-first` skill 經驗：Blaze 開了不代表會收費，配 Budget Alert + maxInstances 仍可保 $0/月。

---

## 🅲 長期擴充（C 階段，1 個月以上）

### C1. 線上即時對戰（WebRTC / PeerJS）⭐⭐⭐⭐⭐
**架構**：
- 訊號伺服器：Firebase Realtime Database（免費額度足夠教室用）
- 連線層：PeerJS（封裝 WebRTC）
- 同步資料：只送 `{ angle, power, powerUp }`（< 50 bytes/次），雙方相同 seed 算物理 → rollback netcode 雛形
**踩雷預警**：
- 校園 NAT/防火牆常擋 WebRTC，要備援 TURN server（Open Relay 免費）
- 雙方亂數種子要同步否則建築長不一樣

### C2. 帳號系統 + 跨裝置同步 ⭐⭐⭐
**為什麼**：學生在學校玩，回家想接著玩排行榜。
**做法**：
- Firebase Auth Google OAuth（學校 G Suite 帳號就能用 — 但要先驗證學校沒鎖第三方 OAuth）
- 紀錄個人最佳成績、解鎖道具、累積經驗
- 此時才會用到 **Authorized Domains**（前面延後的步驟，這時候設）

### C3. AI 電腦對手（Gemini API）⭐⭐⭐⭐
> ⚠️ 觸發 `gemini-free-tier-first` skill — 學校教學用一定要設計成永遠停留在免費層。

**做法（從低到高）**：
1. **數學 AI**：給定地形/風力解最佳拋物線（封閉解）+ 隨機誤差（難度）
2. **Gemini AI 嘴砲**：每回合產生一句嘲諷台詞（用免費層 Gemini Flash）
3. **強化學習玩具**：TensorFlow.js 訓練猴子自學瞄準（純科普）
**驗收**：簡單 / 普通 / 困難三難度，困難能用「橡皮彈反彈攻擊」。

### C4. 多地圖 + 主題系統 ⭐⭐⭐⭐ ✅ **v3.15.1 三波全部完成**
- ✅ 6 主題：城市 / 太空 / 深海 / 校園 / 節慶 / 火山
- ✅ themes.ts registry + StartScreen 選單（6 格）
- ✅ Canvas 背景接 theme（gradient + 星 / 泡 / 雪 / 火星 4 種粒子層）
- ✅ useGameLoop air resistance（深海漂浮）
- ✅ bananaTrail 主題化（每主題獨立配色 + 線寬）
- ✅ **explosionStyle 主題化**（festive 煙火 / volcano 熔岩噴發；particles.ts helper）
- ⏳ 後續可加：節慶聖誕音效 / 主題切換時 crossfade 動畫

### C5. Sprite 動畫系統 ⭐⭐⭐ 🟡 **v3.15.0 輕量版完成**
- ✅ idle 呼吸（sin bob）
- ✅ 眨眼動畫（~3s 一次）
- ⏳ 後續可加：完整 Kenney sprite sheet（投擲蓄力 / 受傷 / 思考）/ 嘴形動畫
**素材**：Kenney.nl 大量 CC0 免費像素風 sprite
**技術**：Canvas `drawImage` 切幀（比 SVG path 快很多）
**驗收**：猴子有「投擲、歡呼、受傷、待機」4 種狀態 sprite

### C6. **國小資訊課教學整合** ⭐⭐⭐⭐⭐ ⚡ 你最強的應用情境
你是國小資訊老師（系統 memory），這條是專案最有差異化的方向：

#### C6.1 「程式積木」模式
把角度/力道改成 Blockly 程式積木，學生用拼的：
```
當輪到我時：
  讀取 風力
  計算 角度 = 45 + 風力 × 2
  發射 香蕉
```
讓「玩遊戲」=「學程式邏輯」。

#### C6.2 班級排行榜
用 `?class=601` query string 篩選同班分數。Firestore 要加 `class` 欄位 + composite index。

#### C6.3 錄影回放 GIF 分享
每場結束生成 GIF，學生分享給家長。
- 用 `gif.js` 把每幀 Canvas 截下來合成
- 或用瀏覽器原生 `MediaRecorder` 錄成 webm

#### C6.4 老師後台
- 看哪些班級活躍
- 哪個道具最常用
- 平均一場時長
- → 結合 Firebase Analytics + 簡單的 admin 頁面（用學校 Gmail 登入限制）

### C7. 無障礙與包容性 ⭐⭐⭐
**為什麼**：學校有色弱、視障學生，符合教育部數位平權。
**做法**：
- 紅綠色弱模式（雙方改藍/橙）
- 鍵盤可全程操作（Tab + Enter）
- 螢幕閱讀器 `aria-label`
- `prefers-reduced-motion` 動畫減弱模式

---

## 🅳 文件與品質指標（持續性）

### D1. 觀測性
- [x] **`<meta app-version>`** 已加（v3.7.0）
- [ ] **Firebase Analytics**：哪個道具最常用？平均一場幾分鐘？（C 階段配合 Crashlytics）
- [ ] **Lighthouse CI**：每次 PR 自動跑 Performance / A11y / SEO 分數
- [ ] **Sentry/Crashlytics**（見 E5）

### D2. 文件
- [x] CHANGELOG v3.7.0
- [ ] `CONTRIBUTING.md`（你未來想開源的話）
- [ ] `ARCHITECTURE.md`（B1 重構後畫一張系統圖）
- [ ] README 加上 Demo GIF 動圖（最吸睛）
- [ ] 把舊的 `OPTIMIZATION_SUGGESTIONS.md` / `FUTURE_ROADMAP.md` 標記為 archived（內容已被本檔取代）

### D3. 安全清單
- [x] Firebase API Key 網域限制（v3.7.0 完成）
- [x] Firebase API Key API targets 限制
- [x] Firestore Rules 嚴格 schema
- [x] GitHub Secrets 同步新值
- [ ] 定期 rotate API Key（建議 90 天，下次 2026-07-28 前）
- [ ] `npm audit` 加進 CI（high/critical fail build）— 見 E1
- [ ] Dependabot 自動 PR 升級依賴
- [ ] **舊 sandbox `gen-lang-client-0869715626`** 因不是你 owner 沒法刪，建議：
  - `cagoooo/monkey` repo 設定 → Secret scanning 啟用
  - 把舊 API Key (`AIzaSyBeRPllpivQYquLNLFava4IiqHVjb1j62k`) 從 git 歷史 purge（用 `git filter-repo` 或接受它仍在歷史中）
  - 新版本徹底切乾淨即可

---

## 🎯 下一步執行順序（v3.8.0 後）

| # | 項目 | 狀態 / 預估工時 | 影響 |
|---|------|---------|------|
| ~~1~~ | ~~E1 npm audit fix~~ | ✅ 完成（v3.8.0）| 0 漏洞 |
| ~~2~~ | ~~E2 Node.js 升級~~ | ✅ 完成（Node 22 LTS）| 避開棄用 |
| ~~3~~ | ~~E3 Bundle 拆 chunk~~ | ✅ 完成（247 KB 主程式）| 載入快 70% |
| ~~4~~ | ~~B4 風力視覺化~~ | ✅ 完成（3 層）| UX 大升級 |
| ~~5~~ | ~~B1.2 拆出 engine/~~ | ✅ 完成（v3.8.1）：terrain + collision + physics 三模組（純函式 + helper 提供） |
| ~~6~~ | ~~B1.3 拆出 hooks/~~（第一波）| ✅ 完成（v3.8.2）：useViewportHeight / useFullscreen / useScoreSubmission |
| ~~7~~ | ~~B1.4 拆出 components/~~ | ✅ 完成（v3.9.0） |
| ~~6b~~ | ~~B1.5 useGameLoop + useInput~~ | ✅ 完成（v3.10.0）：App.tsx 削減 828 行 🏆 |
| ~~8~~ | ~~B2 物理引擎單元測試~~ | ✅ 完成（v3.11.0）：72 tests / 347ms |
| ~~9~~ | ~~B5 道具系統註冊表化~~ | ✅ 完成（v3.11.0）：POWERUPS registry + useGameLoop 接入 |
| ~~10~~ | ~~B3 Web Worker 物理~~ | ✅ 重新評估後**不做**（v3.12.0）— 改為 frame timing + 量測先行；分析見 docs/B3-WEB-WORKER-ANALYSIS.md |
| ~~11~~ | ~~B6 Cloud Function 防刷分~~ | ✅ **v3.13.0 正式部署上線**，3 層防禦全部就緒 🛡️ |
| **10b** | **B3-alt 量測後再決定**：先請 user 用 iPhone 玩大爆炸場景，看 console 有無 Slow tick | 0.5h 量測 | 數據導向決策 |
| **11b** | **B6 部署**：升 Blaze + 設 Budget Alert + `firebase deploy --only functions:monkey` + 切 feature flag | 30 min | 啟用 server-side rate limit |
| **12** | **C3 AI 電腦對手 (Gemini)** | 1 週 | 單人模式上線 |
| **13** | **C6 教學整合**（Blockly / 班級榜 / GIF）| 持續性 | 你的最強差異化 |

---

## 💎 v3.10.0 累計結算（v3.7.0 → 3.8.x → 3.9.0 → **3.10.0** 六連發 🏆）

| 類別 | v3.6.x | v3.7.0 | v3.8.0 | v3.8.1 | v3.8.2 | v3.9.0 | **v3.10.0** |
|---|---|---|---|---|---|---|---|
| 依賴套件 | 686 | 562 | 562+over | 562+over | 562+over | 562+over | 562+over |
| npm 漏洞 | 未檢視 | 7 個 | 0 ✅ | 0 ✅ | 0 ✅ | 0 ✅ | 0 ✅ |
| 主程式 bundle | 851 KB | 851 KB | 247 KB | 247 KB | 248 KB | 250 KB | 250 KB |
| Bundle gzip | — | 231 KB | 76 KB | 76 KB | 77 KB | 77 KB | 78 KB |
| **App.tsx 行數** | 2802 | 2802 | 2852 | 2852 | 2784 | 2418 | **1590** 🏆 |
| 抽出 engine 模組 | 0 | 0 | 0 | 3 | 3 | 3 | **5 個** ✅ |
| 抽出 hooks | 0 | 0 | 1 | 1 | 4 | 4 | **6 個** ✅ |
| 抽出 components | 0 | 0 | 1 | 1 | 1 | 6 | 6 |
| Lint warnings | — | — | 16 | 17 | 17 | 11 | **6** ✅ |

## 💎 v3.8.2 累計結算（v3.7.0 → 3.8.0 → 3.8.1 → 3.8.2 連發）

| 類別 | v3.6.x | v3.7.0 | v3.8.0 | v3.8.1 | **v3.8.2** |
|---|---|---|---|---|---|
| 依賴套件 | 686 | 562 | 562+override | 562+override | 562+override |
| npm 漏洞 | 未檢視 | 7 個 | 0 ✅ | 0 ✅ | 0 ✅ |
| 主程式 bundle | 851 KB | 851 KB | 247 KB | 247 KB | 248 KB |
| Bundle gzip | — | 231 KB | 76 KB | 76 KB | 77 KB |
| CI Node.js | 20 | 20 | 22 LTS | 22 LTS | 22 LTS |
| 風力視覺化 | 數字 | 數字 | 雲+旗+HUD ✅ | ✅ | ✅ |
| App.tsx 行數 | 2802 | 2802 | 2852 | 2852 | **2784** ✅ |
| 純函式抽出 | 0 | 0 | 0 | 11 個 | 11 個 |
| 自訂 hooks | 0 | 0 | 1 | 1 | **4 個** ✅ |
| Firebase 控制權 | sandbox | 自有 ✅ | ✅ | ✅ | ✅ |

## 💎 v3.8.0 累計結算（v3.7.0 + v3.8.0 一波接一波）

| 類別 | v3.6.x | v3.7.0 | **v3.8.0** |
|---|---|---|---|
| 依賴套件 | 686 | 562 | 562 + override |
| npm 漏洞 | 未檢視 | 7 個（1 critical）| **0** ✅ |
| 主程式 bundle | （未拆）| 851 KB | **247 KB** ✅ |
| Bundle gzip | — | 231 KB | **76 KB** ✅ |
| CI Node.js | 20 | 20 | **22 LTS** ✅ |
| 風力視覺化 | 數字 | 數字 | **雲層 + 旗幟 + HUD 箭頭** ✅ |
| App.tsx 模組化 | 0 | constants 抽出 | constants + types + 1 hook ✅ |
| Firebase 控制權 | sandbox 借用 | 自有 ✅ | 自有 ✅ |
| API Key 限制 | 無 | referrer + API ✅ | referrer + API ✅ |
| PWA | 無 | ✅ | ✅ + workbox 1.2 |

## 💎 v3.7.0 結算

這次一波到位的成就：

| 類別 | 提升 |
|---|---|
| **依賴** | 686 → 562 套件（-18%）|
| **Firestore Rules** | 寬鬆 → 嚴格 schema + regex + 整數限制 |
| **API Key 安全** | 0 限制 → referrer 4 條 + API targets 4 個 |
| **PWA** | 無 → 可離線 / 加主畫面 / 自動更新 |
| **直立模式** | 強制橫屏 → 直立可玩 + 觸控 ≥ 44px |
| **程式碼模組** | App.tsx 單檔 → constants.ts 抽出（B1 起步）|
| **Lint** | 無 → ESLint 9 + react-hooks |
| **自動化** | 手動點 console → firebase + gcloud + gh 三角全自動 |
| **Firebase 控制權** | AI Studio sandbox 借用 → 100% 自有專案 |
| **Skill 沉澱** | — → `firebase-stack-automation` 跨專案可重用 |

> 🎮 **接下來建議**：先做 E1～E3 三件小事（總共 2 小時內），讓 v3.7.x 維運面更穩；之後可以平行進 B4 風力視覺化（給玩家立刻有感）和 B1 拆 App.tsx（解鎖一切擴充）。Cloud Function 防刷分（B6）建議跟學生實際使用排行榜的時間搭配 — 看到有人開始刷分再上會比較有動力。

> 💡 **特別提示**：你已經有完整的 firebase + gcloud + gh 自動化串聯能力，未來建任何新教學 app 都能在 30 分鐘內完成「建專案 + 部署 rules + 設限制 + 同步 secrets」全流程。這個基礎設施紅利會持續產生複利效應。
