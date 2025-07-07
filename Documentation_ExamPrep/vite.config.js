import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    open: true,
    host: true, // Allow access from network
    strictPort: true, // Fail if port is already in use
  },
  base: '/', // Explicitly set the base URL path
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    }
  },
  publicDir: 'public', // Explicitly set public directory
}); 