import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,  // Specify the development server port
    open: true,  // Automatically open the browser when the server starts
  },
  build: {
    outDir: 'dist',  // Directory for build output
  },
  plugins: [
    // Add plugins here if needed (e.g., for React or Vue)
  ],
});
