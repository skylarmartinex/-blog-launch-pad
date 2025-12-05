-- Create user_onboarding table for collecting structured Day 1 data
CREATE TABLE IF NOT EXISTS user_onboarding (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,

  -- Sticky Problem fields
  sticky_problem_choice TEXT,
  sticky_problem_description TEXT,

  -- Origin Story fields
  origin_struggle TEXT,
  origin_transformation TEXT,
  origin_result TEXT,

  -- Niche Alignment
  niche_alignment TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_onboarding_user_id ON user_onboarding(user_id);

-- Enable Row Level Security
ALTER TABLE user_onboarding ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Users can view their own onboarding data"
ON user_onboarding FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own onboarding data"
ON user_onboarding FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own onboarding data"
ON user_onboarding FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own onboarding data"
ON user_onboarding FOR DELETE
USING (auth.uid() = user_id);
