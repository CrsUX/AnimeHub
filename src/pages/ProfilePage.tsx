import React from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import StatsDashboard from '../components/profile/StatsDashboard';
import Achievements from '../components/profile/Achievements';
import ReviewShowcase from '../components/profile/ReviewShowcase';
import FavoritesCollection from '../components/profile/FavoritesCollection';
import BlogSection from '../components/profile/BlogSection';
import SocialStats from '../components/profile/SocialStats';

const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark">
      {/* Add pt-16 to account for fixed navbar height */}
      <div className="pt-16">
        {/* Profile Header Section */}
        <div className="bg-dark/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4">
            <ProfileHeader />
          </div>
        </div>

        {/* Main Content Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Stats Dashboard - Full Width */}
          <div className="mb-8">
            <StatsDashboard />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-6">
              <ReviewShowcase />
              <BlogSection />
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              <SocialStats />
              <Achievements />
              <FavoritesCollection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;