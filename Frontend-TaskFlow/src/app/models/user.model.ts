/**
 * Represents an authenticated user in the system.
 * Mirrors the backend User entity structure.
 */
export interface User {
  id?: number;
  email: string;
  fullName: string;
}
