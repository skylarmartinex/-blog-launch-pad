'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { getOnboardingData, updateOnboardingData, OnboardingData } from '@/lib/supabase';
import Header from '@/components/Header';

export default function ProfilePage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [formData, setFormData] = useState<OnboardingData>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                router.push('/');
                return;
            }
            loadData();
        }
    }, [user, authLoading, router]);

    const loadData = async () => {
        const data = await getOnboardingData(user?.id);
        if (data) setFormData(data);
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await updateOnboardingData(user?.id, formData);
            alert('Profile updated!');
        } catch (err) {
            alert('Error saving profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10 text-center text-slate-400">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto min-h-screen text-slate-100 p-6">
            <Header onShowAuth={() => { }} /> {/* Should already be authed */}

            <div className="mt-8 bg-slate-900/50 border border-white/10 rounded-2xl p-8">
                <h1 className="text-3xl font-bold mb-6">Your Niche Profile</h1>

                <form onSubmit={handleSave} className="space-y-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-400">Audience</label>
                            <input
                                className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white"
                                value={formData.audience || ''}
                                onChange={e => setFormData({ ...formData, audience: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-400">Tools / Mechanism</label>
                            <input
                                className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white"
                                value={formData.tools || ''}
                                onChange={e => setFormData({ ...formData, tools: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-400">Outcome</label>
                        <input
                            className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white"
                            value={formData.outcome || ''}
                            onChange={e => setFormData({ ...formData, outcome: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-400">Sticky Problem Description</label>
                        <textarea
                            className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white min-h-[100px]"
                            value={formData.sticky_problem_description || ''}
                            onChange={e => setFormData({ ...formData, sticky_problem_description: e.target.value })}
                        />
                    </div>

                    <div className="space-y-4 pt-6 border-t border-white/10">
                        <h3 className="text-xl font-semibold text-slate-300">Origin Story</h3>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-400">Struggle</label>
                            <input
                                className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white"
                                value={formData.origin_struggle || ''}
                                onChange={e => setFormData({ ...formData, origin_struggle: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-400">Transformation</label>
                            <input
                                className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white"
                                value={formData.origin_transformation || ''}
                                onChange={e => setFormData({ ...formData, origin_transformation: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-400">Result</label>
                            <input
                                className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white"
                                value={formData.origin_result || ''}
                                onChange={e => setFormData({ ...formData, origin_result: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-6">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-medium transition-colors"
                        >
                            {saving ? 'Saving...' : 'Save Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
