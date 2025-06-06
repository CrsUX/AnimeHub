import React from 'react';
import { Eye, Lock } from 'lucide-react';

const PrivacySettings: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Profile Visibility */}
      <div className="p-4 bg-light/5 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <Eye className="w-5 h-5 text-primary" />
          <h3 className="text-light font-medium">Profile Visibility</h3>
        </div>
        
        <div className="space-y-4">
          {[
            'Show online status',
            'Show watching history',
            'Show favorite anime',
            'Allow friend requests',
            'Show reviews'
          ].map((item) => (
            <label key={item} className="flex items-center justify-between">
              <span className="text-light">{item}</span>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-primary bg-light/5 border-light/10 rounded focus:ring-primary"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Data Privacy */}
      <div className="p-4 bg-light/5 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="w-5 h-5 text-primary" />
          <h3 className="text-light font-medium">Data Privacy</h3>
        </div>
        
        <div className="space-y-2">
          <button className="text-primary hover:text-primary/80 text-sm">
            Download my data
          </button>
          <button className="text-red-500 hover:text-red-400 text-sm block">
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;