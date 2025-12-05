# Migration Guide: HTML → Next.js

This document explains the changes made during the migration from single HTML file to Next.js.

## What Changed

### Architecture
- **Before**: Single `index.html` file (~525 lines)
- **After**: Component-based Next.js app with TypeScript

### File Structure

```
Old:
├── index.html (everything in one file)

New:
├── app/
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page logic
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Header.tsx
│   ├── StatsBar.tsx
│   ├── Tabs.tsx
│   ├── TaskList.tsx
│   ├── TaskSection.tsx
│   ├── TaskModal.tsx
│   ├── Roadmap.tsx
│   ├── ContentIdeas.tsx
│   ├── Backlog.tsx
│   └── SOPs.tsx
├── lib/
│   ├── supabase.ts        # Supabase config
│   └── data.ts            # Data structures
└── public/                # Static assets
```

### What Stayed The Same

✅ **All functionality preserved**:
- Task lists (Day 1, Week 1, Week 2)
- Modal editing with auto-save
- Supabase sync
- Progress tracking
- All sections (Roadmap, Ideas, Backlog, SOPs)
- Reset progress feature

✅ **Exact same design**:
- Same gradient background
- Same colors and styling
- Same fonts (IBM Plex Sans, JetBrains Mono)
- Responsive layout

✅ **Same database**:
- Uses same Supabase instance
- Same `user_notes` table structure
- Backward compatible with existing data

## Benefits of Migration

### 1. **Better Code Organization**
- Separate components are easier to understand
- Clear separation of concerns
- Easier to find and modify specific features

### 2. **Type Safety**
- TypeScript catches errors before runtime
- Better IDE autocomplete
- Safer refactoring

### 3. **Better Performance**
- Optimized bundle sizes
- Automatic code splitting
- Image optimization ready

### 4. **Easier to Extend**
- Add new pages easily (just create new files in `app/`)
- Reusable components
- Built-in routing

### 5. **Modern Development**
- Hot module replacement (instant updates while coding)
- Better debugging tools
- ESLint integration

## Migration Steps (What We Did)

1. ✅ Set up Next.js with TypeScript & Tailwind
2. ✅ Extracted all task data to `lib/data.ts`
3. ✅ Created Supabase client in `lib/supabase.ts`
4. ✅ Converted HTML sections into React components
5. ✅ Moved all styles to Tailwind classes
6. ✅ Migrated all JavaScript logic to React hooks
7. ✅ Configured for static export (Netlify compatible)
8. ✅ Tested build and functionality

## Deployment Changes

### Old (HTML)
```
Deploy: Just push index.html to Netlify
```

### New (Next.js)
```
Build command: npm run build
Publish directory: out
```

Netlify will automatically detect Next.js and run the build command.

## Data Migration

**No data migration needed!** The new app uses the exact same Supabase table structure, so all existing user progress will continue to work.

## Local Development

### Old Workflow
1. Edit `index.html`
2. Refresh browser
3. See changes

### New Workflow
1. Run `npm run dev`
2. Edit any file
3. See changes instantly (hot reload)

## Adding New Features

### Example: Adding a New Week

**Old way** (HTML):
- Find the `tasksData` object
- Add new week array
- Find the tabs HTML
- Add new tab button
- Find the tab content HTML
- Add new section
- Update progress calculation JavaScript

**New way** (Next.js):
1. Add data to `lib/data.ts`:
```typescript
week3: [
  { id: 'w3-1', text: 'Task 1', day: 15, hint: 'Hint' },
  // ...
]
```

2. Add tab to `components/Tabs.tsx`:
```typescript
{ id: 'week3', label: '📅 Week 3' }
```

3. Add section to `app/page.tsx`:
```tsx
{activeTab === 'week3' && (
  <TaskSection
    title="📅 Week 3: Title"
    subtitle="Description"
    tasks={tasksData.week3}
    // ... props
  />
)}
```

Done! Much cleaner and easier to maintain.

## Next Steps

Now that we have a solid foundation, you can easily:

1. **Add user authentication** - Just add Supabase Auth
2. **Create guide pages** - Add new routes in `app/guides/`
3. **Add more weeks** - Follow the pattern above
4. **Build brand guide** - New page in `app/brand-guide/`
5. **Add API routes** - Use Next.js API routes if needed

## Questions?

The migration is complete and tested. All features work exactly as before, but the code is now much more maintainable and ready for future enhancements!
