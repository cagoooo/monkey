import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: './',
    plugins: [react(), tailwindcss()],
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
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
