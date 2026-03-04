import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddTaskForm } from './AddTaskForm'
import { renderWithProviders } from '../../test/renderWithProviders'

describe('AddTaskForm', () => {
  it('renders the input and submit button', () => {
    renderWithProviders(<AddTaskForm projectId={null} />)
    expect(screen.getByPlaceholderText('New task')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument()
  })

  it('dispatches ADD_TASK with trimmed title on Enter', async () => {
    const dispatch = vi.fn()
    renderWithProviders(<AddTaskForm projectId={null} />, { dispatch })

    await userEvent.type(screen.getByPlaceholderText('New task'), '  Buy milk  {Enter}')

    expect(dispatch).toHaveBeenCalledOnce()
    const action = dispatch.mock.calls[0][0]
    expect(action.type).toBe('ADD_TASK')
    expect(action.payload.title).toBe('Buy milk')
    expect(action.payload.projectId).toBeNull()
    expect(action.payload.done).toBe(false)
  })

  it('dispatches ADD_TASK with the correct projectId', async () => {
    const dispatch = vi.fn()
    renderWithProviders(<AddTaskForm projectId="p1" />, { dispatch })

    await userEvent.type(screen.getByPlaceholderText('New task'), 'Project task{Enter}')

    const action = dispatch.mock.calls[0][0]
    expect(action.payload.projectId).toBe('p1')
  })

  it('clears the input after submit', async () => {
    renderWithProviders(<AddTaskForm projectId={null} />)
    const input = screen.getByPlaceholderText('New task')

    await userEvent.type(input, 'My task{Enter}')
    expect(input).toHaveValue('')
  })

  it('does not dispatch when input is empty', async () => {
    const dispatch = vi.fn()
    renderWithProviders(<AddTaskForm projectId={null} />, { dispatch })

    await userEvent.type(screen.getByPlaceholderText('New task'), '{Enter}')
    expect(dispatch).not.toHaveBeenCalled()
  })

  it('does not dispatch when input is only whitespace', async () => {
    const dispatch = vi.fn()
    renderWithProviders(<AddTaskForm projectId={null} />, { dispatch })

    await userEvent.type(screen.getByPlaceholderText('New task'), '   {Enter}')
    expect(dispatch).not.toHaveBeenCalled()
  })
})
