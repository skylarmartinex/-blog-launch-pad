# Authentication Setup Guide

This guide will help you set up user authentication for Blog Launch Pad using Supabase Auth.

## 🎯 What You Get

- ✅ User sign up / sign in with email & password
- ✅ Per-user data isolation (each user has their own progress)
- ✅ Cross-device sync for authenticated users
- ✅ Fallback to localStorage for non-authenticated users
- ✅ Beautiful login/signup modal
- ✅ User menu with profile dropdown

## 📋 Prerequisites

- Supabase project already created
- Database table `user_notes` exists

## 🚀 Setup Steps

### 1. Enable Email Authentication in Supabase

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Settings**
3. Under **Auth Providers**, enable **Email** provider
4. Configure the following:
   - **Site URL**: `https://bloglaunchpad.netlify.app` (or your domain)
   - **Redirect URLs**: Add your production and local URLs:
     - `https://bloglaunchpad.netlify.app/**`
     - `http://localhost:3000/**`

### 2. Run Database Migration

Execute the SQL migration to add user authentication:

1. Go to **SQL Editor** in Supabase Dashboard
2. Copy the contents of `supabase-migration.sql`
3. Run the migration

This will:
- Add `user_id` column to `user_notes` table
- Enable Row Level Security (RLS)
- Create policies so users can only see their own data
- Add performance indexes

### 3. Configure Email Templates (Optional)

Customize the email templates users receive:

1. Go to **Authentication** → **Email Templates**
2. Customize:
   - **Confirm signup** - Welcome email with verification link
   - **Magic Link** - Passwordless login (if you enable it)
   - **Change Email Address** - Email change confirmation
   - **Reset Password** - Password reset link

### 4. Test Authentication

#### Local Testing

```bash
npm run dev
```

1. Open http://localhost:3000
2. Click **Sign In** button in top right
3. Click **"Don't have an account? Sign up"**
4. Enter email and password (min 6 characters)
5. Check your email for verification link
6. Click the verification link
7. Sign in with your credentials

#### Production Testing

After deploying to Netlify:

1. Visit your live site
2. Follow the same sign up process
3. Verify email confirmation works
4. Test progress syncing across different devices

## 🔐 How Authentication Works

### For Authenticated Users

```typescript
// User signs in
const { user } = useAuth();

// Notes are saved with user_id
await supabase
  .from('user_notes')
  .insert({
    user_id: user.id,
    task_id: 'd1-1',
    note_content: 'My note'
  });

// Only user's notes are loaded
const { data } = await supabase
  .from('user_notes')
  .select('*')
  .eq('user_id', user.id);
```

### For Non-Authenticated Users

```typescript
// User not signed in
const { user } = useAuth(); // user = null

// Notes saved to localStorage only
localStorage.setItem('blogLaunchPad_notes', JSON.stringify(notes));
```

## 📊 Database Schema

### Updated `user_notes` Table

| Column | Type | Description |
|--------|------|-------------|
| id | integer | Primary key |
| **user_id** | UUID | References auth.users (new!) |
| task_id | text | Task identifier |
| note_content | text | User's notes |
| updated_at | timestamp | Last update |

### Row Level Security Policies

```sql
-- Users can only view their own notes
CREATE POLICY "Users can view their own notes"
ON user_notes FOR SELECT
USING (auth.uid() = user_id);

-- Users can only insert their own notes
CREATE POLICY "Users can insert their own notes"
ON user_notes FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Similar policies for UPDATE and DELETE
```

## 🎨 UI Components

### AuthModal
- Location: `components/AuthModal.tsx`
- Features: Sign in / Sign up toggle, error handling, success messages
- Styling: Matches app gradient theme

### UserMenu
- Location: `components/UserMenu.tsx`
- Features: User avatar, email display, sign out, dropdown menu
- Shows: "Sign In" button when logged out

### Header
- Location: `components/Header.tsx`
- Includes: UserMenu in top right corner

## 🔧 Configuration

### Environment Variables (Optional)

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://troqjlpihzzrfbqchlce.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

If not provided, the app uses hardcoded defaults (fine for this project).

### Netlify Deployment

No changes needed! The authentication works automatically because:
- Supabase credentials are in the code
- Static export compatible
- No server-side rendering required

## 🐛 Troubleshooting

### Email not sending?

1. Check **Authentication** → **Settings** → **SMTP Settings**
2. Supabase uses their SMTP by default (works fine)
3. For custom domain, configure custom SMTP

### Users can see others' data?

1. Verify RLS is enabled: `ALTER TABLE user_notes ENABLE ROW LEVEL SECURITY;`
2. Check policies exist: Go to **Table Editor** → `user_notes` → **Policies**
3. Test query: `SELECT * FROM user_notes;` (should only show your data)

### Sign up not working?

1. Check browser console for errors
2. Verify email is valid format
3. Password must be at least 6 characters
4. Check Supabase Dashboard → **Authentication** → **Users** for created accounts

### Localhost redirect issues?

1. Add `http://localhost:3000/**` to redirect URLs in Supabase Dashboard
2. Restart dev server after changing settings

## 🎁 Features

### What Works Now

- ✅ Email/password authentication
- ✅ User registration with email verification
- ✅ Secure password reset
- ✅ User sessions (stay logged in)
- ✅ Per-user data isolation
- ✅ Cross-device sync for logged-in users
- ✅ Fallback to localStorage when not logged in

### Future Enhancements

- [ ] OAuth providers (Google, GitHub)
- [ ] Magic link login (passwordless)
- [ ] User profile page
- [ ] Account settings
- [ ] Export user data
- [ ] Account deletion

## 📝 Code Examples

### Check if user is authenticated

```typescript
const { user, loading } = useAuth();

if (loading) return <div>Loading...</div>;
if (!user) return <div>Please sign in</div>;

return <div>Welcome {user.email}!</div>;
```

### Sign out programmatically

```typescript
const { signOut } = useAuth();

await signOut();
```

### Conditional rendering

```tsx
{!user && (
  <div>
    👋 Sign in to sync your progress!
  </div>
)}
```

## ✅ Testing Checklist

- [ ] Create new account
- [ ] Receive verification email
- [ ] Verify email
- [ ] Sign in with credentials
- [ ] Create some task notes
- [ ] Sign out
- [ ] Sign in again - verify notes are still there
- [ ] Open on different device - verify notes sync
- [ ] Test without signing in - verify localStorage fallback works
- [ ] Reset password flow
- [ ] Sign out and create different account - verify data is isolated

## 🎉 You're Done!

Your Blog Launch Pad now has full user authentication! Users can create accounts, sign in, and their progress will sync across all their devices.

**Questions?** Check the Supabase Auth docs: https://supabase.com/docs/guides/auth
