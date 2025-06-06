import React from 'react';
import { useStreamingStore } from '../../store/streamingStore';
import { Save } from 'lucide-react';

const StreamingSettings: React.FC = () => {
  const { options, updateOptions } = useStreamingStore();
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const updates = {
        preferredQuality: formData.get('preferredQuality') as string,
        autoPlay: formData.get('autoPlay') === 'on',
        autoNext: formData.get('autoNext') === 'on',
        maxCacheSize: Number(formData.get('maxCacheSize')),
        bufferSize: Number(formData.get('bufferSize')),
        retryAttempts: Number(formData.get('retryAttempts')),
      };
      
      await updateOptions(updates);
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Playback Settings */}
      <div className="p-4 bg-light/5 rounded-lg">
        <h3 className="text-lg font-medium text-light mb-4">Playback Settings</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-light mb-1">
              Default Quality
            </label>
            <select
              name="preferredQuality"
              defaultValue={options.preferredQuality}
              className="w-full bg-light/5 border border-light/10 rounded-lg px-3 py-2 text-light"
            >
              <option value="4K">4K</option>
              <option value="1080p">1080p</option>
              <option value="720p">720p</option>
              <option value="480p">480p</option>
            </select>
          </div>

          <div className="flex items-center gap-8">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="autoPlay"
                defaultChecked={options.autoPlay}
                className="w-4 h-4 rounded border-light/10 text-primary focus:ring-primary/50"
              />
              <span className="text-light">Auto-play videos</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="autoNext"
                defaultChecked={options.autoNext}
                className="w-4 h-4 rounded border-light/10 text-primary focus:ring-primary/50"
              />
              <span className="text-light">Auto-play next episode</span>
            </label>
          </div>
        </div>
      </div>

      {/* Cache Settings */}
      <div className="p-4 bg-light/5 rounded-lg">
        <h3 className="text-lg font-medium text-light mb-4">Cache Settings</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-light mb-1">
              Max Cache Size (MB)
            </label>
            <input
              type="number"
              name="maxCacheSize"
              defaultValue={options.maxCacheSize || 1024}
              min={100}
              max={5000}
              className="w-full bg-light/5 border border-light/10 rounded-lg px-3 py-2 text-light"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-light mb-1">
              Buffer Size (seconds)
            </label>
            <input
              type="number"
              name="bufferSize"
              defaultValue={options.bufferSize || 30}
              min={10}
              max={120}
              className="w-full bg-light/5 border border-light/10 rounded-lg px-3 py-2 text-light"
            />
          </div>
        </div>
      </div>

      {/* Error Handling */}
      <div className="p-4 bg-light/5 rounded-lg">
        <h3 className="text-lg font-medium text-light mb-4">Error Handling</h3>
        
        <div>
          <label className="block text-sm font-medium text-light mb-1">
            Retry Attempts
          </label>
          <input
            type="number"
            name="retryAttempts"
            defaultValue={options.retryAttempts || 3}
            min={1}
            max={10}
            className="w-full bg-light/5 border border-light/10 rounded-lg px-3 py-2 text-light"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="px-4 py-2 bg-primary text-light rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default StreamingSettings;