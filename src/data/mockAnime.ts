import { Anime } from '../types/anime';

export const mockAnime: Anime[] = [
  {
    id: '1',
    title: 'One Piece',
    description: 'Follow Monkey D. Luffy and his pirate crew in their search for the ultimate treasure, the One Piece.',
    coverImage: 'https://images.unsplash.com/photo-1541562232579-512a21360020',
    episodes: [
      {
        id: 'ep1',
        title: 'Episode 1: I\'m Luffy! The Man Who\'s Gonna Be King of the Pirates!',
        number: 1,
        url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
        thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477'
      },
      {
        id: 'ep2',
        title: 'Episode 2: Enter the Great Swordsman! Pirate Hunter Roronoa Zoro!',
        number: 2,
        url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
        thumbnail: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06'
      }
    ]
  }
];