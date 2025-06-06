import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WatchHistoryItem {
  animeId: number;
  episodeId: string;
  timestamp: number;
  watchedAt: string;
}

interface HistoryState {
  history: WatchHistoryItem[];
  addToHistory: (item: Omit<WatchHistoryItem, 'watchedAt'>) => void;
  getProgress: (animeId: number, episodeId: string) => number | null;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      history: [],
      addToHistory: (item) => set((state) => ({
        history: [
          {
            ...item,
            watchedAt: new Date().toISOString(),
          },
          ...state.history.filter(
            (h) => h.animeId !== item.animeId || h.episodeId !== item.episodeId
          ),
        ].slice(0, 100), // Keep only last 100 items
      })),
      getProgress: (animeId, episodeId) => {
        const item = get().history.find(
          (h) => h.animeId === animeId && h.episodeId === episodeId
        );
        return item?.timestamp ?? null;
      },
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'watch-history',
    }
  )
);