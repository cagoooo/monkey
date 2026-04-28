# Cloud Functions 部署 SOP

> 對應 B6：A5 規則層的進化版（防刷分 + rate limit + 可疑值偵測）

## 🎯 為什麼要部署這個？

目前（v3.11.0）排行榜防刷分**只靠 Firestore Rules 層**，雖然能擋掉「亂塞長字串、超出範圍分數、偽造時間戳」，但**擋不住「合法格式但短時間連續灌假分」**。

部署 Cloud Function 後可以加：

| 防護 | Rules 層 | + Function |
|---|---|---|
| Schema 驗證 | ✅ | ✅ |
| score 上限 | ✅ | ✅ |
| Rate limit（同 name 60s 一次）| ❌ | ✅ |
| 高分 logging（>5000 自動記）| ❌ | ✅ |
| 未來可加 IP-based fraud detection | ❌ | ✅ |

## 💰 費用

**Cloud Functions 免費層每月 200 萬次叫用**，本專案估算：
- 每場遊戲玩 10 分鐘左右才提交 1 次分數
- 一個班 30 人一週上 1 次資訊課 = 30 次/週 × 4 週 = 120 次/月
- 即使 100 個班同時用 = 12,000 次/月，距離 200 萬上限**還有 166 倍空間**

**結論：永遠不會收費**，但仍要設成本護欄三層：
1. `setGlobalOptions({maxInstances: 10})` ✅ 已設
2. GCP Console → Billing → Budget Alert（< $1 USD 就告警）
3. 可選：加 reCAPTCHA Enterprise 防自動化攻擊

## 🚀 首次部署 SOP（一次性，~15 分鐘）

### Step 1: 升級到 Blaze 計費方案

🔗 https://console.firebase.google.com/project/monkey-pixel-clash/usage/details

點 **「Modify plan」→ 選 Blaze (Pay as you go)** → 綁信用卡。

> ⚠️ **不會立刻收費**，只是「萬一超出免費額度」才會扣款。配合下面的 Budget Alert，每月帳單長期 $0。

### Step 2: 設定 Budget Alert（**強烈建議**）

🔗 https://console.cloud.google.com/billing/budgets?project=monkey-pixel-clash

1. **Create Budget**
2. Name: `monkey-pixel-clash-alert`
3. Amount: `$1 USD`（或更低）
4. Alert thresholds: 50% / 90% / 100%
5. Email notifications: 你的 Gmail

只要月帳單超過 $0.5，立刻收信。

### Step 3: 安裝 functions 依賴

```bash
cd H:/Monkey/functions
npm install
```

### Step 4: 確認 firebase CLI 帳號

```bash
firebase login:list
# 應看到 ipad@mail2.smes.tyc.edu.tw（依 firebase-stack-automation skill 慣例）
```

### Step 5: 部署 Function

```bash
cd H:/Monkey
firebase deploy --only functions:monkey \
  --account=ipad@mail2.smes.tyc.edu.tw
```

> ⚠️ **必須加 `:monkey` codebase 後綴**（依 firebase-multi-app-safety skill 鐵則）。
> 不加就是 `--only functions` 會誤刪其他 codebase 的 functions。

預期看到：
```
✔ functions[monkey_submitScore(asia-east1)] Successful create operation.
✔ Deploy complete!
Function URL: https://asia-east1-monkey-pixel-clash.cloudfunctions.net/monkey_submitScore
```

### Step 6: 切換前端走 Callable 路徑

更新 `.env` 與 GitHub Secret：

```bash
# 本地
echo "VITE_USE_CALLABLE_SUBMIT=true" >> H:/Monkey/.env

# GitHub Secret（用 gh CLI）
printf '%s' "true" | gh secret set VITE_USE_CALLABLE_SUBMIT -R cagoooo/monkey
```

也要更新 `.github/workflows/deploy.yml` 把這個 secret 注入 build：

```yaml
- name: Build 🏗️
  env:
    VITE_USE_CALLABLE_SUBMIT: "true"
    # ... 其他現有 env
```

### Step 7: 鎖死 Firestore Rules（client write false）

編輯 `firestore.rules`：

```diff
match /leaderboard/{entryId} {
  allow read: if true;
- allow create: if isValidLeaderboardEntry(request.resource.data);
+ allow create: if false;  // 強制走 Cloud Function
  allow update, delete: if false;
}
```

部署：
```bash
firebase --account=ipad@mail2.smes.tyc.edu.tw deploy --only firestore:rules
```

### Step 8: 驗證

```bash
# 1. 從 console 看 Function 狀態
firebase --account=ipad@mail2.smes.tyc.edu.tw functions:log

# 2. 玩一場到 tournamentOver 進排行榜，看 Firestore 有沒有寫入
# 3. 60 秒內再送一次 → 應收到 "resource-exhausted" 錯誤
# 4. 嘗試直寫 Firestore（DevTools console 跑 addDoc）→ 應 permission-denied
```

## 🛠 後續維護

### 改 rate limit 秒數
編輯 `submitScore.ts` 的 `RATE_LIMIT_SECONDS`，重 deploy。

### 加新欄位（例如 grade / class 分類）
1. 改 `submitScore.ts` 的 schema 與寫入 payload
2. 改 `firestore.rules` 的 `isValidLeaderboardEntry`
3. 改前端 `useScoreSubmission` hook 的 callable 簽章
4. 重 deploy 兩邊

### 看 logs
```bash
firebase --account=ipad@mail2.smes.tyc.edu.tw functions:log --only monkey_submitScore --lines 100
```

或到 GCP Console:
🔗 https://console.cloud.google.com/functions/list?project=monkey-pixel-clash

### 緊急回滾（出問題時）
1. **暫時回到 Rules-only 路徑**：
   ```bash
   gh secret set VITE_USE_CALLABLE_SUBMIT -R cagoooo/monkey -b "false"
   ```
   再 push 任何 commit 觸發部署，前端恢復直寫。
2. **完全刪除 Function**：
   ```bash
   firebase functions:delete monkey_submitScore --region asia-east1
   ```

## 📚 相關 skill 提醒

- **`firebase-multi-app-safety`**：functions 部署永遠加 `:monkey` codebase 後綴
- **`gemini-free-tier-first`**：Blaze 開了不代表會收費，配 Budget Alert 仍可保 $0/月
- **`firebase-ci-troubleshooter`**：Cloud Functions 相關 CI 失敗看這邊
