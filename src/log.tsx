// File: src/log.tsx

export function log(...args: unknown[]) {
  if (
    import.meta.env.VITE_LOGGING_ENABLED === 'true' &&
    import.meta.env.MODE === 'development'
  ) {
    console.log(...args);
  }
}
