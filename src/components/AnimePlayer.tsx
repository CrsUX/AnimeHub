import React from 'react';
import ReactPlayer from 'react-player';
import { useAnimeStore } from '../store/animeStore';

const AnimePlayer: React.FC = () => {
  const { currentEpisode, isPlaying, setIsPlaying } = useAnimeStore();

  if (!currentEpisode) return null;

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      <ReactPlayer
        url={currentEpisode.url}
        width="100%"
        height="100%"
        playing={isPlaying}
        controls
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default AnimePlayer;