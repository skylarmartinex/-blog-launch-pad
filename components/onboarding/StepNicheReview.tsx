import React from 'react';

interface StepNicheReviewProps {
    nicheStatement: string;
    alignment: string; // 'yes' | 'no' | ''
    onAlignmentChange: (val: string) => void;
}

export default function StepNicheReview({ nicheStatement, alignment, onAlignmentChange }: StepNicheReviewProps) {
    return (
        <div className="space-y-8">
            <div className="p-6 bg-gradient-to-r from-blue-900/40 to-slate-900 border border-blue-500/30 rounded-2xl text-center">
                <p className="text-slate-400 text-sm uppercase tracking-wider mb-3">Your Niche Statement</p>
                <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-blue-200">
                    "{nicheStatement}"
                </h3>
            </div>

            <div className="space-y-4 text-center">
                <label className="block text-lg font-medium text-slate-200">
                    Does this niche feel exciting and aligned for you?
                </label>

                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={() => onAlignmentChange('yes')}
                        className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${alignment === 'yes'
                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 scale-105'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                            }`}
                    >
                        YES! 🚀
                    </button>

                    <button
                        onClick={() => onAlignmentChange('no')}
                        className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${alignment === 'no'
                                ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/20 scale-105'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                            }`}
                    >
                        Not yet... 🤔
                    </button>
                </div>

                {alignment === 'no' && (
                    <p className="text-amber-400 animate-in fade-in slide-in-from-top-2">
                        That's okay! You can go back and tweak your answers until it feels right.
                    </p>
                )}
            </div>
        </div>
    );
}
