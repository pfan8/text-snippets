import { Network } from '../types/wallet';

export const NETWORKS: Record<number, Network> = {
  1: {
    chainId: 1,
    name: '以太坊主网',
    symbol: 'ETH',
    isTestnet: false,
    icon: '🌍',
  },
  11155111: {
    chainId: 11155111,
    name: 'Sepolia 测试网',
    symbol: 'SepoliaETH',
    isTestnet: true,
    icon: '🧪',
  },
};

export const DEFAULT_CHAIN_ID = 11155111; // Sepolia 测试网

export const SUPPORTED_CHAIN_IDS = [1, 11155111];

/**
 * 获取网络信息
 * @param chainId 链 ID
 * @returns 网络信息
 */
export const getNetwork = (chainId: number): Network | undefined => {
  return NETWORKS[chainId];
};

/**
 * 检查链 ID 是否支持
 * @param chainId 链 ID
 * @returns 是否支持
 */
export const isSupportedChainId = (chainId: number): boolean => {
  return SUPPORTED_CHAIN_IDS.includes(chainId);
};
