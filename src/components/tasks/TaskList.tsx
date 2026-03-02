import type { Task } from '../../types';
import { TaskItem } from './TaskItem';

interface Props {
  tasks: Task[];
}

export function TaskList({ tasks }: Props) {
  if (tasks.length === 0) {
    return <p className="text-[13px] text-[#AEAEB2] py-8 text-center">No tasks yet.</p>;
  }

  return (
    <ul className="divide-y divide-[#E5E5EA]">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
