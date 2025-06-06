export interface UserProfile {
  id: string;
  username: string;
  avatarUrl: string;
  joinDate: string;
  bio: string;
  favoriteGenres: string[];
  stats: {
    completed: number;
    hoursWatched: number;
    averageRating: number;
    currentStreak: number;
  };
  social: {
    followers: number;
    following: number;
  };
}

export interface AnimeReview {
  id: string;
  animeId: string;
  title: string;
  content: string;
  rating: number;
  pros: string[];
  cons: string[];
  spoilers: boolean;
  createdAt: string;
  likes: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  createdAt: string;
  likes: number;
  comments: number;
}

export interface FavoriteAnime {
  id: string;
  title: string;
  imageUrl: string;
  rating: number;
  type: string;
}