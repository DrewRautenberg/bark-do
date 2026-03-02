import { useAppContext } from '../context/AppContext';
import { AddTaskForm } from '../components/tasks/AddTaskForm';
import { TaskList } from '../components/tasks/TaskList';

export function InboxRoute() {
  const { state } = useAppContext();
  const tasks = state.tasks.filter((t) => t.projectId === null);

  return (
    <div>
      <h1 className="text-[22px] font-semibold text-[#1C1C1E] tracking-[-0.02em] mb-6">Inbox</h1>
      <div className="border border-[#E5E5EA] rounded-xl overflow-hidden">
        <TaskList tasks={tasks} />
        <div className="border-t border-[#E5E5EA]">
          <AddTaskForm projectId={null} />
        </div>
      </div>
    </div>
  );
}
