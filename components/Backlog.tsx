import { BacklogItem } from '@/lib/data';

interface BacklogProps {
  items: BacklogItem[];
}

export default function Backlog({ items }: BacklogProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">🔧 Future Automations Backlog</h2>
      <p className="text-slate-500 mb-6">Tasks flagged for automation when ready</p>
      <div>
        {items.map((item, index) => (
          <div key={index} className="p-5 bg-white/[0.02] rounded-xl border border-white/[0.05] mb-4">
            <div className="flex justify-between items-start mb-3 flex-wrap gap-3">
              <span className="text-base font-semibold text-slate-200">{item.title}</span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-semibold uppercase">
                [AUTOMATE]
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-3">{item.description}</p>
            <div className="flex gap-4 flex-wrap text-sm">
              <span className="text-emerald-400">💪 {item.impact}</span>
              <span className="text-blue-400 font-mono">🛠️ {item.tools}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
