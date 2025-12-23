/**
 * Request payload for creating a new project.
 */
export interface ProjectRequest {
  title: string;
  description?: string;
}

/**
 * Complete project representation with calculated progress metrics.
 * Includes task statistics for progress tracking.
 */
export interface Project {
  id: number;
  title: string;
  description?: string;
  createdAt: string;
  totalTasks: number;
  completedTasks: number;
  progressPercentage: number;
}
