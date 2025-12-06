import React from 'react';

interface StepToolsProps {
    value: string;
    onChange: (val: string) => void;
}

export default function StepTools({ value, onChange }: StepToolsProps) {
    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    What specific tools, systems, or methods do you teach?
                </label>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="e.g., Notion templates, Python scripts, Keto recipes, 15-minute workouts"
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
                    autoFocus
                />
                <p className="text-xs text-slate-500 mt-2">
                    This gives your advice a concrete mechanism.
                </p>
            </div>
        </div>
    );
}
