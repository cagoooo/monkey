/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {execSync} from 'child_process';
import fs from 'fs';
import path from 'path';
import {defineConfig, loadEnv, Plugin} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

/** 版本＝package.json 版本-git 短雜湊；同一個 commit 重跑部署，版本不變 */
function resolveAppVersion(): string {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8')) as {version: string};
  let sha = process.env.GITHUB_SHA?.slice(0, 7) ?? '';
  if (!sha) {
    try {
      sha = execSync('git rev-parse --short=7 HEAD', {stdio: ['ignore', 'pipe', 'ignore']}).toString().trim();
    } catch {
      sha = 'dev';
    }
  }
  return `${pkg.version}-${sha}`;
}

/** 取 CHANGELOG.md 最新一節的前 3 條重點，給更新提示顯示「這次更新了什麼」 */
function latestChangelogNotes(): string[] {
  try {
    const md = fs.readFileSync('CHANGELOG.md', 'utf-8');
    const section = md.split(/^## /m)[1] ?? '';
    return section
      .split('\n')
      .filter(line => line.startsWith('- '))
      .slice(0, 3)
      .map(line => {
        const text = line.slice(2).replace(/[*`]/g, '').split(/[（：(]/)[0].trim();
        return text.length > 40 ? `${text.slice(0, 39)}…` : text;
      });
  } catch {
    return [];
  }
}

/** 建置時產出 version.json（不進預快取），並把版本寫進 index.html 的 meta */
function appVersionPlugin(version: string): Plugin {
  return {
    name: 'monkey-app-version',
    transformIndexHtml: html => html.replace(/__APP_VERSION_META__/g, version),
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'version.json',
        source: JSON.stringify({version, notes: latestChangelogNotes()}, null, 2),
      });
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const appVersion = resolveAppVersion();
  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      appVersionPlugin(appVersion),
      VitePWA({
        // prompt：新版先在背景下載好，跳提示讓使用者按「立即更新」才切換，不會打斷正在玩的人
        registerType: 'prompt',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
        manifest: {
          name: '猴子丟香蕉',
          short_name: '猴子丟香蕉',
          description: '雙人回合制拋物線對戰：拖曳瞄準、算好風向與重力，把香蕉丟向對手的猩猩！',
          lang: 'zh-Hant-TW',
          theme_color: '#0000AA',
          background_color: '#0000AA',
          display: 'standalone',
          orientation: 'any',
          start_url: './',
          scope: './',
          icons: [
            {src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any'},
            {src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any'},
            {src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable'},
          ],
        },
        workbox: {
          // 舊版（自動更新模式）SW 交接用，說明見 public/sw-ext.js
          importScripts: ['sw-ext.js'],
          // 用 NetworkFirst 處理 HTML，避免使用者一直拿到舊版 index.html
          globPatterns: ['**/*.{js,css,html,svg,png,ico,webp}'],
          navigateFallback: 'index.html',
          runtimeCaching: [
            {
              urlPattern: ({request}) => request.destination === 'document',
              handler: 'NetworkFirst',
              options: {
                // 同網域（cagoooo.github.io）有很多小工具，快取名稱加專屬前綴避免互相清到
                cacheName: 'monkey-html-cache',
                networkTimeoutSeconds: 3,
                expiration: {maxEntries: 10, maxAgeSeconds: 60 * 60 * 24},
              },
            },
            // Firestore 刻意不設任何路由：英雄榜的即時監聽是約 45 秒一輪、斷了馬上重接的長連線，
            // 若經過 SW 轉送（即使是 NetworkOnly），舊 SW 永遠有請求在處理中，新版 SW 就一直無法接手。
            // 不設路由時 SW 不攔截，請求直接走網路，也不會被快取。
          ],
        },
      }),
    ],
    define: {
      __APP_VERSION__: JSON.stringify(appVersion),
      'import.meta.env.VITE_FIREBASE_API_KEY':           JSON.stringify(env.VITE_FIREBASE_API_KEY            || '__FIREBASE_API_KEY__'),
      'import.meta.env.VITE_FIREBASE_AUTH_DOMAIN':        JSON.stringify(env.VITE_FIREBASE_AUTH_DOMAIN        || '__FIREBASE_AUTH_DOMAIN__'),
      'import.meta.env.VITE_FIREBASE_PROJECT_ID':         JSON.stringify(env.VITE_FIREBASE_PROJECT_ID         || '__FIREBASE_PROJECT_ID__'),
      'import.meta.env.VITE_FIREBASE_STORAGE_BUCKET':     JSON.stringify(env.VITE_FIREBASE_STORAGE_BUCKET     || '__FIREBASE_STORAGE_BUCKET__'),
      'import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID':JSON.stringify(env.VITE_FIREBASE_MESSAGING_SENDER_ID || '__FIREBASE_MESSAGING_SENDER_ID__'),
      'import.meta.env.VITE_FIREBASE_APP_ID':             JSON.stringify(env.VITE_FIREBASE_APP_ID             || '__FIREBASE_APP_ID__'),
      'import.meta.env.VITE_FIREBASE_DATABASE_ID':        JSON.stringify(env.VITE_FIREBASE_DATABASE_ID        || '__FIREBASE_DATABASE_ID__'),
      'process.env.GEMINI_API_KEY':                       JSON.stringify(env.GEMINI_API_KEY                   || '__GEMINI_API_KEY__'),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      // 把 vendor 拆成獨立 chunks，避免單一 index.js 太肥，
      // 也讓 PWA precache 在更新時只需重抓變動的部分。
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'firebase-vendor': [
              'firebase/app',
              'firebase/firestore',
              'firebase/auth',
            ],
            'motion-vendor': ['motion/react'],
            'icons-vendor': ['lucide-react'],
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    test: {
      // 純函式測試只需 node 環境（不用 jsdom），更快
      environment: 'node',
      include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
      // 統一報告格式
      reporters: 'default',
    },
  };
});
