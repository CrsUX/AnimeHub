import React from 'react';

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const getStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = getStrength(password);
  const width = (strength / 5) * 100;

  const getColor = (strength: number): string => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getMessage = (strength: number): string => {
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Medium';
    return 'Strong';
  };

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="h-1 w-full bg-light/10 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${getColor(strength)}`}
          style={{ width: `${width}%` }}
        />
      </div>
      <p className={`text-xs mt-1 ${getColor(strength).replace('bg-', 'text-')}`}>
        {getMessage(strength)}
      </p>
    </div>
  );
};

export default PasswordStrength;