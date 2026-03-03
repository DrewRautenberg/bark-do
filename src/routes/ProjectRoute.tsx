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
      <h1 className="text-[22px] font-semibold text-[#1C1C1E] tracking-[-0.02em] mb-6">{project.name}</h1>
      <div className="border border-[#E5E5EA] rounded-xl overflow-hidden">
        <TaskList tasks={tasks} />
        <div className="border-t border-[#E5E5EA]">
          <AddTaskForm projectId={project.id} />
        </div>
      </div>
    </div>
  );
}
