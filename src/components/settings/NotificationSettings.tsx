import React from 'react';
import { Bell } from 'lucide-react';

const NotificationSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-light/5 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-5 h-5 text-primary" />
          <h3 className="text-light font-medium">Notification Preferences</h3>
        </div>
        
        <div className="space-y-4">
          {[
            'New episode releases',
            'Comments on your reviews',
            'Replies to your comments',
            'Friend requests',
            'System announcements'
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
    </div>
  );
};

export default NotificationSettings;