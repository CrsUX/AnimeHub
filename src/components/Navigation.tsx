import React from 'react';
import { Compass, TrendingUp, Clock, Star } from 'lucide-react';
import { useAnimeStore } from '../store/animeStore';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const { setAnimeList, setError } = useAnimeStore();

  const handleViewChange = (view: string) => {
    // Clear search results when changing views
    setAnimeList([]);
    setError(null);
    onViewChange(view);
  };

  const navItems = [
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'latest', label: 'Latest', icon: Clock },
    { id: 'popular', label: 'Popular', icon: Star },
  ];

  return (
    <nav className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => handleViewChange(item.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              currentView === item.id
                ? 'bg-primary text-light'
                : 'bg-light/5 hover:bg-light/10 text-light/70 hover:text-light'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default Navigation;