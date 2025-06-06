const JIKAN_API = 'https://api.jikan.moe/v4';

export interface AniListAnime {
  id: number;
  title: {
    romaji: string;
    english: string;
  };
  description: string;
  coverImage: {
    large: string;
  };
  bannerImage: string;
  episodes: number;
  status: string;
  seasonYear: number;
  averageScore: number;
  nextAiringEpisode: {
    episode: number;
    timeUntilAiring: number;
  } | null;
}

const mapJikanToAniList = (anime: any, index: number): AniListAnime => ({
  // Combine MAL ID with index to ensure uniqueness
  id: parseInt(`${anime.mal_id}${index}`, 10),
  title: {
    romaji: anime.title,
    english: anime.title_english || anime.title,
  },
  description: anime.synopsis || '',
  coverImage: {
    large: anime.images.jpg.large_image_url,
  },
  bannerImage: anime.trailer?.images?.maximum_image_url || anime.images.jpg.large_image_url,
  episodes: anime.episodes || 0,
  status: anime.status,
  seasonYear: anime.year || new Date().getFullYear(),
  averageScore: (anime.score || 0) * 10,
  nextAiringEpisode: null,
});

export const searchAnime = async (search: string, page = 1) => {
  const response = await fetch(`${JIKAN_API}/anime?q=${search}&page=${page}&limit=12`);
  const data = await response.json();
  
  return {
    pageInfo: {
      total: data.pagination.items.total,
      currentPage: data.pagination.current_page,
      hasNextPage: data.pagination.has_next_page,
      perPage: 12,
    },
    media: data.data.map(mapJikanToAniList),
  };
};

export const getPopularAnime = async (page = 1) => {
  const response = await fetch(`${JIKAN_API}/top/anime?page=${page}&limit=12`);
  const data = await response.json();
  
  return {
    pageInfo: {
      total: data.pagination.items.total,
      currentPage: data.pagination.current_page,
      hasNextPage: data.pagination.has_next_page,
      perPage: 12,
    },
    media: data.data.map(mapJikanToAniList),
  };
};

export const getTrendingAnime = async (page = 1) => {
  const response = await fetch(`${JIKAN_API}/anime?order_by=popularity&page=${page}&limit=12`);
  const data = await response.json();
  
  return {
    pageInfo: {
      total: data.pagination.items.total,
      currentPage: data.pagination.current_page,
      hasNextPage: data.pagination.has_next_page,
      perPage: 12,
    },
    media: data.data.map(mapJikanToAniList),
  };
};

export const getLatestAnime = async (page = 1) => {
  const response = await fetch(`${JIKAN_API}/seasons/now?page=${page}&limit=12`);
  const data = await response.json();
  
  return {
    pageInfo: {
      total: data.pagination.items.total,
      currentPage: data.pagination.current_page,
      hasNextPage: data.pagination.has_next_page,
      perPage: 12,
    },
    media: data.data.map(mapJikanToAniList),
  };
};