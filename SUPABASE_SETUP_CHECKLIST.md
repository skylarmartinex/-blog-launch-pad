# Supabase Setup Checklist ✅

Follow these steps in order. Check off each one as you complete it.

## Part 1: Database Migration (5 minutes)

### Step 1: Open Supabase SQL Editor
1. [ ] Go to: https://supabase.com/dashboard
2. [ ] Sign in to your account
3. [ ] Click on your project: **troqjlpihzzrfbqchlce**
4. [ ] In the left sidebar, click **SQL Editor**
5. [ ] Click **New Query** button (top right)

### Step 2: Run the Migration
1. [ ] Copy ALL the SQL below (click to select, then Cmd+C):

```sql
-- Migration: Add user authentication to Blog Launch Pad

-- Step 1: Add user_id column to user_notes table
ALTER TABLE user_notes
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Step 2: Create indexes for better query performance
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
```

2. [ ] Paste the SQL into the query editor (Cmd+V)
3. [ ] Click **Run** button (or press Cmd+Enter)
4. [ ] Wait for "Success. No rows returned" message
5. [ ] ✅ **Migration complete!**

### Step 3: Verify Migration
1. [ ] In left sidebar, click **Table Editor**
2. [ ] Click on `user_notes` table
3. [ ] Verify you see a new column: **user_id** (type: uuid)
4. [ ] Click on **Policies** tab
5. [ ] Verify you see 4 policies listed

---

## Part 2: Enable Email Authentication (3 minutes)

### Step 4: Enable Email Provider
1. [ ] In left sidebar, click **Authentication**
2. [ ] Click **Settings** (or **Providers** depending on your UI)
3. [ ] Find **Email** in the list of providers
4. [ ] Make sure the toggle is **ON** (enabled)
5. [ ] If it was off, toggle it on and click **Save**

### Step 5: Configure Site URLs
1. [ ] Scroll down to **Site URL** section
2. [ ] Set Site URL to: `http://localhost:3000`
3. [ ] Scroll to **Redirect URLs** section
4. [ ] Click **Add URL** and add these URLs (one at a time):
   - [ ] `http://localhost:3000/**`
   - [ ] `https://bloglaunchpad.netlify.app/**`
5. [ ] Click **Save** at the bottom

### Step 6: (Optional) Disable Email Confirmation for Testing
**Only do this for faster local testing. Re-enable for production!**

1. [ ] Scroll to **User Signups** section
2. [ ] Find **Enable email confirmations** toggle
3. [ ] Toggle it **OFF** (for testing only)
4. [ ] Click **Save**

> **Note:** You can re-enable email confirmations later when you deploy to production.

---

## Part 3: Test Authentication (5 minutes)

### Step 7: Test Sign Up
1. [ ] Open your browser to: http://localhost:3000
2. [ ] Click **Sign In** button (top right)
3. [ ] Click **"Don't have an account? Sign up"**
4. [ ] Enter a test email: `test@example.com` (or your real email)
5. [ ] Enter a password: `password123` (min 6 characters)
6. [ ] Click **Sign Up**
7. [ ] You should see: "Account created!" message

If email confirmation is enabled:
- [ ] Check your email inbox
- [ ] Click the verification link
- [ ] Return to app and sign in

### Step 8: Test Sign In
1. [ ] Enter your email and password
2. [ ] Click **Sign In**
3. [ ] You should see:
   - Your email in top right corner
   - User avatar with your email initial
   - Banner message disappears
4. [ ] ✅ **Sign in works!**

### Step 9: Test Data Saving
1. [ ] Click on a task (e.g., "Define niche statement")
2. [ ] Write some notes in the modal
3. [ ] Mark task as complete
4. [ ] Click **Save & Close**
5. [ ] Sign out (click dropdown, then "Sign Out")
6. [ ] Sign in again
7. [ ] Verify your notes are still there
8. [ ] ✅ **Data persistence works!**

### Step 10: Verify Data Isolation
1. [ ] In Supabase Dashboard, go to **Table Editor**
2. [ ] Click on `user_notes` table
3. [ ] You should see your test notes with a `user_id`
4. [ ] Create another account with different email
5. [ ] Verify the new user sees NO notes (blank slate)
6. [ ] ✅ **Data isolation works!**

---

## Part 4: Production Setup (When Ready)

### Before Deploying to Netlify:

1. [ ] Re-enable email confirmations (if you disabled them)
   - Authentication → Settings → Enable email confirmations: **ON**

2. [ ] Update Site URL to production:
   - Change from `http://localhost:3000`
   - To: `https://bloglaunchpad.netlify.app`

3. [ ] Verify Redirect URLs include:
   - [ ] `https://bloglaunchpad.netlify.app/**`
   - [ ] (Keep localhost for local development)

4. [ ] Click **Save**

---

## Troubleshooting

### Issue: "New policy is conflicting"
**Solution:** The policy already exists. Safe to ignore, or drop existing policies first:
```sql
DROP POLICY IF EXISTS "Users can view their own notes" ON user_notes;
-- Then run the CREATE POLICY again
```

### Issue: "Email not sending"
**Solution:**
- Supabase uses their default SMTP (should work automatically)
- Check Spam folder
- Or disable email confirmation for testing

### Issue: "Cannot read properties of undefined"
**Solution:**
- Make sure dev server is running: `npm run dev`
- Clear browser cache and reload
- Check browser console for errors

### Issue: Sign up works but can't sign in
**Solution:**
- If email confirmation enabled, check email and verify
- Or temporarily disable email confirmation
- Check password is correct (min 6 characters)

### Issue: RLS is too restrictive
**Solution:** This is normal! You want RLS enabled. Each user should only see their own notes.

---

## ✅ Completion Checklist

You're done when you can:
- [ ] Sign up for a new account
- [ ] Sign in with credentials
- [ ] Create task notes
- [ ] Sign out and sign back in
- [ ] See your notes persisted
- [ ] Create second account and verify data is isolated

---

## 🎉 All Done!

Your authentication is now fully configured!

**Next steps:**
- Test thoroughly with multiple accounts
- When ready, deploy to Netlify
- Update Site URL to production domain
- Re-enable email confirmations

**Need help?** Check:
- [AUTH_SETUP.md](AUTH_SETUP.md) - Full documentation
- [AUTH_SUMMARY.md](AUTH_SUMMARY.md) - Implementation details
- Supabase docs: https://supabase.com/docs/guides/auth
