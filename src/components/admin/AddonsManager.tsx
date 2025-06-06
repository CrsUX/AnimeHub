import React, { useState } from 'react';
import { Plus, Trash2, ExternalLink } from 'lucide-react';
import { useStreamingStore } from '../../store/streamingStore';

interface Addon {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
}

const AddonsManager: React.FC = () => {
  const [newAddonUrl, setNewAddonUrl] = useState('');
  const { addons = [], addAddon, removeAddon, toggleAddon } = useStreamingStore();

  const handleAddAddon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddonUrl.trim()) return;

    try {
      await addAddon(newAddonUrl);
      setNewAddonUrl('');
    } catch (error) {
      console.error('Failed to add addon:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Add-on */}
      <form onSubmit={handleAddAddon} className="flex gap-2">
        <input
          type="url"
          value={newAddonUrl}
          onChange={(e) => setNewAddonUrl(e.target.value)}
          placeholder="Enter add-on manifest URL"
          className="flex-1 bg-light/5 border border-light/10 rounded-lg px-4 py-2 text-light placeholder-light/50"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-light rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </form>

      {/* Add-ons List */}
      <div className="space-y-2">
        {addons.map((addon: Addon) => (
          <div
            key={addon.id}
            className="flex items-center justify-between p-4 bg-light/5 rounded-lg"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-light">{addon.name}</h3>
                <a
                  href={addon.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p className="text-sm text-light/70 truncate">{addon.url}</p>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={addon.enabled}
                  onChange={() => toggleAddon(addon.id)}
                  className="w-4 h-4 rounded border-light/10 text-primary focus:ring-primary/50"
                />
                <span className="text-sm text-light/70">Enabled</span>
              </label>

              <button
                onClick={() => removeAddon(addon.id)}
                className="p-2 text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddonsManager;