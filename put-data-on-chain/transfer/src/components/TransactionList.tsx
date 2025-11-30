import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { useTransactions } from '../hooks/useTransactions';
import { formatTxHash, formatTimestamp } from '../utils/formatters';

export const TransactionList: React.FC = () => {
  const { isConnected, isInitializing, chainId } = useWallet();
  const { transactions, addTransaction } = useTransactions(chainId);
  const [txHashInput, setTxHashInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQueryTransaction = async () => {
    if (!txHashInput.trim()) {
      alert('请输入交易哈希');
      return;
    }

    try {
      setLoading(true);
      await addTransaction(txHashInput.trim());
      setTxHashInput('');
    } catch (error) {
      console.error('查询交易失败:', error);
      alert('查询交易失败');
    } finally {
      setLoading(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="card text-center">
        <svg className="animate-spin h-8 w-8 text-metamask-500 mx-auto mb-2" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-sm text-gray-500 font-cute">加载中...</p>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="card text-center">
        <div className="text-4xl mb-2">📜</div>
        <h3 className="text-lg font-bold text-gray-600 mb-1">交易历史</h3>
        <p className="text-sm text-gray-500 font-cute">连接钱包后查看</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-metamask-600 font-cute mb-4 flex items-center gap-2">
        <span>📜</span>
        交易历史
      </h3>

      {/* 查询交易输入 */}
      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={txHashInput}
            onChange={(e) => setTxHashInput(e.target.value)}
            placeholder="输入交易哈希查询..."
            className="input flex-1 text-sm"
          />
          <button
            onClick={handleQueryTransaction}
            disabled={loading || !txHashInput.trim()}
            className="bg-metamask-500 hover:bg-metamask-600 text-white px-4 py-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-cute"
          >
            {loading ? '查询中...' : '🔍'}
          </button>
        </div>
      </div>

      {/* 交易列表 */}
      {transactions.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <div className="text-4xl mb-2">📭</div>
          <p className="text-sm font-cute">暂无交易记录</p>
          <p className="text-xs mt-1">发送交易或输入交易哈希查询</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {transactions.map((tx) => (
            <div
              key={tx.hash}
              className="bg-white rounded-2xl p-4 border-2 border-gray-100 hover:border-metamask-200 shadow-sm hover:shadow-cute transition-all duration-200"
            >
              {/* 交易头部 */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500 font-cute flex items-center gap-1">
                  {tx.status === 'success' && '✅'}
                  {tx.status === 'pending' && '⏳'}
                  {tx.status === 'failed' && '❌'}
                  {tx.timestamp ? formatTimestamp(tx.timestamp) : '待确认'}
                </span>
                <span className="font-bold text-metamask-600 font-cute">
                  {tx.value} ETH
                </span>
              </div>

              {/* 交易哈希 */}
              <div className="text-xs text-gray-500 mb-2 font-mono">
                <a
                  href={`https://${chainId === 1 ? '' : 'sepolia.'}etherscan.io/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-metamask-500 transition-colors"
                >
                  {formatTxHash(tx.hash)} ↗
                </a>
              </div>

              {/* 地址信息 */}
              <div className="text-xs text-gray-500 space-y-1 mb-2">
                <div>从: {formatTxHash(tx.from)}</div>
                <div>到: {tx.to ? formatTxHash(tx.to) : '合约创建'}</div>
              </div>

              {/* 解密的消息 */}
              {tx.decodedMessage && tx.decodedMessage !== '[无法解码的数据 🔒]' && (
                <div className="mt-3 p-3 bg-cute-50 rounded-xl border-l-4 border-cute-400">
                  <div className="text-xs text-gray-500 mb-1">💌 附加消息:</div>
                  <div className="text-sm text-gray-700 font-cute break-all">
                    {tx.decodedMessage}
                  </div>
                </div>
              )}

              {/* 无法解码的数据 */}
              {tx.data && tx.data !== '0x' && tx.decodedMessage === '[无法解码的数据 🔒]' && (
                <div className="mt-3 p-3 bg-gray-50 rounded-xl border-l-4 border-gray-300">
                  <div className="text-xs text-gray-500">
                    🔒 数据无法解码为文本
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
