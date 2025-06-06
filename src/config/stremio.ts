export const STREMIO_CONFIG = {
  // API Configuration
  API_URL: 'https://api.strem.io',
  CLIENT_ID: import.meta.env.VITE_STREMIO_CLIENT_ID || '',
  VERSION: '1.0.0',
  
  // Streaming Settings
  QUALITIES: ['4K', '1080p', '720p', '480p'] as const,
  DEFAULT_QUALITY: '1080p',
  
  // Cache Settings
  CACHE_TTL: 30 * 60 * 1000, // 30 minutes
  MAX_CACHE_ITEMS: 100,
  
  // Playback Settings
  BUFFER_THRESHOLD: 10, // seconds
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // ms
  
  // Add-on Settings
  REQUIRED_TYPES: ['movie', 'series', 'anime'],
  CATALOG_PAGE_SIZE: 100,
  
  // System Requirements
  MIN_MEMORY: 4 * 1024 * 1024 * 1024, // 4GB
  MIN_STORAGE: 1 * 1024 * 1024 * 1024, // 1GB
  
  // Browser Support
  SUPPORTED_BROWSERS: {
    chrome: '>=80',
    firefox: '>=75',
    safari: '>=13',
    edge: '>=80'
  }
} as const;