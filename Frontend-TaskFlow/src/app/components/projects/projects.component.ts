import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';
import { Project, ProjectRequest } from '../../models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  isLoading = true;
  showCreateDialog = false;

  // New project form data
  newProject: ProjectRequest = {
    title: '',
    description: ''
  };

  currentUser = this.authService.getCurrentUser();

  constructor(
    private projectService: ProjectService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  /**
   * Loads all projects for the current user.
   */
  loadProjects(): void {
    this.isLoading = true;
    this.projectService.getAllProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  /**
   * Opens the create project dialog.
   */
  openCreateDialog(): void {
    this.showCreateDialog = true;
    this.newProject = { title: '', description: '' };
  }

  /**
   * Closes the create project dialog.
   */
  closeCreateDialog(): void {
    this.showCreateDialog = false;
  }

  /**
   * Creates a new project.
   */
  createProject(): void {
    if (this.newProject.title.trim()) {
      this.projectService.createProject(this.newProject).subscribe({
        next: () => {
          this.loadProjects();
          this.closeCreateDialog();
        }
      });
    }
  }

  /**
   * Deletes a project with confirmation.
   */
  deleteProject(project: Project, event: Event): void {
    event.stopPropagation();
    if (confirm(`Delete "${project.title}"?`)) {
      this.projectService.deleteProject(project.id).subscribe({
        next: () => this.loadProjects()
      });
    }
  }

  /**
   * Logs out the current user.
   */
  logout(): void {
    this.authService.logout();
  }

  /**
   * Returns progress bar color based on completion percentage.
   */
  getProgressColor(percentage: number): string {
    if (percentage === 0) return 'bg-gray-300';
    if (percentage < 50) return 'bg-yellow-400';
    if (percentage < 100) return 'bg-blue-500';
    return 'bg-green-500';
  }
}
