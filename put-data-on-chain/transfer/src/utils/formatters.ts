import { formatEther, formatUnits } from 'ethers';

/**
 * 格式化以太坊地址（缩短显示）
 * @param address 完整地址
 * @param startLength 开头保留长度
 * @param endLength 结尾保留长度
 * @returns 格式化后的地址
 */
export const formatAddress = (
  address: string,
  startLength: number = 6,
  endLength: number = 4
): string => {
  if (!address) return '';
  if (address.length < startLength + endLength) return address;

  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
};

/**
 * 格式化 ETH 金额
 * @param weiValue wei 单位的金额
 * @param decimals 保留小数位数
 * @returns 格式化后的 ETH 金额
 */
export const formatEthAmount = (
  weiValue: bigint | string,
  decimals: number = 4
): string => {
  try {
    const ethValue = formatEther(weiValue);
    const num = parseFloat(ethValue);
    return num.toFixed(decimals);
  } catch (error) {
    console.error('格式化金额失败:', error);
    return '0.0000';
  }
};

/**
 * 格式化代币金额
 * @param value 代币数量
 * @param tokenDecimals 代币精度
 * @param displayDecimals 显示小数位数
 * @returns 格式化后的代币金额
 */
export const formatTokenAmount = (
  value: bigint | string,
  tokenDecimals: number = 18,
  displayDecimals: number = 4
): string => {
  try {
    const formattedValue = formatUnits(value, tokenDecimals);
    const num = parseFloat(formattedValue);
    return num.toFixed(displayDecimals);
  } catch (error) {
    console.error('格式化代币金额失败:', error);
    return '0.0000';
  }
};

/**
 * 格式化时间戳
 * @param timestamp Unix 时间戳（秒）
 * @returns 格式化后的时间字符串
 */
export const formatTimestamp = (timestamp: number): string => {
  try {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    console.error('格式化时间失败:', error);
    return '';
  }
};

/**
 * 格式化交易哈希（缩短显示）
 * @param hash 交易哈希
 * @returns 格式化后的哈希
 */
export const formatTxHash = (hash: string): string => {
  return formatAddress(hash, 10, 8);
};
