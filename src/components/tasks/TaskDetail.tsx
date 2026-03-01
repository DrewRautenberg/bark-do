import { useAppContext } from '../../context/AppContext';
import type { Task } from '../../types';

interface Props {
  task: Task;
}

export function TaskDetail({ task }: Props) {
  const { state, dispatch } = useAppContext();

  function update(changes: Partial<Task>) {
    dispatch({ type: 'UPDATE_TASK', payload: { id: task.id, changes } });
  }

  return (
    <div className="mt-2 pl-6 pr-2 pb-2 space-y-2 text-sm" onClick={(e) => e.stopPropagation()}>
      <div className="flex flex-wrap gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 font-medium">Due date</span>
          <input
            type="date"
            value={task.dueDate ?? ''}
            onChange={(e) => update({ dueDate: e.target.value || null })}
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 font-medium">Priority</span>
          <select
            value={task.priority ?? ''}
            onChange={(e) =>
              update({ priority: (e.target.value || null) as Task['priority'] })
            }
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">None</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 font-medium">Project</span>
          <select
            value={task.projectId ?? ''}
            onChange={(e) => update({ projectId: e.target.value || null })}
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Inbox</option>
            {state.projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1">
        <span className="text-xs text-gray-500 font-medium">Notes</span>
        <textarea
          value={task.notes}
          onChange={(e) => update({ notes: e.target.value })}
          rows={3}
          placeholder="Add notes..."
          className="border border-gray-300 rounded px-2 py-1 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </label>
    </div>
  );
}
