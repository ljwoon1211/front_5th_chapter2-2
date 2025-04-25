import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const baseUrl = mode === 'production' ? '/front_5th_chapter2-2/' : '/';

  return {
    plugins: [react()],
    base: baseUrl,
    server: {
      open: true,
    },
    build: {
      rollupOptions: {
        input: {
          'index.refactoring': resolve(__dirname, 'index.refactoring.html'),
        },
      },
      outDir: 'dist',
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    },
  };
});


