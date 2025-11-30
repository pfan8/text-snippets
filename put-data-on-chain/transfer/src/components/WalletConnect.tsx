import React from 'react';
import { useWallet } from '../contexts/WalletContext';
import { formatAddress } from '../utils/formatters';
import { isMetaMaskInstalled } from '../utils/ethereum';

export const WalletConnect: React.FC = () => {
  const { account, isConnected, isInitializing, connect, disconnect } = useWallet();

  // 加载状态
  if (isInitializing) {
    return (
      <div className="flex items-center gap-3 bg-gradient-to-r from-metamask-100 to-cute-100 px-6 py-4 rounded-2xl border-2 border-metamask-200 shadow-cute">
        <svg className="animate-spin h-5 w-5 text-metamask-500" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="font-cute text-gray-700">正在连接钱包...</span>
      </div>
    );
  }

  if (!isMetaMaskInstalled()) {
    return (
      <div className="text-center p-8 bg-orange-50 rounded-2xl max-w-md mx-auto">
        <div className="text-6xl mb-4">🦊</div>
        <h3 className="text-xl font-bold text-metamask-600 mb-2">
          需要安装 MetaMask
        </h3>
        <p className="text-gray-600 mb-4">
          请先安装 MetaMask 浏览器扩展
        </p>
        <a
          href="https://metamask.io/download/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-metamask-500 hover:bg-metamask-600 text-white px-6 py-3 rounded-xl transition-colors"
        >
          前往安装 →
        </a>
      </div>
    );
  }

  if (isConnected && account) {
    return (
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-r from-cute-100 to-soft-100 px-4 py-2 rounded-xl border-2 border-metamask-200">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-cute text-sm text-gray-700">
              {formatAddress(account)}
            </span>
          </div>
        </div>
        <button
          onClick={disconnect}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-cute px-4 py-2 rounded-xl transition-colors"
        >
          断开
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connect}
      className="bg-gradient-to-r from-metamask-400 to-metamask-600 hover:from-metamask-500 hover:to-metamask-700 text-white font-cute font-bold px-8 py-4 rounded-2xl shadow-cute hover:shadow-soft transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
    >
      <span className="text-2xl">🦊</span>
      连接 MetaMask 钱包
    </button>
  );
};
