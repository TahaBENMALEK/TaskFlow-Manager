package com.example.taskflow.service;

import com.example.taskflow.dto.ProjectRequest;
import com.example.taskflow.dto.ProjectResponse;
import com.example.taskflow.exception.ResourceNotFoundException;
import com.example.taskflow.model.Project;
import com.example.taskflow.model.User;
import com.example.taskflow.repository.ProjectRepository;
import com.example.taskflow.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private ProjectService projectService;

    private User testUser;
    private Project testProject;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setEmail("test@inpt.com");
        testUser.setFullName("Test User");

        testProject = new Project();
        testProject.setId(1L);
        testProject.setTitle("Test Project");
        testProject.setDescription("Test Description");
        testProject.setUser(testUser);
        testProject.setTasks(new ArrayList<>());
    }

    @Test
    void createProject_Success() {
        // Arrange
        ProjectRequest request = new ProjectRequest();
        request.setTitle("New Project");
        request.setDescription("New Description");

        when(projectRepository.save(any(Project.class))).thenReturn(testProject);
        when(taskRepository.findByProjectId(anyLong())).thenReturn(new ArrayList<>());

        // Act
        ProjectResponse response = projectService.createProject(request, testUser);

        // Assert
        assertNotNull(response);
        assertEquals("Test Project", response.getTitle());
        verify(projectRepository, times(1)).save(any(Project.class));
    }

    @Test
    void getUserProjects_ReturnsProjects() {
        // Arrange
        when(projectRepository.findByUserId(1L)).thenReturn(List.of(testProject));
        when(taskRepository.findByProjectId(anyLong())).thenReturn(new ArrayList<>());

        // Act
        List<ProjectResponse> projects = projectService.getUserProjects(1L);

        // Assert
        assertNotNull(projects);
        assertEquals(1, projects.size());
        assertEquals("Test Project", projects.get(0).getTitle());
    }

    @Test
    void getProjectById_Success() {
        // Arrange
        when(projectRepository.findById(1L)).thenReturn(Optional.of(testProject));
        when(taskRepository.findByProjectId(1L)).thenReturn(new ArrayList<>());

        // Act
        ProjectResponse response = projectService.getProjectById(1L, 1L);

        // Assert
        assertNotNull(response);
        assertEquals("Test Project", response.getTitle());
    }

    @Test
    void getProjectById_NotFound_ThrowsException() {
        // Arrange
        when(projectRepository.findById(999L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> {
            projectService.getProjectById(999L, 1L);
        });
    }

    @Test
    void getProjectById_WrongUser_ThrowsException() {
        // Arrange
        when(projectRepository.findById(1L)).thenReturn(Optional.of(testProject));

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> {
            projectService.getProjectById(1L, 999L);
        });
    }

    @Test
    void calculateProgress_NoTasks_ReturnsZero() {
        // Arrange
        when(projectRepository.findById(1L)).thenReturn(Optional.of(testProject));
        when(taskRepository.findByProjectId(1L)).thenReturn(new ArrayList<>());
        when(taskRepository.countByProjectIdAndCompleted(1L, true)).thenReturn(0);

        // Act
        ProjectResponse response = projectService.calculateProgress(1L);

        // Assert
        assertEquals(0.0, response.getProgressPercentage());
        assertEquals(0, response.getTotalTasks());
        assertEquals(0, response.getCompletedTasks());
    }

    @Test
    void deleteProject_Success() {
        // Arrange
        when(projectRepository.findById(1L)).thenReturn(Optional.of(testProject));

        // Act
        projectService.deleteProject(1L, 1L);

        // Assert
        verify(projectRepository, times(1)).delete(testProject);
    }
}