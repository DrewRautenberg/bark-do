import { useAppContext } from '../context/AppContext';
import { TaskList } from '../components/tasks/TaskList';

export function LogRoute() {
  const { state } = useAppContext();
  const tasks = state.tasks
    .filter((t) => t.done)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div>
      <h1 className="text-[22px] font-semibold text-[#1C1C1E] dark:text-white tracking-[-0.02em] mb-6">Log</h1>
      {tasks.length === 0 ? (
        <p className="text-[13px] text-[#6C6C70] dark:text-[#98989D] px-1">No completed tasks yet.</p>
      ) : (
        <div className="border border-[#E5E5EA] rounded-xl overflow-hidden">
          <TaskList tasks={tasks} />
        </div>
      )}
    </div>
  );
}
