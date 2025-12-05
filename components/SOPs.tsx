import { SOP } from '@/lib/data';

interface SOPsProps {
  sops: SOP[];
}

export default function SOPs({ sops }: SOPsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">📋 Standard Operating Procedures</h2>
      <div>
        {sops.map((sop, index) => (
          <div key={index} className="p-6 bg-white/[0.02] rounded-xl border border-white/[0.08] mb-6">
            <div className="text-lg font-bold mb-5 text-blue-400">{sop.title}</div>
            {sop.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-5 last:mb-0">
                <div className="text-sm font-semibold text-amber-500 mb-3 uppercase tracking-wide">
                  {section.phase}
                </div>
                <div className="pl-4 border-l-2 border-white/10">
                  {section.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start gap-3 text-slate-300 text-sm mb-2">
                      <span className="text-slate-500">•</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
