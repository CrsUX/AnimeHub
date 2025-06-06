import { TorrentioService } from './TorrentioService';
import { StreamingSource } from '../../types/streaming';
import { STREAMING_CONFIG } from '../../config/streaming';

export class StreamingManager {
  private torrentio: TorrentioService;
  private retryCount: number;

  constructor() {
    this.torrentio = new TorrentioService();
    this.retryCount = 0;
  }

  async searchSources(title: string): Promise<StreamingSource[]> {
    if (!title.trim()) {
      return [];
    }

    try {
      const sources = await this.searchWithRetry(title);
      return this.sortSources(sources);
    } catch (error) {
      console.error('Failed to fetch sources:', error);
      return [];
    }
  }

  private async searchWithRetry(title: string): Promise<StreamingSource[]> {
    try {
      const sources = await this.torrentio.searchAnime(title);
      if (sources.length) {
        return sources;
      }
      
      // Retry with simplified title if no results
      if (this.retryCount < STREAMING_CONFIG.TORRENTIO.RETRY_ATTEMPTS) {
        this.retryCount++;
        const simplifiedTitle = this.simplifyTitle(title);
        if (simplifiedTitle !== title) {
          await new Promise(resolve => 
            setTimeout(resolve, STREAMING_CONFIG.TORRENTIO.RETRY_DELAY)
          );
          return this.searchWithRetry(simplifiedTitle);
        }
      }
      
      return [];
    } catch (error) {
      if (this.retryCount < STREAMING_CONFIG.TORRENTIO.RETRY_ATTEMPTS) {
        this.retryCount++;
        await new Promise(resolve => 
          setTimeout(resolve, STREAMING_CONFIG.TORRENTIO.RETRY_DELAY)
        );
        return this.searchWithRetry(title);
      }
      throw error;
    }
  }

  private simplifyTitle(title: string): string {
    // Remove common suffixes and special characters
    return title
      .replace(/(season \d+|part \d+|\(\d{4}\))/gi, '')
      .replace(/[^\w\s]/g, '')
      .trim();
  }

  private sortSources(sources: StreamingSource[]): StreamingSource[] {
    return sources.sort((a, b) => {
      // First by quality
      const qualityOrder = { '4K': 4, '1080p': 3, '720p': 2, '480p': 1 };
      const qualityDiff = (qualityOrder[b.quality] || 0) - (qualityOrder[a.quality] || 0);
      if (qualityDiff !== 0) return qualityDiff;

      // Then by seeds
      return b.seeds - a.seeds;
    });
  }
}