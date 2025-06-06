import React, { useEffect, useState } from 'react';
import { Play, User, LogOut, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAnimeStore } from '../../store/animeStore';
import { useAuth } from '../../hooks/useAuth';
import ExpandingSearch from '../search/ExpandingSearch';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { setCurrentAnime } = useAnimeStore();
  const { isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    setCurrentAnime(null);
    navigate('/');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <nav 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-dark/60 backdrop-blur-md border-b border-light/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-16">
          {/* Left Section */}
          <div className="w-1/4">
            <ExpandingSearch />
          </div>

          {/* Center Logo */}
          <div className="flex-1 flex justify-center">
            <button 
              onClick={handleLogoClick}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Play className="w-5 h-5 text-primary" />
              <span className="text-light font-medium text-sm">AnimeHub</span>
            </button>
          </div>

          {/* Right Section */}
          <div className="w-1/4 flex justify-end items-center gap-4">
            {/* Admin Link - Only show for admin users */}
            {isAuthenticated && user?.is_admin && (
              <Link
                to="/admin"
                className="p-2 text-light/70 hover:text-light transition-colors"
                title="Admin Settings"
              >
                <Shield className="w-5 h-5" />
              </Link>
            )}

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="px-3 py-1.5 text-sm font-medium text-light bg-primary/20 hover:bg-primary/30 rounded-full transition-colors flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Profile
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-dark/95 backdrop-blur-sm border border-light/10 rounded-lg shadow-lg py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-light hover:bg-light/5 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      View Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-light hover:bg-light/5 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-light/5 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-3 py-1.5 text-sm font-medium text-light bg-primary/20 hover:bg-primary/30 rounded-full transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;