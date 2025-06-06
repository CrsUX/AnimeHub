import React from 'react';
import { useStreamingStore } from '../../store/streamingStore';
import { AlertCircle } from 'lucide-react';
import PlyrPlayer from '../video/PlyrPlayer';

const StreamingPlayer: React.FC = () => {
  const { currentSource, options, error, isLoading } = useStreamingStore();

  if (error) {
    return (
      <div className="aspect-video bg-black flex items-center justify-center text-light/70">
        <div className="flex flex-col items-center gap-2">
          <AlertCircle className="w-6 h-6 text-red-500" />
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!currentSource) {
    return (
      <div className="aspect-video bg-black flex items-center justify-center text-light/70">
        <div className="flex flex-col items-center gap-2">
          <AlertCircle className="w-6 h-6" />
          <p>Select a source to start watching</p>
        </div>
      </div>
    );
  }

  return (
    <PlyrPlayer
      url={currentSource.url}
      title={currentSource.title}
      autoPlay={options.autoPlay}
      onError={(error) => {
        console.error('Playback error:', error);
      }}
    />
  );
};

export default StreamingPlayer;