import React, { useState } from 'react';
import { textToHex, hexToText } from '../utils/hexUtils';

export const HexConverter: React.FC = () => {
  const [text, setText] = useState('');
  const [hex, setHex] = useState('');

  const handleTextToHex = () => {
    if (!text) return;
    const converted = textToHex(text);
    setHex(converted);
  };

  const handleHexToText = () => {
    if (!hex) return;
    const converted = hexToText(hex);
    setText(converted);
  };

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-metamask-600 font-cute mb-4 flex items-center gap-2">
        <span>🔄</span>
        Hex 转换工具
      </h3>

      <div className="space-y-4">
        {/* 文本输入 */}
        <div>
          <label className="block text-sm font-cute text-gray-600 mb-2">
            📝 文本
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="输入文本..."
            rows={3}
            className="input resize-none"
          />
        </div>

        {/* 转换按钮 */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleTextToHex}
            disabled={!text}
            className="bg-gradient-to-r from-cute-400 to-soft-400 hover:from-cute-500 hover:to-soft-500 text-white px-4 py-2 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-cute"
          >
            ↓ 转 Hex
          </button>
          <button
            onClick={handleHexToText}
            disabled={!hex}
            className="bg-gradient-to-r from-soft-400 to-metamask-400 hover:from-soft-500 hover:to-metamask-500 text-white px-4 py-2 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-cute"
          >
            ↑ 解码
          </button>
        </div>

        {/* Hex 输入 */}
        <div>
          <label className="block text-sm font-cute text-gray-600 mb-2">
            🔐 16进制
          </label>
          <textarea
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            placeholder="0x..."
            rows={3}
            className="input resize-none font-mono text-sm"
          />
        </div>

        {/* 快捷清空 */}
        <button
          onClick={() => {
            setText('');
            setHex('');
          }}
          className="w-full text-gray-500 hover:text-gray-700 text-sm font-cute transition-colors"
        >
          🗑️ 清空
        </button>
      </div>
    </div>
  );
};
