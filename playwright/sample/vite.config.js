import { defineConfig } from 'vite';
export default defineConfig({
    root: './src',
    build: {
        base: '/', 
        outDir: '../dist',
    },
});
