import type { Task } from '../../types';
import { TaskItem } from './TaskItem';

interface Props {
  tasks: Task[];
}

export function TaskList({ tasks }: Props) {
  if (tasks.length === 0) {
    return <p className="text-sm text-gray-400 py-4">No tasks here. Add one above!</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
