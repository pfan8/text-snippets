import { hexlify, toUtf8Bytes, toUtf8String, isHexString } from 'ethers';

/**
 * 将普通文本转换为16进制字符串
 * @param text 要转换的文本
 * @returns 16进制字符串（以 0x 开头）
 */
export const textToHex = (text: string): string => {
  if (!text) return '0x';
  try {
    return hexlify(toUtf8Bytes(text));
  } catch (error) {
    console.error('Text to Hex 转换失败:', error);
    return '0x';
  }
};

/**
 * 将16进制字符串解码为普通文本
 * @param hex 16进制字符串（以 0x 开头）
 * @returns 解码后的文本
 */
export const hexToText = (hex: string): string => {
  if (!hex || hex === '0x') return '';

  try {
    return toUtf8String(hex);
  } catch (error) {
    console.error('Hex to Text 解码失败:', error);
    return '[无法解码的数据 🔒]';
  }
};

/**
 * 验证字符串是否为有效的16进制格式
 * @param value 要验证的字符串
 * @returns 是否为有效的16进制字符串
 */
export const isValidHex = (value: string): boolean => {
  return isHexString(value);
};
