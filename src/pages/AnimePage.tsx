import React from 'react';
import { useAnimeStore } from '../store/animeStore';
import AnimeDetails from '../components/anime/AnimeDetails';
import Comments from '../components/anime/Comments';
import StreamingPlayer from '../components/streaming/StreamingPlayer';
import StreamingSidebar from '../components/streaming/StreamingSidebar';

const AnimePage: React.FC = () => {
  const { currentAnime } = useAnimeStore();

  if (!currentAnime) return null;

  return (
    <main className="pt-16">
      {/* Video Player Section */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <StreamingPlayer />
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <AnimeDetails anime={currentAnime} />
            <Comments />
          </div>

          {/* Sidebar */}
          <div>
            <StreamingSidebar 
              title={currentAnime.title.english || currentAnime.title.romaji}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AnimePage;