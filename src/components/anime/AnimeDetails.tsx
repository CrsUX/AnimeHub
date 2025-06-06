import React, { useState } from 'react';
import { Calendar, Clock, Star, ChevronDown, ChevronUp } from 'lucide-react';
import type { AniListAnime } from '../../utils/anilist';

interface AnimeDetailsProps {
  anime: AniListAnime;
}

const AnimeDetails: React.FC<AnimeDetailsProps> = ({ anime }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-lg bg-light/5 backdrop-blur-sm border border-light/10">
      <div className="relative h-48 overflow-hidden">
        <img
          src={anime.bannerImage || anime.coverImage.large}
          alt={anime.title.english || anime.title.romaji}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-transparent" />
      </div>

      <div className="p-6 -mt-16 relative">
        <h1 className="text-2xl font-bold text-light mb-4">
          {anime.title.english || anime.title.romaji}
        </h1>

        <div className="flex items-center gap-4 text-sm text-light/70 mb-4">
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
        </div>

        <div className={`relative ${!isExpanded ? 'max-h-24 overflow-hidden' : ''}`}>
          <p 
            className="text-light/90 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: anime.description }}
          />
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-dark to-transparent" />
          )}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 flex items-center gap-1 text-sm text-light/70 hover:text-light transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show More
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default AnimeDetails;