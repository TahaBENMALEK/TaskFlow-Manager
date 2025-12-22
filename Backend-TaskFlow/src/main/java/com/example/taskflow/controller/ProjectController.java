package com.example.taskflow.controller;

import com.example.taskflow.dto.ProjectRequest;
import com.example.taskflow.dto.ProjectResponse;
import com.example.taskflow.model.User;
import com.example.taskflow.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Projects", description = "Project management endpoints")
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    @Operation(summary = "Create project", description = "Create a new project")
    public ResponseEntity<ProjectResponse> createProject(
            @Valid @RequestBody ProjectRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(projectService.createProject(request, user));
    }

    @GetMapping
    @Operation(summary = "Get all projects", description = "Get all projects for authenticated user")
    public ResponseEntity<List<ProjectResponse>> getUserProjects(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(projectService.getUserProjects(user.getId()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get project", description = "Get project by ID with progress")
    public ResponseEntity<ProjectResponse> getProject(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(projectService.getProjectById(id, user.getId()));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete project", description = "Delete project and all its tasks")
    public ResponseEntity<Void> deleteProject(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        projectService.deleteProject(id, user.getId());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/progress")
    @Operation(summary = "Get progress", description = "Calculate and return project progress")
    public ResponseEntity<ProjectResponse> getProgress(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        ProjectResponse project = projectService.getProjectById(id, user.getId());
        return ResponseEntity.ok(projectService.calculateProgress(id));
    }
}