import React from 'react';
import { Settings } from 'lucide-react';
import { useStreamingStore } from '../../store/streamingStore';

const StreamingOptions: React.FC = () => {
  const { options, updateOptions } = useStreamingStore();

  return (
    <div className="bg-light/5 backdrop-blur-sm border border-light/10 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-medium text-light">Streaming Options</h3>
      </div>

      <div className="space-y-4">
        {/* Quality Preference */}
        <div>
          <label className="block text-sm font-medium text-light mb-2">
            Preferred Quality
          </label>
          <select
            value={options.preferredQuality}
            onChange={(e) => updateOptions({ preferredQuality: e.target.value })}
            className="w-full bg-light/5 border border-light/10 rounded-lg px-3 py-2 text-light"
          >
            <option value="4K">4K</option>
            <option value="1080p">1080p</option>
            <option value="720p">720p</option>
            <option value="480p">480p</option>
          </select>
        </div>

        {/* Autoplay Options */}
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options.autoPlay}
              onChange={(e) => updateOptions({ autoPlay: e.target.checked })}
              className="w-4 h-4 text-primary bg-light/5 border-light/10 rounded focus:ring-primary"
            />
            <span className="text-light">Auto-play videos</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options.autoNext}
              onChange={(e) => updateOptions({ autoNext: e.target.checked })}
              className="w-4 h-4 text-primary bg-light/5 border-light/10 rounded focus:ring-primary"
            />
            <span className="text-light">Auto-play next episode</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default StreamingOptions;