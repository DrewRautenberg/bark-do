import { useAppContext } from '../context/AppContext';
import { AddTaskForm } from '../components/tasks/AddTaskForm';
import { TaskList } from '../components/tasks/TaskList';

export function InboxRoute() {
  const { state } = useAppContext();
  const tasks = state.tasks.filter((t) => t.projectId === null);

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-4">Inbox</h1>
      <AddTaskForm projectId={null} />
      <TaskList tasks={tasks} />
    </div>
  );
}
