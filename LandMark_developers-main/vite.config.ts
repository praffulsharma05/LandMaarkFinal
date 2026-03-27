 import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://biotic-shasta-undeliberative.ngrok-free.dev', // Use the working URL
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('ngrok-skip-browser-warning', 'true');
          });
        }
      },
      '/uploads': {
        target: 'https://biotic-shasta-undeliberative.ngrok-free.dev', // Use the working URL
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('ngrok-skip-browser-warning', 'true');
          });
        }
      }
    }
  }
})