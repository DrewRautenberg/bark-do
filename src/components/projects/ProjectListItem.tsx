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
      <form onSubmit={handleRename} className="flex gap-1 px-2 py-1">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          onBlur={handleRename}
          className="flex-1 border border-gray-300 rounded px-2 py-0.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </form>
    );
  }

  return (
    <div className="group flex items-center gap-1 rounded hover:bg-gray-100">
      <NavLink
        to={`/projects/${project.id}`}
        className={({ isActive }) =>
          `flex-1 text-sm px-2 py-1 rounded truncate ${isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}`
        }
      >
        {project.name}
      </NavLink>
      <button
        onClick={() => { setName(project.name); setRenaming(true); }}
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 text-xs px-1 transition-opacity"
        aria-label="Rename project"
      >
        ✎
      </button>
      <button
        onClick={() => dispatch({ type: 'DELETE_PROJECT', payload: { id: project.id } })}
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 text-lg leading-none px-1 transition-opacity"
        aria-label="Delete project"
      >
        ×
      </button>
    </div>
  );
}
