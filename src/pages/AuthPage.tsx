import React, { useState } from 'react';
import SignInForm from '../components/auth/SignInForm';
import SignUpForm from '../components/auth/SignUpForm';
import { Play } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Play className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-light">AnimeHub</h1>
          </div>
          <p className="text-light/70">
            {isSignIn ? 'Welcome back!' : 'Join the community'}
          </p>
        </div>

        {/* Auth Container */}
        <div className="bg-light/5 backdrop-blur-sm border border-light/10 rounded-lg p-6">
          {/* Toggle */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setIsSignIn(true)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                isSignIn
                  ? 'bg-primary text-light'
                  : 'text-light/70 hover:text-light'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignIn(false)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                !isSignIn
                  ? 'bg-primary text-light'
                  : 'text-light/70 hover:text-light'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Forms */}
          {isSignIn ? <SignInForm /> : <SignUpForm />}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;