# 📈 專案開發進度表 (DEVELOPMENT_PROGRESS.md)

> 最後更新：2026-04-28
> 目前版本：**v3.6.x** (GitHub Pages 穩定運行)

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
- [x] **v3.6.0** 部署遷移：Vercel → GitHub Pages（修正資源路徑）
- [x] **Firebase 雲端排行榜**：Firestore + 規則 (`firestore.rules`) + Serverless 安全部署
  - 已分離 `src/firebase.ts`，使用 publishable key + 網域限制
  - `firebase-applet-config.json` / `firebase-blueprint.json` 結構化設定
- [x] **AudioContext 自動播放警告修復**（兩次 patch）
  - 延遲初始化 + 首次互動才解鎖音訊
- [x] **Favicon 404 修復**：補齊 `favicon.ico` 多尺寸圖示
- [x] **OG 社群卡片重置**：1200×630 標準尺寸 + 完整 Meta 標籤
- [x] **直立模式開放**：移除強制橫向遮罩，手機直立可玩
- [x] **音效服務模組化**：`src/services/soundService.ts` 抽離

---

## 🛠️ 目前狀態 (Current Status)

| 項目 | 狀態 |
|---|---|
| 版本 | `v3.6.x` |
| 部署 | GitHub Pages（自動化 CI/CD）|
| 後端 | Firebase Firestore（排行榜）|
| 主要檔案 | `src/App.tsx` 仍為 **2802 行單檔**（待拆分）|
| 待清理依賴 | `express`, `better-sqlite3`, `dotenv`（純前端不需要）|
| 模組目錄 | `src/game/{components,hooks,worker}` 已建好但**仍空** |

---

# 🚀 未來優化與開發建議（詳細參考）

> 以下分為「立即可做」「中期重構」「長期擴充」三層，每項都附上**為什麼做**、**怎麼做**、**驗收標準**，方便照表操課。

---

## 🅰️ 立即可做（1～3 天可收斂）

### A1. 清理 `package.json` 殘留依賴 ⭐⭐⭐⭐⭐
**為什麼**：`express` / `better-sqlite3` / `dotenv` / `@types/express` 是早期 server 版本殘留，現在純前端 + Firebase 架構完全用不到，每次 `npm install` 多裝 20MB+，CI 也變慢。
**怎麼做**：
```bash
npm uninstall express better-sqlite3 dotenv @types/express
```
順手檢查 `@google/genai` 是否真的有用到（沒用就一起拔）。
**驗收**：`npm run build` 仍 pass、`dist/` 大小不變、`node_modules` 縮 30%+。

### A2. 加上 `npm run typecheck` + `npm run lint` 真的能用 ⭐⭐⭐⭐
**為什麼**：目前 `lint` 只是 `tsc --noEmit`，沒有 ESLint，大檔案容易藏 dead code 與 any。
**怎麼做**：
- 加入 `eslint`、`@typescript-eslint/*`、`eslint-plugin-react-hooks`
- `npm run lint` 改為真 ESLint，`npm run typecheck` 才是 `tsc --noEmit`
- CI workflow 補一步 `npm run lint && npm run typecheck`
**驗收**：CI 紅綠燈反映程式碼健康。

### A3. 把 `App.tsx` **常數**先抽出來 ⭐⭐⭐⭐
**為什麼**：拆 2802 行很可怕，但只把 `GRAVITY`、`WIND_RANGE`、`BUILDING_MIN/MAX`、`POWER_UP_TYPES` 之類**常數**先搬到 `src/game/constants.ts` 是 30 分鐘內可做的零風險重構。
**怎麼做**：
```ts
// src/game/constants.ts
export const PHYSICS = { GRAVITY: 0.3, AIR_RESISTANCE: 0.99 } as const;
export const POWERUPS = { GIANT_SCALE: 10, ACID_RADIUS: 80 } as const;
```
**驗收**：常數搜尋只剩一處定義，行為無變化。

### A4. 直立模式 UX 補強 ⭐⭐⭐⭐
**為什麼**：剛開放直立但 UI 是橫向設計的，按鈕可能擠在一起。
**怎麼做**：
- `useEffect` 監聽 `window.matchMedia('(orientation: portrait)')`
- 直立時 Canvas 改 9:16 比例，按鈕 Stack 換成上下排版
- 角度盤改大、力道條變直立
**驗收**：iPhone SE / iPad Mini 直立都能順暢操作。

### A5. Firebase 排行榜防刷分 ⭐⭐⭐⭐⭐
**為什麼**：純前端寫 Firestore = 任何人開 console 都能塞假分數。
**怎麼做**（兩擇一，由低到高）：
1. **Firestore Rules 限制**（最低成本）：限制 `score < 合理上限`、`createdAt == request.time`、單 IP/anon UID 每分鐘最多 1 筆。
2. **Cloud Function 中介**（推薦）：寫 `submitScore` Callable Function，前端送遊戲 replay log，後端重播驗證後寫入。
**驗收**：用 curl 直打 Firestore REST 寫不進去。

### A6. 加入 PWA + Cache-Bust 機制 ⭐⭐⭐
**為什麼**：你已部署在 GitHub Pages，PWA 可離線玩、加到主畫面，但 SW 快取常導致「我改了但學生還看舊版」。
**怎麼做**：
- `vite-plugin-pwa` 加 manifest + service worker
- `registerSW({ immediate: true })` + 顯示「有新版本，重新整理」橫幅
- HTML 內加 `<meta name="version" content="3.6.x">` 方便驗證使用者跑哪版
**驗收**：手機可加到主畫面、離線進入仍能玩、推新版後有提示。

---

## 🅱️ 中期重構（1～2 週）

### B1. App.tsx 拆分 ⭐⭐⭐⭐⭐（高優先）
**目標結構**：
```
src/
├── game/
│   ├── constants.ts           # 物理 / 道具 / 顏色
│   ├── types.ts               # Entity 型別
│   ├── engine/
│   │   ├── physics.ts         # 拋物線 / 重力 / 風 / 阻力
│   │   ├── collision.ts       # 像素碰撞 / AABB
│   │   ├── terrain.ts         # 地形生成 / 破壞
│   │   └── ai.ts              # （未來）電腦對手
│   ├── hooks/
│   │   ├── useGameLoop.ts     # requestAnimationFrame
│   │   ├── useInput.ts        # 觸控 / 滑鼠 / 鍵盤
│   │   └── useGameState.ts    # 回合 / 分數 / 道具
│   ├── components/
│   │   ├── CanvasStage.tsx    # 純繪圖
│   │   ├── HUD.tsx            # 角度 / 力道 / 風向
│   │   ├── StartScreen.tsx
│   │   ├── WinnerScreen.tsx
│   │   └── Leaderboard.tsx
│   └── worker/
│       └── physics.worker.ts  # （見 B3）
├── services/
│   ├── soundService.ts        # ✅ 已存在
│   └── leaderboardService.ts  # 包 firebase 呼叫
├── firebase.ts
├── App.tsx                    # 只剩路由 / 全域 Provider
└── main.tsx
```
**做法**：每次 commit 只搬一個檔，跑一次遊戲確認沒壞，再搬下一個。**禁止一次大爆炸式重構**。
**驗收**：`App.tsx` 縮到 200 行內、各 module 可獨立測試。

### B2. 為物理引擎寫單元測試 ⭐⭐⭐⭐
**為什麼**：拋物線、風力、碰撞是純函式，最容易測也最容易回歸。
**怎麼做**：
- 加 `vitest`（Vite 原生整合，零設定）
- 測試 `calcTrajectory(angle, power, wind)`、`pixelCollide(map, x, y)`
**驗收**：CI 會跑測試，覆蓋率 ≥ 60% 物理層。

### B3. 把碰撞 / 地形破壞搬到 Web Worker ⭐⭐⭐
**為什麼**：地形破壞時要重算 ImageData，大爆炸會掉幀。
**怎麼做**：
- `physics.worker.ts` 收 `{ map, x, y, radius }` → 回 `{ newMap, affectedRegions }`
- 主執行緒只負責畫畫
**驗收**：iPhone 11 上連續 5 次大爆炸不掉幀。

### B4. 風力視覺化 ⭐⭐⭐⭐
**為什麼**：目前風力只是冷冰冰的數字，玩家很難「感覺」風。
**怎麼做**：
- 螢幕上方畫旗幟，旗幟飄動角度 = 風力 × 30°
- 香蕉飛行時加微弱橫向粒子流（Canvas `globalAlpha = 0.3`）
- 強風時背景雲飄得更快
**驗收**：玩家不看數字也知道風往哪吹。

### B5. 道具系統可擴充化 ⭐⭐⭐
**為什麼**：現在 10X / ACID 是 if-else 寫死的，新增道具要改一堆地方。
**怎麼做**：改成註冊表模式
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
新增「三連發」「橡皮彈」「凍結」只要加一筆。
**驗收**：3 行內就能加新道具。

---

## 🅲️ 長期擴充（願景，1 個月以上）

### C1. 線上即時對戰（WebRTC / PeerJS）⭐⭐⭐⭐⭐
**為什麼**：本地雙人需要兩人共用一台裝置，遠距朋友玩不到。
**架構建議**：
- **訊號伺服器**：Firebase Realtime Database（免費額度足夠教室用）
- **連線層**：PeerJS（封裝 WebRTC，比 Socket.io 不用維護後端）
- **同步資料**：只送 `{ angle, power, powerUp }` 三個值（< 50 bytes/次），雙方用相同 seed 算物理 → **rollback netcode** 雛形
**踩雷預警**：
- WebRTC 在校園 NAT/防火牆常被擋，要備援 TURN server（可用免費的 Open Relay）
- 雙方亂數種子要同步，否則建築長不一樣

### C2. 帳號系統 + 跨裝置同步 ⭐⭐⭐
**為什麼**：學生在學校玩、回家想接著玩排行榜。
**怎麼做**：
- Firebase Auth Google OAuth 登入（學校 G Suite 帳號就能用）
- 用 Supabase 也行（如果想轉 stack）
- 紀錄個人最佳成績、解鎖道具、累積經驗
**踩雷預警**：學校 G Suite 帳號可能被組織策略禁用第三方 OAuth，要先測試。

### C3. AI 電腦對手（Gemini API）⭐⭐⭐⭐
**為什麼**：單人模式 = 沒朋友也能玩，是國小資訊課最常見的剛需。
**做法**（從低到高）：
1. **數學 AI**：給定地形、風力，解最佳拋物線（封閉解）+ 隨機誤差（難度）
2. **Gemini AI 嘴砲**：每回合產生一句嘲諷台詞，用免費層 Gemini Flash 即可
3. **強化學習**（玩具）：用 TensorFlow.js 訓練猴子自學瞄準（純科普用）
**驗收**：簡單/普通/困難三難度，困難模式能用「橡皮彈反彈攻擊」。

### C4. 多地圖 + 主題系統 ⭐⭐⭐⭐
- **太空**：低重力、流星背景、香蕉飛超遠
- **深海**：高阻力、氣泡特效、香蕉漂浮感
- **校園**：把建築改成教學樓、操場（可放老師照片當頭目 🐵）
- **節慶**：聖誕雪花、春節鞭炮（爆炸換成煙火粒子）
**做法**：地圖設定變 JSON
```json
{
  "id": "space",
  "gravity": 0.1,
  "wind": [-0.5, 0.5],
  "bgLayers": ["stars", "meteors"],
  "bananaTrail": "glow"
}
```

### C5. Sprite 動畫系統 ⭐⭐⭐
**為什麼**：代碼畫的猴子動作有限，貼圖能解鎖「投擲、歡呼、受傷、待機」豐富情緒。
**做法**：
- 用免費 Aseprite 或 Piskel 做 32×32 像素風 sprite sheet
- Canvas `drawImage(sheet, sx, sy, sw, sh, dx, dy, dw, dh)` 切幀
- **建議用 sprite 而不是 SVG**：Canvas 直接 drawImage 比 path 渲染快很多
**參考授權**：Kenney.nl 有大量 CC0 免費素材

### C6. 國小資訊課教學整合 ⭐⭐⭐⭐
（這個你是用戶主場）
- **「程式邏輯」教學模式**：把角度/力道改成「程式積木」，學生用 Blockly 拼出
  ```
  當輪到我時：
    讀取 風力
    計算 角度 = 45 + 風力 × 2
    發射 香蕉
  ```
- **錄影回放**：每場結束生成 GIF，學生可分享給家長
- **班級排行榜**：用 `?class=601` query string 篩選同班分數

### C7. 無障礙與包容性 ⭐⭐⭐
**為什麼**：學校有色弱、視障學生，符合教育部數位平權方向。
**做法**：
- 紅綠色弱模式（雙方改成藍/橙）
- 鍵盤可全程操作（Tab + Enter）
- 螢幕閱讀器標籤（`aria-label="當前玩家：紅方"`）
- 動畫減弱模式（`prefers-reduced-motion`）

---

## 🅳️ 維運與品質指標（持續）

### D1. 觀測性
- **Firebase Analytics**：哪個道具最常用？平均一場幾分鐘？
- **Sentry**（免費 5000 events/月）：抓 production 錯誤
- **Lighthouse CI**：每次 PR 自動跑 Performance / A11y / SEO 分數

### D2. 文件
- [ ] 補 `CONTRIBUTING.md`（你未來想開源的話）
- [ ] 補 `ARCHITECTURE.md`（重構後畫一張系統圖）
- [ ] README 加上線 Demo 連結 + GIF 動圖（最吸睛）

### D3. 安全清單
- [x] Firebase API Key 已加網域限制
- [ ] 定期 rotate API Key（建議 90 天）
- [ ] `npm audit` 加進 CI（高危漏洞 fail build）
- [ ] Dependabot 自動 PR 升級依賴

---

## 🎯 建議的執行順序（我的優先級觀點）

| # | 項目 | 預估工時 | 影響 |
|---|------|---------|------|
| 1 | A1 清理依賴 | 0.5h | 即時瘦身 |
| 2 | A5 排行榜防刷 | 2h | 安全性必補 |
| 3 | A3 抽常數 | 0.5h | 為 B1 鋪路 |
| 4 | A6 PWA | 3h | 學生體驗大加分 |
| 5 | B1 拆 App.tsx | 1～2 週 | 解鎖後續所有擴充 |
| 6 | B4 風力視覺化 | 4h | CP 值最高的 UX 升級 |
| 7 | C3 AI 電腦對手 | 1 週 | 單人模式上線 |
| 8 | C1 線上對戰 | 2～3 週 | 大功能，最後做 |

---

> 💡 **建議**：每完成一項就在本表打勾並 commit，CHANGELOG 同步更新。重構期間維持「一次只做一件事 + 隨時可回滾」的紀律。
