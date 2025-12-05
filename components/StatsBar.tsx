interface StatsBarProps {
  day1Progress: number;
  week1Progress: number;
  week2Progress: number;
}

export default function StatsBar({ day1Progress, week1Progress, week2Progress }: StatsBarProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 text-center backdrop-blur-md">
        <div className="text-slate-500 text-xs mb-1 uppercase tracking-wider">Day 1 Progress</div>
        <div className="text-3xl font-bold text-blue-500">{day1Progress}%</div>
      </div>
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 text-center backdrop-blur-md">
        <div className="text-slate-500 text-xs mb-1 uppercase tracking-wider">Week 1 Progress</div>
        <div className="text-3xl font-bold text-emerald-500">{week1Progress}%</div>
      </div>
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 text-center backdrop-blur-md">
        <div className="text-slate-500 text-xs mb-1 uppercase tracking-wider">Week 2 Progress</div>
        <div className="text-3xl font-bold text-amber-500">{week2Progress}%</div>
      </div>
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 text-center backdrop-blur-md">
        <div className="text-slate-500 text-xs mb-1 uppercase tracking-wider">Current Phase</div>
        <div className="text-3xl font-bold text-purple-500">Foundation</div>
      </div>
    </div>
  );
}
