import React, { useState } from 'react';
import { useProfileStore } from '../../store/profileStore';
import { Check } from 'lucide-react';
import GenreSelector from './GenreSelector';
import ImageUpload from './ImageUpload';

const ProfileSettings: React.FC = () => {
  const { profile, updateProfile } = useProfileStore();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaveStatus('saving');

    const formData = new FormData(e.currentTarget);
    const updates = {
      username: formData.get('username') as string,
      bio: formData.get('bio') as string,
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    updateProfile(updates);
    setSaveStatus('success');
    
    // Reset status after showing success message
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const handleGenresChange = (newGenres: string[]) => {
    updateProfile({ favoriteGenres: newGenres });
  };

  const handleImageChange = (imageUrl: string) => {
    updateProfile({ avatarUrl: imageUrl });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Avatar Section */}
      <div className="flex items-center gap-6">
        <ImageUpload 
          currentImage={profile.avatarUrl}
          onImageChange={handleImageChange}
        />
        <div>
          <h3 className="text-light font-medium">Profile Picture</h3>
          <p className="text-light/70 text-sm">
            Upload a new profile picture. JPG, PNG or GIF.
          </p>
        </div>
      </div>

      {/* Rest of the form remains the same */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-light">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          defaultValue={profile.username}
          className="mt-1 w-full bg-light/5 border border-light/10 rounded-lg px-4 py-2 text-light focus:ring-2 focus:ring-primary/50 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-light">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          defaultValue={profile.bio}
          className="mt-1 w-full bg-light/5 border border-light/10 rounded-lg px-4 py-2 text-light focus:ring-2 focus:ring-primary/50 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-light mb-2">
          Favorite Genres
        </label>
        <GenreSelector 
          genres={profile.favoriteGenres} 
          onChange={handleGenresChange}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saveStatus === 'saving'}
          className="px-4 py-2 bg-primary text-light rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {saveStatus === 'saving' ? (
            'Saving...'
          ) : saveStatus === 'success' ? (
            <>
              <Check className="w-4 h-4" />
              Saved!
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </form>
  );
};

export default ProfileSettings;