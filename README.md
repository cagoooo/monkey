# 🐒 猴子投擲大戰 (Monkey Pixel-Art Clash)

[![Deploy](https://github.com/cagoooo/monkey/actions/workflows/deploy.yml/badge.svg)](https://github.com/cagoooo/monkey/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live-Demo-yellow)](https://cagoooo.github.io/monkey/)

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
