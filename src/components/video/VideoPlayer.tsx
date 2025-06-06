import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import Controls from './Controls';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface VideoPlayerProps {
  url: string;
  title?: string;
  autoPlay?: boolean;
  onReady?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (time: number) => void;
  onError?: (error: Error) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  title,
  autoPlay = true,
  onReady,
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  onError,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(autoPlay);
  const [volume, setVolume] = useLocalStorage('player-volume', 1);
  const [muted, setMuted] = useLocalStorage('player-muted', false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    if (videoRef.current) {
      videoRef.current.src = url;
      videoRef.current.load();
    }
  }, [url]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
        onPause?.();
      } else {
        videoRef.current.play().catch(console.error);
        onPlay?.();
      }
      setPlaying(!playing);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const handleVolumeChange = (value: number) => {
    if (videoRef.current) {
      videoRef.current.volume = value;
      setVolume(value);
      setMuted(value === 0);
    }
  };

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      onTimeUpdate?.(time);
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useKeyboardShortcuts({
    ' ': handlePlayPause,
    'm': handleMute,
    'ArrowLeft': () => handleSeek(currentTime - 10),
    'ArrowRight': () => handleSeek(currentTime + 10),
    'f': handleFullscreen,
  });

  if (error) {
    return (
      <div className="aspect-video bg-black flex items-center justify-center text-light/70">
        <div className="flex flex-col items-center gap-2">
          <AlertCircle className="w-8 h-8 text-red-500" />
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative aspect-video bg-black group">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-light/20 border-t-primary rounded-full animate-spin" />
        </div>
      )}
      
      <video
        ref={videoRef}
        className="w-full h-full"
        title={title}
        autoPlay={autoPlay}
        playsInline
        onLoadedMetadata={() => {
          setIsLoading(false);
          setDuration(videoRef.current?.duration || 0);
          onReady?.();
        }}
        onTimeUpdate={() => {
          setCurrentTime(videoRef.current?.currentTime || 0);
          onTimeUpdate?.(videoRef.current?.currentTime || 0);
        }}
        onEnded={() => {
          setPlaying(false);
          onEnded?.();
        }}
        onError={(e) => {
          const message = e.currentTarget.error?.message || 'Failed to load video';
          setError(message);
          onError?.(new Error(message));
        }}
      />
      
      <Controls
        playing={playing}
        muted={muted}
        duration={duration}
        currentTime={currentTime}
        volume={volume}
        onPlayPause={handlePlayPause}
        onMute={handleMute}
        onVolumeChange={handleVolumeChange}
        onSeek={handleSeek}
        onFullscreen={handleFullscreen}
      />
    </div>
  );
};

export default VideoPlayer;