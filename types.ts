
export interface CopyResult {
  title: string;
  content: string;
  hashtags: string[];
}

export enum AspectRatio {
  LANDSCAPE = '16:9',
  PORTRAIT = '9:16'
}

export interface VideoGenerationState {
  isGenerating: boolean;
  status: string;
  videoUrl?: string;
  error?: string;
}
