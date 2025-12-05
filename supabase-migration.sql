-- Migration: Add user authentication to Blog Launch Pad
-- This migration adds user_id column and enables Row Level Security (RLS)

-- Step 1: Add user_id column to user_notes table
ALTER TABLE user_notes
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Step 2: Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_user_notes_user_id ON user_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_user_notes_task_user ON user_notes(user_id, task_id);

-- Step 3: Enable Row Level Security
ALTER TABLE user_notes ENABLE ROW LEVEL SECURITY;

-- Step 4: Create RLS policies

-- Policy: Users can view their own notes
CREATE POLICY "Users can view their own notes"
ON user_notes
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can insert their own notes
CREATE POLICY "Users can insert their own notes"
ON user_notes
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own notes
CREATE POLICY "Users can update their own notes"
ON user_notes
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own notes
CREATE POLICY "Users can delete their own notes"
ON user_notes
FOR DELETE
USING (auth.uid() = user_id);

-- Step 5 (Optional): Migrate existing data
-- If you have existing notes without user_id, you can:
-- 1. Leave them as is (they won't be visible to authenticated users)
-- 2. Delete them: DELETE FROM user_notes WHERE user_id IS NULL;
-- 3. Assign them to a specific user (if you know which user)

-- Enable email/password authentication in Supabase Dashboard:
-- 1. Go to Authentication > Settings
-- 2. Enable Email provider
-- 3. Configure email templates (optional)
-- 4. Set site URL to your domain (or localhost:3000 for dev)

-- Test query to verify RLS is working:
-- SELECT * FROM user_notes; -- Should only return current user's notes when authenticated
