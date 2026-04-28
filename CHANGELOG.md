# 📜 更新日誌 (CHANGELOG)

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
