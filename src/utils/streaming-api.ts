import { mockEpisodes } from '../data/mockStreaming';

export interface StreamingResult {
  id: string;
  title: string;
  episode: number;
  url: string;
  quality?: string;
}

function findBestMatch(query: string): string | null {
  const titles = Object.keys(mockEpisodes);
  return titles.find(title => 
    title.toLowerCase().includes(query.toLowerCase()) ||
    query.toLowerCase().includes(title.toLowerCase())
  ) || null;
}

export async function fetchStreamingResults(source: string, query: string): Promise<StreamingResult[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const matchedTitle = findBestMatch(query);
  if (!matchedTitle) return [];

  return mockEpisodes[matchedTitle].map(episode => ({
    id: episode.id,
    title: episode.title,
    episode: episode.number,
    url: episode.url,
    quality: episode.quality
  }));
}