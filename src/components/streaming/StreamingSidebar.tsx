import React from 'react';
import { useStreamingStore } from '../../store/streamingStore';
import { Settings, Play, Film, AlertCircle } from 'lucide-react';
import SourcesList from './SourcesList';
import EpisodeList from '../anime/EpisodeList';
import LoadingState from './LoadingState';
import QualitySelector from './QualitySelector';

interface StreamingSidebarProps {
  title: string;
}

const StreamingSidebar: React.FC<StreamingSidebarProps> = ({ title }) => {
  const { 
    isLoading, 
    error, 
    searchSources,
    options,
    updateOptions 
  } = useStreamingStore();

  React.useEffect(() => {
    searchSources(title);
  }, [title]);

  return (
    <div className="space-y-6">
      {/* Quality Settings */}
      <div className="bg-light/5 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-medium text-light">Playback Settings</h3>
        </div>
        
        <div className="space-y-4">
          <QualitySelector
            qualities={[
              { label: '4K', value: '4K', bitrate: 20000 },
              { label: '1080p', value: '1080p', bitrate: 8000 },
              { label: '720p', value: '720p', bitrate: 4000 },
              { label: '480p', value: '480p', bitrate: 2000 }
            ]}
            currentQuality={options.preferredQuality}
            onQualityChange={(quality) => updateOptions({ preferredQuality: quality })}
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-light/70">
              <input
                type="checkbox"
                checked={options.autoPlay}
                onChange={(e) => updateOptions({ autoPlay: e.target.checked })}
                className="w-4 h-4 rounded border-light/10 text-primary focus:ring-primary/50"
              />
              Auto-play videos
            </label>
            <label className="flex items-center gap-2 text-light/70">
              <input
                type="checkbox"
                checked={options.autoNext}
                onChange={(e) => updateOptions({ autoNext: e.target.checked })}
                className="w-4 h-4 rounded border-light/10 text-primary focus:ring-primary/50"
              />
              Auto-play next episode
            </label>
          </div>
        </div>
      </div>

      {/* Sources List */}
      <div className="bg-light/5 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-medium text-light">Available Sources</h3>
          </div>
          {error && (
            <button
              onClick={() => searchSources(title)}
              className="flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-sm hover:bg-red-500/20 transition-colors"
            >
              <AlertCircle className="w-4 h-4" />
              Try Again
            </button>
          )}
        </div>
        
        {isLoading ? (
          <LoadingState />
        ) : (
          <SourcesList />
        )}
      </div>

      {/* Episodes List */}
      <div className="bg-light/5 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Film className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-medium text-light">Episodes</h3>
        </div>
        <EpisodeList />
      </div>
    </div>
  );
};

export default StreamingSidebar;