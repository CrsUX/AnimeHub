import React from 'react';
import { Users, BookOpen, Clock } from 'lucide-react';

const SocialStats: React.FC = () => {
  return (
    <div className="bg-light/5 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-2">
        <Users className="w-5 h-5 text-primary" />
        Social Activity
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-light/5 rounded-lg">
          <div className="text-2xl font-bold text-light">2.5k</div>
          <div className="text-sm text-light/70">Followers</div>
        </div>
        <div className="text-center p-4 bg-light/5 rounded-lg">
          <div className="text-2xl font-bold text-light">1.2k</div>
          <div className="text-sm text-light/70">Following</div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-light/70">
            <BookOpen className="w-4 h-4" />
            <span>Reviews Written</span>
          </div>
          <span className="text-light">347</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-light/70">
            <Clock className="w-4 h-4" />
            <span>Last Active</span>
          </div>
          <span className="text-light">2 hours ago</span>
        </div>
      </div>
    </div>
  );
};

export default SocialStats;