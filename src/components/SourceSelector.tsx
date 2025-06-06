import React from 'react';
import { useStreamingStore } from '../store/streamingStore';
import { streamingSources } from '../utils/streaming-sources';

const SourceSelector: React.FC = () => {
  const { currentSource, setCurrentSource } = useStreamingStore();

  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-sm text-gray-500">Source:</span>
      <div className="flex gap-2">
        {streamingSources.map((source) => (
          <button
            key={source.id}
            onClick={() => setCurrentSource(source.id)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              currentSource === source.id
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {source.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SourceSelector;