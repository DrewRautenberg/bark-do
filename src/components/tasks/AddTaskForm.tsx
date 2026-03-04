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
    <form onSubmit={handleSubmit} className="flex items-center gap-3 px-1 py-2.5">
      <span className="w-2 h-2 shrink-0" />
      <div className="w-[18px] h-[18px] rounded-full border-2 border-dashed border-[#C7C7CC] dark:border-[#48484A] shrink-0 flex items-center justify-center text-[#AEAEB2] dark:text-[#636366] text-[10px] leading-none">
        +
      </div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task"
        className="flex-1 text-[14px] text-[#1C1C1E] dark:text-[#F5F5F7] placeholder:text-[#AEAEB2] dark:placeholder:text-[#636366] bg-transparent focus:outline-none"
      />
      <button type="submit" className="sr-only">Add</button>
    </form>
  );
}
