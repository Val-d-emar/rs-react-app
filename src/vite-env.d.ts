/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LOGGING_ENABLED: string;
  // you can add other variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
