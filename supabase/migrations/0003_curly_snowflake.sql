/*
  # Add Admin Functionality

  1. Changes
    - Add `is_admin` boolean column to auth.users
    - Add function to check if user is admin
    - Add function to set admin status

  2. Security
    - Only allow admin users to modify admin status
    - Functions use SECURITY DEFINER to run with elevated privileges
*/

-- Add is_admin column to auth.users if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'auth' 
    AND table_name = 'users' 
    AND column_name = 'is_admin'
  ) THEN
    ALTER TABLE auth.users ADD COLUMN is_admin BOOLEAN DEFAULT false;
  END IF;
END $$;

-- Create admin check function
CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT is_admin FROM auth.users
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to set admin status (only usable by existing admins)
CREATE OR REPLACE FUNCTION auth.set_admin_status(user_id UUID, admin_status BOOLEAN)
RETURNS VOID AS $$
BEGIN
  IF NOT auth.is_admin() THEN
    RAISE EXCEPTION 'Only administrators can modify admin status';
  END IF;

  UPDATE auth.users
  SET is_admin = admin_status
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;