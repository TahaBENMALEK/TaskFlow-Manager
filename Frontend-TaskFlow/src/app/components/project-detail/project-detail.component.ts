import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import { Project } from '../../models/project.model';
import { Task, TaskRequest } from '../../models/task.model';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: Project | null = null;
  tasks: Task[] = [];
  isLoading = true;
  showCreateTaskDialog = false;

  newTask: TaskRequest = {
    title: '',
    description: '',
    dueDate: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const projectId = Number(this.route.snapshot.paramMap.get('id'));
    if (projectId) {
      this.loadProjectData(projectId);
    }
  }

  /**
   * Loads project and tasks data.
   */
  loadProjectData(projectId: number): void {
    this.isLoading = true;

    // Load project details
    this.projectService.getProjectById(projectId).subscribe({
      next: (project) => {
        this.project = project;
        this.loadTasks(projectId);
      },
      error: () => {
        this.isLoading = false;
        this.router.navigate(['/projects']);
      }
    });
  }

  /**
   * Loads tasks for the current project.
   */
  loadTasks(projectId: number): void {
    this.taskService.getProjectTasks(projectId).subscribe({
      next: (tasks) => {
        this.tasks = tasks.sort((a, b) =>
          new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        );
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  /**
   * Opens create task dialog with default due date.
   */
  openCreateTaskDialog(): void {
    this.showCreateTaskDialog = true;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.newTask = {
      title: '',
      description: '',
      dueDate: tomorrow.toISOString().split('T')[0]
    };
  }

  /**
   * Closes create task dialog.
   */
  closeCreateTaskDialog(): void {
    this.showCreateTaskDialog = false;
  }

  /**
   * Creates a new task.
   */
  createTask(): void {
    if (this.project && this.newTask.title.trim()) {
      this.taskService.createTask(this.project.id, this.newTask).subscribe({
        next: () => {
          this.loadProjectData(this.project!.id);
          this.closeCreateTaskDialog();
        }
      });
    }
  }

  /**
   * Toggles task completion status.
   */
  toggleTask(task: Task): void {
    if (this.project) {
      this.taskService.toggleTaskCompletion(this.project.id, task.id).subscribe({
        next: () => {
          task.completed = !task.completed;
          this.refreshProgress();
        }
      });
    }
  }

  /**
   * Deletes a task with confirmation.
   */
  deleteTask(task: Task, event: Event): void {
    event.stopPropagation();
    if (confirm(`Delete "${task.title}"?`)) {
      this.taskService.deleteTask(this.project!.id, task.id).subscribe({
        next: () => {
          this.loadProjectData(this.project!.id);
        }
      });
    }
  }

  /**
   * Refreshes project progress.
   */
  refreshProgress(): void {
    if (this.project) {
      this.projectService.getProjectProgress(this.project.id).subscribe({
        next: (updated) => {
          this.project = updated;
        }
      });
    }
  }

  /**
   * Checks if task is overdue.
   */
  isOverdue(task: Task): boolean {
    return !task.completed && new Date(task.dueDate) < new Date();
  }

  /**
   * Formats date for display.
   */
  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  /**
   * Returns progress bar color.
   */
  getProgressColor(percentage: number): string {
    if (percentage === 0) return 'bg-gray-300';
    if (percentage < 50) return 'bg-yellow-400';
    if (percentage < 100) return 'bg-blue-500';
    return 'bg-green-500';
  }
}
