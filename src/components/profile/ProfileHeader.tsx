import React from 'react';
import { Calendar, Users, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProfileStore } from '../../store/profileStore';

const ProfileHeader: React.FC = () => {
  const { profile } = useProfileStore();

  return (
    <div className="relative py-8">
      {/* Profile Info */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <img
          src={profile.avatarUrl}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-dark bg-dark"
        />
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-wrap">
              <h1 className="text-3xl font-bold text-light">{profile.username}</h1>
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                Premium Member
              </span>
            </div>
            <Link
              to="/settings"
              className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-light rounded-lg transition-colors flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              <span>Edit Profile</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4 mt-2 text-light/70">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Joined {profile.joinDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{profile.social.followers.toLocaleString()} Followers</span>
            </div>
          </div>
          
          <p className="mt-4 text-light/90 max-w-2xl">
            {profile.bio}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {profile.favoriteGenres.map((genre) => (
              <span
                key={genre}
                className="px-3 py-1 bg-light/5 text-light/70 rounded-full text-sm"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;