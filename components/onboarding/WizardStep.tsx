import React from 'react';

interface WizardStepProps {
    title: string;
    description: string;
    children: React.ReactNode;
    onNext: () => void;
    onBack?: () => void;
    canGoNext: boolean;
    isSaving?: boolean;
    currentStep: number;
    totalSteps: number;
}

export default function WizardStep({
    title,
    description,
    children,
    onNext,
    onBack,
    canGoNext,
    isSaving,
    currentStep,
    totalSteps,
}: WizardStepProps) {
    const progressPercentage = Math.round(((currentStep) / totalSteps) * 100);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2 text-center">
                <div className="flex items-center justify-center space-x-1 mb-6">
                    {Array.from({ length: totalSteps }).map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-300 ${idx < currentStep ? 'w-8 bg-blue-500' : idx === currentStep ? 'w-8 bg-blue-500/50' : 'w-2 bg-slate-700'
                                }`}
                        />
                    ))}
                </div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
                    {title}
                </h1>
                <p className="text-slate-400 text-lg">{description}</p>
            </div>

            <div className="min-h-[200px] py-4">
                {children}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <button
                    onClick={onBack}
                    disabled={!onBack}
                    className={`px-6 py-2 rounded-lg text-slate-400 hover:text-white transition-colors ${!onBack ? 'invisible' : ''}`}
                >
                    Back
                </button>

                <button
                    onClick={onNext}
                    disabled={!canGoNext || isSaving}
                    className={`px-8 py-3 rounded-xl font-medium transition-all transform active:scale-95 ${canGoNext && !isSaving
                            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                            : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                        }`}
                >
                    {isSaving ? (
                        <span className="flex items-center">
                            <span className="animate-spin mr-2">⟳</span> Saving...
                        </span>
                    ) : (
                        currentStep === totalSteps - 1 ? 'Finish' : 'Next Step'
                    )}
                </button>
            </div>
        </div>
    );
}
