import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import PasswordStrength from './PasswordStrength';

const SignUpForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const { signUp } = useAuth();

  const validateUsername = (username: string): boolean => {
    if (username.length < 3 || username.length > 20) {
      setUsernameError('Username must be between 3 and 20 characters');
      return false;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setUsernameError('Username can only contain letters, numbers, and underscores');
      return false;
    }
    setUsernameError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = (formData.get('username') as string).toLowerCase();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm-password') as string;
    const acceptTerms = formData.get('terms') === 'on';

    if (!validateUsername(username)) {
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!acceptTerms) {
      alert('Please accept the terms and conditions');
      setIsLoading(false);
      return;
    }

    try {
      await signUp({ username, email, password });
    } catch (error) {
      console.error('Sign up failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-light mb-1">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          required
          className={`w-full bg-light/5 border ${
            usernameError ? 'border-red-500' : 'border-light/10'
          } rounded-lg px-4 py-2 text-light placeholder-light/50 focus:ring-2 focus:ring-primary/50 focus:border-transparent`}
          placeholder="Choose a username"
          onChange={(e) => validateUsername(e.target.value)}
        />
        {usernameError && (
          <p className="mt-1 text-sm text-red-500">{usernameError}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-light mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full bg-light/5 border border-light/10 rounded-lg px-4 py-2 text-light placeholder-light/50 focus:ring-2 focus:ring-primary/50 focus:border-transparent"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-light mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-light/5 border border-light/10 rounded-lg px-4 py-2 text-light placeholder-light/50 focus:ring-2 focus:ring-primary/50 focus:border-transparent"
            placeholder="Create a password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-light/50 hover:text-light"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        <PasswordStrength password={password} />
      </div>

      <div>
        <label htmlFor="confirm-password" className="block text-sm font-medium text-light mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          required
          className="w-full bg-light/5 border border-light/10 rounded-lg px-4 py-2 text-light placeholder-light/50 focus:ring-2 focus:ring-primary/50 focus:border-transparent"
          placeholder="Confirm your password"
        />
      </div>

      <div>
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            name="terms"
            className="mt-1 w-4 h-4 text-primary bg-light/5 border-light/10 rounded focus:ring-primary"
          />
          <span className="text-sm text-light/70">
            I agree to the{' '}
            <button type="button" className="text-primary hover:text-primary/80">
              Terms of Service
            </button>{' '}
            and{' '}
            <button type="button" className="text-primary hover:text-primary/80">
              Privacy Policy
            </button>
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-light rounded-lg py-2 font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
      </button>
    </form>
  );
}

export default SignUpForm;