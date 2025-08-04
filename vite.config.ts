import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: '/',
      plugins: [react()],
      publicDir: 'public',
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      // Güvenlik ayarları
      server: {
        // Sadece localhost erişimi (geliştirme)
        host: 'localhost',
        // Güvenlik başlıkları
        headers: {
          'X-Frame-Options': 'SAMEORIGIN',
          'X-Content-Type-Options': 'nosniff',
          'X-XSS-Protection': '1; mode=block',
          'Referrer-Policy': 'strict-origin-when-cross-origin'
        }
      },
      // Build güvenlik ayarları
      build: {
        // Kaynak kod haritalarını production'da gizle
        sourcemap: mode !== 'production',
        copyPublicDir: true,
        // Bundle analizi için
        rollupOptions: {
          output: {
            // Chunk'ları güvenli şekilde isimlendirme
            manualChunks: {
              vendor: ['react', 'react-dom']
            }
          }
        },
        // Güvenlik: Dosya boyut uyarıları
        chunkSizeWarningLimit: 1000
      }
    };
});
