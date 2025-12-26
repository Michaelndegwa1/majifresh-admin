export interface User {
  id: string;
  email: string;
  username: string;
  role: 'admin' | 'driver' | 'customer';
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface RefreshTokenRequest {
  refresh: string;
}

export interface RefreshTokenResponse {
  access: string;
}
