import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public', // Set the root directory to "public"
  build: {
    outDir: '../dist', // Output the build files to "../dist"
  },
});
