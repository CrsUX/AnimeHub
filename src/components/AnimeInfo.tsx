import React from 'react';
import { Calendar, Clock, Star, Heart } from 'lucide-react';
import type { AniListAnime } from '../utils/anilist';

interface AnimeInfoProps {
  anime: AniListAnime;
}

const AnimeInfo: React.FC<AnimeInfoProps> = ({ anime }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-start gap-6">
        <img
          src={anime.coverImage.large}
          alt={anime.title.english || anime.title.romaji}
          className="w-32 h-48 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">
            {anime.title.english || anime.title.romaji}
          </h1>
          
          <div className="flex items-center gap-4 text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{anime.seasonYear}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{anime.episodes || '?'} Episodes</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>{anime.averageScore / 10}/10</span>
            </div>
            <button className="flex items-center gap-1 text-red-500">
              <Heart className="w-4 h-4" />
              <span>Add to Favorites</span>
            </button>
          </div>

          <div className="prose prose-sm max-w-none">
            <p dangerouslySetInnerHTML={{ __html: anime.description }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeInfo;