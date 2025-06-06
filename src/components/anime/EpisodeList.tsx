import React from 'react';
import { Play, Lock } from 'lucide-react';
import type { StreamingEpisode } from '../../types/streaming';

interface EpisodeListProps {
  episodes?: StreamingEpisode[];
  currentEpisode?: StreamingEpisode | null;
  onEpisodeSelect?: (episode: StreamingEpisode) => void;
}

const EpisodeList: React.FC<EpisodeListProps> = ({
  episodes = [],
  currentEpisode,
  onEpisodeSelect,
}) => {
  // Mock episodes for development
  const mockEpisodes = Array.from({ length: 12 }, (_, i) => ({
    id: `ep-${i + 1}`,
    number: i + 1,
    title: `Episode ${i + 1}`,
    url: '',
    quality: '1080p',
    source: 'mock'
  }));

  const displayEpisodes = episodes.length ? episodes : mockEpisodes;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {displayEpisodes.map((episode) => {
        const isSelected = currentEpisode?.id === episode.id;
        const isLocked = episode.number > 3; // Mock premium limitation

        return (
          <button
            key={episode.id}
            onClick={() => !isLocked && onEpisodeSelect?.(episode)}
            disabled={isLocked}
            className={`
              flex items-center gap-3 p-3 rounded-lg transition-all
              ${isLocked 
                ? 'bg-light/5 cursor-not-allowed opacity-50' 
                : isSelected
                  ? 'bg-primary text-light ring-2 ring-primary/50'
                  : 'bg-light/5 hover:bg-light/10 text-light/70 hover:text-light'
              }
            `}
          >
            {/* Episode Number */}
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-light/10">
              {isLocked ? (
                <Lock className="w-4 h-4" />
              ) : (
                <span className="text-sm">{episode.number}</span>
              )}
            </div>

            {/* Episode Info */}
            <div className="flex-1 text-left">
              <div className="font-medium text-sm">Episode {episode.number}</div>
              {isLocked && (
                <div className="text-xs text-primary">Premium Only</div>
              )}
            </div>

            {!isLocked && <Play className="w-4 h-4 opacity-50" />}
          </button>
        );
      })}
    </div>
  );
};

export default EpisodeList;