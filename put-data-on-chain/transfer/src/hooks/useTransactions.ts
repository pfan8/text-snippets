import { useState, useCallback } from 'react';
import { Transaction } from '../types/transaction';
import { hexToText } from '../utils/hexUtils';
import { formatEthAmount } from '../utils/formatters';
import { createProvider, getDefaultRpcProvider } from '../utils/rpcProviders';

export const useTransactions = (chainId: number | null) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 根据交易哈希获取交易详情
   * @param txHash 交易哈希
   */
  const getTransactionByHash = useCallback(async (txHash: string): Promise<Transaction | null> => {
    if (!chainId) return null;

    try {
      const provider = createProvider(chainId, getDefaultRpcProvider());
      const tx = await provider.getTransaction(txHash);

      if (!tx) return null;

      const receipt = await provider.getTransactionReceipt(txHash);
      const block = tx.blockNumber ? await provider.getBlock(tx.blockNumber) : null;

      const decodedMessage = tx.data && tx.data !== '0x' ? hexToText(tx.data) : '';

      return {
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: formatEthAmount(tx.value),
        data: tx.data,
        decodedMessage,
        timestamp: block?.timestamp,
        blockNumber: tx.blockNumber || undefined,
        status: receipt ? (receipt.status === 1 ? 'success' : 'failed') : 'pending',
      };
    } catch (err: any) {
      console.error('获取交易详情失败:', err);
      setError(err.message);
      return null;
    }
  }, [chainId]);

  /**
   * 添加交易到列表（用于展示用户刚发送的交易）
   * @param txHash 交易哈希
   */
  const addTransaction = useCallback(async (txHash: string) => {
    const tx = await getTransactionByHash(txHash);
    if (tx) {
      setTransactions(prev => [tx, ...prev]);
    }
  }, [getTransactionByHash]);

  /**
   * 清空交易列表
   */
  const clearTransactions = useCallback(() => {
    setTransactions([]);
    setError(null);
  }, []);

  /**
   * 刷新交易状态
   * @param txHash 交易哈希
   */
  const refreshTransaction = useCallback(async (txHash: string) => {
    const updatedTx = await getTransactionByHash(txHash);
    if (updatedTx) {
      setTransactions(prev =>
        prev.map(tx => (tx.hash === txHash ? updatedTx : tx))
      );
    }
  }, [getTransactionByHash]);

  return {
    transactions,
    loading,
    error,
    getTransactionByHash,
    addTransaction,
    clearTransactions,
    refreshTransaction,
  };
};
