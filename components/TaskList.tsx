'use client';

import { Task } from '@/lib/data';
import { NoteData } from '@/lib/supabase';

interface TaskListProps {
  tasks: Task[];
  notesData: Record<string, NoteData>;
  onTaskClick: (taskId: string) => void;
  onToggleComplete: (taskId: string, e: React.MouseEvent) => void;
}

export default function TaskList({ tasks, notesData, onTaskClick, onToggleComplete }: TaskListProps) {
  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => {
        const taskData = notesData[task.id] || { note: '', completed: false };
        const isDone = taskData.completed;
        const hasNotes = taskData.note && taskData.note.trim().length > 0;
        const notePreview = hasNotes
          ? taskData.note.substring(0, 50) + (taskData.note.length > 50 ? '...' : '')
          : '';

        return (
          <div
            key={task.id}
            onClick={() => onTaskClick(task.id)}
            className={`flex items-center gap-4 p-4 md:p-5 bg-white/[0.02] rounded-xl cursor-pointer border transition-all hover:translate-x-1 hover:bg-white/[0.05] ${
              isDone
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'border-white/[0.05]'
            } ${
              hasNotes ? 'border-l-[3px] border-l-purple-400' : ''
            }`}
          >
            <input
              type="checkbox"
              checked={isDone}
              onChange={() => {}}
              onClick={(e) => onToggleComplete(task.id, e)}
              className="appearance-none w-6 h-6 border-2 border-white/30 rounded-md cursor-pointer transition-all flex-shrink-0 checked:bg-gradient-to-r checked:from-blue-600 checked:to-purple-600 checked:border-transparent relative"
              style={{
                backgroundImage: isDone ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : 'none',
              }}
            />
            {isDone && (
              <span className="absolute w-6 h-6 flex items-center justify-center text-white text-xs font-bold pointer-events-none">
                ✓
              </span>
            )}

            {task.day && (
              <span className="w-16 text-purple-400 font-mono text-sm flex-shrink-0">
                Day {task.day}
              </span>
            )}

            <div className="flex-1 flex flex-col gap-1">
              <span className={`${isDone ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                {task.text}
              </span>
              {hasNotes && (
                <span className="text-sm text-purple-400 italic whitespace-nowrap overflow-hidden text-ellipsis max-w-md">
                  📝 {notePreview}
                </span>
              )}
            </div>

            {task.time && (
              <span className="px-3 py-1 bg-blue-500/20 rounded-full text-sm text-blue-400 font-mono flex-shrink-0">
                {task.time}
              </span>
            )}

            <span className="hidden md:block px-3 py-1.5 bg-purple-500/20 rounded-lg text-xs text-purple-400 flex-shrink-0">
              Edit
            </span>
          </div>
        );
      })}
    </div>
  );
}
