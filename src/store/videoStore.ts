import { create } from 'zustand';
import type { Video, Ad } from '../types/video';

interface VideoState {
  currentVideo: Video | null;
  isPlaying: boolean;
  currentAd: Ad | null;
  isAdPlaying: boolean;
  setCurrentVideo: (video: Video) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentAd: (ad: Ad | null) => void;
  setIsAdPlaying: (playing: boolean) => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  currentVideo: null,
  isPlaying: false,
  currentAd: null,
  isAdPlaying: false,
  setCurrentVideo: (video) => set({ currentVideo: video }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentAd: (ad) => set({ currentAd: ad }),
  setIsAdPlaying: (playing) => set({ isAdPlaying: playing }),
}));