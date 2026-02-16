
import React, { useState, useRef } from 'react';
import { GeminiService } from '../services/geminiService';
import { AspectRatio } from '../types';

const VeoAnimator: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.LANDSCAPE);
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setVideoUrl(null);
      setError(null);
    }
  };

  const generate = async () => {
    if (!file) return;
    setIsGenerating(true);
    setVideoUrl(null);
    setError(null);
    setProgress("正在初始化 Veo 模型...");

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        
        setProgress("正在渲染视频动态 (预计需要 2-3 分钟)...");
        try {
            const url = await GeminiService.generateVideo(
                base64,
                "A luxurious BMW or Land Rover moving elegantly in a high-end garage, showing smooth 360 degree rotation, cinematic lighting, 4k resolution, professional car commercial style",
                aspectRatio
            );
            setVideoUrl(url);
            setIsGenerating(false);
        } catch (err: any) {
            if (err.message?.includes("Requested entity was not found")) {
                setError("API 密钥权限不足或已失效，请重新选择。");
                await GeminiService.openKeySelector();
            } else {
                setError("生成失败: " + err.message);
            }
            setIsGenerating(false);
        }
      };
    } catch (err: any) {
      setError(err.message);
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 lg:p-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Veo 动态视觉呈现</h2>
          <p className="text-zinc-400">上传您的爱车照片，生成一段“顶级优雅”的宣传短片</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setAspectRatio(AspectRatio.LANDSCAPE)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${aspectRatio === AspectRatio.LANDSCAPE ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-400'}`}
          >
            16:9 横屏
          </button>
          <button 
            onClick={() => setAspectRatio(AspectRatio.PORTRAIT)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${aspectRatio === AspectRatio.PORTRAIT ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-400'}`}
          >
            9:16 竖屏
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload/Preview Section */}
        <div className="relative group aspect-video bg-zinc-950 border-2 border-dashed border-zinc-800 rounded-xl overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-amber-500/50 transition-colors"
             onClick={() => !isGenerating && fileInputRef.current?.click()}>
          {preview ? (
            <img src={preview} className="w-full h-full object-cover" alt="Preview" />
          ) : (
            <div className="text-center p-6">
              <div className="mb-4 inline-flex p-3 bg-zinc-900 rounded-full">
                 <svg className="w-8 h-8 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <p className="text-zinc-400 font-medium">点击上传爱车美照</p>
              <p className="text-zinc-600 text-sm mt-1">支持 PNG, JPG</p>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange}
          />
        </div>

        {/* Result Section */}
        <div className="aspect-video bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden flex items-center justify-center relative">
          {isGenerating ? (
            <div className="text-center p-10">
              <div className="mb-4 w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-amber-500 font-bold mb-1">正在生成顶级视觉...</p>
              <p className="text-zinc-500 text-xs animate-pulse">{progress}</p>
            </div>
          ) : videoUrl ? (
            <video 
                src={videoUrl} 
                controls 
                autoPlay 
                loop 
                className="w-full h-full object-contain"
            />
          ) : error ? (
            <div className="text-center p-6 text-red-400">
               <svg className="w-10 h-10 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
               <p className="font-medium">{error}</p>
            </div>
          ) : (
            <div className="text-zinc-600 text-center">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              <p>生成后的视频将在此处显示</p>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={generate}
        disabled={!file || isGenerating}
        className="w-full py-5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-600 text-black font-extrabold text-lg rounded-xl shadow-xl shadow-amber-900/10 transition-all active:scale-[0.98]"
      >
        {isGenerating ? "正在唤醒 Veo AI..." : "立即生成视觉大片"}
      </button>
    </div>
  );
};

export default VeoAnimator;
