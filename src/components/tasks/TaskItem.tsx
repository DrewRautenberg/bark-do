import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import type { Task } from '../../types';
import { TaskDetail } from './TaskDetail';

const priorityDotColors: Record<string, string> = {
  high: 'bg-[#FF3B30]',
  medium: 'bg-[#FF9500]',
  low: 'bg-[#34C759]',
};

interface Props {
  task: Task;
}

export function TaskItem({ task }: Props) {
  const { dispatch } = useAppContext();
  const [expanded, setExpanded] = useState(false);

  return (
    <li className="group">
      <div
        className="flex items-center gap-3 px-1 py-2.5 cursor-pointer hover:bg-black/[0.03] dark:hover:bg-white/[0.05] rounded-lg transition-colors"
        onClick={() => setExpanded((v) => !v)}
      >
        {task.priority
          ? <span className={`w-2 h-2 rounded-full shrink-0 ${priorityDotColors[task.priority]}`} />
          : <span className="w-2 h-2 shrink-0" />}

        <div
          onClick={(e) => {
            e.stopPropagation();
            dispatch({ type: 'TOGGLE_DONE', payload: { id: task.id } });
          }}
          role="checkbox"
          aria-checked={task.done}
          className={`w-[18px] h-[18px] rounded-full border-2 shrink-0 cursor-pointer flex items-center justify-center transition-colors
            ${task.done ? 'border-[#007AFF] bg-[#007AFF]' : 'border-[#C7C7CC] dark:border-[#48484A] hover:border-[#007AFF]'}`}
        >
          {task.done && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="text-white">
              <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>

        <span className={`flex-1 text-[14px] ${task.done ? 'line-through text-[#AEAEB2] dark:text-[#636366]' : 'font-medium text-[#1C1C1E] dark:text-[#F5F5F7]'}`}>
          {task.title}
        </span>

        {task.dueDate && (
          <span className="text-[12px] text-[#6C6C70] dark:text-[#98989D] shrink-0">{task.dueDate}</span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch({ type: 'DELETE_TASK', payload: { id: task.id } });
          }}
          className="opacity-0 group-hover:opacity-100 text-[#C7C7CC] dark:text-[#48484A] hover:text-[#FF3B30] transition-all text-[15px] leading-none shrink-0"
          aria-label="Delete task"
        >
          ×
        </button>
      </div>

      {expanded && <TaskDetail task={task} />}
    </li>
  );
}
