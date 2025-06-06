import React from 'react';
import { Play } from 'lucide-react';
import { useHistoryStore } from '../store/historyStore';
import { formatTime } from '../utils/time';

interface ContinueWatchingProps {
  onResume: (animeId: number, episodeId: string) => void;
}

const ContinueWatching: React.FC<ContinueWatchingProps> = ({ onResume }) => {
  const history = useHistoryStore((state) => state.history);

  if (history.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Continue Watching</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.slice(0, 6).map((item) => (
          <button
            key={`${item.animeId}-${item.episodeId}`}
            onClick={() => onResume(item.animeId, item.episodeId)}
            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex-shrink-0">
              <Play className="w-8 h-8 text-purple-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium">Episode {item.episodeId}</div>
              <div className="text-sm text-gray-500">
                {formatTime(item.timestamp)} watched
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContinueWatching;