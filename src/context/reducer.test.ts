import { describe, it, expect } from 'vitest'
import { reducer, initialState } from './reducer'
import type { AppState } from '../types'

const task1 = {
  id: 't1',
  title: 'Task one',
  projectId: null,
  done: false,
  priority: null as null,
  dueDate: null,
  notes: '',
  createdAt: '2024-01-01T00:00:00Z',
}

const task2 = {
  id: 't2',
  title: 'Task two',
  projectId: 'p1',
  done: false,
  priority: 'high' as const,
  dueDate: null,
  notes: '',
  createdAt: '2024-01-02T00:00:00Z',
}

const project1 = { id: 'p1', name: 'Project A', createdAt: '2024-01-01T00:00:00Z' }

const stateWithData: AppState = {
  tasks: [task1, task2],
  projects: [project1],
}

describe('reducer', () => {
  it('HYDRATE replaces state with payload', () => {
    const result = reducer(initialState, { type: 'HYDRATE', payload: stateWithData })
    expect(result).toEqual(stateWithData)
  })

  it('ADD_TASK appends task to tasks list', () => {
    const result = reducer(initialState, { type: 'ADD_TASK', payload: task1 })
    expect(result.tasks).toHaveLength(1)
    expect(result.tasks[0]).toEqual(task1)
  })

  it('ADD_TASK does not mutate other state slices', () => {
    const result = reducer(stateWithData, { type: 'ADD_TASK', payload: { ...task1, id: 't3' } })
    expect(result.projects).toEqual(stateWithData.projects)
  })

  it('UPDATE_TASK merges changes onto matching task', () => {
    const result = reducer(stateWithData, {
      type: 'UPDATE_TASK',
      payload: { id: 't1', changes: { title: 'Updated', done: true } },
    })
    const updated = result.tasks.find((t) => t.id === 't1')
    expect(updated?.title).toBe('Updated')
    expect(updated?.done).toBe(true)
  })

  it('UPDATE_TASK leaves other tasks unchanged', () => {
    const result = reducer(stateWithData, {
      type: 'UPDATE_TASK',
      payload: { id: 't1', changes: { title: 'Updated' } },
    })
    expect(result.tasks.find((t) => t.id === 't2')).toEqual(task2)
  })

  it('DELETE_TASK removes task by id', () => {
    const result = reducer(stateWithData, { type: 'DELETE_TASK', payload: { id: 't1' } })
    expect(result.tasks).toHaveLength(1)
    expect(result.tasks.find((t) => t.id === 't1')).toBeUndefined()
  })

  it('TOGGLE_DONE flips done boolean', () => {
    const result = reducer(stateWithData, { type: 'TOGGLE_DONE', payload: { id: 't1' } })
    expect(result.tasks.find((t) => t.id === 't1')?.done).toBe(true)

    const result2 = reducer(result, { type: 'TOGGLE_DONE', payload: { id: 't1' } })
    expect(result2.tasks.find((t) => t.id === 't1')?.done).toBe(false)
  })

  it('ADD_PROJECT appends project', () => {
    const newProject = { id: 'p2', name: 'Project B', createdAt: '2024-01-03T00:00:00Z' }
    const result = reducer(stateWithData, { type: 'ADD_PROJECT', payload: newProject })
    expect(result.projects).toHaveLength(2)
    expect(result.projects[1]).toEqual(newProject)
  })

  it('RENAME_PROJECT updates matching project name', () => {
    const result = reducer(stateWithData, {
      type: 'RENAME_PROJECT',
      payload: { id: 'p1', name: 'Renamed' },
    })
    expect(result.projects.find((p) => p.id === 'p1')?.name).toBe('Renamed')
  })

  it('DELETE_PROJECT removes project and orphans its tasks to inbox', () => {
    const result = reducer(stateWithData, { type: 'DELETE_PROJECT', payload: { id: 'p1' } })
    expect(result.projects).toHaveLength(0)
    const orphaned = result.tasks.find((t) => t.id === 't2')
    expect(orphaned?.projectId).toBeNull()
  })

  it('DELETE_PROJECT leaves tasks from other projects intact', () => {
    const result = reducer(stateWithData, { type: 'DELETE_PROJECT', payload: { id: 'p1' } })
    expect(result.tasks.find((t) => t.id === 't1')?.projectId).toBeNull()
  })

  it('returns existing state for unknown action type', () => {
    // @ts-expect-error testing unknown action
    const result = reducer(stateWithData, { type: 'UNKNOWN' })
    expect(result).toEqual(stateWithData)
  })
})
