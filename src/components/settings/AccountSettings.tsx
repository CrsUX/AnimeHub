import React from 'react';
import { Mail, Key, Shield } from 'lucide-react';

const AccountSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Email Settings */}
      <div className="p-4 bg-light/5 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-5 h-5 text-primary" />
          <h3 className="text-light font-medium">Email Address</h3>
        </div>
        <input
          type="email"
          defaultValue="user@example.com"
          className="w-full bg-light/5 border border-light/10 rounded-lg px-4 py-2 text-light"
          disabled
        />
        <button className="mt-2 text-sm text-primary hover:text-primary/80">
          Change Email
        </button>
      </div>

      {/* Password Settings */}
      <div className="p-4 bg-light/5 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <Key className="w-5 h-5 text-primary" />
          <h3 className="text-light font-medium">Password</h3>
        </div>
        <button className="text-sm text-primary hover:text-primary/80">
          Change Password
        </button>
      </div>

      {/* Two-Factor Authentication */}
      <div className="p-4 bg-light/5 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-5 h-5 text-primary" />
          <h3 className="text-light font-medium">Two-Factor Authentication</h3>
        </div>
        <p className="text-light/70 text-sm mb-4">
          Add an extra layer of security to your account
        </p>
        <button className="px-4 py-2 bg-primary text-light rounded-lg hover:bg-primary/90">
          Enable 2FA
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;