export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-500/30">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-slate-900 pointer-events-none" />
            <div className="relative flex flex-col items-center justify-center min-h-screen p-6">
                <main className="w-full max-w-2xl bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                    {children}
                </main>
            </div>
        </div>
    );
}
