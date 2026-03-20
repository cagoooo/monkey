# 💡 專案後續優化建議 (OPTIMIZATION_SUGGESTIONS.md)

為了提昇 **Monkey** 專案的專業度、開發效率及未來擴充性，以下是建議的優化方案。

## 🛠️ 第一階段：架構優化 (High Priority)

### 1. 職責分離 (Refactoring App.tsx)
目前的 `App.tsx` 超過 1400 行，建議進行以下拆分：
- **`src/hooks/useGameLoop.ts`**: 封裝遊戲循環、物理引擎 (Physics Engine) 與碰撞檢測邏輯。
- **`src/components/CanvasRenderer.tsx`**: 專門職司 Canvas 的繪圖邏輯。
- **`src/components/UI/`**: 拆分 `StartScreen`、`OverlayUI`、`WinnerScreen` 等元件。

### 2. 精簡 `package.json`
- **移除未使用依賴**：如果專案確定為純前端，建議移除 `express`、`better-sqlite3`、`dotenv` 及相關的 `@types`，以減少 `node_modules` 的體積。

---

## 🚀 第二階段：功能增強 (Medium Priority)

### 1. 視覺效果升級 (Visual Enhancements)
- **視覺資產引進**：目前猴子與香蕉皆使用代碼繪製。可引進 2D Sprite (猴子動作：投擲、歡呼、受傷、待機) 與 16-bit 地圖背景。
- **粒子系統擴展**：增加煙霧 (Smoke)、火花 (Spark) 與碎片效果，讓爆炸感更紮實。

### 2. 遊戲平衡與多樣性
- **風力視覺化**：目前的風力僅是數字。可以在畫面上方加入旗幟 (Flag) 律動，藉由旗幟飄揚的長度與速度反映風力，提昇沉浸感。
- **地圖隨機化升級**：目前主要以「長方矩形」作為建物。可以加入不同風格的地圖（如森林、月球、海底），隨之改變空氣阻力與重力值。

### 3. 多人對戰功能
- **本地雙人優化**：針對觸控螢幕優化操作體驗，提供分屏控制。

---

## 🔐 第三階段：安全性與部署優化 (Deployment & Security)

### 1. 建立 GitHub Actions CI/CD
- 建立 `.github/workflows/deploy.yml` 實現自動化部署：
  - 觸發條件：`push` 到 `main` 分支時。
  - 自動執行：`npm install`, `npm run build`。
  - 自動部署：將 `dist` 推送到 `gh-pages` 分支。

### 2. 環境變量保護機制
- **佔位符機制**：若未來引入 Gemini AI 等後端 API。
- **API Key 網域限制**：在 Google Cloud Console 為 Gemini API Key 設定限定部署後的 GitHub Pages 網址 (Referrer Restriction)。

---

## 🧪 驗證與測試建議
- **單元測試 (Unit Test)**：對 `getGroundY`、拋物線計算等數學邏輯加入測試檔案，確保留預防未來的邏輯斷裂。
- **RWD 測試**：使用不同尺寸的平板、手機與桌面螢幕進行 Canvas 縮放測試。
