import React, { useState, FormEvent } from 'react';
import { parseEther } from 'ethers';
import { useWallet } from '../contexts/WalletContext';
import { textToHex } from '../utils/hexUtils';
import { useTransactions } from '../hooks/useTransactions';

export const TransferForm: React.FC = () => {
  const { signer, isConnected, isInitializing, chainId } = useWallet();
  const { addTransaction } = useTransactions(chainId);

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!signer) {
      alert('请先连接钱包 🦊');
      return;
    }

    if (!recipient || !amount) {
      alert('请填写收款地址和转账金额');
      return;
    }

    try {
      setLoading(true);

      // 将消息转为 Hex 数据
      const hexData = textToHex(message);

      // 构建交易参数
      const txParams: any = {
        to: recipient,
        value: parseEther(amount),
      };

      // 只有当消息不为空时才添加 data 字段
      // 这样可以避免 MetaMask 内部账户转账时的错误
      if (message.trim()) {
        txParams.data = hexData;
      }

      // 发送交易
      const tx = await signer.sendTransaction(txParams);

      console.log('交易已发送:', tx.hash);

      // 添加到交易列表
      await addTransaction(tx.hash);

      // 等待确认
      const receipt = await tx.wait();

      if (receipt?.status === 1) {
        alert(`转账成功! 🎉\n\n交易哈希: ${tx.hash}`);

        // 清空表单
        setRecipient('');
        setAmount('');
        setMessage('');
      } else {
        alert('交易失败 ❌');
      }
    } catch (error: any) {
      console.error('转账失败:', error);

      if (error.code === 'ACTION_REJECTED') {
        alert('你取消了交易 😔');
      } else if (error.code === 'INSUFFICIENT_FUNDS') {
        alert('余额不足 💸');
      } else {
        alert(`转账失败: ${error.message || '未知错误'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="card text-center">
        <svg className="animate-spin h-8 w-8 text-metamask-500 mx-auto mb-3" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-gray-500 font-cute">加载中...</p>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="card text-center">
        <div className="text-6xl mb-4">💸</div>
        <h3 className="text-xl font-bold text-gray-600 mb-2">转账功能</h3>
        <p className="text-gray-500 font-cute">请先连接钱包以使用转账功能</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-metamask-600 font-cute mb-6 flex items-center gap-2">
        <span>💸</span>
        发送转账
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 收款地址 */}
        <div>
          <label className="block text-sm font-cute text-gray-600 mb-2">
            💌 收款地址
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            className="input"
            disabled={loading}
          />
        </div>

        {/* 转账金额 */}
        <div>
          <label className="block text-sm font-cute text-gray-600 mb-2">
            💵 转账金额 (ETH)
          </label>
          <input
            type="number"
            step="0.0001"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.01"
            className="input"
            disabled={loading}
          />
        </div>

        {/* 附加消息 */}
        <div>
          <label className="block text-sm font-cute text-gray-600 mb-2">
            ✉️ 附加消息 (可选)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="输入消息，将以16进制存储在链上..."
            rows={3}
            className="input resize-none"
            disabled={loading}
          />
          {message && (
            <div className="mt-2 text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
              📝 Hex 预览: {textToHex(message).slice(0, 50)}
              {textToHex(message).length > 50 && '...'}
            </div>
          )}
        </div>

        {/* 提交按钮 */}
        <button
          type="submit"
          disabled={loading || !recipient || !amount}
          className="btn-secondary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              处理中...
            </span>
          ) : (
            <span>🚀 发送转账</span>
          )}
        </button>
      </form>

      {/* 提示 */}
      <div className="mt-4 text-xs text-gray-500 bg-blue-50 px-3 py-2 rounded-lg">
        💡 提示: 附加消息会被转换为16进制数据存储在交易的 data 字段中
      </div>
    </div>
  );
};
