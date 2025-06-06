import { create } from 'zustand';
import type { AniListAnime } from '../utils/anilist';
import type { PageInfo } from '../types/pagination';

interface AnimeState {
  animeList: AniListAnime[];
  currentAnime: AniListAnime | null;
  isLoading: boolean;
  error: string | null;
  pageInfo: PageInfo;
  setAnimeList: (list: AniListAnime[]) => void;
  setCurrentAnime: (anime: AniListAnime) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPageInfo: (pageInfo: PageInfo) => void;
}

export const useAnimeStore = create<AnimeState>((set) => ({
  animeList: [],
  currentAnime: null,
  isLoading: false,
  error: null,
  pageInfo: {
    currentPage: 1,
    hasNextPage: false,
    total: 0,
    perPage: 12,
  },
  setAnimeList: (list) => set({ animeList: list }),
  setCurrentAnime: (anime) => set({ currentAnime: anime }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setPageInfo: (pageInfo) => set({ pageInfo }),
}));