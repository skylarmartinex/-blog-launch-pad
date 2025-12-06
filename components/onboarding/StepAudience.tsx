import React from 'react';

interface StepAudienceProps {
    value: string;
    onChange: (val: string) => void;
}

export default function StepAudience({ value, onChange }: StepAudienceProps) {
    const suggestions = [
        "busy moms", "aspiring freelance writers", "small business owners",
        "college students", "remote workers", "fitness enthusiasts"
    ];

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Who do you want to help?
                </label>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="e.g., aspiring freelance writers"
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
                    autoFocus
                />
            </div>

            <div className="flex flex-wrap gap-2">
                <p className="text-sm text-slate-500 w-full mb-1">Ideas:</p>
                {suggestions.map((s) => (
                    <button
                        key={s}
                        onClick={() => onChange(s)}
                        className="px-3 py-1.5 text-sm bg-slate-800 hover:bg-slate-700 border border-white/5 rounded-full text-slate-300 transition-colors"
                    >
                        {s}
                    </button>
                ))}
            </div>
        </div>
    );
}
