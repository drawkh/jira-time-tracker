import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '',
  resolve: {
    alias: {
      '@/core': resolve(__dirname, '/src/core'),
      '@/ui': resolve(__dirname, '/src/ui'),
    },
  },
  plugins: [vue()],
});
