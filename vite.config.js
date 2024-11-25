import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public', // Set the root directory to "public"
  build: {
    outDir: '../dist', // Output the build files to "../dist"
    assetsDir: 'assets', // Make sure assets are in the correct directory
    rollupOptions: {
      input: {
        main: 'public/index.html', // Specify the main entry point
      },
    },
  },
});
