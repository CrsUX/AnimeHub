import { create } from 'zustand';
import { StreamingSource, StreamingOptions } from '../types/streaming';
import { StreamingManager } from '../services/streaming/StreamingManager';

interface StreamingState {
  sources: StreamingSource[];
  currentSource: StreamingSource | null;
  isLoading: boolean;
  error: string | null;
  options: StreamingOptions;
  searchSources: (title: string) => Promise<void>;
  setCurrentSource: (source: StreamingSource | null) => void;
  updateOptions: (options: Partial<StreamingOptions>) => void;
  retrySearch: (title: string) => Promise<void>;
}

const streamingManager = new StreamingManager();

export const useStreamingStore = create<StreamingState>((set, get) => ({
  sources: [],
  currentSource: null,
  isLoading: false,
  error: null,
  options: {
    preferredQuality: '1080p',
    autoPlay: true,
    autoNext: true,
  },

  searchSources: async (title: string) => {
    set({ isLoading: true, error: null });
    try {
      const sources = await streamingManager.searchSources(title);
      
      // Set current source to best quality that matches preferred quality
      const preferredQuality = get().options.preferredQuality;
      const bestSource = sources.find(s => s.quality === preferredQuality) || sources[0];
      
      set({ 
        sources,
        currentSource: bestSource,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch sources',
        isLoading: false,
        sources: [],
        currentSource: null
      });
    }
  },

  retrySearch: async (title: string) => {
    const { searchSources } = get();
    await searchSources(title);
  },

  setCurrentSource: (source) => set({ currentSource: source }),
  
  updateOptions: (options) => set((state) => ({
    options: { ...state.options, ...options }
  })),
}));