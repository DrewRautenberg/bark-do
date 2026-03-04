import { NavLink } from 'react-router';
import { useAppContext } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { useDarkMode } from '../../hooks/useDarkMode';
import { ProjectListItem } from '../projects/ProjectListItem';
import { NewProjectForm } from '../projects/NewProjectForm';

export function Sidebar() {
  const { state } = useAppContext();
  const { signOut } = useAuth();
  const [isDark, toggleDark] = useDarkMode();
  const inboxCount = state.tasks.filter((t) => t.projectId === null && !t.done).length;

  return (
    <aside className="w-[240px] shrink-0 bg-[#F5F4F2] dark:bg-[#1C1C1E] border-r border-[#E5E5EA] dark:border-[#3A3A3C] h-screen flex flex-col py-6 px-3 gap-5">
      <div className="text-[15px] font-semibold text-[#1C1C1E] dark:text-[#F5F5F7] tracking-[-0.01em] px-3">
        Bark Do
      </div>

      <nav className="flex flex-col gap-0.5">
        <NavLink
          to="/inbox"
          className={({ isActive }) =>
            `flex items-center gap-2.5 text-[13px] px-3 py-1.5 rounded-lg transition-colors ${
              isActive
                ? 'bg-[#007AFF] text-white font-medium'
                : 'text-[#1C1C1E] dark:text-[#F5F5F7] hover:bg-black/[0.05] dark:hover:bg-white/[0.08]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              Inbox
              {inboxCount > 0 && (
                <span className={`ml-auto text-[12px] ${isActive ? 'text-white/70' : 'text-[#1C1C1E] dark:text-[#F5F5F7]'}`}>
                  {inboxCount}
                </span>
              )}
            </>
          )}
        </NavLink>
      </nav>

      <div className="border-t border-[#E5E5EA] dark:border-[#3A3A3C]" />

      <div className="flex flex-col gap-1">
        <div className="text-[11px] font-semibold text-[#6C6C70] dark:text-[#98989D] uppercase tracking-[0.06em] px-3 mb-1">
          Projects
        </div>
        <div className="flex flex-col gap-0.5">
          {state.projects.map((p) => (
            <ProjectListItem key={p.id} project={p} />
          ))}
        </div>
        <NewProjectForm />
      </div>

      <div className="mt-auto flex flex-col gap-0.5">
        <button
          onClick={toggleDark}
          className="w-full text-left text-[13px] text-[#6C6C70] dark:text-[#98989D] px-3 py-1.5 rounded-lg hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? '☀ Light mode' : '☾ Dark mode'}
        </button>
        <button
          onClick={signOut}
          className="w-full text-left text-[13px] text-[#6C6C70] dark:text-[#98989D] px-3 py-1.5 rounded-lg hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-colors"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
