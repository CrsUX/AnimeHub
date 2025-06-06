import React from 'react';
import { useStreamingStore } from '../../store/streamingStore';
import QualitySelector from './QualitySelector';
import SourceInfo from './SourceInfo';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import VideoPlayer from '../VideoPlayer';
import EpisodeList from '../anime/EpisodeList';

interface StreamingContainerProps {
  title: string;
  compact?: boolean;
}

const StreamingContainer: React.FC<StreamingContainerProps> = ({ 
  title,
  compact = false 
}) => {
  const {
    sources,
    currentSource,
    isLoading,
    error,
    options,
    searchSources,
    setCurrentSource,
    updateOptions,
  } = useStreamingStore();

  React.useEffect(() => {
    searchSources(title);
  }, [title]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState 
        message={error} 
        onRetry={() => searchSources(title)} 
      />
    );
  }

  const qualities = sources.map(source => ({
    label: source.quality,
    value: source.quality,
    bitrate: 0,
  }));

  if (compact) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-light mb-4">Available Sources</h3>
          {sources.map((source) => (
            <button
              key={source.id}
              onClick={() => setCurrentSource(source)}
              className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                currentSource?.id === source.id
                  ? 'bg-primary text-light'
                  : 'bg-light/5 hover:bg-light/10 text-light/70 hover:text-light'
              }`}
            >
              <span className="font-medium">{source.quality}</span>
              <SourceInfo source={source} compact />
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium text-light mb-4">Episodes</h3>
          <EpisodeList />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {currentSource ? (
        <VideoPlayer
          url={currentSource.url}
          title={currentSource.title}
          autoPlay={options.autoPlay}
        />
      ) : (
        <div className="aspect-video bg-light/5 rounded-lg flex items-center justify-center text-light/70">
          Select a source to start watching
        </div>
      )}

      <div className="flex items-center justify-between p-4 bg-light/5 rounded-lg">
        <QualitySelector
          qualities={qualities}
          currentQuality={options.preferredQuality}
          onQualityChange={(quality) => updateOptions({ preferredQuality: quality })}
        />
        
        {currentSource && <SourceInfo source={currentSource} />}
      </div>
    </div>
  );
};

export default StreamingContainer;