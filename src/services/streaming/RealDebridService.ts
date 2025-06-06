import { StreamingSource } from '../../types/streaming';
import { STREAMING_CONFIG } from '../../config/streaming';
import { RealDebridAuth } from '../auth/RealDebridAuth';

export class RealDebridService {
  private auth: RealDebridAuth;
  private baseUrl: string;

  constructor() {
    this.auth = RealDebridAuth.getInstance();
    this.baseUrl = STREAMING_CONFIG.REALDEBRID.API_URL;
  }

  async addMagnet(magnetLink: string): Promise<string> {
    const accessToken = this.auth.getAccessToken();
    if (!accessToken) {
      await this.auth.authorize();
      throw new Error('Authentication required');
    }

    const response = await fetch(`${this.baseUrl}/torrents/addMagnet`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `magnet=${encodeURIComponent(magnetLink)}`,
    });

    if (!response.ok) {
      if (response.status === 401) {
        await this.auth.refreshAccessToken();
        return this.addMagnet(magnetLink);
      }
      throw new Error('Failed to add magnet to RealDebrid');
    }

    const data = await response.json();
    return data.id;
  }

  async getStreamingLinks(torrentId: string): Promise<StreamingSource[]> {
    const accessToken = this.auth.getAccessToken();
    if (!accessToken) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${this.baseUrl}/torrents/info/${torrentId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        await this.auth.refreshAccessToken();
        return this.getStreamingLinks(torrentId);
      }
      throw new Error('Failed to get streaming links');
    }

    const data = await response.json();
    return data.links.map((link: any, index: number) => ({
      id: `rd-${torrentId}-${index}`,
      title: link.filename,
      quality: this.detectQuality(link.filename),
      size: link.size,
      seeds: 0,
      url: link.download,
      provider: 'realdebrid'
    }));
  }

  private detectQuality(filename: string): string {
    if (filename.includes('2160p') || filename.includes('4K')) return '4K';
    if (filename.includes('1080p')) return '1080p';
    if (filename.includes('720p')) return '720p';
    if (filename.includes('480p')) return '480p';
    return '1080p';
  }
}