import { create } from 'zustand';

interface Profile {
  username: string;
  avatarUrl: string;
  bio: string;
  joinDate: string;
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

interface ProfileState {
  profile: Profile;
  updateProfile: (updates: Partial<Profile>) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: {
    username: 'AnimeExplorer',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    bio: 'Passionate anime enthusiast exploring the vast world of Japanese animation.',
    joinDate: 'March 2024',
    favoriteGenres: ['Psychological', 'Slice of Life', 'Action', 'Mystery'],
    stats: {
      completed: 247,
      hoursWatched: 5849,
      averageRating: 8.4,
      currentStreak: 42
    },
    social: {
      followers: 2500,
      following: 1200
    }
  },
  updateProfile: (updates) =>
    set((state) => ({
      profile: { ...state.profile, ...updates }
    }))
}));