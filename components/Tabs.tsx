'use client';

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'day1', label: '⚡ Day 1' },
  { id: 'week1', label: '📅 Week 1' },
  { id: 'week2', label: '📅 Week 2' },
  { id: 'roadmap', label: '🗺️ Roadmap' },
  { id: 'ideas', label: '💡 Content Ideas' },
  { id: 'backlog', label: '🔧 Automations' },
  { id: 'sops', label: '📋 SOPs' },
];

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className="flex gap-2 mb-6 flex-wrap bg-black/30 p-2 rounded-xl">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-5 py-3 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
            activeTab === tab.id
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
              : 'bg-transparent text-slate-400 hover:bg-white/10'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
