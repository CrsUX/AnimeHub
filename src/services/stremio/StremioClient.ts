import { STREMIO_CONFIG } from '../../config/stremio';

export class StremioClient {
  private static instance: StremioClient;
  private isInitialized = false;

  private constructor() {}

  static getInstance(): StremioClient {
    if (!StremioClient.instance) {
      StremioClient.instance = new StremioClient();
    }
    return StremioClient.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Initialize Stremio SDK
      await this.checkSystemRequirements();
      await this.setupStremioCore();
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize Stremio:', error);
      throw error;
    }
  }

  private async checkSystemRequirements(): Promise<void> {
    // Check memory
    if (navigator.deviceMemory && 
        navigator.deviceMemory * 1024 * 1024 * 1024 < STREMIO_CONFIG.MIN_MEMORY) {
      throw new Error('Insufficient memory');
    }

    // Check storage
    try {
      const storage = await navigator.storage.estimate();
      if (storage.quota && storage.quota < STREMIO_CONFIG.MIN_STORAGE) {
        throw new Error('Insufficient storage');
      }
    } catch (error) {
      console.warn('Storage check failed:', error);
    }

    // Check browser support
    const userAgent = navigator.userAgent.toLowerCase();
    const isSupported = Object.entries(STREMIO_CONFIG.SUPPORTED_BROWSERS).some(
      ([browser, version]) => {
        const match = userAgent.match(new RegExp(`${browser}\\/([\\d.]+)`));
        if (!match) return false;
        const currentVersion = parseFloat(match[1]);
        const requiredVersion = parseFloat(version.replace('>=', ''));
        return currentVersion >= requiredVersion;
      }
    );

    if (!isSupported) {
      throw new Error('Browser not supported');
    }
  }

  private async setupStremioCore(): Promise<void> {
    // Stremio core setup will be implemented here
    // This is a placeholder for the actual implementation
  }

  // Add methods for stream handling, catalog browsing, etc.
}