import React from 'react';
import { getCloudinaryUrl } from '../../../utils/cloudinary';

const HeroBackground: React.FC = () => {
  const heroImage = getCloudinaryUrl('frieren-ultrawide-5040x2160-15153_qclzkp', 'HERO', 'HIGH');

  return (
    <>
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Hero Background"
          className="w-full h-full object-cover object-center transform scale-105 will-change-transform"
        />
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-transparent to-dark" />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent" />
    </>
  );
};

export default HeroBackground;