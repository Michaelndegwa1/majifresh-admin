import { useAuthStore } from '../store/useAuthStore';
import { authApi } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const { user, isAuthenticated, setAuth, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    try {
      const response = await authApi.login({ username, password });
      setAuth(response.user, response.access, response.refresh);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const logout = async () => {
    await authApi.logout();
    clearAuth();
    navigate('/login');
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
}
