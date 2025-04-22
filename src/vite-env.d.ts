/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MODE: string;
  readonly VITE_APP_TITLE: string;
  // 다른 환경 변수들도 추가할 수 있습니다
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}