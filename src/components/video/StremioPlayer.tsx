import React, { useEffect, useRef, useState } from 'react';
import { StremioClient } from '../../services/stremio/StremioClient';
import { AlertCircle } from 'lucide-react';
import { STREMIO_CONFIG } from '../../config/stremio';
import Controls from './Controls';

interface StremioPlayerProps {
  url: string;
  title?: string;
  autoPlay?: boolean;
  onReady?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (time: number) => void;
  onQualityChange?: (quality: string) => void;
  onError?: (error: Error) => void;
}

const StremioPlayer: React.FC<StremioPlayerProps> = ({
  url,
  title,
  autoPlay = true,
  onReady,
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  onQualityChange,
  onError,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    const initializePlayer = async () => {
      try {
        const stremio = StremioClient.getInstance();
        await stremio.initialize();
        setIsInitialized(true);
        onReady?.();
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to initialize player';
        setError(message);
        onError?.(new Error(message));
      }
    };

    initializePlayer();
  }, []);

  useEffect(() => {
    if (!videoRef.current || !url || !isInitialized) return;

    const loadStream = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const stremio = StremioClient.getInstance();
        // Stream handling will be implemented here
        
        if (autoPlay) {
          videoRef.current?.play().catch(console.error);
        }
        
        setIsLoading(false);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load video';
        setError(message);
        onError?.(new Error(message));
      }
    };

    loadStream();
  }, [url, isInitialized]);

  const handlePlay = () => {
    videoRef.current?.play();
    setIsPlaying(true);
    onPlay?.();
  };

  const handlePause = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
    onPause?.();
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      onTimeUpdate?.(videoRef.current.currentTime);
    }
  };

  const handleVolumeChange = (value: number) => {
    if (videoRef.current) {
      videoRef.current.volume = value;
      setVolume(value);
      setIsMuted(value === 0);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

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
    <div className="relative aspect-video bg-black group">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-light/20 border-t-primary rounded-full animate-spin" />
        </div>
      )}
      
      <video
        ref={videoRef}
        className="w-full h-full"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
        onEnded={onEnded}
        crossOrigin="anonymous"
        playsInline
      />

      <Controls
        playing={isPlaying}
        muted={isMuted}
        duration={duration}
        currentTime={currentTime}
        volume={volume}
        onPlayPause={isPlaying ? handlePause : handlePlay}
        onMute={handleMute}
        onVolumeChange={handleVolumeChange}
        onSeek={handleSeek}
      />
    </div>
  );
};

export default StremioPlayer;