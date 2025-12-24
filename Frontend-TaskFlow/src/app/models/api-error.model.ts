/**
 * Standard error response structure from backend.
 * Used for consistent error handling across the application.
 */
export interface ApiError {
  status: number;
  message: string;
  timestamp?: string;
}

/**
 * Validation error response with field-specific messages.
 */
export interface ValidationError {
  [field: string]: string;
}
