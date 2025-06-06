import React from 'react';
import Navbar from './Navbar';
import { getCloudinaryUrl } from '../../utils/cloudinary';

const Header: React.FC = () => {
  const heroImage = getCloudinaryUrl('frieren-ultrawide-5040x2160-15153_qclzkp', 'HERO', 'HIGH');

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
        {/* Image Container */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Frieren Anime Scene"
            className="w-full h-full object-cover object-center transform scale-105 will-change-transform"
          />
        </div>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-transparent to-dark z-10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent z-10" />
      </div>

      {/* Navbar */}
      <Navbar />
    </div>
  );
};

export default Header;