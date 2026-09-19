import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',

    exclude: [
      'e2e/**',
      'test/**',
      '**/node_modules/**',
      '**/dist/**',
    ],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],

      include: [
        'src/components/TaskCard.tsx',
        'src/utils/validaciones.ts',
      ],

      thresholds: {
        lines: 60,
        functions: 60,
        branches: 50,
        statements: 60,
      },
    },
  },
});