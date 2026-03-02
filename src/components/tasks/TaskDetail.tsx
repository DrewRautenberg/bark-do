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
    <div className="px-4 pb-4 pt-1 space-y-3" onClick={(e) => e.stopPropagation()}>
      <div className="flex flex-wrap gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-[#6C6C70] uppercase tracking-[0.05em]">Due date</span>
          <input
            type="date"
            value={task.dueDate ?? ''}
            onChange={(e) => update({ dueDate: e.target.value || null })}
            className="border border-[#C7C7CC] rounded-md px-2.5 py-1.5 text-[13px] text-[#1C1C1E] bg-white focus:outline-none focus:ring-2 focus:ring-[#007AFF]/40 focus:border-[#007AFF]"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-[#6C6C70] uppercase tracking-[0.05em]">Priority</span>
          <select
            value={task.priority ?? ''}
            onChange={(e) =>
              update({ priority: (e.target.value || null) as Task['priority'] })
            }
            className="border border-[#C7C7CC] rounded-md px-2.5 py-1.5 text-[13px] text-[#1C1C1E] bg-white focus:outline-none focus:ring-2 focus:ring-[#007AFF]/40 focus:border-[#007AFF]"
          >
            <option value="">None</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-[#6C6C70] uppercase tracking-[0.05em]">Project</span>
          <select
            value={task.projectId ?? ''}
            onChange={(e) => update({ projectId: e.target.value || null })}
            className="border border-[#C7C7CC] rounded-md px-2.5 py-1.5 text-[13px] text-[#1C1C1E] bg-white focus:outline-none focus:ring-2 focus:ring-[#007AFF]/40 focus:border-[#007AFF]"
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
        <span className="text-[11px] font-semibold text-[#6C6C70] uppercase tracking-[0.05em]">Notes</span>
        <textarea
          value={task.notes}
          onChange={(e) => update({ notes: e.target.value })}
          rows={3}
          placeholder="Add notes..."
          className="border border-[#C7C7CC] rounded-md px-2.5 py-1.5 text-[13px] text-[#1C1C1E] bg-white focus:outline-none focus:ring-2 focus:ring-[#007AFF]/40 focus:border-[#007AFF] placeholder:text-[#AEAEB2] resize-none w-full"
        />
      </label>
    </div>
  );
}
