# 🦊 Transfer DApp - 可爱风格的以太坊转账应用

一个基于 React + Vite + TypeScript + ethers.js 的现代化以太坊转账 DApp，采用可爱风格 UI 设计，完美匹配 MetaMask 的橙色狐狸主题。

## ✨ 核心特色

- 🦊 **与 MetaMask 完美融合** - 可爱的 UI 设计，橙粉紫渐变配色
- 💝 **纯 ethers.js 实现** - 无 wagmi/viem 依赖，代码简洁
- 🌐 **双 RPC 提供商** - 支持 Infura 和 Alchemy 可切换
- 🔐 **Hex 编解码集成** - 文本 ↔ 16进制转换，存储链上数据
- 📜 **交易历史查询** - 查看转账记录并解密消息
- 🎨 **可爱风格 UI** - 圆角卡片、柔和阴影、流畅动画
- ✅ **完整类型支持** - TypeScript 全栈覆盖

## 🚀 快速开始

### 前置要求

- Node.js 18+ 或 20+
- pnpm 10.2.0+
- MetaMask 浏览器扩展

### 安装依赖

```bash
pnpm install
```

### 配置环境变量

1. 复制 `.env.example` 为 `.env`:

```bash
cp .env.example .env
```

2. 填写 API Keys:

```bash
# Infura API Key (获取: https://infura.io/)
VITE_INFURA_API_KEY=your_infura_project_id

# Alchemy API Key (获取: https://www.alchemy.com/)
VITE_ALCHEMY_API_KEY=your_alchemy_api_key

# 默认 RPC 提供商
VITE_DEFAULT_RPC_PROVIDER=infura
```

### 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:5173](http://localhost:5173)

### 构建生产版本

```bash
pnpm build
pnpm preview
```

## 📖 功能说明

### 1. 钱包连接

- 点击 "连接 MetaMask 钱包" 按钮
- MetaMask 弹窗授权连接
- 自动显示账户地址和 ETH 余额

### 2. 网络切换

- 支持以太坊主网和 Sepolia 测试网
- 一键切换，自动更新余额
- 测试网开发更安全

### 3. 发送转账

- 输入收款地址
- 输入转账金额（ETH）
- 可选：输入附加消息（自动转为16进制）
- 点击 "发送转账" 并在 MetaMask 确认

### 4. Hex 转换工具

- 文本 → 16进制编码
- 16进制 → 文本解码
- 实时转换预览

### 5. 交易历史

- 输入交易哈希查询详情
- 查看交易状态、金额、时间
- 自动解码附加消息显示

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| 前端框架 | React 19 + Vite 7 |
| 语言 | TypeScript 5.9 |
| Web3 | ethers.js 6.15 |
| 样式 | Tailwind CSS 4.1 |
| 包管理 | pnpm 10.20 |
| RPC | Infura + Alchemy |

## 📁 项目结构

```
transfer/
├── src/
│   ├── components/          # UI 组件
│   │   ├── WalletConnect.tsx
│   │   ├── NetworkSwitcher.tsx
│   │   ├── BalanceDisplay.tsx
│   │   ├── TransferForm.tsx
│   │   ├── HexConverter.tsx
│   │   └── TransactionList.tsx
│   ├── contexts/
│   │   └── WalletContext.tsx  # 钱包状态管理
│   ├── hooks/
│   │   └── useTransactions.ts # 交易查询 Hook
│   ├── utils/
│   │   ├── ethereum.ts        # MetaMask 连接
│   │   ├── hexUtils.ts        # Hex 编解码
│   │   ├── rpcProviders.ts    # RPC 管理
│   │   └── formatters.ts      # 格式化工具
│   ├── types/                 # TypeScript 类型
│   ├── constants/             # 网络配置
│   ├── styles/                # 全局样式
│   ├── App.tsx                # 主应用
│   └── main.tsx               # 入口
├── public/                    # 静态资源
├── index.html                 # HTML 入口
├── vite.config.ts             # Vite 配置
├── tailwind.config.js         # Tailwind 配置
├── tsconfig.json              # TypeScript 配置
└── package.json               # 项目配置
```

## 🎨 UI 设计规范

### 色彩方案

- 🧡 MetaMask 橙: `#f97316` (主按钮、强调色)
- 💗 可爱粉: `#ec4899` (次要按钮、装饰)
- 💜 柔和紫: `#a855f7` (渐变、亮点)

### 设计元素

- **圆角**: 16px / 24px / 32px
- **阴影**: 柔和阴影 + 橙色光晕
- **动画**: 轻微放大 + 流畅过渡
- **字体**: Nunito & Quicksand（圆润、友好）

### Emoji 使用

- 🦊 MetaMask/钱包
- 💰 余额/金额
- 🚀 发送/提交
- 💌 消息/数据
- ✅ 成功
- ⏳ 等待
- 🌍 主网
- 🧪 测试网

## ⚠️ 注意事项

### 安全提示

1. **测试网优先**: 建议先在 Sepolia 测试网测试
2. **保护私钥**: 永远不要分享你的私钥和助记词
3. **小额测试**: 主网操作请从小额开始
4. **环境变量**: 不要提交 `.env` 文件到 Git

### 获取测试币

**Sepolia 测试网水龙头**:
- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
- [Infura Sepolia Faucet](https://www.infura.io/faucet/sepolia)

## 🔧 开发指南

### 代码规范

```bash
# 运行 ESLint
pnpm lint

# 构建检查
pnpm build
```

### 自定义 RPC 提供商

编辑 `src/utils/rpcProviders.ts`:

```typescript
const RPC_URLS = {
  infura: {
    1: `https://mainnet.infura.io/v3/${API_KEY}`,
    11155111: `https://sepolia.infura.io/v3/${API_KEY}`,
  },
  alchemy: {
    1: `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}`,
    11155111: `https://eth-sepolia.g.alchemy.com/v2/${API_KEY}`,
  },
};
```

### 添加新网络

编辑 `src/constants/networks.ts`:

```typescript
export const NETWORKS: Record<number, Network> = {
  // ... 现有网络
  137: {  // Polygon 主网
    chainId: 137,
    name: 'Polygon',
    symbol: 'MATIC',
    isTestnet: false,
    icon: '💜',
  },
};
```

## 📚 相关资源

- [ethers.js 文档](https://docs.ethers.org/v6/)
- [MetaMask 文档](https://docs.metamask.io/)
- [Infura](https://infura.io/)
- [Alchemy](https://www.alchemy.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！

## 📄 许可证

ISC License

## 💖 致谢

感谢 ethers.js、MetaMask 和所有开源贡献者！

---

Made with 💖 by ethers.js
