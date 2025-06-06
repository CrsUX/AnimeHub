import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAnimeStore } from '../../store/animeStore';
import { useSearch } from '../../hooks/useSearch';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useKeyPress } from '../../hooks/useKeyPress';

const ExpandingSearch: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { setCurrentAnime } = useAnimeStore();
  const { isSearching, handleSearch } = useSearch();

  useClickOutside(containerRef, () => {
    if (isExpanded) {
      setIsExpanded(false);
      setQuery('');
    }
  });

  useKeyPress('Escape', () => {
    if (isExpanded) {
      setIsExpanded(false);
      setQuery('');
    }
  });

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setCurrentAnime(null);
      navigate('/');
      await handleSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div ref={containerRef} className="relative flex items-center h-full">
      <form
        onSubmit={handleSubmit}
        className={`flex items-center transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-64' : 'w-8'
        }`}
      >
        <div className="relative w-full flex items-center">
          {!isExpanded && (
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="flex items-center justify-center w-8 h-8 text-light/70 hover:text-light transition-colors"
              aria-label="Open search"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anime..."
            className={`w-full bg-light/5 border border-light/10 rounded-full py-1.5 pl-4 pr-8 text-sm text-light placeholder-light/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
              isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Search"
            disabled={isSearching}
          />

          {isExpanded && query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-light/10 text-light/50 hover:text-light transition-colors"
              aria-label="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExpandingSearch;