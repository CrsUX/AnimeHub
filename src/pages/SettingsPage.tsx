import React from 'react';
import { Tabs } from '../components/ui/Tabs';
import ProfileSettings from '../components/settings/ProfileSettings';
import AccountSettings from '../components/settings/AccountSettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import PrivacySettings from '../components/settings/PrivacySettings';

const SettingsPage: React.FC = () => {
  const tabs = [
    { id: 'profile', label: 'Profile', content: <ProfileSettings /> },
    { id: 'account', label: 'Account', content: <AccountSettings /> },
    { id: 'notifications', label: 'Notifications', content: <NotificationSettings /> },
    { id: 'privacy', label: 'Privacy', content: <PrivacySettings /> }
  ];

  return (
    <div className="min-h-screen bg-dark pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-light mb-6">Settings</h1>
        <Tabs tabs={tabs} defaultTab="profile" />
      </div>
    </div>
  );
}

export default SettingsPage;