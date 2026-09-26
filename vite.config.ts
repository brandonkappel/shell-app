import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Shell is a normal SPA build - deployed to the shell's S3 bucket,
// served via CloudFront's default "/*" behavior with SPA fallback
// (S3 static website hosting, Error Document -> index.html).
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
  },
});
