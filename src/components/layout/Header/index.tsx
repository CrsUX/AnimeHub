import React from 'react';
import Navbar from '../Navbar';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';

const Header: React.FC = () => {
  return (
    <div className="relative">
      <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
        <HeroBackground />
        <HeroContent />
      </div>
      <Navbar />
    </div>
  );
};

export default Header;