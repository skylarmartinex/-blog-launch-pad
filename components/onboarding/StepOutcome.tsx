import React from 'react';

interface StepOutcomeProps {
    value: string;
    onChange: (val: string) => void;
}

export default function StepOutcome({ value, onChange }: StepOutcomeProps) {
    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    What is the ultimate transformation or result they achieve?
                </label>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="e.g., quit their 9-5 job, lose 10lbs without cardio, build their first app"
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
                    autoFocus
                />
                <p className="text-xs text-slate-500 mt-2">
                    Think about the "After" state.
                </p>
            </div>
        </div>
    );
}
