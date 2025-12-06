import React from 'react';

interface StepProblemProps {
    choice: string;
    description: string;
    onChoiceChange: (val: string) => void;
    onDescriptionChange: (val: string) => void;
}

export default function StepProblem({ choice, description, onChoiceChange, onDescriptionChange }: StepProblemProps) {
    const problems = [
        "Saving time / efficiency",
        "Making more money / career growth",
        "Reducing overwhelm / stress",
        "Learning a new skill",
        "Health & wellness improvement"
    ];

    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-300">
                    What is the main value or result you offer?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {problems.map((p) => (
                        <button
                            key={p}
                            onClick={() => onChoiceChange(p)}
                            className={`text-left px-4 py-3 rounded-xl border transition-all ${choice === p
                                    ? 'bg-blue-500/20 border-blue-500 text-white'
                                    : 'bg-slate-900/30 border-white/5 text-slate-400 hover:bg-slate-800'
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            <div className={`transition-all duration-300 ${choice ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-2'}`}>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Describe the moment they feel this problem most acutely (optional but helpful):
                </label>
                <textarea
                    value={description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    placeholder="e.g., When they open their laptop at 8am and feel already behind..."
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600 min-h-[100px]"
                />
            </div>
        </div>
    );
}
