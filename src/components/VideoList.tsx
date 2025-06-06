import React from 'react';
import { mockVideos } from '../data/mockData';
import { useVideoStore } from '../store/videoStore';
import { Play } from 'lucide-react';

const VideoList: React.FC = () => {
  const { setCurrentVideo } = useVideoStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {mockVideos.map((video) => (
        <div
          key={video.id}
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition hover:scale-105"
          onClick={() => setCurrentVideo(video)}
        >
          <div className="relative">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Play className="w-12 h-12 text-white" />
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{video.description}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{video.views.toLocaleString()} views</span>
              <span>{video.uploadDate}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;