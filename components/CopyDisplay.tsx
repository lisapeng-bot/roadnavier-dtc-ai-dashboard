
import React, { useState } from 'react';

const CopyDisplay: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyText = `【极致从容：不只是视野，是顶级的体面】

真正的老司机，追求的早已不是“能不能过去”，而是“能不能过得优雅”。

当你开着 Bimmer 穿梭在老城窄巷，或是驾驶揽胜停入顶级商场的局促车位——
哪怕只有 1% 的犹豫，都会瞬间消解车主该有的那份淡然。

所谓的“窄路掉头”与“侧方停车”，考验的从不是技术，而是容错率。
360° 全景影像系统，为您开启“上帝视角”。

它不是为您查缺补漏，而是为了保护您那套昂贵的锻造轮毂与车漆；
它不是因为您看不见，而是为了让您在每一次极限操作时，依然能单手扶轮，保持那份顶级改装才配拥有的——从容廓形。

升级 360 全景。
别让琐碎的遮挡，惊扰了您的顶级优雅。

#BMW改装 #LandRover #360全景影像 #顶级改装 #老司机的优雅 #DTC精品`;

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 lg:p-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4">
         <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold border border-zinc-800 px-2 py-1 rounded">Expert Draft V1.0</span>
      </div>
      
      <div className="space-y-6">
        <h3 className="text-amber-500 font-semibold tracking-wide uppercase text-sm">DTC Copywriting / 顶级文案</h3>
        <pre className="whitespace-pre-wrap font-sans text-zinc-300 leading-relaxed text-lg italic border-l-2 border-amber-500/30 pl-6">
          {copyText}
        </pre>
      </div>

      <button
        onClick={handleCopy}
        className="mt-8 flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
      >
        {copied ? (
          <><svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> 已复制</>
        ) : (
          <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg> 复制文案</>
        )}
      </button>
    </div>
  );
};

export default CopyDisplay;
