import Link from 'next/link';

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>
        {children}
      </div>
    </div>
  );
}
