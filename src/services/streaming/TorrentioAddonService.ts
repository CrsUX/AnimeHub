import { STREAMING_CONFIG } from '../../config/streaming';

export class TorrentioAddonService {
  private static instance: TorrentioAddonService;
  private addonInitialized = false;
  private manifest: any = null;

  private constructor() {}

  static getInstance(): TorrentioAddonService {
    if (!TorrentioAddonService.instance) {
      TorrentioAddonService.instance = new TorrentioAddonService();
    }
    return TorrentioAddonService.instance;
  }

  async initialize(): Promise<void> {
    if (this.addonInitialized) {
      return;
    }

    try {
      // Fetch Torrentio manifest
      const response = await fetch(STREAMING_CONFIG.TORRENTIO_ADDON_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch Torrentio manifest');
      }

      this.manifest = await response.json();
      this.addonInitialized = true;
      console.log('Torrentio addon initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Torrentio addon:', error);
      throw error;
    }
  }

  async resolveStreamUrl(url: string): Promise<string> {
    if (!this.addonInitialized) {
      await this.initialize();
    }

    try {
      // Check if URL is already a direct stream
      if (url.startsWith('http') && (url.includes('.mp4') || url.includes('.m3u8'))) {
        return url;
      }

      // Resolve magnet/torrent URL to direct stream
      const response = await fetch(`${STREAMING_CONFIG.TORRENTIO_API_URL}/resolve/${encodeURIComponent(url)}`);
      if (!response.ok) {
        throw new Error('Failed to resolve stream URL');
      }

      const data = await response.json();
      if (!data.stream_url) {
        throw new Error('No stream URL found');
      }

      return data.stream_url;
    } catch (error) {
      console.error('Failed to resolve stream URL:', error);
      throw error;
    }
  }

  getManifest() {
    return this.manifest;
  }

  isInitialized() {
    return this.addonInitialized;
  }
}