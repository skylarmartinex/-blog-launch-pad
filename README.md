# Blog Launch Pad

A productivity app that guides first-time bloggers through launching their blog. Like Duolingo for starting a blog.

## Live Site

[https://bloglaunchpad.netlify.app/](https://bloglaunchpad.netlify.app/)

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (for user progress sync)
- **Hosting**: Netlify
- **Fonts**: IBM Plex Sans, JetBrains Mono

## Features

### Core Features
- ✅ Day 1, Week 1, Week 2 task lists with progress tracking
- ✅ Modal-based task editing with auto-save
- ✅ 6-month roadmap view
- ✅ Content Ideas bank
- ✅ Automations backlog
- ✅ Standard Operating Procedures (SOPs)

### Authentication & Sync
- ✅ **User authentication** with email/password (Supabase Auth)
- ✅ **Per-user data isolation** - each user has their own progress
- ✅ **Cross-device sync** for authenticated users
- ✅ **LocalStorage fallback** for users who don't sign in
- ✅ Beautiful login/signup modal
- ✅ User profile dropdown menu

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

1. Clone the repository:
\`\`\`bash
git clone https://github.com/skylarmartinex/-blog-launch-pad.git
cd blog-launch-pad-fresh
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a \`.env.local\` file (optional - defaults are included):
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

\`\`\`bash
npm run build
\`\`\`

This creates a static export in the \`out\` directory.

### Setting Up Authentication

See [AUTH_SETUP.md](AUTH_SETUP.md) for complete authentication setup instructions.

**Quick steps:**
1. Enable Email auth in Supabase Dashboard
2. Run the SQL migration from `supabase-migration.sql`
3. Configure redirect URLs
4. Test sign up/sign in flow

## Database Schema

### Supabase Table: \`user_notes\`

| Column | Type | Description |
|--------|------|-------------|
| id | integer | Primary key |
| **user_id** | UUID | User ID (references auth.users) |
| task_id | text | Task identifier |
| note_content | text | User's notes (prefixed with [COMPLETED] if done) |
| updated_at | timestamp | Last update time |

**Row Level Security**: Enabled - users can only access their own notes.

## Deployment

This app is configured for Netlify deployment with static export:

1. Connect your GitHub repository to Netlify
2. Build command: \`npm run build\`
3. Publish directory: \`out\`

Environment variables are optional as defaults are included in the code.

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main page with state management
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # App header
│   ├── StatsBar.tsx        # Progress stats
│   ├── Tabs.tsx            # Tab navigation
│   ├── TaskList.tsx        # Task list component
│   ├── TaskSection.tsx     # Task section wrapper
│   ├── TaskModal.tsx       # Task edit modal
│   ├── Roadmap.tsx         # Roadmap view
│   ├── ContentIdeas.tsx    # Content ideas view
│   ├── Backlog.tsx         # Automations backlog
│   └── SOPs.tsx            # Standard procedures
├── lib/
│   ├── supabase.ts         # Supabase client
│   └── data.ts             # Task data and types
└── public/                 # Static assets
\`\`\`

## Roadmap

- [ ] Create actual guide pages (blog articles) for each step
- [ ] Add Week 3-4 and more phases
- [ ] Add user authentication (Supabase Auth)
- [ ] Build brand guide page that pulls saved answers
- [ ] Add email reminders
- [ ] Mobile app version

## License

MIT
