import React from 'react';
import { ExternalLink } from 'lucide-react';
import { animeSources } from '../data/animeSources';

const SourceList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {animeSources.map((source) => (
        <a
          key={source.name}
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          {source.image && (
            <img
              src={source.image}
              alt={source.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{source.name}</h3>
          </div>
          <ExternalLink className="w-5 h-5 text-gray-400" />
        </a>
      ))}
    </div>
  );
};

export default SourceList;