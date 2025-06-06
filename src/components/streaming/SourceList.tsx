import React from 'react';
import { Play, Download, Info } from 'lucide-react';
import { useStreamingStore } from '../../store/streamingStore';
import type { StreamingSource } from '../../types/streaming';

const SourceList: React.FC = () => {
  const { sources, currentSource, setCurrentSource, isLoading, error } = useStreamingStore();

  const formatSize = (bytes: number): string => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  if (isLoading) {
    return (
      <div className="text-center p-4 text-light/70">
        Loading sources...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-400">
        {error}
      </div>
    );
  }

  if (!sources.length) {
    return (
      <div className="text-center p-4 text-light/70">
        No sources found
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {sources.map((source) => (
        <button
          key={source.id}
          onClick={() => setCurrentSource(source)}
          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
            currentSource?.id === source.id
              ? 'bg-primary text-light'
              : 'bg-light/5 hover:bg-light/10 text-light/70 hover:text-light'
          }`}
        >
          <Play className="w-4 h-4 flex-shrink-0" />
          <div className="flex-1 text-left">
            <div className="font-medium truncate">{source.title}</div>
            <div className="text-sm opacity-70 flex items-center gap-4">
              <span>{source.quality}</span>
              <span>{formatSize(source.size)}</span>
              <span className="flex items-center gap-1">
                <Download className="w-3 h-3" />
                {source.seeds}
              </span>
            </div>
          </div>
          <Info className="w-4 h-4 opacity-50" />
        </button>
      ))}
    </div>
  );
};

export default SourceList;