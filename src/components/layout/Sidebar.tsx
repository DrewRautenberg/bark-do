import { NavLink } from 'react-router';
import { useAppContext } from '../../context/AppContext';
import { ProjectListItem } from '../projects/ProjectListItem';
import { NewProjectForm } from '../projects/NewProjectForm';

export function Sidebar() {
  const { state } = useAppContext();

  return (
    <aside className="w-[240px] shrink-0 bg-[#F5F4F2] border-r border-[#E5E5EA] h-screen flex flex-col py-6 px-3 gap-5">
      <div className="text-[15px] font-semibold text-[#1C1C1E] tracking-[-0.01em] px-3">
        Bark-Do
      </div>

      <nav className="flex flex-col gap-0.5">
        <NavLink
          to="/inbox"
          className={({ isActive }) =>
            `flex items-center gap-2.5 text-[13px] px-3 py-1.5 rounded-lg transition-colors ${
              isActive
                ? 'bg-[#007AFF] text-white font-medium'
                : 'text-[#1C1C1E] hover:bg-black/[0.05]'
            }`
          }
        >
          Inbox
        </NavLink>
      </nav>

      <div className="border-t border-[#E5E5EA]" />

      <div className="flex flex-col gap-1">
        <div className="text-[11px] font-semibold text-[#6C6C70] uppercase tracking-[0.06em] px-3 mb-1">
          Projects
        </div>
        <div className="flex flex-col gap-0.5">
          {state.projects.map((p) => (
            <ProjectListItem key={p.id} project={p} />
          ))}
        </div>
        <NewProjectForm />
      </div>
    </aside>
  );
}
