import React, { useEffect, useRef, useState } from 'react';
import Plyr from 'plyr';
import Hls from 'hls.js';
import { TorrentioAddonService } from '../../services/streaming/TorrentioAddonService';
import { AlertCircle } from 'lucide-react';
import { STREAMING_CONFIG } from '../../config/streaming';
import 'plyr/dist/plyr.css';

interface EnhancedPlayerProps {
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

const EnhancedPlayer: React.FC<EnhancedPlayerProps> = ({
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
  const hlsRef = useRef<Hls>();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializePlayer = async () => {
      if (!videoRef.current || isInitialized) return;

      try {
        // Initialize Torrentio addon
        const torrentio = TorrentioAddonService.getInstance();
        await torrentio.initialize();

        // Create Plyr instance
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
          const message = error instanceof Error ? error.message : 'Failed to play video';
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
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
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
        
        // Handle HLS streams
        if (resolvedUrl.includes('.m3u8')) {
          if (Hls.isSupported()) {
            if (hlsRef.current) {
              hlsRef.current.destroy();
            }

            const hls = new Hls({
              maxLoadingDelay: 4,
              maxBufferLength: 30,
              liveDurationInfinity: true,
              backBufferLength: 90
            });

            hlsRef.current = hls;
            hls.loadSource(resolvedUrl);
            hls.attachMedia(videoRef.current!);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              if (autoPlay) {
                videoRef.current?.play().catch(console.error);
              }
            });

            hls.on(Hls.Events.ERROR, (_, data) => {
              if (data.fatal) {
                setError('Failed to load stream');
                onError?.(new Error('Stream loading failed'));
              }
            });
          }
          // For browsers with native HLS support
          else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = resolvedUrl;
          }
        } 
        // Handle regular MP4 streams
        else {
          videoRef.current.src = resolvedUrl;
        }

        setIsLoading(false);
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
      />
    </div>
  );
};

export default EnhancedPlayer;