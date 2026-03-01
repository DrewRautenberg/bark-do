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
        className="w-full text-left text-sm text-gray-400 hover:text-gray-600 px-2 py-1 rounded transition-colors"
      >
        + New Project
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-1">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project name"
        autoFocus
        onBlur={() => { setOpen(false); setName(''); }}
        className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white text-sm px-2 py-1 rounded hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
}
