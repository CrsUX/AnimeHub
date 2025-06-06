import React from 'react';
import { Play } from 'lucide-react';
import { useAnimeStore } from '../store/animeStore';
import type { AnimeEpisode } from '../types/anime';

const EpisodeList: React.FC = () => {
  const { currentAnime, setCurrentEpisode } = useAnimeStore();

  if (!currentAnime) return null;

  return (
    <div className="space-y-4">
      {currentAnime.episodes.map((episode) => (
        <div
          key={episode.id}
          onClick={() => setCurrentEpisode(episode)}
          className="flex gap-4 bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="relative w-40 h-24 flex-shrink-0">
            <img
              src={episode.thumbnail}
              alt={episode.title}
              className="w-full h-full object-cover rounded"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Play className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <span className="text-sm text-gray-500">Episode {episode.number}</span>
            <h3 className="font-medium">{episode.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EpisodeList;