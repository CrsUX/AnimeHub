import React from 'react';

interface SubtitleTrack {
  label: string;
  srclang: string;
  src: string;
}

interface SubtitleTrackProps {
  tracks: SubtitleTrack[];
  currentTrack: string | null;
  onTrackChange: (track: string | null) => void;
}

const SubtitleTrack: React.FC<SubtitleTrackProps> = ({
  tracks,
  currentTrack,
  onTrackChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <select
        value={currentTrack || ''}
        onChange={(e) => onTrackChange(e.target.value || null)}
        className="bg-light/5 border border-light/10 rounded-lg px-2 py-1 text-sm text-light"
      >
        <option value="">Off</option>
        {tracks.map((track) => (
          <option key={track.srclang} value={track.srclang}>
            {track.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SubtitleTrack;