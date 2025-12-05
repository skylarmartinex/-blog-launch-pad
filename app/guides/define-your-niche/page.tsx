import GuideTemplate from '@/components/GuideTemplate';

export const metadata = {
  title: 'Define Your Niche Statement | Blog Launch Pad',
  description: 'Learn how to craft a compelling niche statement that clearly defines who you help and how.',
};

export default function DefineYourNichePage() {
  return (
    <GuideTemplate
      guideId="define-your-niche"
      title="Define Your Niche Statement"
      description='Create a clear "I help [audience] use [tools] to achieve [outcome]" statement that will guide your entire blog strategy.'
      timeEstimate="20 minutes"
      difficulty="Beginner"
      sections={[
        {
          title: 'Why Your Niche Statement Matters',
          content: [
            'Your niche statement is the foundation of your entire blog. It answers three critical questions: Who are you writing for? What tools or methods do you use? What results do you help them achieve?',
            'A clear niche statement helps you stay focused, makes it easier to create content, and helps readers immediately understand if your blog is for them.',
            '**Example:** "I help solo creators use AI tools and systems to work smarter and grow faster"',
          ],
        },
        {
          title: 'The Formula: [Audience] + [Tools] + [Outcome]',
          content: [
            '**Audience:** Be specific! Instead of "everyone" or "people," think about who specifically benefits from your expertise. Are they beginners? Professionals? Parents? Students?',
            '**Tools:** What specific methods, technologies, or approaches do you use? This could be software (like Notion, AI tools), frameworks (productivity systems), or methodologies (minimalism, automation).',
            '**Outcome:** What tangible result do you help them achieve? Focus on transformation: save time, make money, reduce stress, learn faster, etc.',
          ],
        },
        {
          title: 'Finding Your Audience',
          content: [
            'Think about who you were 2-3 years ago. What were you struggling with? Who would have benefited from your current knowledge?',
            'Consider: What\'s their skill level? What\'s their main problem? What stage are they at in their journey?',
            'Be specific: "solo creators" is better than "people," "parents of toddlers" is better than "parents"',
          ],
          exercise: {
            id: 'audience',
            prompt: 'Write down 3 different audience types you could help. Be as specific as possible.',
            fields: [
              { id: 'audience-1', placeholder: 'Example: Junior developers learning their first framework' },
              { id: 'audience-2', placeholder: 'Example: Busy parents trying to meal prep' },
              { id: 'audience-3', placeholder: 'Example: Solopreneurs building their first business' },
            ],
          },
        },
        {
          title: 'Identify the Sticky Problem',
          content: [
            'A "sticky problem" is the burning issue your audience faces daily. It keeps them up at night and they\'re actively seeking solutions.',
            'This is NOT just a minor inconvenience - it\'s a problem they\'ll invest time and money to solve.',
            'When you identify the right sticky problem, your content will immediately resonate because readers will think: "This person gets me!"',
          ],
          exercise: {
            id: 'sticky-problem',
            prompt: 'Choose the core problem your audience faces, then describe the moment they realize they have it.',
            fields: [
              {
                id: 'sticky-problem-choice',
                label: 'What is the main problem your audience faces?',
                type: 'select',
                options: [
                  'Saving time',
                  'Making money',
                  'Reducing overwhelm',
                  'Growing an audience',
                  'Learning AI tools',
                  'Getting organized',
                  'Starting a business',
                  'Other',
                ],
                placeholder: 'Select the primary problem...',
              },
              {
                id: 'sticky-problem-description',
                label: 'Describe the moment your audience realizes they have this problem',
                type: 'textarea',
                placeholder: 'Example: They\'re scrolling social media at 11pm, seeing everyone else crushing it, while they haven\'t published in weeks...',
              },
            ],
          },
        },
        {
          title: 'Your Origin Story',
          content: [
            'Your origin story is what makes you credible and relatable. It shows you\'ve been where your audience is now.',
            'This isn\'t about bragging - it\'s about showing the transformation journey that proves you can help them.',
            'The best origin stories follow this pattern: Struggle → Discovery → Transformation → Result',
          ],
          exercise: {
            id: 'origin-story',
            prompt: 'Share your journey from struggle to success.',
            fields: [
              {
                id: 'origin-struggle',
                label: 'What were you struggling with before you learned what you know now?',
                type: 'textarea',
                placeholder: 'Example: I was working 60-hour weeks, constantly overwhelmed, and burning out trying to do everything manually...',
              },
              {
                id: 'origin-transformation',
                label: 'What changed everything for you?',
                type: 'textarea',
                placeholder: 'Example: I discovered AI automation tools and learned how to systematize my workflow...',
              },
              {
                id: 'origin-result',
                label: 'What result did you achieve that others want?',
                type: 'textarea',
                placeholder: 'Example: Now I work 30 hours a week, doubled my output, and have time for my family...',
              },
            ],
          },
        },
        {
          title: 'Choosing Your Tools/Methods',
          content: [
            'What tools, systems, or approaches are you genuinely excited about? Authenticity matters more than trends.',
            'You don\'t need to be an expert - you just need to be one step ahead of your audience.',
            '**Examples:** AI tools, Notion templates, productivity frameworks, minimalism, automation, content systems, specific software',
          ],
          exercise: {
            id: 'tools',
            prompt: 'List 5 tools/methods you\'re excited about teaching or sharing.',
            fields: [
              { id: 'tool-1', placeholder: 'Example: AI writing assistants' },
              { id: 'tool-2', placeholder: 'Example: Notion databases' },
              { id: 'tool-3', placeholder: 'Example: Time-blocking methods' },
              { id: 'tool-4', placeholder: 'Example: Content automation systems' },
              { id: 'tool-5', placeholder: 'Example: Email marketing tools' },
            ],
          },
        },
        {
          title: 'Defining the Outcome',
          content: [
            'What transformation do you enable? Think beyond features to benefits.',
            '**Bad:** "learn productivity tools" | **Good:** "work 4 hours less per week"',
            '**Bad:** "use AI" | **Good:** "create content 2x faster"',
            'Make it measurable and tangible when possible.',
          ],
          exercise: {
            id: 'outcomes',
            prompt: 'Define 3 concrete outcomes you can help people achieve. Make them specific and measurable.',
            fields: [
              { id: 'outcome-1', placeholder: 'Example: Save 10+ hours per week' },
              { id: 'outcome-2', placeholder: 'Example: Launch their first product in 30 days' },
              { id: 'outcome-3', placeholder: 'Example: Double their content output' },
            ],
          },
        },
        {
          title: 'Putting It All Together',
          content: [
            'Now combine all three elements: "I help **[specific audience]** use **[your tools/methods]** to **[achieve specific outcome]**"',
            'Test it: Does it feel authentic? Would your ideal reader immediately think "that\'s me!"? Is it specific enough to stand out?',
            'Write 3-5 variations in your notes, then pick the one that feels most natural and exciting to you.',
          ],
          exercise: {
            id: 'niche-statement',
            prompt: 'Write 3-5 complete niche statements using the formula.',
            fields: [
              { id: 'statement-1', placeholder: 'Example: I help busy parents use meal prep systems to save 10+ hours per week' },
              { id: 'statement-2', placeholder: 'Example: I help junior developers use AI coding assistants to level up faster' },
              { id: 'statement-3', placeholder: 'Your third variation...' },
              { id: 'statement-4', placeholder: 'Your fourth variation...', optional: true },
              { id: 'statement-5', placeholder: 'Your fifth variation...', optional: true },
            ],
          },
        },
        {
          title: 'Examples of Great Niche Statements',
          content: [
            '**"I help busy parents use meal prep systems to save 10+ hours per week"**',
            '**"I help junior developers use AI coding assistants to level up faster"**',
            '**"I help solopreneurs use no-code tools to automate their business"**',
            '**"I help writers use productivity frameworks to finish their first book"**',
            'Notice how each one is specific, actionable, and outcome-focused.',
          ],
        },
        {
          title: 'Your Final Niche Statement',
          content: [
            'Review your work from the previous exercises. Look at your audience types, tools, outcomes, and draft statements.',
            'Choose the ONE niche statement that feels most authentic and exciting to you. This will guide everything you create.',
            'Remember: You can always refine this later, but having a clear direction now is more important than finding the "perfect" niche.',
          ],
          exercise: {
            id: 'final-niche',
            prompt: 'Write your final niche statement here. This is what will guide your entire blog strategy!',
            placeholder: 'I help [audience] use [tools] to [outcome]',
            multiline: false,
          },
        },
        {
          title: 'Niche Alignment Check',
          content: [
            'Before you move forward, let\'s make sure everything feels right. Review what you\'ve built:',
            '**Your Audience:** The specific people you help',
            '**Their Sticky Problem:** The burning issue that keeps them up at night',
            '**Your Origin Story:** How you transformed from where they are to where they want to be',
            '**Your Tools/Methods:** The specific approaches you teach',
            '**Your Promised Outcome:** The tangible result you help them achieve',
            'When all these pieces align, your niche becomes magnetic. Your ideal readers will immediately know: "This blog is for ME."',
          ],
          exercise: {
            id: 'niche-alignment',
            prompt: 'Look at everything you\'ve defined above. Does this niche feel exciting and aligned for you?',
            fields: [
              {
                id: 'niche-alignment-check',
                label: 'Does this niche feel exciting and aligned?',
                type: 'radio',
                options: [
                  'Yes - I\'m excited to move forward with this!',
                  'Not quite - I need to revise something',
                ],
              },
            ],
          },
        },
      ]}
      nextGuide={{
        title: 'Brainstorm Blog Names',
        href: '/guides/brainstorm-blog-names',
      }}
    />
  );
}
