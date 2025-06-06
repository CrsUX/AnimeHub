import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface GenreSelectorProps {
  genres: string[];
  onChange: (genres: string[]) => void;
}

const GenreSelector: React.FC<GenreSelectorProps> = ({ genres, onChange }) => {
  const [newGenre, setNewGenre] = useState('');

  const handleAddGenre = () => {
    if (newGenre.trim() && !genres.includes(newGenre.trim())) {
      onChange([...genres, newGenre.trim()]);
      setNewGenre('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddGenre();
    }
  };

  const handleRemoveGenre = (genreToRemove: string) => {
    onChange(genres.filter(genre => genre !== genreToRemove));
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={newGenre}
          onChange={(e) => setNewGenre(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a genre..."
          className="flex-1 bg-light/5 border border-light/10 rounded-lg px-4 py-2 text-light placeholder-light/50 focus:ring-2 focus:ring-primary/50 focus:border-transparent"
        />
        <button
          type="button"
          onClick={handleAddGenre}
          disabled={!newGenre.trim()}
          className="px-4 py-2 bg-primary text-light rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <span
            key={genre}
            className="px-3 py-1 bg-light/5 text-light/70 rounded-full text-sm flex items-center gap-2 group"
          >
            {genre}
            <button
              type="button"
              onClick={() => handleRemoveGenre(genre)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3 hover:text-red-400" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default GenreSelector;