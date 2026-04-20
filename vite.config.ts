import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import babel from '@rolldown/plugin-babel'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
    process.env.NODE_ENV === 'production' ?
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          skipWaiting: true,
          clientsClaim: true
        },
        devOptions: {
          enabled: true
        },
        manifest: {
          name: 'Kinga',
          short_name: 'Kinga',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: 'standalone',
          start_url: '/',
          icons: [
            {
              src: '/icons/icon-192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/icons/icon-512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      }) : undefined
  ],
})
