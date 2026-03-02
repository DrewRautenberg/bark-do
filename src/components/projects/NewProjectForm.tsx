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
        className="w-full text-left text-[13px] text-[#AEAEB2] hover:text-[#6C6C70] px-3 py-1.5 rounded-lg transition-colors"
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
        className="w-full border border-[#C7C7CC] rounded-md px-2.5 py-1 text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50 placeholder:text-[#AEAEB2]"
      />
      <button type="submit" className="sr-only">Add</button>
    </form>
  );
}
