import GuideTemplate from '@/components/GuideTemplate';

export const metadata = {
  title: 'Brainstorm Blog Names | Blog Launch Pad',
  description: 'Generate creative, memorable blog name ideas that align with your niche and brand.',
};

export default function BrainstormBlogNamesPage() {
  return (
    <GuideTemplate
      guideId="brainstorm-blog-names"
      title="Brainstorm 10-15 Blog Name Ideas"
      description="Generate creative, memorable names that capture your niche and are available as domains."
      timeEstimate="15 minutes"
      difficulty="Beginner"
      sections={[
        {
          title: 'What Makes a Great Blog Name?',
          content: [
            'A great blog name is: **memorable** (easy to remember and spell), **relevant** (hints at your niche), **unique** (stands out from competitors), and **available** (as a .com domain).',
            'It should roll off the tongue easily and not be too long. Aim for 1-3 words maximum.',
            'Think about how it will look on social media, in Google search results, and on business cards.',
          ],
        },
        {
          title: 'Naming Strategies to Try',
          content: [
            '**Strategy 1: Descriptive Names** - Directly describe what you do. Examples: "The AI Creator," "Notion Systems," "Solo Productivity"',
            '**Strategy 2: Coined Words** - Combine two words. Examples: "TechCraft," "WorkWise," "BlogBuilder"',
            '**Strategy 3: Your Name + Niche** - Personal brand approach. Examples: "Sarah\'s Systems," "Mike Makes Tech Simple"',
            '**Strategy 4: Action-Oriented** - Start with a verb. Examples: "Create Faster," "Build Better," "Launch Daily"',
            '**Strategy 5: Metaphor** - Use imagery. Examples: "Digital Compass," "Creative Launchpad," "The Growth Lab"',
          ],
          exercise: {
            id: 'niche-keywords',
            prompt: 'List 10 keywords from your niche statement (your audience, tools, outcomes, related words)',
            fields: [
              { id: 'keyword-1', placeholder: 'Example: AI' },
              { id: 'keyword-2', placeholder: 'Example: creators' },
              { id: 'keyword-3', placeholder: 'Example: automation' },
              { id: 'keyword-4', placeholder: 'Example: systems' },
              { id: 'keyword-5', placeholder: 'Example: productivity' },
              { id: 'keyword-6', placeholder: 'Example: growth' },
              { id: 'keyword-7', placeholder: 'Your keyword...' },
              { id: 'keyword-8', placeholder: 'Your keyword...' },
              { id: 'keyword-9', placeholder: 'Your keyword...' },
              { id: 'keyword-10', placeholder: 'Your keyword...' },
            ],
          },
        },
        {
          title: 'Brainstorming Techniques',
          content: [
            '**Free Association:** Write your niche keywords, then write every related word that comes to mind for 5 minutes straight.',
            '**Word Combining:** Take words from your niche statement and combine them in different ways.',
            '**Thesaurus Mining:** Look up synonyms for your key concepts. "Help" → "Guide," "Launch," "Build," "Create"',
            '**Sound it Out:** Say potential names out loud. Does it sound good? Is it easy to pronounce?',
          ],
          exercise: {
            id: 'action-verbs',
            prompt: 'Write 5 action verbs related to your topic (what you help people do)',
            fields: [
              { id: 'verb-1', placeholder: 'Example: Launch' },
              { id: 'verb-2', placeholder: 'Example: Build' },
              { id: 'verb-3', placeholder: 'Example: Create' },
              { id: 'verb-4', placeholder: 'Example: Grow' },
              { id: 'verb-5', placeholder: 'Example: Automate' },
            ],
          },
        },
        {
          title: 'Generate Your Name Ideas',
          content: [
            'Now it\'s time to combine everything! Use your keywords, action verbs, and the 5 naming strategies above.',
            'Don\'t filter yourself yet - write down EVERY idea, even the ones that seem silly. Sometimes the "bad" ideas spark better ones.',
            'Try combining words in different ways, using metaphors, adding your name, or creating new words.',
          ],
          exercise: {
            id: 'name-ideas',
            prompt: 'Brainstorm 15+ blog name ideas. Mix and match your keywords and strategies! Write one per line.',
            placeholder: 'TechLaunchpad\nThe AI Creator\nBuild Faster\nSarah\'s Systems\nAutomation Academy\nCreate Daily\nGrowth Lab\nSmartWork Systems\n...',
            multiline: true,
          },
        },
        {
          title: 'Common Pitfalls to Avoid',
          content: [
            '❌ **Too long or complex:** "TheUltimateProductivityAndAutomationBlog" is a mouthful',
            '❌ **Hard to spell:** Creative spellings like "Creatorz" or "Teh Blog" cause confusion',
            '❌ **Too generic:** "Best Blog" or "Cool Stuff" doesn\'t tell readers anything',
            '❌ **Trendy words that will age poorly:** Today\'s buzzwords are tomorrow\'s clichés',
            '❌ **Negative connotations:** Research to make sure your name doesn\'t mean something unfortunate in other languages',
          ],
        },
        {
          title: 'Testing Your Ideas',
          content: [
            'For each name idea, ask: Can I spell it easily over the phone? Will people remember it after hearing it once? Does it give a hint about my niche?',
            'Share your top 3-5 with friends. Which ones do they remember the next day?',
            'Google each name. Is it already heavily used? Does it have any negative associations?',
          ],
          exercise: {
            id: 'top-names',
            prompt: 'From your brainstorm, pick your top 5 favorite names. Test them using the criteria above.',
            fields: [
              { id: 'top-1', placeholder: '1. Your favorite name' },
              { id: 'top-2', placeholder: '2. Second choice' },
              { id: 'top-3', placeholder: '3. Third choice' },
              { id: 'top-4', placeholder: '4. Fourth choice' },
              { id: 'top-5', placeholder: '5. Fifth choice' },
            ],
          },
        },
        {
          title: 'Pro Tips',
          content: [
            '💡 Don\'t overthink it - your content matters more than the perfect name',
            '💡 Shorter is usually better - aim for under 15 characters if possible',
            '💡 Make sure it\'s not already trademarked (quick USPTO search)',
            '💡 Consider how it will look as a social media handle (@yourname)',
            '💡 Write down EVERY idea, even the silly ones - they often spark better ideas',
          ],
        },
        {
          title: 'Next Step: Check Domain Availability',
          content: [
            'Once you have your top 5 names, you\'ll need to check if the .com domain is available.',
            'In the next guide, we\'ll show you how to quickly check domain availability and what to do if your first choice is taken.',
            'Don\'t get too attached to any single name yet - flexibility is key!',
          ],
        },
      ]}
      prevGuide={{
        title: 'Define Your Niche',
        href: '/guides/define-your-niche',
      }}
      nextGuide={{
        title: 'Check Domain Availability',
        href: '/guides/check-domain-availability',
      }}
    />
  );
}
