# 🎨 Sprite Sheet 整合 SOP（未來換 Kenney CC0 PNG 路線）

> v3.16.0 完成了 sprite-ready 架構：`src/game/components/MonkeyRenderer.ts` 用狀態機 + 命名動畫幀。
> 目前每個狀態用 Canvas primitive（rectangles）繪製。
> 本文件說明未來想換成真實 PNG sprite sheet 時的步驟。

## 為什麼還沒換？

1. 我（Claude）沒有下載 binary 檔案的能力，無法自動拉 Kenney PNG
2. 現有 Canvas 繪製版本**已經是像素風格** — 不換 PNG 也很好看
3. 真換 PNG 需要 ~1 週時間設計師工作（找素材 / 對齊像素 / 調動畫時序）

## 換的時機

什麼時候值得花這 1 週？

| 觸發訊號 | 行動 |
|---|---|
| 想加 5+ 個新動作（嘲諷 / 思考 / 受傷 / 走動 / 跳）| 切到 PNG，否則 Canvas 程式碼會爆炸 |
| 視覺風格要更精緻（陰影 / 漸層 / 紋理）| 切 PNG，Canvas 做不出細緻效果 |
| 多個敵人類型（狙擊手 / 坦克 / 飛行）| 切 PNG，每種建一張 sprite sheet |
| 純粹想要更專業的視覺 | 切 PNG，Kenney 美術品質高 |

## 推薦素材來源

### 🥇 Kenney.nl（CC0 完全免費）
- **Platformer Pack Redux** — 有像素風猴子 / 大猩猩
  - https://kenney.nl/assets/platformer-pack-redux
- **Toon Characters 1** — 高品質 64×64 卡通角色
  - https://kenney.nl/assets/toon-characters-1
- **Pixel Platformer** — 16×16 經典像素風
  - https://kenney.nl/assets/pixel-platformer

### 🥈 OpenGameArt.org（多授權，挑 CC0）
- 搜尋 "monkey sprite" 或 "gorilla sprite"
- 過濾 License = CC0

### 🥉 自己畫（Aseprite / Piskel）
- Piskel 免費線上工具：https://www.piskelapp.com/
- 適合想客製化的人

## 整合步驟（5 步）

### Step 1：下載並放進 `public/sprites/`

```
public/sprites/
├── monkey-idle.png       # 4 frames 橫排 (256×64 = 4×64)
├── monkey-throwing.png   # 3 frames (windup / release / follow)
├── monkey-celebrating.png # 4 frames (jumping cheer)
├── monkey-dead.png       # 1 frame
└── monkey-struggling.png  # 4 frames (shake)
```

或用單一 sprite sheet：
```
public/sprites/monkey.png   # 5 列 × 4 幀 = 320×320 px
```

### Step 2：建立 sprite manifest

```ts
// src/game/components/spriteManifest.ts

export const MONKEY_SPRITE_SHEET = '/monkey/sprites/monkey.png'; // 注意 base path

export interface SpriteFrame {
  x: number;     // sheet 內的左上 x
  y: number;     // sheet 內的左上 y
  w: number;     // 單格寬
  h: number;     // 單格高
}

export const MONKEY_FRAMES: Record<string, SpriteFrame[]> = {
  idle: [
    {x: 0, y: 0, w: 64, h: 64},
    {x: 64, y: 0, w: 64, h: 64},
    {x: 128, y: 0, w: 64, h: 64},
    {x: 192, y: 0, w: 64, h: 64},
  ],
  throwing: [
    {x: 0, y: 64, w: 64, h: 64},  // windup
    {x: 64, y: 64, w: 64, h: 64}, // release
    {x: 128, y: 64, w: 64, h: 64}, // follow
  ],
  // ... 其他狀態
};
```

### Step 3：實作 sprite loader hook

```ts
// src/game/hooks/useSpriteSheet.ts
import {useEffect, useState} from 'react';

export function useSpriteSheet(url: string): HTMLImageElement | null {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  useEffect(() => {
    const i = new Image();
    i.onload = () => setImg(i);
    i.onerror = () => console.error('Sprite sheet failed to load:', url);
    i.src = url;
  }, [url]);
  return img;
}
```

### Step 4：改寫 MonkeyRenderer 子函式

把 `drawHead` / `drawBody` / `drawArmsForPose` 內的 `ctx.fillRect` 換成
`ctx.drawImage(sheet, sx, sy, sw, sh, dx, dy, dw, dh)`：

```ts
// 在 MonkeyRenderer.ts
function drawSpriteFrame(
  ctx: CanvasRenderingContext2D,
  sheet: HTMLImageElement,
  frame: SpriteFrame,
  centerX: number,
  centerY: number,
) {
  ctx.drawImage(
    sheet,
    frame.x, frame.y, frame.w, frame.h,
    centerX - frame.w / 2, centerY - frame.h / 2,
    frame.w, frame.h,
  );
}
```

然後 `drawArmsForPose` 改成：
```ts
const frame = MONKEY_FRAMES[state.pose][currentFrameIndex];
drawSpriteFrame(ctx, sheet, frame, 0, 0);
```

### Step 5：feature flag 漸進切換

加 `VITE_USE_SPRITE_PNG` 環境變數，預設 false（fallback 到 Canvas 繪製）：

```ts
const USE_PNG_SPRITES = import.meta.env.VITE_USE_SPRITE_PNG === 'true';

export function drawMonkey(ctx, pos, color, state) {
  if (USE_PNG_SPRITES && spriteSheet) {
    drawWithSprite(ctx, pos, color, state, spriteSheet);
  } else {
    drawWithCanvas(ctx, pos, color, state);  // 現有實作
  }
}
```

這樣可以漸進測試，出問題隨時切回。

## 動畫時序

每個 `pose` 應該循環播放對應的 frames。建議：

| Pose | Frame 數 | FPS | 用途 |
|---|---|---|---|
| idle | 4 | 4-6 | 呼吸 / 環視 |
| throwing | 3 | 12 (200ms 切換) | windup → release → follow |
| celebrating | 4 | 8 | 跳躍歡呼循環 |
| dead | 1 | - | 倒地不動 |
| struggling | 4 | 12 | 抖動 / 焦急 |

`MonkeyRenderer` 內加 `frameIndex` 計算：

```ts
function getFrameIndex(pose: MonkeyPose, frameCount: number): number {
  const fps = pose === 'throwing' || pose === 'struggling' ? 12 : 6;
  return Math.floor((Date.now() / 1000) * fps) % frameCount;
}
```

## 像素對齊

PNG sprite 在 Canvas 上若沒整數座標，瀏覽器會做雙線性插值，毀掉像素風格：

```ts
// CSS — index.css 已有
canvas {
  image-rendering: pixelated;  ✅
}

// 程式 — 繪製時取整
const drawX = Math.round(centerX - frame.w / 2);
const drawY = Math.round(centerY - frame.h / 2);
```

## 預估改造工時

| 項目 | 工時 |
|---|---|
| 找素材（Kenney 試 3-5 套挑風格）| 2h |
| 改 sprite sheet（剪裁 / 對齊像素）| 2-4h |
| 寫 spriteManifest + useSpriteSheet hook | 1h |
| 改 MonkeyRenderer 內 5 個子函式 | 4-6h |
| 動畫時序調整 + 多狀態測試 | 2-3h |
| Feature flag + GitHub Secret 同步 | 0.5h |
| **總計** | **12-17h（約 2 個工作天）**|

## 為什麼現在的 Canvas 版本已經夠好

看 v3.15.x 的 monkey 畫面，已經有：
- ✅ 5 個 pose 狀態（idle / aiming / throwing / celebrating / dead / struggling）
- ✅ Idle 呼吸動畫（sin bob）
- ✅ 眨眼動畫（每 3s 閉眼 0.2s）
- ✅ Throw 3 階段（windup / release / follow，v3.16.0）
- ✅ Celebrate beat 雙幀（手臂上下）
- ✅ Struggle 抖動
- ✅ Dead 旋轉 90°
- ✅ Active 金光箭頭 + countdown 倒數
- ✅ Umbrella 流星雨保護

現在換 PNG 是「視覺品質升級」，不是「功能解鎖」。優先級放在 C3 / C6 等真正解鎖新體驗的功能上更實用。

## 參考實作（其他像素風遊戲）

- **Stardew Valley**：每個 NPC 一張 320×800 sheet，5 列 × 5 幀
- **Celeste**：用 JSON 描述 frame 序列 + flip / rotate
- **PICO-8**：16×16 sprite sheet 是引擎核心
