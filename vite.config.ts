import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@/component', replacement: path.resolve(__dirname, 'src/component') },
      { find: '@/common', replacement: path.resolve(__dirname, 'src/common') },
      { find: '@/pages', replacement: path.resolve(__dirname, 'src/pages') },
    ],
  },
})
