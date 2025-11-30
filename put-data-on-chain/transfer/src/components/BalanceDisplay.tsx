import React from 'react';
import { useWallet } from '../contexts/WalletContext';

export const BalanceDisplay: React.FC = () => {
  const { balance, isConnected, isInitializing, refreshBalance } = useWallet();

  if (isInitializing) {
    return (
      <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl p-6 shadow-soft border-2 border-gray-200">
        <div className="text-center text-gray-400">
          <svg className="animate-spin h-8 w-8 text-metamask-500 mx-auto mb-2" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="font-cute">加载中...</p>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl p-6 shadow-soft border-2 border-gray-200">
        <div className="text-center text-gray-400">
          <div className="text-4xl mb-2">💰</div>
          <p className="font-cute">请先连接钱包</p>
        </div>
      </div>
    );
  }

  const balanceNum = parseFloat(balance);
  const formattedBalance = balanceNum.toFixed(4);

  return (
    <div className="bg-gradient-to-br from-cute-100 via-soft-100 to-metamask-100 rounded-3xl p-6 shadow-soft border-2 border-metamask-200 relative overflow-hidden">
      {/* 装饰性背景 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-metamask-200 rounded-full blur-3xl opacity-30 -mr-16 -mt-16"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="text-gray-500 text-sm font-cute">
            💰 我的余额
          </div>
          <button
            onClick={refreshBalance}
            className="text-metamask-500 hover:text-metamask-600 transition-colors"
            title="刷新余额"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        <div className="text-4xl font-bold text-metamask-600 font-cute mb-1">
          {formattedBalance}
          <span className="text-2xl ml-2">ETH</span>
        </div>

        {balanceNum < 0.01 && (
          <div className="mt-3 text-xs text-orange-600 bg-orange-50 px-3 py-2 rounded-lg">
            ⚠️ 余额较低，请充值
          </div>
        )}
      </div>
    </div>
  );
};
