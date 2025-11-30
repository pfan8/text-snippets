import { WalletProvider } from './contexts/WalletContext';
import { WalletConnect } from './components/WalletConnect';
import { NetworkSwitcher } from './components/NetworkSwitcher';
import { BalanceDisplay } from './components/BalanceDisplay';
import { TransferForm } from './components/TransferForm';
import { HexConverter } from './components/HexConverter';
import { TransactionList } from './components/TransactionList';

function App() {
  return (
    <WalletProvider>
      <div className="min-h-screen bg-gradient-to-br from-cute-50 via-white to-soft-50">
        {/* 顶部导航 */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-lg shadow-sm z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-metamask-600 font-cute flex items-center gap-2">
                <span className="text-4xl">🦊</span>
                Transfer DApp
              </h1>
              <WalletConnect />
            </div>
          </div>
        </header>

        {/* 主内容区 */}
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左侧：钱包信息 */}
            <div className="lg:col-span-1 space-y-6">
              <NetworkSwitcher />
              <BalanceDisplay />
            </div>

            {/* 中间：转账表单 */}
            <div className="lg:col-span-1">
              <TransferForm />
            </div>

            {/* 右侧：工具和历史 */}
            <div className="lg:col-span-1 space-y-6">
              <HexConverter />
              <TransactionList />
            </div>
          </div>
        </main>

        {/* 底部装饰 */}
        <footer className="text-center py-6 text-gray-400 font-cute mt-8">
          <div className="flex items-center justify-center gap-2">
            Made with
            <span className="text-red-400 animate-pulse">💖</span>
            by ethers.js
          </div>
          <div className="text-xs mt-2 text-gray-300">
            ⚠️ 仅用于学习目的，请在测试网上使用
          </div>
        </footer>
      </div>
    </WalletProvider>
  );
}

export default App;
