import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskItem } from './TaskItem'
import { renderWithProviders } from '../../test/renderWithProviders'
import type { Task } from '../../types'

const baseTask: Task = {
  id: 't1',
  title: 'Test task',
  projectId: null,
  done: false,
  priority: null,
  dueDate: null,
  notes: '',
  createdAt: '2024-01-01T00:00:00Z',
}

describe('TaskItem', () => {
  it('renders the task title', () => {
    renderWithProviders(<TaskItem task={baseTask} />)
    expect(screen.getByText('Test task')).toBeInTheDocument()
  })

  it('clicking the checkbox dispatches TOGGLE_DONE', async () => {
    const dispatch = vi.fn()
    renderWithProviders(<TaskItem task={baseTask} />, { dispatch })

    await userEvent.click(screen.getByRole('checkbox'))
    expect(dispatch).toHaveBeenCalledWith({ type: 'TOGGLE_DONE', payload: { id: 't1' } })
  })

  it('clicking the delete button dispatches DELETE_TASK', async () => {
    const dispatch = vi.fn()
    renderWithProviders(<TaskItem task={baseTask} />, { dispatch })

    await userEvent.click(screen.getByRole('button', { name: /delete task/i }))
    expect(dispatch).toHaveBeenCalledWith({ type: 'DELETE_TASK', payload: { id: 't1' } })
  })

  it('clicking the row expands task detail', async () => {
    renderWithProviders(<TaskItem task={baseTask} />)
    const row = screen.getByText('Test task').closest('div')!

    await userEvent.click(row)
    expect(screen.getByLabelText(/notes/i)).toBeInTheDocument()
  })

  it('clicking the row again collapses task detail', async () => {
    renderWithProviders(<TaskItem task={baseTask} />)
    const row = screen.getByText('Test task').closest('div')!

    await userEvent.click(row)
    await userEvent.click(row)
    expect(screen.queryByLabelText(/notes/i)).not.toBeInTheDocument()
  })

  it('renders a done task with strikethrough style', () => {
    renderWithProviders(<TaskItem task={{ ...baseTask, done: true }} />)
    const titleEl = screen.getByText('Test task')
    expect(titleEl.className).toContain('line-through')
  })

  it('clicking checkbox does not propagate to row (no double-expand)', async () => {
    const dispatch = vi.fn()
    renderWithProviders(<TaskItem task={baseTask} />, { dispatch })

    await userEvent.click(screen.getByRole('checkbox'))
    expect(screen.queryByLabelText(/notes/i)).not.toBeInTheDocument()
  })
})
