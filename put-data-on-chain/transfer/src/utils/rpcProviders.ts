import { JsonRpcProvider } from 'ethers';

type RPCProvider = 'infura' | 'alchemy' | 'public';

interface RPCUrls {
  [key: string]: {
    [chainId: number]: string;
  };
}

const RPC_URLS: RPCUrls = {
  infura: {
    1: `https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`,
    11155111: `https://sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`,
  },
  alchemy: {
    1: `https://eth-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`,
    11155111: `https://eth-sepolia.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`,
  },
  // 公共 RPC（作为备用，速率限制较严格）
  public: {
    1: 'https://eth.llamarpc.com',
    11155111: 'https://ethereum-sepolia-rpc.publicnode.com',
  },
};

/**
 * 获取指定网络和提供商的 RPC URL
 * @param chainId 链 ID（1=主网, 11155111=Sepolia）
 * @param provider RPC 提供商（infura 或 alchemy）
 * @returns RPC URL
 */
export const getRpcUrl = (
  chainId: number,
  provider: RPCProvider = 'infura'
): string => {
  const url = RPC_URLS[provider]?.[chainId];
  if (!url) {
    throw new Error(`不支持的网络: chainId=${chainId}, provider=${provider}`);
  }
  return url;
};

/**
 * 创建 ethers.js JsonRpcProvider
 * @param chainId 链 ID
 * @param rpcProvider RPC 提供商
 * @returns JsonRpcProvider 实例
 */
export const createProvider = (
  chainId: number,
  rpcProvider: RPCProvider = 'infura'
): JsonRpcProvider => {
  const url = getRpcUrl(chainId, rpcProvider);
  return new JsonRpcProvider(url);
};

/**
 * 获取默认的 RPC 提供商
 * @returns 默认 RPC 提供商名称
 */
export const getDefaultRpcProvider = (): RPCProvider => {
  const defaultProvider = import.meta.env.VITE_DEFAULT_RPC_PROVIDER;

  // 如果配置了提供商，使用配置的
  if (defaultProvider === 'alchemy' || defaultProvider === 'infura' || defaultProvider === 'public') {
    return defaultProvider as RPCProvider;
  }

  // 否则根据是否有 API Key 来决定
  if (import.meta.env.VITE_ALCHEMY_API_KEY) {
    return 'alchemy';
  }
  if (import.meta.env.VITE_INFURA_API_KEY) {
    return 'infura';
  }

  // 都没有则使用公共 RPC
  console.warn('未配置 RPC API Key，使用公共 RPC（速率限制较严格）');
  return 'public';
};
