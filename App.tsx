
import React, { useState, useEffect } from 'react';
import CopyDisplay from './components/CopyDisplay';
import VeoAnimator from './components/VeoAnimator';
import ApiKeyGate from './components/ApiKeyGate';
import { GeminiService } from './services/geminiService';

const App: React.FC = () => {
  const [hasKey, setHasKey] = useState<boolean | null>(null);

  useEffect(() => {
    checkKey();
  }, []);

  const checkKey = async () => {
    const active = await GeminiService.hasKey();
    setHasKey(active);
  };

  return (
    <div className="min-h-screen pb-20 selection:bg-amber-500/30">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-zinc-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center font-black text-black text-xl">
              R
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bold tracking-tight">RETROFIT ELITE</h1>
              <p className="text-[10px] text-zinc-500 font-medium tracking-[0.2em] uppercase">DTC Specialist Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="h-4 w-px bg-zinc-800" />
            <span className="text-xs font-bold text-zinc-500 tracking-widest uppercase">BMW / LAND ROVER</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-12 space-y-24">
        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-amber-500 border border-amber-500/20 rounded-full bg-amber-500/5">
            PREMIUM RETROFIT SOLUTION
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
            让每一台改装，<br />
            都拥有<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">顶级的体面</span>。
          </h2>
          <p className="text-zinc-400 text-xl leading-relaxed max-w-2xl mx-auto">
            专业的 DTC 改装文案工具，结合 Google Veo 视频生成技术，为您的 360 全景影像系统升级注入灵魂。
          </p>
        </section>

        {/* Copy Section */}
        <section className="space-y-12">
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-white tracking-tight">精选文案库</h3>
              <p className="text-zinc-500">基于“痛点场景”与“老司机优雅”口吻定制</p>
            </div>
          </div>
          <CopyDisplay />
        </section>

        {/* Visual Generation Section */}
        <section className="space-y-12">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-white tracking-tight">视觉动态渲染</h3>
              <p className="text-zinc-500">将静态改装图转化为电影级的宣传视频</p>
            </div>
            <VeoAnimator />
        </section>

        {/* Footer */}
        <footer className="pt-20 border-t border-zinc-900 text-center">
            <p className="text-zinc-600 text-sm">© 2024 Retrofit Elite DTC Agency. Powered by Gemini & Veo.</p>
        </footer>
      </main>

      {/* API Key Gate for Veo models */}
      {hasKey === false && (
        <ApiKeyGate onSuccess={() => setHasKey(true)} />
      )}
    </div>
  );
};

export default App;
