import { RoadmapPhase } from '@/lib/data';

interface RoadmapProps {
  phases: RoadmapPhase[];
}

export default function Roadmap({ phases }: RoadmapProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">🗺️ 6-Month Roadmap</h2>
      <div className="flex flex-col gap-5">
        {phases.map((phase) => (
          <div
            key={phase.phase}
            className={`grid grid-cols-[60px_1fr] gap-5 p-5 rounded-xl border-2 ${
              phase.active
                ? 'bg-blue-500/10 border-blue-500'
                : 'bg-white/[0.02] border-white/[0.05]'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                phase.active ? 'bg-blue-500 text-white' : 'bg-white/10 text-slate-500'
              }`}
            >
              {phase.phase}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className={`text-lg font-bold ${phase.active ? 'text-blue-400' : 'text-slate-200'}`}>
                  {phase.name}
                </span>
                <span className="px-2.5 py-0.5 bg-white/10 rounded-full text-xs text-slate-400">
                  Weeks {phase.weeks}
                </span>
                {phase.active && (
                  <span className="px-2.5 py-0.5 bg-blue-500 rounded-full text-xs text-white font-semibold">
                    CURRENT
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-sm mb-2">{phase.focus}</p>
              <p className="text-slate-200 text-sm">
                🎯 <strong>Milestone:</strong> {phase.milestone}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
