import React from 'react';
import { useStreamingStore } from '../../store/streamingStore';
import { Download, CheckCircle2 } from 'lucide-react';
import SourceInfo from './SourceInfo';

const SourcesList: React.FC = () => {
  const { sources, currentSource, setCurrentSource } = useStreamingStore();

  if (!sources.length) {
    return (
      <div className="text-light/70 text-center p-4">
        No sources available
      </div>
    );
  }

  const formatSize = (bytes: number): string => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  return (
    <div className="space-y-2">
      {sources.map((source) => {
        const isSelected = currentSource?.id === source.id;
        
        return (
          <button
            key={source.id}
            onClick={() => setCurrentSource(source)}
            className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all ${
              isSelected
                ? 'bg-primary text-light ring-2 ring-primary/50'
                : 'bg-light/5 hover:bg-light/10 text-light/70 hover:text-light'
            }`}
          >
            {/* Quality Badge */}
            <div className="flex-shrink-0 w-16 text-center">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                isSelected ? 'bg-white/20' : 'bg-light/10'
              }`}>
                {source.quality}
              </span>
            </div>

            {/* Source Info */}
            <div className="flex-1 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Download className="w-4 h-4" />
                  <span>{formatSize(source.size)}</span>
                </div>
                {source.seeds > 0 && (
                  <div className="text-sm text-emerald-400">
                    {source.seeds} seeds
                  </div>
                )}
              </div>

              {isSelected && (
                <CheckCircle2 className="w-5 h-5 text-light" />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default SourcesList;