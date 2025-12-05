'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Task } from '@/lib/data';

interface TaskModalProps {
  isOpen: boolean;
  task: Task | null;
  initialNote: string;
  isCompleted: boolean;
  onClose: () => void;
  onSave: (note: string, completed: boolean) => void;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
}

export default function TaskModal({
  isOpen,
  task,
  initialNote,
  isCompleted,
  onClose,
  onSave,
  saveStatus,
}: TaskModalProps) {
  const [note, setNote] = useState(initialNote);
  const [completed, setCompleted] = useState(isCompleted);

  useEffect(() => {
    setNote(initialNote);
    setCompleted(isCompleted);
  }, [initialNote, isCompleted, task]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSaveAndClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, note, completed]);

  const handleToggleComplete = () => {
    const newCompleted = !completed;
    setCompleted(newCompleted);
    onSave(note, newCompleted);
  };

  const handleSaveAndClose = () => {
    onSave(note, completed);
    onClose();
  };

  if (!isOpen || !task) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
      onClick={handleSaveAndClose}
    >
      <div
        className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6 gap-4">
          <h3 className="text-xl font-bold text-slate-200 leading-snug">
            {task.text}
          </h3>
          <button
            onClick={handleSaveAndClose}
            className="bg-white/10 hover:bg-white/20 border-none rounded-lg w-9 h-9 flex items-center justify-center cursor-pointer text-slate-400 hover:text-white text-xl flex-shrink-0 transition-all"
          >
            ×
          </button>
        </div>

        {task.guideUrl && (
          <Link
            href={task.guideUrl}
            target="_blank"
            className="flex items-center gap-2 px-4 py-3 mb-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-500/30 rounded-xl transition-all text-blue-300 hover:text-blue-200 no-underline"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="font-semibold">View Complete Guide</span>
            <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        )}

        <div className="mb-6">
          <label className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3 block">
            Your Notes & Answers
          </label>
          <textarea
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
              onSave(e.target.value, completed);
            }}
            placeholder={task.hint || 'Write your notes here...'}
            className="w-full min-h-[200px] bg-black/30 border border-white/10 rounded-xl p-4 text-slate-200 font-sans resize-y leading-relaxed focus:outline-none focus:border-purple-400 placeholder:text-slate-600"
          />
        </div>

        <div className="flex gap-3 justify-end flex-wrap">
          <span className="text-sm text-slate-500 mr-auto flex items-center gap-2">
            {saveStatus === 'saving' && '⏳ Saving...'}
            {saveStatus === 'saved' && <span className="text-emerald-500">✓ Saved</span>}
            {saveStatus === 'error' && '⚠️ Error'}
          </span>

          <button
            onClick={handleToggleComplete}
            className={`px-6 py-3 rounded-xl font-semibold text-sm cursor-pointer transition-all border ${
              completed
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30'
            }`}
          >
            {completed ? '✓ Completed' : 'Mark Complete'}
          </button>

          <button
            onClick={handleSaveAndClose}
            className="px-6 py-3 rounded-xl font-semibold text-sm cursor-pointer transition-all bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/40"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
}
