import { Menu, Bell, Sun, Moon, LogOut, User } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/auth';
import { useState } from 'react';

export function Header() {
  const { toggleSidebar, theme, toggleTheme } = useUIStore();
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await authApi.logout();
    clearAuth();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-slate-500 hover:text-slate-700 lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div>
          <p className="text-slate-500">Welcome back,</p>
          <p className="font-semibold text-slate-900">{user?.firstName || 'Admin'}</p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700"
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>

        {/* Notifications */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-slate-100"
          >
            <div className="h-8 w-8 rounded-full bg-sky-500 flex items-center justify-center">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.username} className="h-8 w-8 rounded-full" />
              ) : (
                <User className="h-4 w-4 text-white" />
              )}
            </div>
            <span className="hidden md:block text-slate-700">{user?.username}</span>
          </button>

          {/* Dropdown */}
          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 top-12 z-50 w-48 rounded-lg border border-slate-200 bg-white shadow-lg">
                <div className="p-3 border-b border-slate-200">
                  <p className="text-slate-900">{user?.firstName} {user?.lastName}</p>
                  <p className="text-slate-500">{user?.email}</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
