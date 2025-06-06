import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useVideoStore } from '../store/videoStore';
import { mockAds } from '../data/mockData';
import { X } from 'lucide-react';

const VideoPlayer: React.FC = () => {
  const { currentVideo, isPlaying, currentAd, isAdPlaying, setIsPlaying, setCurrentAd, setIsAdPlaying } = useVideoStore();
  const [adSkipCounter, setAdSkipCounter] = useState<number>(0);

  useEffect(() => {
    if (!currentAd && currentVideo) {
      const randomAd = mockAds[Math.floor(Math.random() * mockAds.length)];
      setCurrentAd(randomAd);
      setIsAdPlaying(true);
      setIsPlaying(false);
    }
  }, [currentVideo]);

  useEffect(() => {
    let timer: number;
    if (isAdPlaying && currentAd) {
      timer = window.setInterval(() => {
        setAdSkipCounter((prev) => {
          if (prev < currentAd.skipAfter) return prev + 1;
          return prev;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isAdPlaying, currentAd]);

  const handleAdEnded = () => {
    setCurrentAd(null);
    setIsAdPlaying(false);
    setIsPlaying(true);
  };

  const handleSkipAd = () => {
    if (adSkipCounter >= (currentAd?.skipAfter || 0)) {
      handleAdEnded();
    }
  };

  if (!currentVideo) return null;

  return (
    <div className="relative w-full aspect-video bg-black">
      {isAdPlaying && currentAd ? (
        <>
          <ReactPlayer
            url={currentAd.videoUrl}
            width="100%"
            height="100%"
            playing={true}
            onEnded={handleAdEnded}
          />
          <div className="absolute bottom-4 right-4 bg-black/80 text-white p-2 rounded-lg">
            {adSkipCounter >= currentAd.skipAfter ? (
              <button
                onClick={handleSkipAd}
                className="flex items-center gap-2 text-sm font-medium hover:text-gray-300"
              >
                Skip Ad <X size={16} />
              </button>
            ) : (
              <span className="text-sm">
                Skip ad in {currentAd.skipAfter - adSkipCounter}s
              </span>
            )}
          </div>
        </>
      ) : (
        <ReactPlayer
          url={currentVideo.videoUrl}
          width="100%"
          height="100%"
          playing={isPlaying}
          controls
        />
      )}
    </div>
  );
};

export default VideoPlayer;