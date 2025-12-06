import React from 'react';

interface StepOriginProps {
    struggle: string;
    transformation: string;
    result: string;
    onStruggleChange: (val: string) => void;
    onTransformationChange: (val: string) => void;
    onResultChange: (val: string) => void;
}

export default function StepOrigin({
    struggle, transformation, result,
    onStruggleChange, onTransformationChange, onResultChange
}: StepOriginProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">
                    1. What did you use to struggle with?
                </label>
                <input
                    type="text"
                    value={struggle}
                    onChange={(e) => onStruggleChange(e.target.value)}
                    placeholder="e.g., I was overwhelmed by..."
                    className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-base focus:ring-2 focus:ring-blue-500/50 outline-none"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">
                    2. What changed things for you?
                </label>
                <input
                    type="text"
                    value={transformation}
                    onChange={(e) => onTransformationChange(e.target.value)}
                    placeholder="e.g., I discovered system X..."
                    className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-base focus:ring-2 focus:ring-blue-500/50 outline-none"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">
                    3. What result did you achieve that others want?
                </label>
                <input
                    type="text"
                    value={result}
                    onChange={(e) => onResultChange(e.target.value)}
                    placeholder="e.g., Now I can..."
                    className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-base focus:ring-2 focus:ring-blue-500/50 outline-none"
                />
            </div>
        </div>
    );
}
