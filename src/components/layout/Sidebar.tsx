import { NavLink } from 'react-router';
import { useAppContext } from '../../context/AppContext';
import { ProjectListItem } from '../projects/ProjectListItem';
import { NewProjectForm } from '../projects/NewProjectForm';

export function Sidebar() {
  const { state } = useAppContext();

  return (
    <aside className="w-64 shrink-0 bg-gray-50 border-r border-gray-200 h-screen flex flex-col p-4 gap-4">
      <div className="text-lg font-bold text-gray-800">Bark-Do</div>

      <nav className="flex flex-col gap-1">
        <NavLink
          to="/inbox"
          className={({ isActive }) =>
            `text-sm px-2 py-1 rounded ${isActive ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`
          }
        >
          📥 Inbox
        </NavLink>
      </nav>

      <div className="flex flex-col gap-1">
        <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider px-2">
          Projects
        </div>
        {state.projects.map((p) => (
          <ProjectListItem key={p.id} project={p} />
        ))}
        <NewProjectForm />
      </div>
    </aside>
  );
}
