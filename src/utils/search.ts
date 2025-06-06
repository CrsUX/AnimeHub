import { AniListAnime, searchAnime } from './anilist';

export async function performSearch(query: string, page = 1) {
  if (!query.trim()) {
    throw new Error('Search query is required');
  }

  try {
    const results = await searchAnime(query, page);
    return results;
  } catch (error) {
    console.error('Search failed:', error);
    throw new Error('Failed to search anime');
  }
}