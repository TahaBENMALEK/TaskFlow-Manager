/**
 * Authentication request payload for login.
 * Validates user credentials against backend.
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Authentication response containing JWT token and user details.
 * Token is stored for subsequent authenticated requests.
 */
export interface AuthResponse {
  token: string;
  email: string;
  fullName: string;
}
