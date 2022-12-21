import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from "path";

export default defineConfig({
    test:{
        globals: true,
        environment: "happy-dom",
    },
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, 'src') },
            { find: '@/components', replacement: path.resolve(__dirname, 'src/components') },
            { find: '@/common', replacement: path.resolve(__dirname, 'src/common') },
        ],
    },
})
