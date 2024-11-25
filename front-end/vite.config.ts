import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA, ManifestOptions } from 'vite-plugin-pwa';
import basicSsl from "@vitejs/plugin-basic-ssl"
import path from "path"

// Extend the ManifestOptions type
interface ExtendedManifestOptions extends ManifestOptions {
  permissions?: string[];
}

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    basicSsl(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Visual todo',
        short_name: 'todo',
        description: 'a Visual todo list that uses images insted of checking a box',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        permissions: ['camera'] // PWA permissions
      } as ExtendedManifestOptions
    })
  ]
});
