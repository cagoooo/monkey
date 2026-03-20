# 🐒 Monkey 投擲大戰 - 詳細使用說明 (README_DETAIL.md)

本專案是一個基於 React + Vite + TypeScript 打造的經典「大猩猩投擲 (Gorillas)」風格的網頁版拋物線射擊遊戲。

## 🌟 遊戲核心特色
- **純前端實作**：使用 HTML5 Canvas 渲染遊戲畫面，無需外部資產。
- **物理擬真**：包含重力影響、動態風力、碰撞檢測及地形破壞系統。
- **互動 UI**：使用 Framer Motion (Motion) 打造流暢且極具現代感的介面。
- **音效系統**：運用 Web Audio API 即時生成 8-bit 風格音效，無需載入任何音檔。

---

## 🚀 快速開始

### 1. 環境需求
- [Node.js](https://nodejs.org/) (建議 v18 以上)
- npm 或 yarn

### 2. 安裝依賴
在專案目錄下執行：
```bash
npm install
```

### 3. 本地開發
啟動 Vite 開發伺服器：
```bash
npm run dev
```
啟動後，請訪問 `http://localhost:3000` 即可開始遊戲。

### 4. 專案建置 (Production)
```bash
npm run build
```
產出的靜態檔案會存放在 `dist` 資料夾。

---

## 🎮 玩法說明

### 第一步：遊戲設定
- **玩家名稱**：可自定義 P1 與 P2 的名稱。
- **重力設定**：調整重力係數（預設為 9.8，會影響香蕉落下的速度）。

### 第二步：瞄準與發射
- **拖曳操作**：在當前回合的玩家區塊內（畫面半部），點擊並向反方向（如彈弓般）拖曳。
- **角度與力道**：畫面上會顯示當前仰角與發射強度。
- **預測軌道**：前幾回合會顯示虛線預測軌道，協助玩家上手。

### 第三步：環境變量
- **風力**：每回合風力會變化（上方顯示風速），需根據風向調整拋落點。
- **寶箱/道具**：命中空中寶箱可獲得特殊武器：
  - **10X (Giant)**：大範圍強力爆炸。
  - **ACID (強酸)**：大面積腐蝕地形。

---

## 📁 檔案結構解析

- `src/App.tsx`: **核心遊戲邏輯**。包含狀態管理、物理運算、Canvas 繪圖、碰撞與爆炸邏輯。
- `src/services/soundService.ts`: **音效引擎**。直接呼叫 Web Audio API 產生合成音效。
- `src/types.ts`: 定義遊戲狀態、方塊、玩家、粒子等 TypeScript 介面。
- `index.html`: 遊戲掛載點。
- `vite.config.ts`: Vite 設定檔案，已配置 Tailwind CSS 與建置規則。

---

## 🚢 GitHub 部署評估 (GitHub Pages)

### 是否可以完整移植？
**答案是：可以，且非常適合。**

1.  **靜態部署**：本遊戲目前所有核心功能都在前端實現，不依賴伺服器端（Express + SQLite 雖然在 `package.json` 中，但在前端代碼中尚未被調用），因此極其適合部署至 **GitHub Pages**。
2.  **安全評估**：
    - 已執行 `grep_search` 掃描，目前未發現硬編碼的 API Keys。
    - `.env.example` 中的 `GEMINI_API_KEY` 與 `APP_URL` 屬於 AI Studio 預留，若不使用 AI 功能則不影響部署。
3.  **注意事項**：
    - 在部署至 GitHub Pages 前，需在 `vite.config.ts` 加入 `base: './'`（已檢查，目前配置需確保留白或正確指向子目錄）。
    - 建議刪除或註解掉 `package.json` 中未使用的 `express` 與 `better-sqlite3` 以縮減安裝體積。

---

## ⚙️ 技術堆疊參考
- **React 19**: 最新的 UI 框架。
- **Tailwind CSS v4**: 高效的樣式設定。
- **Motion (framer-motion)**：動畫與過場精靈。
- **Lucide-React**: 系統圖示。
- **TypeScript**: 嚴格類別檢查。
