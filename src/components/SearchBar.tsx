import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto mb-8">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search anime..."
        className="w-full px-4 py-3 pl-12 pr-10 rounded-full border border-light/10 bg-light/5 backdrop-blur-sm text-light placeholder-light/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-light/50" />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-light/10 text-light/50 hover:text-light transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </form>
  );
}

export default SearchBar;