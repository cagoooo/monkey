# 🐒 猴子投擲大戰 (Monkey Pixel-Art Clash)

[![Deploy](https://github.com/cagoooo/monkey/actions/workflows/deploy.yml/badge.svg)](https://github.com/cagoooo/monkey/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live-Demo-yellow)](https://cagoooo.github.io/monkey/)

> 📌 **目前版本：v3.16.0**（依據 `CHANGELOG.md`）

啟發自 1991 年 QBASIC 經典遊戲 **GORILLAS.BAS**。控制你的猴子，瞄準對方並投出爆炸香蕉，享受兩人同樂的像素風格城市天際線大戰。

**🎮 線上玩**：https://cagoooo.github.io/monkey/

## ✨ 特色

- 🎯 **拋物線物理**：拖曳發射，受重力 + 風力影響
- 💥 **地形破壞**：爆炸挖洞改變戰場地形
- 🎁 **道具系統**：10X 巨大化、ACID 強酸、流星雨、雷射
- 🌬️ **風力視覺化**：雲層 + 旗幟 + HUD 三層指示
- 🏆 **雲端排行榜**：Firebase Firestore（防刷分 Rules）
- 📱 **PWA 支援**：可離線玩、加入主畫面
- 🔊 **8-bit 音效**：Web Audio API 即時合成
- 🎨 **直立 / 橫向皆可玩**

## 🛠️ 開發環境

```bash
# 1. 安裝依賴
npm install

# 2. 複製 .env.example 為 .env，填入你的 Firebase 設定
cp .env.example .env

# 3. 啟動 dev server
npm run dev          # http://localhost:3000

# 其他指令
npm run build        # vite 打包
npm run preview      # 預覽 production build
npm run typecheck    # tsc --noEmit
npm run lint         # ESLint
```

## 🏗️ 架構

```
src/
├── App.tsx                    # 主編排（~1590 行，B1 拆分後）
├── main.tsx                   # React 入口 + audio unlock + SW 註冊
├── pwa.ts                     # PWA 更新提示
├── firebase.ts                # Firestore 排行榜 API
└── game/
    ├── constants.ts           # 物理 / 道具 / 顏色常數
    ├── types.ts               # GameState / Building / Particle 等型別
    ├── engine/                # 純函式（可測試）
    │   ├── terrain.ts         # getGroundY / generateWindowGrid
    │   ├── collision.ts       # distance / isWithin / vecFromAngle
    │   ├── physics.ts         # applyForces / step / calcDragPower
    │   ├── scoring.ts         # calculateScore
    │   └── turnTransition.ts  # handleTurnTransition
    ├── hooks/                 # React 自訂 hooks
    │   ├── useGameLoop.ts     # 50 FPS setInterval 主迴圈
    │   ├── useInput.ts        # 滑鼠 + 觸控 handlers
    │   ├── useFullscreen.ts   # 真實 + pseudo fullscreen
    │   ├── useViewportHeight.ts
    │   ├── useLeaderboard.ts
    │   └── useScoreSubmission.ts
    └── components/            # UI components
        ├── StartScreen.tsx
        ├── WinnerScreen.tsx
        ├── Leaderboard.tsx
        ├── ScoreEntryModal.tsx
        ├── PortraitHint.tsx
        └── decorations.tsx
```

## 🔐 Security

### Firebase Web API Key 不是「密碼」

本專案的 Firebase Web API Key（`AIzaSy...`）會出現在前端 bundle 中，**這是設計使然**，不是安全漏洞。
詳見 [Firebase 官方文件](https://firebase.google.com/docs/projects/api-keys)：

> Unlike how API keys are typically used, **API keys for Firebase services are not used to control access to backend resources**; that can only be done with Firebase Security Rules.

如果 GitHub Secret Scanning 警告偵測到 `AIzaSy...` 字串並標記為「Secret detected」，**可以放心 dismiss as `wont_fix`**——我們的真正防線在 **Cloud Console 限制 + Firestore Rules**，不是靠藏 key。

### 三層防禦（defense-in-depth）

#### 1. HTTP Referrer 限制（GCP API Key）

只允許這些網域使用 API Key，其他 referrer 自動回 403：

```
https://cagoooo.github.io/*
http://localhost:*
http://localhost:3000/*
http://localhost:4173/*
```

#### 2. API Target 限制（GCP API Key）

API Key 只能呼叫這 4 個 Firebase 必要 API：

- `firestore.googleapis.com`
- `identitytoolkit.googleapis.com`
- `securetoken.googleapis.com`
- `firebaseinstallations.googleapis.com`

其他 Google API（如 Maps、YouTube、Vision）一律拒絕。

#### 3. Firestore Rules 嚴格 Schema（[firestore.rules](firestore.rules)）

排行榜寫入必須通過：

- `name` regex `^\d{1,2}年\d{1,3}班\d{1,3}號$`（防亂塞長字串）
- `score` 必須是整數，0 ≤ score ≤ 9999
- `timestamp` 必須等於 `request.time`（server 端，不能偽造）
- 預設 deny 所有其他 collection（whitelist 模式）

### 驗證指令

```bash
# 確認 API Key 限制還在
gcloud services api-keys describe 22dbb9a2-f2cb-4282-a86b-881fc94bffe4 \
  --project=monkey-pixel-clash \
  --account=ipad@mail2.smes.tyc.edu.tw \
  --format="value(restrictions)"

# 從非白名單網域測試（應回 403）
curl -H "Referer: https://malicious.example/" \
  "https://identitytoolkit.googleapis.com/v1/projects/monkey-pixel-clash:lookup?key=YOUR_KEY"
```

### 如果 GitHub 寄 Secret Scanning Alert 警告信

那是針對 Firebase Web API Key 字串模式的自動偵測，**不是真正的洩漏**。處理方式：

```bash
# 列出 alerts
gh api repos/cagoooo/monkey/secret-scanning/alerts \
  --jq '.[] | select(.state=="open")'

# Dismiss 標記 wont_fix
gh api -X PATCH repos/cagoooo/monkey/secret-scanning/alerts/<N> \
  -f state=resolved -f resolution=wont_fix \
  -f resolution_comment="Firebase Web API Key public by design. Protected by gcloud referrer + API target restrictions + Firestore Rules. See README#Security."
```

## 📜 版本歷史

完整變更紀錄見 [CHANGELOG.md](CHANGELOG.md)；專案開發進度與後續優化建議見 [DEVELOPMENT_PROGRESS.md](DEVELOPMENT_PROGRESS.md)。

目前版本 **v3.10.0**（2026-04-29）— B1 拆分終局，App.tsx 從 2802 → 1590 行（-43%）。

## 📄 License

Apache-2.0

---

<!-- BEGIN:PROJECT_GUIDE -->
## 專案導覽

🐒 Monkey 投擲大戰

- 專案定位：互動遊戲／遊戲化學習專案
- Repository：`cagoooo/monkey`
- 可見性：公開
- 主要技術：TypeScript、React、Vite、Firebase、Tailwind CSS
- 線上入口：<https://cagoooo.github.io/monkey/>

### 可以怎麼應用

- 課堂暖身、複習活動或學習站任務
- 校慶、闖關或社團活動中的互動挑戰
- 替換題庫、美術、音效與規則後，延伸成其他學科或主題遊戲

這些是依目前專案定位整理的延伸方向，不代表所有情境都已內建完成；實作前請先確認現有功能與資料格式。

### 技術與專案結構

- `README.md`
- `README_DETAIL.md`
- `docs`
- `firebase.json`
- `functions`
- `index.html`
- `package.json`
- `public`
- `src`
- `vite.config.ts`

檔案結構會隨版本演進；若本節與程式碼不一致，以目前預設分支的原始碼為準。

### 本機執行

```bash
npm install
# dev
npm run dev
# build
npm run build
# test
npm run test
# lint
npm run lint
```
請以 `package.json` 的 `scripts` 為準；若專案需要雲端服務，請先建立自己的環境變數與測試專案。

### 給 AI Agent 的接手指南

1. 先閱讀本 README、`AGENTS.md`（若有）、套件腳本與部署設定。
2. 先找出遊戲狀態、關卡／題庫資料與輸入控制的來源，再調整規則。
3. 更換素材時同步檢查授權、載入路徑、碰撞區域與不同螢幕比例。
4. 修改後至少驗證開始、遊玩、計分／勝負、重新開始，以及手機與桌面版面。
5. 不要捏造尚未存在的功能；README 與實作有落差時，應同時更新文件。
6. 提交前只納入本次任務檔案，並記錄實際執行過的驗證。

### 安全與資料注意事項

- 不要提交 `.env`、服務帳號、API 金鑰、token、學生個資或正式環境匯出資料。
- 使用 Firebase、Supabase、Google API 或其他雲端服務時，請建立自己的測試專案並套用最小權限。
- 若要公開衍生作品，請先確認程式碼、圖片、音訊、字型與教材內容的授權。

### 貢獻與客製化

歡迎依教學現場、活動或工作流程需求進行 fork／客製化。建議在變更說明中交代使用情境、主要修改、測試方式，以及是否影響資料格式或部署設定。
<!-- END:PROJECT_GUIDE -->

<!-- akai-edu-tools:backlink -->

---

## 🔗 阿凱老師教育工具集

這個專案是[阿凱老師教育工具集](https://cagoooo.github.io/Akai/)的 **#69 猴子丟香蕉-投擲大戰爭**，由桃園市龍潭區石門國民小學阿凱老師開發。

- 工具介紹頁：[https://cagoooo.github.io/Akai/tool/69/](https://cagoooo.github.io/Akai/tool/69/)
- 線上使用：[https://cagoooo.github.io/monkey/](https://cagoooo.github.io/monkey/)
- 教學情境文章：[https://cagoooo.github.io/Akai/blog/monkey-69-pixel-clash/](https://cagoooo.github.io/Akai/blog/monkey-69-pixel-clash/)
- 全部工具（上百個教育工具與原始碼）：[https://cagoooo.github.io/Akai/](https://cagoooo.github.io/Akai/)

想改造成自己的版本？到上面的教學情境文章，按左下角「複製 AI 開發提示詞」，貼給 ChatGPT、Claude、Gemini 等 AI 助手，就能參考這份原始碼開始規劃。
