
import { GoogleGenAI } from "@google/genai";
import { AspectRatio } from "../types";

export class GeminiService {
  private static getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  static async generateVideo(
    imageBuffer: string, 
    prompt: string, 
    aspectRatio: AspectRatio
  ): Promise<string> {
    const ai = this.getAI();
    
    // Veo generation
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      image: {
        imageBytes: imageBuffer,
        mimeType: 'image/png',
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: aspectRatio
      }
    });

    // Polling
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) throw new Error("Video generation failed - no URI returned.");

    // Fetch binary data with API Key
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }

  static async hasKey(): Promise<boolean> {
    // @ts-ignore
    return await window.aistudio.hasSelectedApiKey();
  }

  static async openKeySelector(): Promise<void> {
    // @ts-ignore
    await window.aistudio.openSelectKey();
  }
}
