'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { getOnboardingData, updateOnboardingData, OnboardingData } from '@/lib/supabase';

import WizardStep from '@/components/onboarding/WizardStep';
import StepAudience from '@/components/onboarding/StepAudience';
import StepProblem from '@/components/onboarding/StepProblem';
import StepTools from '@/components/onboarding/StepTools';
import StepOutcome from '@/components/onboarding/StepOutcome';
import StepOrigin from '@/components/onboarding/StepOrigin';
import StepNicheReview from '@/components/onboarding/StepNicheReview';

const STEPS = [
    { id: 'audience', title: 'Start with Who', description: 'Every great blog solves a problem for a specific person.' },
    { id: 'problem', title: 'The Sticky Problem', description: 'What keeps your audience up at night?' },
    { id: 'tools', title: 'Your Mechanism', description: 'How do you help them solve it?' },
    { id: 'outcome', title: 'The Transformation', description: 'Where does your audience want to end up?' },
    { id: 'origin', title: 'Your Origin Story', description: 'Why are you the one to teach this?' },
    { id: 'review', title: 'Your Niche Statement', description: 'Let\'s bring it all together.' },
];

export default function OnboardingPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    const [currentStep, setCurrentStep] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);

    // Form State
    const [formData, setFormData] = useState<OnboardingData>({
        audience: '',
        sticky_problem_choice: '',
        sticky_problem_description: '',
        tools: '',
        outcome: '',
        origin_struggle: '',
        origin_transformation: '',
        origin_result: '',
        final_niche_statement: '',
        niche_alignment: '',
    });

    // Load existing data
    useEffect(() => {
        if (!authLoading && user) {
            loadData();
        } else if (!authLoading && !user) {
            // Redirect to home if not logged in, but maybe allow them to see first step?
            // For now, let's redirect to auth wrapper or just show empty state.
            // Better to wait for auth.
            setDataLoaded(true); // Allow proceed for testing even if no user, but won't save remotely
        }
    }, [user, authLoading]);

    const loadData = async () => {
        try {
            const existing = await getOnboardingData(user?.id);
            if (existing) {
                setFormData(prev => ({ ...prev, ...existing }));
                // Determine step? Maybe just start at 0 or find first empty field?
                // For now, start at 0 to allow review.
            }
        } finally {
            setDataLoaded(true);
        }
    };

    const saveData = async (newData: Partial<OnboardingData>) => {
        // Optimistic update
        setFormData(prev => ({ ...prev, ...newData }));

        if (user) {
            setIsSaving(true);
            try {
                await updateOnboardingData(user.id, { ...formData, ...newData });
            } catch (err) {
                console.error('Failed to save', err);
            } finally {
                setIsSaving(false);
            }
        }
    };

    // Helper to generate niche statement
    const generateNicheStatement = () => {
        const { audience, tools, outcome } = formData;
        return `I help ${audience || '[audience]'} use ${tools || '[tools]'} to ${outcome || '[outcome]'}.`;
    };

    const handleNext = async () => {
        // If going to review step, generate statement
        if (currentStep === STEPS.length - 2) { // Just before review
            const statement = generateNicheStatement();
            await saveData({ final_niche_statement: statement });
        }

        if (currentStep < STEPS.length - 1) {
            setCurrentStep(curr => curr + 1);
            // Logic to auto-save current step data is already handled by individual field onChange + blur usually, 
            // but here we are using state. We should ensure latest state is saved.
            // We already call saveData on change or blur, so this is fine.
        } else {
            // Finish
            if (formData.niche_alignment === 'yes') {
                router.push('/');
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(curr => curr - 1);
        }
    };

    // Render Step Content
    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <StepAudience
                        value={formData.audience || ''}
                        onChange={(val) => saveData({ audience: val })}
                    />
                );
            case 1:
                return (
                    <StepProblem
                        choice={formData.sticky_problem_choice || ''}
                        description={formData.sticky_problem_description || ''}
                        onChoiceChange={(val) => saveData({ sticky_problem_choice: val })}
                        onDescriptionChange={(val) => saveData({ sticky_problem_description: val })}
                    />
                );
            case 2:
                return (
                    <StepTools
                        value={formData.tools || ''}
                        onChange={(val) => saveData({ tools: val })}
                    />
                );
            case 3:
                return (
                    <StepOutcome
                        value={formData.outcome || ''}
                        onChange={(val) => saveData({ outcome: val })}
                    />
                );
            case 4:
                return (
                    <StepOrigin
                        struggle={formData.origin_struggle || ''}
                        transformation={formData.origin_transformation || ''}
                        result={formData.origin_result || ''}
                        onStruggleChange={(val) => saveData({ origin_struggle: val })}
                        onTransformationChange={(val) => saveData({ origin_transformation: val })}
                        onResultChange={(val) => saveData({ origin_result: val })}
                    />
                );
            case 5:
                return (
                    <StepNicheReview
                        nicheStatement={formData.final_niche_statement || generateNicheStatement()}
                        alignment={formData.niche_alignment || ''}
                        onAlignmentChange={(val) => saveData({ niche_alignment: val })}
                    />
                );
            default:
                return null;
        }
    };

    // Validation
    const canGoNext = () => {
        switch (currentStep) {
            case 0: return !!formData.audience;
            case 1: return !!formData.sticky_problem_choice;
            case 2: return !!formData.tools;
            case 3: return !!formData.outcome;
            // Step 4 (Origin) is nice to have but we can make it optional or require at least one? Let's require all 3 for "complete" feel?
            // Prompt says "3 short answers". Let's require them.
            case 4: return !!formData.origin_struggle && !!formData.origin_transformation && !!formData.origin_result;
            case 5: return formData.niche_alignment === 'yes';
            default: return false;
        }
    };

    if (authLoading || !dataLoaded) {
        return <div className="text-center text-slate-400">Loading profile...</div>;
    }

    return (
        <WizardStep
            title={STEPS[currentStep].title}
            description={STEPS[currentStep].description}
            currentStep={currentStep}
            totalSteps={STEPS.length}
            onNext={handleNext}
            onBack={currentStep > 0 ? handleBack : undefined}
            canGoNext={canGoNext()}
            isSaving={isSaving}
        >
            {renderStepContent()}
        </WizardStep>
    );
}
