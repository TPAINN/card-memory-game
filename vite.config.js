import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      manifest: {
        id: '/',
        name: 'Card Memory — flip · remember · match',
        short_name: 'Card Memory',
        description: 'A calm, premium card-matching memory game — 3D flips, timer ring, combo streaks.',
        lang: 'en',
        dir: 'ltr',
        categories: ['games', 'entertainment'],
        prefer_related_applications: false,
        theme_color: '#0e0b18',
        background_color: '#0e0b18',
        display: 'standalone',
        display_override: ['standalone', 'minimal-ui'],
        launch_handler: { client_mode: 'navigate-existing' },
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        screenshots: [
          { src: '/screenshots/narrow.png', sizes: '500x1080', type: 'image/png', form_factor: 'narrow', label: 'Flip, remember, match' },
          { src: '/screenshots/wide.png', sizes: '1280x800', type: 'image/png', form_factor: 'wide', label: 'Card Memory on desktop' }
        ],
        icons: [
          { src: '/pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/pwa-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        skipWaiting: true,
        clientsClaim: true
      }
    })
  ],
})
