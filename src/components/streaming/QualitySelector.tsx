import React from 'react';
import { Settings } from 'lucide-react';
import type { StreamingQuality } from '../../types/streaming';

interface QualitySelectorProps {
  qualities: StreamingQuality[];
  currentQuality: string;
  onQualityChange: (quality: string) => void;
}

const QualitySelector: React.FC<QualitySelectorProps> = ({
  qualities,
  currentQuality,
  onQualityChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Settings className="w-4 h-4 text-light/70" />
      <select
        value={currentQuality}
        onChange={(e) => onQualityChange(e.target.value)}
        className="bg-light/5 border border-light/10 rounded-lg px-2 py-1 text-sm text-light"
      >
        {qualities.map((quality) => (
          <option key={quality.value} value={quality.value}>
            {quality.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default QualitySelector;