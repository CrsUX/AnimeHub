export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  views: number;
  uploadDate: string;
}

export interface Ad {
  id: string;
  videoUrl: string;
  duration: number;
  skipAfter: number;
}