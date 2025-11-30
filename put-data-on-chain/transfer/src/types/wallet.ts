import { BrowserProvider, Signer } from 'ethers';

export interface WalletState {
  account: string | null;
  chainId: number | null;
  balance: string;
  provider: BrowserProvider | null;
  signer: Signer | null;
  isConnected: boolean;
  isInitializing: boolean;
}

export interface WalletContextType extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
  switchNetwork: (chainId: number) => Promise<void>;
  refreshBalance: () => Promise<void>;
}

export interface Network {
  chainId: number;
  name: string;
  symbol: string;
  isTestnet: boolean;
  icon: string;
}
