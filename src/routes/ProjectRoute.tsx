import { Navigate, useParams } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { AddTaskForm } from '../components/tasks/AddTaskForm';
import { TaskList } from '../components/tasks/TaskList';

export function ProjectRoute() {
  const { projectId } = useParams<{ projectId: string }>();
  const { state } = useAppContext();

  const project = state.projects.find((p) => p.id === projectId);
  if (!project) return <Navigate to="/inbox" replace />;

  const tasks = state.tasks.filter((t) => t.projectId === projectId);

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-4">{project.name}</h1>
      <AddTaskForm projectId={projectId!} />
      <TaskList tasks={tasks} />
    </div>
  );
}
