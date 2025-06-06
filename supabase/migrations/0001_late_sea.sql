/*
  # Create comments table and policies

  1. New Tables
    - `comments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `anime_id` (integer)
      - `content` (text)
      - `created_at` (timestamp)
      - `likes` (integer)
      - `parent_id` (uuid, self-reference for replies)

  2. Security
    - Enable RLS on `comments` table
    - Add policies for:
      - Anyone can read comments
      - Authenticated users can create comments
      - Users can update/delete their own comments
*/

CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  anime_id integer NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  likes integer DEFAULT 0,
  parent_id uuid REFERENCES comments(id),
  CONSTRAINT content_length CHECK (char_length(content) BETWEEN 1 AND 1000)
);

-- Enable RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can read comments"
  ON comments
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
  ON comments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
  ON comments
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX comments_anime_id_idx ON comments(anime_id);
CREATE INDEX comments_parent_id_idx ON comments(parent_id);
CREATE INDEX comments_created_at_idx ON comments(created_at DESC);