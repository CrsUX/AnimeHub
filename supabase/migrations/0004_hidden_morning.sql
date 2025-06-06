/*
  # Safe Admin Setup

  1. Changes
    - Safely ensures admin functionality exists
    - Handles potential duplicates gracefully
    - Idempotent operations only
*/

-- Safely ensure function exists
CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- Add column check to handle edge cases
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'auth' 
    AND table_name = 'users' 
    AND column_name = 'is_admin'
  ) THEN
    RETURN false;
  END IF;

  RETURN (
    SELECT COALESCE(is_admin, false) FROM auth.users
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Safely recreate admin status function
CREATE OR REPLACE FUNCTION auth.set_admin_status(user_id UUID, admin_status BOOLEAN)
RETURNS VOID AS $$
BEGIN
  -- Add column check to handle edge cases
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'auth' 
    AND table_name = 'users' 
    AND column_name = 'is_admin'
  ) THEN
    RAISE EXCEPTION 'Admin functionality not properly initialized';
  END IF;

  IF NOT auth.is_admin() THEN
    RAISE EXCEPTION 'Only administrators can modify admin status';
  END IF;

  UPDATE auth.users
  SET is_admin = admin_status
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;