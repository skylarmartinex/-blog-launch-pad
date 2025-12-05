import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://troqjlpihzzrfbqchlce.supabase.co';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyb3FqbHBpaHp6cmZicWNobGNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3MTk1NzcsImV4cCI6MjA4MDI5NTU3N30.2wUslY5QtwkRKLLfDeZlZyTdtdROZnTIgQqnrjpqJII';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export interface NoteData {
  note: string;
  completed: boolean;
}

export interface UserNote {
  id?: number;
  user_id?: string;
  task_id: string;
  note_content: string;
  updated_at?: string;
}

// Helper functions for user-specific queries
export async function loadUserNotes(userId: string | undefined) {
  if (!userId) {
    // Fallback to localStorage for non-authenticated users
    const localData = localStorage.getItem('blogLaunchPad_notes');
    return localData ? JSON.parse(localData) : {};
  }

  try {
    const { data, error } = await supabase
      .from('user_notes')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    const notes: Record<string, NoteData> = {};
    if (data) {
      data.forEach((row) => {
        const isCompleted = row.note_content && row.note_content.startsWith('[COMPLETED]');
        notes[row.task_id] = {
          note: isCompleted ? row.note_content.replace('[COMPLETED]', '').trim() : (row.note_content || ''),
          completed: isCompleted,
        };
      });
    }
    return notes;
  } catch (err) {
    console.error('Error loading notes:', err);
    const localData = localStorage.getItem('blogLaunchPad_notes');
    return localData ? JSON.parse(localData) : {};
  }
}

export async function saveUserNote(
  userId: string | undefined,
  taskId: string,
  noteContent: string,
  isCompleted: boolean
) {
  const contentToSave = isCompleted ? `[COMPLETED]${noteContent}` : noteContent;

  if (!userId) {
    // Save to localStorage for non-authenticated users
    const localData = localStorage.getItem('blogLaunchPad_notes');
    const notes = localData ? JSON.parse(localData) : {};
    notes[taskId] = { note: noteContent, completed: isCompleted };
    localStorage.setItem('blogLaunchPad_notes', JSON.stringify(notes));
    return;
  }

  try {
    const { data: existing } = await supabase
      .from('user_notes')
      .select('id')
      .eq('task_id', taskId)
      .eq('user_id', userId)
      .single();

    if (existing) {
      await supabase
        .from('user_notes')
        .update({ note_content: contentToSave, updated_at: new Date().toISOString() })
        .eq('task_id', taskId)
        .eq('user_id', userId);
    } else {
      await supabase
        .from('user_notes')
        .insert({
          user_id: userId,
          task_id: taskId,
          note_content: contentToSave,
          updated_at: new Date().toISOString(),
        });
    }

    // Also save to localStorage as backup
    const localData = localStorage.getItem('blogLaunchPad_notes');
    const notes = localData ? JSON.parse(localData) : {};
    notes[taskId] = { note: noteContent, completed: isCompleted };
    localStorage.setItem('blogLaunchPad_notes', JSON.stringify(notes));
  } catch (err) {
    console.error('Error saving note:', err);
    // Fallback to localStorage
    const localData = localStorage.getItem('blogLaunchPad_notes');
    const notes = localData ? JSON.parse(localData) : {};
    notes[taskId] = { note: noteContent, completed: isCompleted };
    localStorage.setItem('blogLaunchPad_notes', JSON.stringify(notes));
  }
}

export async function resetUserProgress(userId: string | undefined) {
  if (!userId) {
    localStorage.removeItem('blogLaunchPad_notes');
    return;
  }

  try {
    await supabase
      .from('user_notes')
      .delete()
      .eq('user_id', userId);
    localStorage.removeItem('blogLaunchPad_notes');
  } catch (err) {
    console.error('Error resetting progress:', err);
  }
}
