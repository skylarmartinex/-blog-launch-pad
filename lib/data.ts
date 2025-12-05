export interface Task {
  id: string;
  text: string;
  time?: string;
  day?: number;
  hint?: string;
  guideUrl?: string;
}

export interface RoadmapPhase {
  phase: number;
  name: string;
  weeks: string;
  focus: string;
  milestone: string;
  active: boolean;
}

export interface ContentIdea {
  title: string;
  pillar: string;
  keyword: string;
  priority: 'high' | 'medium' | 'low';
}

export interface BacklogItem {
  title: string;
  description: string;
  impact: string;
  tools: string;
}

export interface SOPSection {
  phase: string;
  steps: string[];
}

export interface SOP {
  title: string;
  sections: SOPSection[];
}

export const tasksData: Record<string, Task[]> = {
  day1: [
    { id: 'd1-1', text: 'Define niche statement: "I help [audience] use [tools] to achieve [outcome]"', time: '20 min', hint: 'Example: "I help solo creators use AI tools and systems to work smarter and grow faster"', guideUrl: '/guides/define-your-niche' },
    { id: 'd1-2', text: 'Brainstorm 10-15 blog name ideas', time: '15 min', hint: 'Write down all your ideas, even crazy ones.', guideUrl: '/guides/brainstorm-blog-names' },
    { id: 'd1-3', text: 'Check domain availability (Namecheap/Porkbun)', time: '10 min', hint: 'Note which names are available as .com domains', guideUrl: '/guides/check-domain-availability' },
    { id: 'd1-4', text: 'Purchase your domain (.com preferred)', time: '5 min', hint: 'Write down the domain you purchased' },
    { id: 'd1-5', text: 'Decide on tech stack: WordPress + SiteGround hosting', time: '10 min', hint: 'Note your final decision and why' },
    { id: 'd1-6', text: 'Bookmark SiteGround.com for tomorrow', time: '5 min', hint: 'Done! Ready for Day 2' },
  ],
  week1: [
    { id: 'w1-1', text: 'Day 1: Niche + Domain + Tech decision', day: 1, hint: 'Summary of Day 1 decisions' },
    { id: 'w1-2', text: 'Day 2: Set up hosting + Install WordPress', day: 2, hint: 'Note login details and any issues' },
    { id: 'w1-3', text: 'Day 3: Choose theme + Basic design config', day: 3, hint: 'Theme name, colors, fonts selected' },
    { id: 'w1-4', text: 'Day 4: Write About page + Core pages', day: 4, hint: 'Draft your About page content here' },
    { id: 'w1-5', text: 'Day 5: Define 4 pillars + Brainstorm 20 post ideas', day: 5, hint: 'List content pillars and post ideas' },
    { id: 'w1-6', text: 'Day 6: Outline first 3 posts', day: 6, hint: 'Brief outlines for each post' },
    { id: 'w1-7', text: 'Day 7: Write + Publish Post #1', day: 7, hint: 'Post title, URL, and notes' },
  ],
  week2: [
    { id: 'w2-1', text: 'Day 8: Install Yoast/RankMath + Google Search Console', day: 8, hint: 'Plugin chosen and setup status' },
    { id: 'w2-2', text: 'Day 9: Write + Publish Post #2 (Tool Deep Dive)', day: 9, hint: 'Post title, URL, notes' },
    { id: 'w2-3', text: 'Day 10: Keyword research - find 10 low-comp keywords', day: 10, hint: 'List your 10 target keywords' },
    { id: 'w2-4', text: 'Day 11: Write + Publish Post #3 (Systems/Workflow)', day: 11, hint: 'Post title, URL, notes' },
    { id: 'w2-5', text: 'Day 12: Set up Google Analytics + Dashboard', day: 12, hint: 'Tracking ID and setup status' },
    { id: 'w2-6', text: 'Day 13: Write + Publish Post #4 (Personal Growth)', day: 13, hint: 'Post title, URL, notes' },
    { id: 'w2-7', text: 'Day 14: Weekly review + Plan Week 3', day: 14, hint: 'Week 1-2 review and Week 3 plan' },
  ]
};

export const roadmapData: RoadmapPhase[] = [
  { phase: 1, name: 'Foundation', weeks: '1-4', focus: 'Brand, positioning, tech setup, first 10 posts', milestone: 'Blog live + 10 articles', active: true },
  { phase: 2, name: 'Consistent Publishing', weeks: '5-10', focus: '2-3 posts/week, basic SEO, content calendar', milestone: '30 total posts, traffic baseline', active: false },
  { phase: 3, name: 'Growth', weeks: '11-16', focus: 'Email list, lead magnet, social distribution', milestone: '500 email subscribers', active: false },
  { phase: 4, name: 'Monetization', weeks: '17-20', focus: 'Affiliate content, first digital product', milestone: 'First $500 revenue', active: false },
  { phase: 5, name: 'Automation & Scale', weeks: '21-26', focus: 'Delegate, systematize, AI agents', milestone: '80% publishing automated', active: false },
];

export const ideasData: ContentIdea[] = [
  { title: 'How I Use Claude to Write Blog Posts 2x Faster', pillar: 'Tool Deep Dive', keyword: 'claude ai writing', priority: 'high' },
  { title: 'My Morning Routine System (Built with Notion)', pillar: 'Systems & Workflows', keyword: 'notion morning routine', priority: 'high' },
  { title: 'The Solo Creator Tech Stack for 2025', pillar: 'Tool Deep Dive', keyword: 'creator tech stack', priority: 'medium' },
  { title: '5 Automations Every Solopreneur Needs', pillar: 'Systems & Workflows', keyword: 'solopreneur automations', priority: 'high' },
  { title: 'Why I Quit Productivity Apps (And What I Use Instead)', pillar: 'Personal Growth', keyword: 'productivity apps alternative', priority: 'medium' },
  { title: 'Building My First AI Agent: A Case Study', pillar: 'Case Study', keyword: 'build ai agent tutorial', priority: 'medium' },
  { title: 'The 2-Hour Work Morning: Deep Work for Creators', pillar: 'Personal Growth', keyword: 'deep work morning routine', priority: 'low' },
  { title: 'Zapier vs Make vs n8n: Which Automation Tool Wins?', pillar: 'Tool Deep Dive', keyword: 'zapier vs make comparison', priority: 'high' },
];

export const backlogData: BacklogItem[] = [
  { title: 'Auto-generate post outlines', description: 'AI creates draft outline from keyword + pillar', impact: 'Saves 20 min/post', tools: 'Claude/GPT + Notion AI' },
  { title: 'Social post auto-creation', description: 'Blog publish → auto-generate Twitter/LinkedIn post', impact: 'Removes manual repurposing', tools: 'Zapier/Make + Buffer' },
  { title: 'Keyword research pipeline', description: 'Weekly auto-pull of trending keywords in niche', impact: 'Always have fresh ideas', tools: 'Ahrefs API + Google Sheets' },
  { title: 'Email newsletter automation', description: 'New post → auto-send to subscribers', impact: 'Hands-free list engagement', tools: 'ConvertKit + Zapier' },
  { title: 'Content repurposing queue', description: 'Flag high-performing posts for repurposing', impact: 'Extract more value from winners', tools: 'GA + Notion + Zapier' },
];

export const sopsData: SOP[] = [
  {
    title: 'Blog Post Creation Process',
    sections: [
      { phase: 'Pre-Writing (10 min)', steps: ['Choose topic from Content Ideas', 'Quick keyword check', 'Define target keyword and reader'] },
      { phase: 'Writing (30-45 min)', steps: ['Write headline', 'Write intro hook', 'Write 3-5 subheadings', 'Fill sections (800-1500 words)', 'Add internal + external links', 'Write meta description'] },
      { phase: 'Publishing (10 min)', steps: ['Add featured image', 'Set categories + tags', 'Run SEO checklist', 'Publish or schedule'] },
    ]
  },
  {
    title: 'Weekly Content Planning',
    sections: [
      { phase: 'Review (10 min)', steps: ['Check posts published', 'Note what worked'] },
      { phase: 'Plan (15 min)', steps: ['Pick 2-3 topics', 'Assign to days', 'Note keywords'] },
      { phase: 'Prep (5 min)', steps: ['Block calendar time', 'Set stretch goal'] },
    ]
  },
];

export const pillarClasses: Record<string, string> = {
  'Tool Deep Dive': 'bg-blue-900/30 text-blue-400',
  'Systems & Workflows': 'bg-emerald-900/30 text-emerald-400',
  'Personal Growth': 'bg-amber-900/30 text-amber-400',
  'Case Study': 'bg-purple-900/30 text-purple-400',
};
