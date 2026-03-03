import { supabase } from './supabase';
import type { Task, Project, AppState } from '../types';

// --- shape of rows coming back from Postgres ---
interface TaskRow {
  id: string;
  user_id: string;
  project_id: string | null;
  title: string;
  done: boolean;
  priority: 'high' | 'medium' | 'low' | null;
  due_date: string | null;
  notes: string;
  created_at: string;
}

interface ProjectRow {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
}

function rowToTask(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    projectId: row.project_id,
    done: row.done,
    priority: row.priority,
    dueDate: row.due_date,
    notes: row.notes,
    createdAt: row.created_at,
  };
}

function rowToProject(row: ProjectRow): Project {
  return {
    id: row.id,
    name: row.name,
    createdAt: row.created_at,
  };
}

export async function fetchUserData(): Promise<AppState> {
  const [tasksResult, projectsResult] = await Promise.all([
    supabase.from('tasks').select('*').order('created_at'),
    supabase.from('projects').select('*').order('created_at'),
  ]);

  if (tasksResult.error) throw tasksResult.error;
  if (projectsResult.error) throw projectsResult.error;

  return {
    tasks: (tasksResult.data as TaskRow[]).map(rowToTask),
    projects: (projectsResult.data as ProjectRow[]).map(rowToProject),
  };
}

export async function dbAddTask(task: Task, userId: string): Promise<void> {
  const { error } = await supabase.from('tasks').insert({
    id: task.id,
    user_id: userId,
    project_id: task.projectId,
    title: task.title,
    done: task.done,
    priority: task.priority,
    due_date: task.dueDate,
    notes: task.notes,
    created_at: task.createdAt,
  });
  if (error) throw error;
}

export async function dbUpdateTask(id: string, changes: Partial<Task>): Promise<void> {
  const row: Record<string, unknown> = {};
  if (changes.title !== undefined) row.title = changes.title;
  if (changes.done !== undefined) row.done = changes.done;
  if (changes.priority !== undefined) row.priority = changes.priority;
  if (changes.dueDate !== undefined) row.due_date = changes.dueDate;
  if (changes.notes !== undefined) row.notes = changes.notes;
  if (changes.projectId !== undefined) row.project_id = changes.projectId;

  const { error } = await supabase.from('tasks').update(row).eq('id', id);
  if (error) throw error;
}

export async function dbDeleteTask(id: string): Promise<void> {
  const { error } = await supabase.from('tasks').delete().eq('id', id);
  if (error) throw error;
}

export async function dbAddProject(project: Project, userId: string): Promise<void> {
  const { error } = await supabase.from('projects').insert({
    id: project.id,
    user_id: userId,
    name: project.name,
    created_at: project.createdAt,
  });
  if (error) throw error;
}

export async function dbRenameProject(id: string, name: string): Promise<void> {
  const { error } = await supabase.from('projects').update({ name }).eq('id', id);
  if (error) throw error;
}

export async function dbDeleteProject(id: string): Promise<void> {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
}
