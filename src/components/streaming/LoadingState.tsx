import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Loading sources...' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-light/70">
      <Loader2 className="w-8 h-8 animate-spin mb-2" />
      <p>{message}</p>
    </div>
  );
};

export default LoadingState;