import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        // Enable service worker in development so caching works with ngrok
        enabled: true,
        type: 'module',
      },
      workbox: {
        // Cache all image requests that go through the /uploads proxy
        runtimeCaching: [
          {
            // Match any image URL (ngrok backend, CDN, etc.)
            urlPattern: ({ url }) =>
              url.pathname.startsWith('/uploads') ||
              /\.(png|jpg|jpeg|webp|gif|svg|avif)(\?.*)?$/.test(url.pathname),
            handler: 'CacheFirst',
            options: {
              cacheName: 'landmaark-images-v1',
              expiration: {
                maxEntries: 300,       // cache up to 300 images
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          // Cache API responses too
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'landmaark-api-v1',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 5, // 5 minutes
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      manifest: {
        name: 'LandMaark',
        short_name: 'LandMaark',
        description: 'LandMaark Real Estate',
        theme_color: '#113028',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/favicon.ico',
            sizes: '64x64',
            type: 'image/x-icon',
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
    port: 5173,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'https://wildfire-ample-justifier.ngrok-free.dev',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('ngrok-skip-browser-warning', 'true');
          });
        }
      },
      '/uploads': {
        target: 'https://wildfire-ample-justifier.ngrok-free.dev',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('ngrok-skip-browser-warning', 'true');
          });
        }
      }
    }
  }
})