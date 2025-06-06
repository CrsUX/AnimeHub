import React, { useEffect, useRef, useState } from 'react';
import Plyr from 'plyr';
import { TorrentioAddonService } from '../../services/streaming/TorrentioAddonService';
import { AlertCircle } from 'lucide-react';
import 'plyr/dist/plyr.css';

interface PlyrPlayerProps {
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

const PlyrPlayer: React.FC<PlyrPlayerProps> = ({
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
  const playerRef = useRef<Plyr>();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializePlayer = async () => {
      if (!videoRef.current || isInitialized) return;

      try {
        // Initialize Torrentio addon first
        const torrentio = TorrentioAddonService.getInstance();
        await torrentio.initialize();

        // Create Plyr instance with HLS support
        playerRef.current = new Plyr(videoRef.current, {
          title,
          keyboard: { focused: true, global: true },
          tooltips: { controls: true, seek: true },
          captions: { active: true, language: 'auto', update: true },
          quality: {
            default: 1080,
            options: [2160, 1440, 1080, 720, 480],
            forced: true,
            onChange: (quality) => onQualityChange?.(quality.toString()),
          },
          settings: ['captions', 'quality', 'speed', 'loop'],
          controls: [
            'play-large',
            'play',
            'progress',
            'current-time',
            'duration',
            'mute',
            'volume',
            'captions',
            'settings',
            'pip',
            'airplay',
            'fullscreen'
          ]
        });

        const player = playerRef.current;
        
        // Setup event listeners
        player.on('ready', () => {
          setIsInitialized(true);
          onReady?.();
        });

        player.on('loadeddata', () => {
          setIsLoading(false);
          if (autoPlay) {
            player.play().catch(console.error);
          }
        });

        player.on('play', () => onPlay?.());
        player.on('pause', () => onPause?.());
        player.on('ended', () => onEnded?.());
        player.on('timeupdate', () => onTimeUpdate?.(player.currentTime));
        player.on('error', (error) => {
          const message = error.message || 'Failed to play video';
          setError(message);
          onError?.(new Error(message));
        });

      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to initialize player';
        setError(message);
        onError?.(new Error(message));
      }
    };

    initializePlayer();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      setIsInitialized(false);
      setIsLoading(true);
      setError(null);
    };
  }, []);

  useEffect(() => {
    const updateSource = async () => {
      if (!playerRef.current || !url || !isInitialized) return;

      try {
        setIsLoading(true);
        setError(null);

        // Resolve stream URL through Torrentio
        const resolvedUrl = await TorrentioAddonService.getInstance().resolveStreamUrl(url);
        
        playerRef.current.source = {
          type: 'video',
          title,
          sources: [{
            src: resolvedUrl,
            type: resolvedUrl.includes('.m3u8') ? 'application/x-mpegURL' : 'video/mp4',
            size: 1080
          }]
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load video';
        setError(message);
        onError?.(new Error(message));
      }
    };

    updateSource();
  }, [url, isInitialized]);

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
    <div className="relative aspect-video bg-black">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-light/20 border-t-primary rounded-full animate-spin" />
        </div>
      )}
      <video
        ref={videoRef}
        className="w-full h-full"
        crossOrigin="anonymous"
        playsInline
      >
        <source src={url} type="video/mp4" />
      </video>
    </div>
  );
};

export default PlyrPlayer;