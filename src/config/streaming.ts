export const STREAMING_CONFIG = {
  // API Configuration
  TORRENTIO_API_URL: 'https://torrentio.strem.fun/stream/anime',
  TORRENTIO_ADDON_URL: 'https://torrentio.strem.fun/manifest.json',
  
  // RealDebrid Configuration
  REALDEBRID: {
    API_URL: 'https://api.real-debrid.com/rest/1.0',
    AUTH_URL: 'https://api.real-debrid.com/oauth/v2/auth',
    TOKEN_URL: 'https://api.real-debrid.com/oauth/v2/token',
    CLIENT_ID: import.meta.env.VITE_REALDEBRID_CLIENT_ID || '',
    CLIENT_SECRET: import.meta.env.VITE_REALDEBRID_CLIENT_SECRET || '',
    REDIRECT_URI: `${window.location.origin}/auth/callback`,
    SCOPES: ['torrents', 'downloads']
  },
  
  // Streaming Settings
  QUALITIES: ['4K', '1080p', '720p', '480p'] as const,
  DEFAULT_QUALITY: '1080p',
  
  // Torrentio Configuration
  TORRENTIO: {
    MIN_SEEDS: 1,
    MAX_RESULTS: 10,
    VALID_KEYWORDS: [
      'anime',
      'sub',
      'dub',
      '[horriblesubs]',
      '[subsplease]',
      '[erai-raws]'
    ],
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
  },

  // Mock Configuration
  MOCK_DELAY_MS: 1000,
} as const;

export function getMockSources(title: string) {
  return [
    {
      id: `mock-${title}-1080p`,
      title: `${title} (1080p)`,
      quality: '1080p',
      size: 2.5 * 1024 * 1024 * 1024, // 2.5GB
      seeds: 100,
      url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      provider: 'mock'
    },
    {
      id: `mock-${title}-720p`,
      title: `${title} (720p)`,
      quality: '720p',
      size: 1.2 * 1024 * 1024 * 1024, // 1.2GB
      seeds: 200,
      url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      provider: 'mock'
    }
  ];
}