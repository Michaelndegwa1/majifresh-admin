import apiClient from './client';
import { LoginCredentials, AuthResponse, RefreshTokenResponse } from '../types/auth';

// MOCK: In production, these would be real API calls
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Mock delay to simulate network request
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock authentication - accept any credentials for demo
    if (credentials.username && credentials.password) {
      const mockResponse: AuthResponse = {
        access: 'mock_access_token_' + Date.now(),
        refresh: 'mock_refresh_token_' + Date.now(),
        user: {
          id: '1',
          email: 'admin@majifreshi.com',
          username: credentials.username,
          role: 'admin',
          firstName: 'Admin',
          lastName: 'User',
          phone: '+1234567890',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
        },
      };
      return mockResponse;
    }

    throw new Error('Invalid credentials');
    
    // Real implementation would be:
    // const response = await apiClient.post<AuthResponse>('/auth/token/', credentials);
    // return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    // Mock implementation
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      access: 'mock_refreshed_access_token_' + Date.now(),
    };
    
    // Real implementation:
    // const response = await apiClient.post<RefreshTokenResponse>('/auth/refresh/', {
    //   refresh: refreshToken,
    // });
    // return response.data;
  },

  logout: async (): Promise<void> => {
    // Clear local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    // Real implementation might call backend to invalidate token:
    // await apiClient.post('/auth/logout/');
  },

  getCurrentUser: async () => {
    // Mock implementation
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const mockUser = {
      id: '1',
      email: 'admin@majifreshi.com',
      username: 'admin',
      role: 'admin' as const,
      firstName: 'Admin',
      lastName: 'User',
      phone: '+1234567890',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    };
    
    return mockUser;
    
    // Real implementation:
    // const response = await apiClient.get('/auth/me/');
    // return response.data;
  },
};
