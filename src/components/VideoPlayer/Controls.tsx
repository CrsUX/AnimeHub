import React from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward, SkipBack } from 'lucide-react';
import { formatTime } from '../../utils/time';

interface ControlsProps {
  playing: boolean;
  muted: boolean;
  duration: number;
  currentTime: number;
  volume: number;
  onPlayPause: () => void;
  onMute: () => void;
  onVolumeChange: (value: number) => void;
  onSeek: (time: number) => void;
  onFullscreen: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  playing,
  muted,
  duration,
  currentTime,
  volume,
  onPlayPause,
  onMute,
  onVolumeChange,
  onSeek,
  onFullscreen,
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
      {/* Progress bar */}
      <div className="relative group">
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={(e) => onSeek(Number(e.target.value))}
          className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer"
          style={{
            backgroundSize: `${(currentTime / duration) * 100}% 100%`,
            backgroundImage: 'linear-gradient(#fff, #fff)',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-4">
          {/* Play/Pause */}
          <button onClick={onPlayPause} className="text-white hover:text-purple-400">
            {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>

          {/* Skip buttons */}
          <button onClick={() => onSeek(currentTime - 10)} className="text-white hover:text-purple-400">
            <SkipBack className="w-5 h-5" />
          </button>
          <button onClick={() => onSeek(currentTime + 10)} className="text-white hover:text-purple-400">
            <SkipForward className="w-5 h-5" />
          </button>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <button onClick={onMute} className="text-white hover:text-purple-400">
              {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={(e) => onVolumeChange(Number(e.target.value))}
              className="w-20 h-1 bg-white/30 rounded-full appearance-none cursor-pointer"
            />
          </div>

          {/* Time */}
          <div className="text-white text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          <button onClick={onFullscreen} className="text-white hover:text-purple-400">
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;