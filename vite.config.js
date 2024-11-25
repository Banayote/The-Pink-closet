import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // Keep the root at the project directory
  build: {
    outDir: './dist', // Output the build files to the "dist" directory
  },
  server: {
    open: true, // Automatically opens your app in the browser during dev
  },
});

