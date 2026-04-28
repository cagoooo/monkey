/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'favicon.png', 'og-image.png'],
        manifest: {
          name: '猴子投擲大戰',
          short_name: '猴子投擲',
          description: '經典香蕉投擲對戰！像素風格雙人天際線大戰。',
          theme_color: '#0a0a0a',
          background_color: '#0a0a0a',
          display: 'standalone',
          orientation: 'any',
          start_url: './',
          scope: './',
          icons: [
            {
              src: 'favicon.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
        workbox: {
          // 用 NetworkFirst 處理 HTML，避免使用者一直拿到舊版 index.html
          globPatterns: ['**/*.{js,css,html,svg,png,ico,webp}'],
          navigateFallback: 'index.html',
          runtimeCaching: [
            {
              urlPattern: ({request}) => request.destination === 'document',
              handler: 'NetworkFirst',
              options: {
                cacheName: 'html-cache',
                networkTimeoutSeconds: 3,
                expiration: {maxEntries: 10, maxAgeSeconds: 60 * 60 * 24},
              },
            },
            {
              // Firebase Firestore 動態請求一律 NetworkOnly，不要快取
              urlPattern: /^https:\/\/firestore\.googleapis\.com\//,
              handler: 'NetworkOnly',
            },
          ],
        },
      }),
    ],
    define: {
      'import.meta.env.VITE_FIREBASE_API_KEY':            JSON.stringify(env.VITE_FIREBASE_API_KEY            || '__FIREBASE_API_KEY__'),
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
