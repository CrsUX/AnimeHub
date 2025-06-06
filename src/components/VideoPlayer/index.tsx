import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import Controls from './Controls';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface VideoPlayerProps {
  url: string;
  title: string;
  autoPlay?: boolean;
  onNext?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  title,
  autoPlay = true,
  onNext
}) => {
  const [playing, setPlaying] = useState(autoPlay);
  const [volume, setVolume] = useLocalStorage('player-volume', 1);
  const [muted, setMuted] = useLocalStorage('player-muted', false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const playerRef = useRef<ReactPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
  }, [url]);

  const handlePlayPause = () => setPlaying(prev => !prev);
  const handleMute = () => setMuted(prev => !prev);
  const handleVolumeChange = (value: number) => {
    setVolume(value);
    setMuted(false);
  };
  const handleSeek = (time: number) => {
    playerRef.current?.seekTo(time);
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
        <p>{error}</p>
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
      
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        playing={playing}
        volume={volume}
        muted={muted}
        onReady={() => setIsLoading(false)}
        onError={() => setError('Failed to load video')}
        onDuration={setDuration}
        onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
        onEnded={onNext}
        config={{
          file: {
            forceHLS: true,
            attributes: {
              crossOrigin: "anonymous",
            }
          }
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