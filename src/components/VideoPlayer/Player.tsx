import React, { useState, useRef, useCallback } from 'react';
import ReactPlayer from 'react-player';
import Controls from './Controls';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface PlayerProps {
  url: string;
  title: string;
  onNext?: () => void;
  onPrevious?: () => void;
}

const Player: React.FC<PlayerProps> = ({ url, title, onNext, onPrevious }) => {
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useLocalStorage('player-volume', 1);
  const [muted, setMuted] = useLocalStorage('player-muted', false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePlayPause = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  const handleMute = useCallback(() => {
    setMuted(prev => !prev);
  }, []);

  const handleVolumeChange = useCallback((value: number) => {
    setVolume(value);
    setMuted(false);
  }, []);

  const handleSeek = useCallback((time: number) => {
    playerRef.current?.seekTo(time);
  }, []);

  const handleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  useKeyboardShortcuts({
    ' ': handlePlayPause,
    'm': handleMute,
    'ArrowLeft': () => handleSeek(currentTime - 10),
    'ArrowRight': () => handleSeek(currentTime + 10),
    'f': handleFullscreen,
  });

  return (
    <div ref={containerRef} className="relative aspect-video bg-black group">
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        playing={playing}
        volume={volume}
        muted={muted}
        onDuration={setDuration}
        onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
        progressInterval={100}
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

export default Player;