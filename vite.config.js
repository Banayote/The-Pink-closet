import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        store: 'store.html',
        profile: 'profile.html',
        messages: 'messages.html'
      }
    }
  }
});

