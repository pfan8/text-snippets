import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { formatEther } from 'ethers';
import { WalletContextType, WalletState } from '../types/wallet';
import { connectMetaMask, switchNetwork as switchEthNetwork, getBalance } from '../utils/ethereum';

const initialState: WalletState = {
  account: null,
  chainId: null,
  balance: '0',
  provider: null,
  signer: null,
  isConnected: false,
  isInitializing: true, // 初始状态为加载中
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<WalletState>(initialState);

  /**
   * 刷新账户余额
   */
  const refreshBalance = useCallback(async () => {
    if (!state.provider || !state.account) return;

    try {
      const balanceWei = await getBalance(state.provider, state.account);
      const balanceEth = formatEther(balanceWei);
      setState(prev => ({ ...prev, balance: balanceEth }));
    } catch (error) {
      console.error('刷新余额失败:', error);
    }
  }, [state.provider, state.account]);

  /**
   * 连接 MetaMask 钱包
   * @param silent 静默连接（不弹出错误提示）
   */
  const connect = useCallback(async (silent = false) => {
    try {
      const { provider, signer, account, chainId } = await connectMetaMask();

      const balanceWei = await getBalance(provider, account);
      const balanceEth = formatEther(balanceWei);

      setState({
        account,
        chainId,
        balance: balanceEth,
        provider,
        signer,
        isConnected: true,
        isInitializing: false,
      });

      // 保存连接状态到 localStorage
      localStorage.setItem('walletConnected', 'true');
    } catch (error: any) {
      console.error('连接钱包失败:', error);
      if (!silent) {
        alert(error.message || '连接失败');
      }
      throw error;
    }
  }, []);

  /**
   * 断开钱包连接
   */
  const disconnect = useCallback(() => {
    setState({ ...initialState, isInitializing: false });
  }, []);

  /**
   * 切换网络
   */
  const switchNetwork = useCallback(async (chainId: number) => {
    try {
      await switchEthNetwork(chainId);
      // 网络切换后会触发 chainChanged 事件，自动更新状态
    } catch (error: any) {
      console.error('切换网络失败:', error);
      alert(error.message || '切换网络失败');
      throw error;
    }
  }, []);

  /**
   * 监听账户变化
   */
  useEffect(() => {
    if (typeof window.ethereum === 'undefined') return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect();
      } else if (accounts[0] !== state.account) {
        // 账户发生变化，重新连接
        connect();
      }
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, [state.account, connect, disconnect]);

  /**
   * 监听网络变化
   */
  useEffect(() => {
    if (typeof window.ethereum === 'undefined') return;

    const handleChainChanged = () => {
      // 网络变化时重新连接
      window.location.reload();
    };

    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  /**
   * 页面加载时自动连接钱包
   */
  useEffect(() => {
    const autoConnect = async () => {
      // 检查是否有 MetaMask
      if (typeof window.ethereum === 'undefined') {
        setState(prev => ({ ...prev, isInitializing: false }));
        return;
      }

      try {
        // 静默尝试连接（不弹出错误提示）
        await connect(true);
      } catch (error) {
        // 静默失败，用户可以手动点击连接
        console.log('自动连接失败，等待用户手动连接');
      } finally {
        // 无论成功或失败，都结束初始化状态
        setState(prev => ({ ...prev, isInitializing: false }));
      }
    };

    autoConnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 只在组件挂载时执行一次，connect 函数是稳定的

  /**
   * 定期刷新余额
   */
  useEffect(() => {
    if (!state.isConnected) return;

    refreshBalance();
    const interval = setInterval(refreshBalance, 10000); // 每10秒刷新一次

    return () => clearInterval(interval);
  }, [state.isConnected, refreshBalance]);

  const value: WalletContextType = {
    ...state,
    connect,
    disconnect,
    switchNetwork,
    refreshBalance,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

/**
 * 使用钱包上下文的 Hook
 */
export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};
