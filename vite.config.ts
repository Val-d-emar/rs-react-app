import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts', // Файл для начальной настройки тестов
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      // Требования к покрытию из задания
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
      // Что включать и исключать из отчета
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/main.tsx', // Обычно не тестируем точку входа
        'src/vite-env.d.ts',
        'src/setupTests.ts',
      ],
    },
  },
});
