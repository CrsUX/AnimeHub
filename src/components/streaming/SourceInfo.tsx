import React from 'react';
import { Info, Download } from 'lucide-react';
import type { StreamingSource } from '../../types/streaming';

interface SourceInfoProps {
  source: StreamingSource;
  compact?: boolean;
}

const SourceInfo: React.FC<SourceInfoProps> = ({ source, compact = false }) => {
  const formatSize = (bytes: number): string => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span>{formatSize(source.size)}</span>
        {source.seeds > 0 && (
          <span className="text-primary">{source.seeds}↑</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 p-2 bg-light/5 rounded-lg text-sm text-light/70">
      <div className="flex items-center gap-1">
        <Info className="w-4 h-4" />
        <span>{source.quality}</span>
      </div>
      <div className="flex items-center gap-1">
        <Download className="w-4 h-4" />
        <span>{formatSize(source.size)}</span>
      </div>
      {source.seeds > 0 && (
        <div className="text-primary">
          {source.seeds} seeds
        </div>
      )}
    </div>
  );
};

export default SourceInfo;