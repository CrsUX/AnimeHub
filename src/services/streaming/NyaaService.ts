import { StreamingSource } from '../../types/streaming';

export class NyaaService {
  private baseUrl = 'https://sukebei.nyaa.si';

  async searchAnime(title: string): Promise<StreamingSource[]> {
    // We'll need to implement a backend proxy to handle CORS and parsing
    // This is a placeholder for the actual implementation
    const query = encodeURIComponent(title);
    const response = await fetch(`/api/nyaa/search?q=${query}`);
    
    if (!response.ok) {
      throw new Error('Failed to search Nyaa');
    }

    const data = await response.json();
    return this.parseResults(data);
  }

  private parseResults(results: any[]): StreamingSource[] {
    return results.map(result => ({
      id: result.id,
      title: result.title,
      quality: this.detectQuality(result.title),
      size: result.filesize,
      seeds: result.seeders,
      url: result.magnet,
      provider: 'nyaa' as const
    }));
  }

  private detectQuality(title: string): string {
    if (title.includes('2160p') || title.includes('4K')) return '4K';
    if (title.includes('1080p')) return '1080p';
    if (title.includes('720p')) return '720p';
    if (title.includes('480p')) return '480p';
    return 'Unknown';
  }

  private isValidRelease(title: string): boolean {
    const keywords = ['BD', 'BluRay', 'WEB-DL', 'HEVC', 'x264', 'x265'];
    return keywords.some(keyword => title.includes(keyword));
  }
}