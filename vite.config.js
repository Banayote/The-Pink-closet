import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public', // Root directory containing all HTML files
  build: {
    outDir: '../dist', // Where the built files will go
  },
  server: {
    open: true, // Automatically open the app in the browser during dev
  },
});
