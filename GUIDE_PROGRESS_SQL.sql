-- Create guide_progress table for storing user exercise responses and progress
CREATE TABLE IF NOT EXISTS guide_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  guide_id TEXT NOT NULL,
  responses JSONB DEFAULT '{}'::jsonb,
  unlocked_sections INTEGER[] DEFAULT ARRAY[0],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, guide_id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_guide_progress_user_id ON guide_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_guide_progress_guide_id ON guide_progress(guide_id);

-- Enable Row Level Security
ALTER TABLE guide_progress ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Users can view their own guide progress"
ON guide_progress FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own guide progress"
ON guide_progress FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own guide progress"
ON guide_progress FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own guide progress"
ON guide_progress FOR DELETE
USING (auth.uid() = user_id);
