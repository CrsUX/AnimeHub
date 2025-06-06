import type { Video, Ad } from '../types/video';

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Beautiful Mountain Landscapes',
    description: 'Stunning views of mountain ranges from around the world.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 180,
    views: 1500,
    uploadDate: '2024-03-10',
  },
  {
    id: '2',
    title: 'Ocean Waves at Sunset',
    description: 'Relaxing ocean waves during a beautiful sunset.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 240,
    views: 2300,
    uploadDate: '2024-03-09',
  },
];

export const mockAds: Ad[] = [
  {
    id: 'ad1',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 15,
    skipAfter: 5,
  },
  {
    id: 'ad2',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 30,
    skipAfter: 10,
  },
];