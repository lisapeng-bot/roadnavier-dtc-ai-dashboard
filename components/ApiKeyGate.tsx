
import React from 'react';
import { GeminiService } from '../services/geminiService';

interface ApiKeyGateProps {
  onSuccess: () => void;
}

const ApiKeyGate: React.FC<ApiKeyGateProps> = ({ onSuccess }) => {
  const handleSelectKey = async () => {
    try {
      await GeminiService.openKeySelector();
      // Assume success after opening dialog as per instructions
      onSuccess();
    } catch (error) {
      console.error("Key selection failed", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
      <div className="max-w-md w-full p-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl text-center">
        <div className="mb-6 inline-flex p-4 bg-amber-500/10 rounded-full">
          <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">需要选定 API 密钥</h2>
        <p className="text-zinc-400 mb-8 leading-relaxed">
          为了使用顶级 Veo 视频生成技术，您需要选择一个已启用计费的 API 密钥。
          请确保您的项目已在 <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-amber-500 underline">GCP 控制台</a> 中启用计费。
        </p>
        <button
          onClick={handleSelectKey}
          className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-all active:scale-95"
        >
          选择 API 密钥
        </button>
      </div>
    </div>
  );
};

export default ApiKeyGate;
