import { BrowserProvider, Eip1193Provider } from 'ethers';

/**
 * 检查是否安装了 MetaMask
 * @returns 是否安装
 */
export const isMetaMaskInstalled = (): boolean => {
  return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
};

/**
 * 连接 MetaMask 钱包
 * @returns provider, signer, account, chainId
 */
export const connectMetaMask = async () => {
  if (!isMetaMaskInstalled()) {
    throw new Error('请先安装 MetaMask 浏览器扩展! 🦊');
  }

  try {
    const provider = new BrowserProvider(window.ethereum as Eip1193Provider);

    // 请求账户访问权限
    await provider.send('eth_requestAccounts', []);

    const signer = await provider.getSigner();
    const account = await signer.getAddress();
    const network = await provider.getNetwork();

    return {
      provider,
      signer,
      account,
      chainId: Number(network.chainId),
    };
  } catch (error: any) {
    if (error.code === 4001) {
      throw new Error('你拒绝了连接请求 😔');
    }
    throw new Error(`连接 MetaMask 失败: ${error.message}`);
  }
};

/**
 * 切换网络
 * @param chainId 目标链 ID
 */
export const switchNetwork = async (chainId: number) => {
  if (!isMetaMaskInstalled()) {
    throw new Error('请先安装 MetaMask! 🦊');
  }

  const chainIdHex = `0x${chainId.toString(16)}`;

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainIdHex }],
    });
  } catch (error: any) {
    // 如果网络不存在，尝试添加（Sepolia）
    if (error.code === 4902 && chainId === 11155111) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: chainIdHex,
              chainName: 'Sepolia Testnet',
              nativeCurrency: {
                name: 'Sepolia ETH',
                symbol: 'ETH',
                decimals: 18,
              },
              rpcUrls: ['https://sepolia.infura.io/v3/'],
              blockExplorerUrls: ['https://sepolia.etherscan.io/'],
            },
          ],
        });
      } catch (addError) {
        throw new Error('添加 Sepolia 网络失败');
      }
    } else if (error.code === 4001) {
      throw new Error('你拒绝了切换网络 😢');
    } else {
      throw new Error(`切换网络失败: ${error.message}`);
    }
  }
};

/**
 * 获取当前账户余额
 * @param provider BrowserProvider 实例
 * @param address 账户地址
 * @returns 余额（字符串，单位 ETH）
 */
export const getBalance = async (
  provider: BrowserProvider,
  address: string
): Promise<string> => {
  try {
    const balance = await provider.getBalance(address);
    return balance.toString();
  } catch (error) {
    console.error('获取余额失败:', error);
    return '0';
  }
};
