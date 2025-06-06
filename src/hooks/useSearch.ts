import { useState } from 'react';
import { useAnimeStore } from '../store/animeStore';
import { performSearch } from '../utils/search';

export function useSearch() {
  const [isSearching, setIsSearching] = useState(false);
  const { setAnimeList, setError, setPageInfo } = useAnimeStore();

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    try {
      const { media, pageInfo } = await performSearch(query);
      setAnimeList(media);
      setPageInfo(pageInfo);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Search failed');
    } finally {
      setIsSearching(false);
    }
  };

  return {
    isSearching,
    handleSearch
  };
}