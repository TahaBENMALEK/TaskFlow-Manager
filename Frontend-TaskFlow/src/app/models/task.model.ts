/**
 * Request payload for creating a new task within a project.
 */
export interface TaskRequest {
  title: string;
  description?: string;
  dueDate: string; // ISO date format (YYYY-MM-DD)
}

/**
 * Complete task representation with completion status.
 */
export interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate: string;
  completed: boolean;
  createdAt: string;
}
