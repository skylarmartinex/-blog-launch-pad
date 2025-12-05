'use client';

import { Task } from '@/lib/data';
import { NoteData } from '@/lib/supabase';
import TaskList from './TaskList';

interface TaskSectionProps {
  title: string;
  subtitle: string;
  tasks: Task[];
  notesData: Record<string, NoteData>;
  progress: number;
  color: string;
  onTaskClick: (taskId: string) => void;
  onToggleComplete: (taskId: string, e: React.MouseEvent) => void;
}

export default function TaskSection({
  title,
  subtitle,
  tasks,
  notesData,
  progress,
  color,
  onTaskClick,
  onToggleComplete,
}: TaskSectionProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-1">{title}</h2>
          <p className="text-slate-500">{subtitle}</p>
        </div>
        <div className="text-right">
          <div className={`text-4xl font-bold ${color}`}>{progress}%</div>
          <div className="text-slate-500 text-sm">Complete</div>
        </div>
      </div>

      <div className="h-1.5 bg-white/10 rounded-full mb-6 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color.replace('text-', 'bg-')}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <TaskList
        tasks={tasks}
        notesData={notesData}
        onTaskClick={onTaskClick}
        onToggleComplete={onToggleComplete}
      />
    </div>
  );
}
