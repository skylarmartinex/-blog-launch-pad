'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';

interface GuideExerciseField {
  id: string;
  label?: string;
  placeholder?: string;
  multiline?: boolean;
  optional?: boolean;
}

interface GuideExercise {
  id: string;
  prompt: string;
  fields?: GuideExerciseField[]; // Multiple structured inputs
  // Legacy support for single input
  placeholder?: string;
  multiline?: boolean;
}

interface GuideSection {
  title: string;
  content: string[];
  exercise?: GuideExercise;
}

interface GuideTemplateProps {
  guideId: string;
  title: string;
  description: string;
  timeEstimate: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  sections: GuideSection[];
  nextGuide?: {
    title: string;
    href: string;
  };
  prevGuide?: {
    title: string;
    href: string;
  };
}

export default function GuideTemplate({
  guideId,
  title,
  description,
  timeEstimate,
  difficulty,
  sections,
  nextGuide,
  prevGuide,
}: GuideTemplateProps) {
  const { user } = useAuth();
  const [exerciseResponses, setExerciseResponses] = useState<Record<string, string>>({});
  const [unlockedSections, setUnlockedSections] = useState<number[]>([0]); // First section always unlocked
  const [isSaving, setIsSaving] = useState(false);

  const difficultyColors = {
    Beginner: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    Intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    Advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  // Load saved responses
  useEffect(() => {
    loadProgress();
  }, [user, guideId]);

  // Auto-unlock sections without exercises
  useEffect(() => {
    const sectionsToUnlock: number[] = [0]; // First section always unlocked

    sections.forEach((section, index) => {
      // If this section is unlocked and has no exercise, unlock the next one
      if (!section.exercise && index < sections.length - 1) {
        sectionsToUnlock.push(index + 1);
      }
    });

    // Build the full unlock list
    const allUnlocked = new Set<number>(sectionsToUnlock);
    unlockedSections.forEach(idx => allUnlocked.add(idx));

    const newUnlocked = Array.from(allUnlocked).sort((a, b) => a - b);
    if (JSON.stringify(newUnlocked) !== JSON.stringify(unlockedSections)) {
      setUnlockedSections(newUnlocked);
    }
  }, [sections, unlockedSections]);

  const loadProgress = async () => {
    if (!user) {
      // Load from localStorage
      const saved = localStorage.getItem(`guide_${guideId}_responses`);
      if (saved) {
        const data = JSON.parse(saved);
        setExerciseResponses(data.responses || {});
        setUnlockedSections(data.unlockedSections || [0]);
      }
      return;
    }

    // Load from Supabase
    const { data, error } = await supabase
      .from('guide_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('guide_id', guideId)
      .single();

    if (data && !error) {
      setExerciseResponses(data.responses || {});
      setUnlockedSections(data.unlocked_sections || [0]);
    }
  };

  const saveProgress = async (responses: Record<string, string>, unlocked: number[]) => {
    setIsSaving(true);

    if (!user) {
      // Save to localStorage
      localStorage.setItem(`guide_${guideId}_responses`, JSON.stringify({
        responses,
        unlockedSections: unlocked,
      }));
      setIsSaving(false);
      return;
    }

    // Save to Supabase
    const { error } = await supabase
      .from('guide_progress')
      .upsert({
        user_id: user.id,
        guide_id: guideId,
        responses,
        unlocked_sections: unlocked,
        updated_at: new Date().toISOString(),
      });

    if (error) console.error('Error saving progress:', error);
    setIsSaving(false);
  };

  const handleExerciseChange = (exerciseId: string, value: string) => {
    const updated = { ...exerciseResponses, [exerciseId]: value };
    setExerciseResponses(updated);
  };

  const handleExerciseSubmit = async (sectionIndex: number, exercise: GuideExercise) => {
    // Check if using multiple fields or single input
    if (exercise.fields) {
      // Validate all required fields are filled
      const allRequiredFilled = exercise.fields.every(field => {
        if (field.optional) return true; // Skip optional fields
        const value = exerciseResponses[field.id]?.trim();
        return value && value.length > 0;
      });

      if (!allRequiredFilled) {
        alert('Please complete all required fields before continuing.');
        return;
      }
    } else {
      // Legacy single input validation
      const response = exerciseResponses[exercise.id]?.trim();
      if (!response) {
        alert('Please complete the exercise before continuing.');
        return;
      }
    }

    // Unlock next section
    const nextSectionIndex = sectionIndex + 1;
    if (nextSectionIndex < sections.length && !unlockedSections.includes(nextSectionIndex)) {
      const updated = [...unlockedSections, nextSectionIndex].sort((a, b) => a - b);
      setUnlockedSections(updated);
      await saveProgress(exerciseResponses, updated);

      // Scroll to next section
      setTimeout(() => {
        const nextSection = document.getElementById(`section-${nextSectionIndex}`);
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      await saveProgress(exerciseResponses, unlockedSections);
    }
  };

  return (
    <article className="prose prose-invert prose-slate max-w-none">
      {/* Header */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 mb-8 backdrop-blur-md">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="text-xl text-slate-300 mb-6">{description}</p>

        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg text-sm font-medium">
            ⏱️ {timeEstimate}
          </span>
          <span className={`px-4 py-2 border rounded-lg text-sm font-medium ${difficultyColors[difficulty]}`}>
            📊 {difficulty}
          </span>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        {sections.map((section, index) => {
          const isUnlocked = unlockedSections.includes(index);
          const isLocked = !isUnlocked;

          return (
            <section
              key={index}
              id={`section-${index}`}
              className={`bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 ${isLocked ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold text-slate-200 flex items-center gap-3 m-0">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold">
                    {index + 1}
                  </span>
                  {section.title}
                </h2>
                {isLocked && (
                  <span className="text-slate-500 text-sm flex items-center gap-2">
                    🔒 Complete previous section
                  </span>
                )}
              </div>

              <div className="space-y-4 text-slate-300 leading-relaxed">
                {section.content.map((paragraph, pIndex) => (
                  <div key={pIndex} className="text-base prose-p:m-0 prose-strong:text-blue-400 prose-strong:font-semibold">
                    <ReactMarkdown>{paragraph}</ReactMarkdown>
                  </div>
                ))}
              </div>

              {/* Exercise Section */}
              {section.exercise && isUnlocked && (
                <div className="mt-6 p-5 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-2xl">✍️</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-blue-300 mb-2 mt-0">Exercise</h3>
                      <p className="text-slate-300 text-sm mb-4">{section.exercise.prompt}</p>
                    </div>
                  </div>

                  {/* Multiple structured fields */}
                  {section.exercise.fields ? (
                    <div className="space-y-4">
                      {section.exercise.fields.map((field, fieldIndex) => (
                        <div key={field.id}>
                          {field.label && (
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                              {fieldIndex + 1}. {field.label} {field.optional && <span className="text-slate-500 text-xs">(optional)</span>}
                            </label>
                          )}
                          {!field.label && field.optional && (
                            <label className="block text-sm font-medium text-slate-500 mb-2 text-xs">
                              {fieldIndex + 1}. (optional)
                            </label>
                          )}
                          {field.multiline ? (
                            <textarea
                              value={exerciseResponses[field.id] || ''}
                              onChange={(e) => handleExerciseChange(field.id, e.target.value)}
                              placeholder={field.placeholder || 'Type your response here...'}
                              className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 min-h-[100px] resize-y"
                              rows={3}
                            />
                          ) : (
                            <input
                              type="text"
                              value={exerciseResponses[field.id] || ''}
                              onChange={(e) => handleExerciseChange(field.id, e.target.value)}
                              placeholder={field.placeholder || 'Type your response here...'}
                              className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Legacy single input */
                    section.exercise.multiline ? (
                      <textarea
                        value={exerciseResponses[section.exercise.id] || ''}
                        onChange={(e) => handleExerciseChange(section.exercise.id, e.target.value)}
                        placeholder={section.exercise.placeholder || 'Type your response here...'}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 min-h-[120px] resize-y"
                        rows={5}
                      />
                    ) : (
                      <input
                        type="text"
                        value={exerciseResponses[section.exercise.id] || ''}
                        onChange={(e) => handleExerciseChange(section.exercise.id, e.target.value)}
                        placeholder={section.exercise.placeholder || 'Type your response here...'}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                      />
                    )
                  )}

                  <button
                    onClick={() => handleExerciseSubmit(index, section.exercise!)}
                    disabled={isSaving}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-all"
                  >
                    {isSaving ? 'Saving...' : index === sections.length - 1 ? 'Complete Guide' : 'Save & Continue'}
                  </button>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center gap-4 flex-wrap">
        {prevGuide ? (
          <Link
            href={prevGuide.href}
            className="flex items-center gap-2 px-6 py-3 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] rounded-xl transition-all text-slate-300 hover:text-white no-underline"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <div className="text-left">
              <div className="text-xs text-slate-500">Previous</div>
              <div className="font-semibold">{prevGuide.title}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextGuide && (
          <Link
            href={nextGuide.href}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl transition-all text-white no-underline ml-auto"
          >
            <div className="text-right">
              <div className="text-xs text-blue-100">Next</div>
              <div className="font-semibold">{nextGuide.title}</div>
            </div>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </article>
  );
}
