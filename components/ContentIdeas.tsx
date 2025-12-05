import { ContentIdea, pillarClasses } from '@/lib/data';

interface ContentIdeasProps {
  ideas: ContentIdea[];
}

export default function ContentIdeas({ ideas }: ContentIdeasProps) {
  const priorityClasses = {
    high: 'bg-red-500/20 text-red-400',
    medium: 'bg-amber-500/20 text-amber-400',
    low: 'bg-slate-500/20 text-slate-400',
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">💡 Content Ideas Bank</h2>
      <div>
        {ideas.map((idea, index) => (
          <div
            key={index}
            className="p-5 bg-white/[0.02] rounded-xl border border-white/[0.05] flex justify-between items-center gap-4 mb-4 flex-wrap"
          >
            <div>
              <div className="text-base font-semibold text-slate-200 mb-2">
                {idea.title}
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${pillarClasses[idea.pillar]}`}>
                  {idea.pillar}
                </span>
                <span className="px-3 py-1 rounded-full text-xs bg-white/[0.05] text-slate-400">
                  🔑 {idea.keyword}
                </span>
              </div>
            </div>
            <span className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase ${priorityClasses[idea.priority]}`}>
              {idea.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
