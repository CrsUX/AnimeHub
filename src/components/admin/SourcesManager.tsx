import React from 'react';
import { useStreamingStore } from '../../store/streamingStore';
import { Toggle } from 'lucide-react';

const SourcesManager: React.FC = () => {
  const { sources = [], toggleSource } = useStreamingStore();

  return (
    <div className="space-y-6">
      {/* Sources List */}
      <div className="grid gap-4">
        {sources.map((source) => (
          <div
            key={source.id}
            className="p-4 bg-light/5 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-light">{source.name}</h3>
                <p className="text-sm text-light/70">{source.description}</p>
              </div>
              
              <button
                onClick={() => toggleSource(source.id)}
                className={`p-2 rounded-lg transition-colors ${
                  source.enabled
                    ? 'bg-primary/20 text-primary'
                    : 'bg-light/5 text-light/50'
                }`}
              >
                <Toggle className="w-5 h-5" />
              </button>
            </div>

            {/* Source Stats */}
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div className="p-2 bg-light/5 rounded-lg">
                <div className="text-light/70">Success Rate</div>
                <div className="text-light font-medium">
                  {source.stats?.successRate || 0}%
                </div>
              </div>
              <div className="p-2 bg-light/5 rounded-lg">
                <div className="text-light/70">Average Speed</div>
                <div className="text-light font-medium">
                  {source.stats?.avgSpeed || 0} MB/s
                </div>
              </div>
              <div className="p-2 bg-light/5 rounded-lg">
                <div className="text-light/70">Active Users</div>
                <div className="text-light font-medium">
                  {source.stats?.activeUsers || 0}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SourcesManager;