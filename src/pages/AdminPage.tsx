import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Tabs } from '../components/ui/Tabs';
import AddonsManager from '../components/admin/AddonsManager';
import SourcesManager from '../components/admin/SourcesManager';
import StreamingSettings from '../components/admin/StreamingSettings';
import { Shield } from 'lucide-react';

const AdminPage: React.FC = () => {
  const { user } = useAuth();

  // Check if user is admin
  if (!user?.is_admin) {
    return <Navigate to="/" replace />;
  }

  const tabs = [
    { id: 'addons', label: 'Add-ons', content: <AddonsManager /> },
    { id: 'sources', label: 'Sources', content: <SourcesManager /> },
    { id: 'settings', label: 'Settings', content: <StreamingSettings /> }
  ];

  return (
    <div className="min-h-screen bg-dark pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-light">Admin Settings</h1>
        </div>
        <Tabs tabs={tabs} defaultTab="addons" />
      </div>
    </div>
  );
};

export default AdminPage;