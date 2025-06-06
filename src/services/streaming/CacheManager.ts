import { STREAMING_CONFIG } from '../../config/streaming';

interface CacheItem {
  url: string;
  data: ArrayBuffer;
  timestamp: number;
}

export class CacheManager {
  private static instance: CacheManager;
  private cache: Map<string, CacheItem>;
  private maxItems: number;

  private constructor() {
    this.cache = new Map();
    this.maxItems = STREAMING_CONFIG.TORRENTIO.MAX_CACHE_ITEMS;
  }

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  async getOrFetch(url: string): Promise<ArrayBuffer> {
    const cached = this.cache.get(url);
    if (cached && this.isValid(cached)) {
      return cached.data;
    }

    const response = await fetch(url);
    const data = await response.arrayBuffer();
    this.set(url, data);
    return data;
  }

  private set(url: string, data: ArrayBuffer): void {
    if (this.cache.size >= this.maxItems) {
      const oldestKey = this.getOldestKey();
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(url, {
      url,
      data,
      timestamp: Date.now()
    });
  }

  private isValid(item: CacheItem): boolean {
    return Date.now() - item.timestamp < STREAMING_CONFIG.TORRENTIO.CACHE_TTL;
  }

  private getOldestKey(): string | undefined {
    let oldestKey: string | undefined;
    let oldestTime = Infinity;

    for (const [key, item] of this.cache.entries()) {
      if (item.timestamp < oldestTime) {
        oldestTime = item.timestamp;
        oldestKey = key;
      }
    }

    return oldestKey;
  }

  clear(): void {
    this.cache.clear();
  }
}