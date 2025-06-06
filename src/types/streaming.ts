export interface StreamingEpisode {
  id: string;
  number: number;
  title: string;
  url: string;
  quality: string;
  source: string;
}

export interface StreamingSource {
  id: string;
  title: string;
  quality: string;
  size: number;
  seeds: number;
  url: string;
  provider: 'realdebrid' | 'torrentio' | 'nyaa';
}

export interface StreamingQuality {
  label: string;
  value: string;
  bitrate: number;
}

export interface StreamingOptions {
  preferredQuality: string;
  autoPlay: boolean;
  autoNext: boolean;
}