import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html', // Explicitly define the entry point as index.html
      },
    },
    outDir: 'dist', // Ensure Vite places the built assets in the 'dist' directory
  },
});
