'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import StatsBar from '@/components/StatsBar';
import Tabs from '@/components/Tabs';
import TaskSection from '@/components/TaskSection';
import TaskModal from '@/components/TaskModal';
import AuthModal from '@/components/AuthModal';
import Roadmap from '@/components/Roadmap';
import ContentIdeas from '@/components/ContentIdeas';
import Backlog from '@/components/Backlog';
import SOPs from '@/components/SOPs';
import { tasksData, roadmapData, ideasData, backlogData, sopsData } from '@/lib/data';
import { loadUserNotes, saveUserNote, resetUserProgress, NoteData } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import type { Task } from '@/lib/data';

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('day1');
  const [notesData, setNotesData] = useState<Record<string, NoteData>>({});
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null);

  // Calculate progress
  const calculateProgress = (category: string) => {
    const tasks = tasksData[category];
    const done = tasks.filter(t => notesData[t.id]?.completed).length;
    return Math.round((done / tasks.length) * 100);
  };

  const day1Progress = calculateProgress('day1');
  const week1Progress = calculateProgress('week1');
  const week2Progress = calculateProgress('week2');

  // Load notes when user changes or auth completes
  useEffect(() => {
    if (!authLoading) {
      loadNotes();
    }
  }, [user, authLoading]);

  const loadNotes = async () => {
    const notes = await loadUserNotes(user?.id);
    setNotesData(notes);
  };

  const saveNote = useCallback(async (taskId: string, noteContent: string, isCompleted: boolean) => {
    setSaveStatus('saving');

    // Clear existing timeout
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }

    // Debounce the save
    const timeout = setTimeout(async () => {
      try {
        await saveUserNote(user?.id, taskId, noteContent, isCompleted);

        // Update local state
        setNotesData(prev => ({
          ...prev,
          [taskId]: { note: noteContent, completed: isCompleted }
        }));

        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      } catch (err) {
        console.error('Error saving note:', err);
        setSaveStatus('error');
      }
    }, 1000);

    setSaveTimeout(timeout);
  }, [saveTimeout, user]);

  const handleTaskClick = (taskId: string) => {
    let task: Task | null = null;
    for (const category of Object.values(tasksData)) {
      task = category.find(t => t.id === taskId) || null;
      if (task) break;
    }

    // If task has a guide URL, navigate directly to it
    if (task?.guideUrl) {
      window.location.href = task.guideUrl;
      return;
    }

    // Otherwise open the modal
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleToggleComplete = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentData = notesData[taskId] || { note: '', completed: false };
    saveNote(taskId, currentData.note, !currentData.completed);
  };

  const handleModalSave = (note: string, completed: boolean) => {
    if (currentTask) {
      saveNote(currentTask.id, note, completed);
    }
  };

  const handleResetProgress = async () => {
    if (!confirm('Reset all progress? This cannot be undone.')) return;

    await resetUserProgress(user?.id);
    setNotesData({});
  };

  if (authLoading) {
    return (
      <div className="max-w-5xl mx-auto flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-4xl mb-4">🚀</div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Header onShowAuth={() => setIsAuthModalOpen(true)} />

      {!user && (
        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl text-center">
          <p className="text-blue-400 text-sm">
            👋 Sign in to sync your progress across all devices!
          </p>
        </div>
      )}

      <StatsBar
        day1Progress={day1Progress}
        week1Progress={week1Progress}
        week2Progress={week2Progress}
      />
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 min-h-[500px] backdrop-blur-md">
        {activeTab === 'day1' && (
          <TaskSection
            title="⚡ Day 1: Foundation Launch"
            subtitle="Complete these tasks in 60-90 minutes to get started"
            tasks={tasksData.day1}
            notesData={notesData}
            progress={day1Progress}
            color="text-blue-500"
            onTaskClick={handleTaskClick}
            onToggleComplete={handleToggleComplete}
          />
        )}

        {activeTab === 'week1' && (
          <TaskSection
            title="📅 Week 1: Foundation & Identity"
            subtitle="Get the blog live with clear positioning"
            tasks={tasksData.week1}
            notesData={notesData}
            progress={week1Progress}
            color="text-emerald-500"
            onTaskClick={handleTaskClick}
            onToggleComplete={handleToggleComplete}
          />
        )}

        {activeTab === 'week2' && (
          <TaskSection
            title="📅 Week 2: Content Engine Start"
            subtitle="Build momentum with 3-4 posts + basic SEO"
            tasks={tasksData.week2}
            notesData={notesData}
            progress={week2Progress}
            color="text-amber-500"
            onTaskClick={handleTaskClick}
            onToggleComplete={handleToggleComplete}
          />
        )}

        {activeTab === 'roadmap' && <Roadmap phases={roadmapData} />}
        {activeTab === 'ideas' && <ContentIdeas ideas={ideasData} />}
        {activeTab === 'backlog' && <Backlog items={backlogData} />}
        {activeTab === 'sops' && <SOPs sops={sopsData} />}
      </div>

      <div className="mt-6 text-center text-slate-600 text-sm">
        <p>
          {user ? '✨ Your progress syncs automatically across all devices' : '💾 Progress saved locally'}
        </p>
        <button
          onClick={handleResetProgress}
          className="mt-3 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm cursor-pointer hover:bg-red-500/30 transition-all"
        >
          Reset All Progress
        </button>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        task={currentTask}
        initialNote={currentTask ? notesData[currentTask.id]?.note || '' : ''}
        isCompleted={currentTask ? notesData[currentTask.id]?.completed || false : false}
        onClose={() => setIsModalOpen(false)}
        onSave={handleModalSave}
        saveStatus={saveStatus}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
