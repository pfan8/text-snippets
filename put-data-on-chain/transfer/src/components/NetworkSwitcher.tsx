import React from 'react';
import { useWallet } from '../contexts/WalletContext';
import { getNetwork } from '../constants/networks';

export const NetworkSwitcher: React.FC = () => {
  const { chainId, isConnected, isInitializing, switchNetwork } = useWallet();

  const currentNetwork = chainId ? getNetwork(chainId) : null;

  const handleSwitch = async (targetChainId: number) => {
    if (chainId === targetChainId) return;

    try {
      await switchNetwork(targetChainId);
    } catch (error) {
      console.error('切换网络失败:', error);
    }
  };

  if (isInitializing || !isConnected) {
    return null;
  }

  return (
    <div className="card">
      <h3 className="text-gray-700 font-cute font-bold mb-4">🌐 选择网络</h3>

      <div className="flex gap-2 bg-gray-100 p-2 rounded-2xl">
        {/* 主网 */}
        <button
          onClick={() => handleSwitch(1)}
          className={`flex-1 px-4 py-3 rounded-xl font-cute transition-all ${
            chainId === 1
              ? 'bg-blue-500 text-white shadow-cute'
              : 'text-gray-600 hover:bg-gray-200'
          }`}
        >
          <div className="text-xl mb-1">🌍</div>
          <div className="text-sm">主网</div>
        </button>

        {/* Sepolia 测试网 */}
        <button
          onClick={() => handleSwitch(11155111)}
          className={`flex-1 px-4 py-3 rounded-xl font-cute transition-all ${
            chainId === 11155111
              ? 'bg-metamask-500 text-white shadow-cute'
              : 'text-gray-600 hover:bg-gray-200'
          }`}
        >
          <div className="text-xl mb-1">🧪</div>
          <div className="text-sm">Sepolia</div>
        </button>
      </div>

      {currentNetwork && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
            <span className="text-xl">{currentNetwork.icon}</span>
            <span className="text-sm text-gray-600 font-cute">
              当前: {currentNetwork.name}
            </span>
          </div>
        </div>
      )}

      {chainId === 1 && (
        <div className="mt-3 text-xs text-orange-600 bg-orange-50 px-3 py-2 rounded-lg">
          ⚠️ 正在使用主网，请谨慎操作
        </div>
      )}
    </div>
  );
};
