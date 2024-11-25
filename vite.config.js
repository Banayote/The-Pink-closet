import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // Set the root directory to the project root
  build: {
    outDir: './dist', // Output the build files to the "dist" directory inside the project root
  },
});
