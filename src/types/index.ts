export interface Task {
  id: string;
  title: string;
  projectId: string | null;
  done: boolean;
  priority: 'high' | 'medium' | 'low' | null;
  dueDate: string | null;
  notes: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  createdAt: string;
}

export interface AppState {
  tasks: Task[];
  projects: Project[];
}
