import React, { useEffect, useCallback } from 'react';
import { X, Play, Calendar, Clock, Star } from 'lucide-react';
import ReactPlayer from 'react-player';
import type { AniListAnime } from '../utils/anilist';
import { useStreamingStore } from '../store/streamingStore';
import StreamingEpisodeList from './StreamingEpisodeList';

interface AnimeDetailsProps {
  anime: AniListAnime;
  onClose: () => void;
}

const AnimeDetails: React.FC<AnimeDetailsProps> = ({ anime, onClose }) => {
  const { 
    episodes, 
    currentEpisode, 
    isLoading, 
    searchSources, 
    setCurrentEpisode 
  } = useStreamingStore();

  useEffect(() => {
    // Search for episodes when anime is selected
    searchSources(anime.title.english || anime.title.romaji);
  }, [anime]);

  // Handle escape key press
  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Handle clicking outside the modal
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [handleEscapeKey]);

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors z-10"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          {currentEpisode ? (
            <div className="aspect-video bg-black">
              <ReactPlayer
                url={currentEpisode.url}
                width="100%"
                height="100%"
                controls
                playing
              />
            </div>
          ) : (
            <div className="h-[300px] relative">
              <img
                src={anime.bannerImage || anime.coverImage.large}
                alt={anime.title.english || anime.title.romaji}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {anime.title.english || anime.title.romaji}
                </h2>
                <div className="flex items-center gap-4 text-white/80">
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
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          {!currentEpisode && (
            <div className="prose max-w-none mb-8">
              <p dangerouslySetInnerHTML={{ __html: anime.description }} />
            </div>
          )}

          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-4">Episodes</h3>
            {isLoading ? (
              <div className="text-center py-4">Loading episodes...</div>
            ) : (
              <StreamingEpisodeList
                episodes={episodes}
                onEpisodeSelect={setCurrentEpisode}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;