import React from 'react';
import { Play } from 'lucide-react';
import { StreamingEpisode } from '../types/streaming';
import { useStreamingStore } from '../store/streamingStore';

interface StreamingEpisodeListProps {
  episodes: StreamingEpisode[];
  onEpisodeSelect: (episode: StreamingEpisode) => void;
}

const StreamingEpisodeList: React.FC<StreamingEpisodeListProps> = ({ 
  episodes, 
  onEpisodeSelect 
}) => {
  const { currentSource } = useStreamingStore();
  const filteredEpisodes = episodes.filter(ep => ep.source.toLowerCase() === currentSource);

  return (
    <div className="grid grid-cols-1 gap-4">
      {filteredEpisodes.map((episode) => (
        <button
          key={`${episode.source}-${episode.id}`}
          onClick={() => onEpisodeSelect(episode)}
          className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <Play className="w-5 h-5 text-purple-600" />
          <div className="flex-1 text-left">
            <div className="font-medium">Episode {episode.number}</div>
            <div className="text-sm text-gray-500">
              Source: {episode.source} • Quality: {episode.quality}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default StreamingEpisodeList;