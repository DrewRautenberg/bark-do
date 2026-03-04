import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../../context/AppContext';
import type { Project } from '../../types';

export function NewProjectForm() {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    const project: Project = {
      id: `${Date.now()}-${Math.random()}`,
      name: trimmed,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_PROJECT', payload: project });
    navigate(`/projects/${project.id}`);
    setName('');
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full text-left text-[13px] text-[#AEAEB2] dark:text-[#636366] hover:text-[#6C6C70] dark:hover:text-[#98989D] px-3 py-1.5 rounded-lg transition-colors"
      >
        + New Project
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="px-3 py-1">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project name"
        autoFocus
        onBlur={() => { setOpen(false); setName(''); }}
        className="w-full border border-[#C7C7CC] dark:border-[#48484A] rounded-md px-2.5 py-1 text-[13px] text-[#1C1C1E] dark:text-[#F5F5F7] bg-white dark:bg-[#2C2C2E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50 placeholder:text-[#AEAEB2] dark:placeholder:text-[#636366]"
      />
      <button type="submit" className="sr-only">Add</button>
    </form>
  );
}
