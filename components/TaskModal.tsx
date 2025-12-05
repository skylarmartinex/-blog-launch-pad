'use client';

import { useState, useEffect } from 'react';
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
