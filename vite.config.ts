import { defineConfig, mergeConfig } from 'vitest/config'
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default mergeConfig(
  defineConfig({ plugins: [react(), tailwindcss()] }),
  defineConfig({
    test: {
      environment: 'happy-dom',
      globals: true,
      setupFiles: ['./src/test/setup.ts'],
    },
  })
)
