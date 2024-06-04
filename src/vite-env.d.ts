interface ImportMetaEnv {
    readonly VITE_BASE_URL: string;
    readonly VITE_DEFAULT_LIMIT_VALUE: number;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}