import React from 'react';
import Navbar from './Navbar';
import { useAnimeStore } from '../../store/animeStore';

interface LayoutProps {
  children: React.ReactNode;
  fetchAnime: (page: number, view: string, query?: string) => Promise<void>;
}

const Layout: React.FC<LayoutProps> = ({ children, fetchAnime }) => {
  const { setAnimeList, setError } = useAnimeStore();

  const handleSearch = async (query: string) => {
    // Clear previous results before searching
    setAnimeList([]);
    setError(null);
    await fetchAnime(1, 'search', query);
  };

  return (
    <div className="min-h-screen bg-dark">
      <Navbar onSearch={handleSearch} />
      {children}
    </div>
  );
};

export default Layout;