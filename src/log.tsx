// File: src/log.tsx
const logging = false;
export function log(...args: unknown[]) {
  if (logging && import.meta.env.MODE === 'development') {
    console.log(...args);
  }
}
