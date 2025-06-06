import React from 'react';
import { Heart, Star } from 'lucide-react';
import type { FavoriteAnime } from '../../types/profile';

const mockFavorites: FavoriteAnime[] = [
  {
    id: '1',
    title: 'Fullmetal Alchemist: Brotherhood',
    imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477',
    rating: 10,
    type: 'TV Series'
  },
  {
    id: '2',
    title: 'Your Name',
    imageUrl: 'https://images.unsplash.com/photo-1541562232579-512a21360020',
    rating: 9.5,
    type: 'Movie'
  }
];

const FavoritesCollection: React.FC = () => {
  return (
    <div className="bg-light/5 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-2">
        <Heart className="w-5 h-5 text-primary" />
        Favorites
      </h2>

      <div className="space-y-4">
        {mockFavorites.map((favorite) => (
          <div
            key={favorite.id}
            className="flex gap-4 p-2 rounded-lg hover:bg-light/10 transition-colors"
          >
            <img
              src={favorite.imageUrl}
              alt={favorite.title}
              className="w-16 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-medium text-light">{favorite.title}</h3>
              <span className="text-sm text-light/70">{favorite.type}</span>
              <div className="flex items-center gap-1 mt-1 text-primary">
                <Star className="w-4 h-4 fill-current" />
                <span>{favorite.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesCollection;