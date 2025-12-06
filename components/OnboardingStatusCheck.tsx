'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getOnboardingData } from '@/lib/supabase';

export default function OnboardingStatusCheck({ userId }: { userId: string }) {
    const [complete, setComplete] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        checkStatus();
    }, [userId]);

    const checkStatus = async () => {
        const data = await getOnboardingData(userId);
        // Consider complete if niche_alignment is 'yes'
        if (data?.niche_alignment === 'yes') {
            setComplete(true);
        } else {
            setComplete(false);
            // Auto-redirect if strictly enforcing onboarding
            // router.push('/onboarding');
            // NOTE: Commented out for now to allow viewing dashboard during development.
            // Uncomment to enforce strict redirect.
        }
    };

    if (complete === null) return null; // Loading

    if (complete) {
        return (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <span className="text-xl">✅</span>
                    <div>
                        <p className="font-medium text-emerald-400">Niche Defined</p>
                        <p className="text-sm text-emerald-500/60">Your blog foundation is set.</p>
                    </div>
                </div>
                <Link
                    href="/profile"
                    className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg text-emerald-400 text-sm transition-colors"
                >
                    View Profile
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">🚀 Start Your Blog Launchpad</h3>
                    <p className="text-blue-100">
                        Let's define your niche, audience, and offer in 5 minutes.
                    </p>
                </div>
                <Link
                    href="/onboarding"
                    className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all whitespace-nowrap"
                >
                    Start Onboarding Wizard &rarr;
                </Link>
            </div>
        </div>
    );
}
