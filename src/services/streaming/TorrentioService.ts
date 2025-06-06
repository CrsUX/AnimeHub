import { StreamingSource } from '../../types/streaming';
import { STREAMING_CONFIG } from '../../config/streaming';

export class TorrentioService {
  private baseUrl: string;
  private addonUrl: string;

  constructor() {
    this.baseUrl = STREAMING_CONFIG.TORRENTIO_API_URL;
    this.addonUrl = STREAMING_CONFIG.TORRENTIO_ADDON_URL;
  }

  async searchAnime(title: string): Promise<StreamingSource[]> {
    try {
      // Format query for anime-specific search
      const query = this.formatAnimeQuery(title);
      const url = `${this.baseUrl}/${query}.json`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'AnimeHub/1.0'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.streams?.length) {
        console.log('No streams found for:', title);
        return [];
      }

      return this.processStreams(data.streams);
    } catch (error) {
      console.error('Torrentio search failed:', error);
      return []; // Return empty array instead of throwing
    }
  }

  private formatAnimeQuery(title: string): string {
    // Remove special characters and format for URL
    return encodeURIComponent(
      title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim()
    );
  }

  private processStreams(streams: any[]): StreamingSource[] {
    return streams
      .filter(stream => this.isValidAnimeStream(stream))
      .map(stream => ({
        id: `torrentio-${stream.infoHash}`,
        title: this.cleanTitle(stream.title),
        quality: this.detectQuality(stream.title),
        size: this.parseSize(stream.filesize),
        seeds: stream.seeders || 0,
        url: stream.url,
        provider: 'torrentio'
      }))
      .filter(source => source.seeds >= STREAMING_CONFIG.TORRENTIO.MIN_SEEDS)
      .sort((a, b) => b.seeds - a.seeds)
      .slice(0, STREAMING_CONFIG.TORRENTIO.MAX_RESULTS);
  }

  private isValidAnimeStream(stream: any): boolean {
    if (!stream?.url || !stream?.title) return false;

    const title = stream.title.toLowerCase();
    return STREAMING_CONFIG.TORRENTIO.VALID_KEYWORDS
      .some(kw => title.includes(kw.toLowerCase()));
  }

  private cleanTitle(title: string): string {
    return title
      .replace(/\[.*?\]/g, '')
      .replace(/\.mkv|\.mp4/g, '')
      .trim();
  }

  private parseSize(size: string | number | undefined): number {
    if (typeof size === 'number') return size;
    if (!size) return 0;

    const match = size.toString().match(/(\d+(\.\d+)?)\s*(GB|MB|KB)/i);
    if (!match) return 0;

    const value = parseFloat(match[1]);
    const unit = match[3].toUpperCase();
    
    switch (unit) {
      case 'GB': return value * 1024 * 1024 * 1024;
      case 'MB': return value * 1024 * 1024;
      case 'KB': return value * 1024;
      default: return 0;
    }
  }

  private detectQuality(title: string): string {
    if (title.includes('2160p') || title.includes('4K')) return '4K';
    if (title.includes('1080p')) return '1080p';
    if (title.includes('720p')) return '720p';
    if (title.includes('480p')) return '480p';
    return '1080p';
  }
}