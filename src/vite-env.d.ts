interface ImportMetaEnv {
    readonly VITE_BASE_URL: string;
    readonly VITE_DEFAULT_LIMIT_VALUE: number;
    readonly VITE_PUBLIC_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}