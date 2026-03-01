import { useState, type FormEvent } from 'react';
import { useAppContext } from '../../context/AppContext';
import type { Task } from '../../types';

interface Props {
  projectId: string | null;
}

export function AddTaskForm({ projectId }: Props) {
  const { dispatch } = useAppContext();
  const [title, setTitle] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    const task: Task = {
      id: `${Date.now()}-${Math.random()}`,
      title: trimmed,
      projectId,
      done: false,
      priority: null,
      dueDate: null,
      notes: '',
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_TASK', payload: task });
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task..."
        className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded transition-colors"
      >
        Add
      </button>
    </form>
  );
}
