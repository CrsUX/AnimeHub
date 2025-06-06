import React from 'react';
import { Play } from 'lucide-react';
import type { AniListAnime } from '../utils/anilist';

interface AnimeCardProps {
  anime: AniListAnime;
  onClick: (anime: AniListAnime) => void;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onClick }) => {
  return (
    <div
      className="group relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
      onClick={() => onClick(anime)}
    >
      <div className="relative aspect-[3/4]">
        <img
          src={anime.coverImage.large}
          alt={anime.title.english || anime.title.romaji}
          className="w-full h-full object-cover"
        />
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F110C] via-[#0F110C]/20 to-transparent opacity-90" />
        
        {/* Red accent gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#BA274A]/30 via-transparent to-transparent opacity-60" />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-[#0F110C]/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform">
            <Play className="w-12 h-12 text-[#FFFFEA]" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-[#FFFFEA] font-medium text-lg mb-1 line-clamp-1">
          {anime.title.english || anime.title.romaji}
        </h3>
        <div className="flex items-center gap-2 text-sm text-[#FFFFEA]/70">
          <span>{anime.episodes || '?'} Episodes</span>
          <span>•</span>
          <span>{anime.averageScore / 10}/10</span>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;