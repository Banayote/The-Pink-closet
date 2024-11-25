import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: 'index.html',  // Ensure this points to the correct entry file
    }
  }
});
