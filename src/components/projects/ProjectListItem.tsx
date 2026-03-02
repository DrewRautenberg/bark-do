import { useState, type FormEvent } from 'react';
import { NavLink } from 'react-router';
import { useAppContext } from '../../context/AppContext';
import type { Project } from '../../types';

interface Props {
  project: Project;
}

export function ProjectListItem({ project }: Props) {
  const { dispatch } = useAppContext();
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState(project.name);

  function handleRename(e: FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed && trimmed !== project.name) {
      dispatch({ type: 'RENAME_PROJECT', payload: { id: project.id, name: trimmed } });
    }
    setRenaming(false);
  }

  if (renaming) {
    return (
      <form onSubmit={handleRename} className="px-3 py-1">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          onBlur={handleRename}
          className="w-full border border-[#C7C7CC] rounded-md px-2.5 py-1 text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50"
        />
      </form>
    );
  }

  return (
    <div className="group flex items-center rounded-lg hover:bg-black/[0.05] transition-colors">
      <NavLink
        to={`/projects/${project.id}`}
        className={({ isActive }) =>
          `flex-1 text-[13px] px-3 py-1.5 truncate ${isActive ? 'text-[#007AFF] font-medium' : 'text-[#1C1C1E]'}`
        }
      >
        {project.name}
      </NavLink>
      <button
        onClick={() => { setName(project.name); setRenaming(true); }}
        className="opacity-0 group-hover:opacity-100 text-[#AEAEB2] hover:text-[#6C6C70] text-[11px] px-1.5 transition-opacity"
        aria-label="Rename project"
      >
        ✎
      </button>
      <button
        onClick={() => dispatch({ type: 'DELETE_PROJECT', payload: { id: project.id } })}
        className="opacity-0 group-hover:opacity-100 text-[#AEAEB2] hover:text-[#FF3B30] text-sm px-1.5 leading-none transition-opacity"
        aria-label="Delete project"
      >
        ×
      </button>
    </div>
  );
}
