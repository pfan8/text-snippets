export interface Transaction {
  hash: string;
  from: string;
  to: string | null;
  value: string;
  data: string;
  decodedMessage?: string;
  timestamp?: number;
  blockNumber?: number;
  status?: 'pending' | 'success' | 'failed';
}

export interface TransactionReceipt {
  hash: string;
  status: number;
  blockNumber: number;
  gasUsed: string;
}

export interface TransferFormData {
  recipient: string;
  amount: string;
  message: string;
}
