import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      // --- PHẦN SỬA ĐỔI NẰM Ở ĐÂY ---
      build: {
        // 1. Tăng giới hạn cảnh báo lên 1000KB để không bị hiện chữ vàng khó chịu
        chunkSizeWarningLimit: 1000,
        
        // 2. Cấu hình chia nhỏ các thư viện nặng (như Firebase, KaTeX) thành các file riêng
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                // Tách biệt các thư viện để trình duyệt tải nhanh hơn
                return id.toString().split('node_modules/')[1].split('/')[0].toString();
              }
            },
          },
        },
      },
      // ------------------------------
    };
});