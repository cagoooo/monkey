import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {registerServiceWorker} from './pwa';
import {soundService} from './services/soundService';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

registerServiceWorker();

// AudioContext 必須在 user gesture handler 內 resume()。
// 註冊一次性全域監聽，第一次任何互動就解鎖音訊，之後 BGM/音效任何時候都能播。
// 第一次解鎖後立刻播 8-bit intro 開場音效（讓使用者馬上聽到聲音回饋）。
//
// 重要：unlock() 是 async，必須 await 後再 playIntro，否則 resume() 還沒
// 完成就 schedule oscillators 會在 console 出現多筆 AudioContext 警告。
{
  const unlock = async () => {
    document.removeEventListener('pointerdown', unlock);
    document.removeEventListener('keydown', unlock);
    document.removeEventListener('touchstart', unlock);
    await soundService.unlock();
    soundService.playIntro();
  };
  document.addEventListener('pointerdown', unlock);
  document.addEventListener('keydown', unlock);
  document.addEventListener('touchstart', unlock);
}
