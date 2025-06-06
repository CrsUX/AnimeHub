export interface AnimeSource {
  name: string;
  url: string;
  image?: string;
}

export interface AnimeEpisode {
  id: string;
  title: string;
  number: number;
  url: string;
  thumbnail?: string;
}

export interface Anime {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  episodes: AnimeEpisode[];
}