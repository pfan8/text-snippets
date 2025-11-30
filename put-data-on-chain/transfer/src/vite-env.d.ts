/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_INFURA_API_KEY: string
  readonly VITE_ALCHEMY_API_KEY: string
  readonly VITE_DEFAULT_RPC_PROVIDER: 'infura' | 'alchemy'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  ethereum?: any
}
