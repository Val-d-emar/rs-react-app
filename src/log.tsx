// File: src/log.tsx
const logging = true;
export function log(...args: unknown[]) {
  if (logging && import.meta.env.MODE === 'development') {
    console.log(...args);
  }
}
