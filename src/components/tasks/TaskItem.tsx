import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import type { Task } from '../../types';
import { TaskDetail } from './TaskDetail';

const priorityColors: Record<string, string> = {
  high: 'text-red-500',
  medium: 'text-yellow-500',
  low: 'text-green-500',
};

interface Props {
  task: Task;
}

export function TaskItem({ task }: Props) {
  const { dispatch } = useAppContext();
  const [expanded, setExpanded] = useState(false);

  return (
    <li className="border border-gray-200 rounded mb-2 bg-white shadow-sm">
      <div
        className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50"
        onClick={() => setExpanded((v) => !v)}
      >
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => dispatch({ type: 'TOGGLE_DONE', payload: { id: task.id } })}
          onClick={(e) => e.stopPropagation()}
          className="w-4 h-4 cursor-pointer accent-blue-500"
        />

        <span className={`flex-1 text-sm ${task.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {task.title}
        </span>

        {task.priority && (
          <span className={`text-xs font-medium ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
        )}

        {task.dueDate && (
          <span className="text-xs text-gray-400">{task.dueDate}</span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch({ type: 'DELETE_TASK', payload: { id: task.id } });
          }}
          className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none ml-1"
          aria-label="Delete task"
        >
          ×
        </button>
      </div>

      {expanded && <TaskDetail task={task} />}
    </li>
  );
}
