import type { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { LoginPage } from '../components/auth/LoginPage';

export function AuthRoute({ children }: { children: ReactNode }) {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F5F4F2] flex items-center justify-center">
        <div className="w-5 h-5 rounded-full border-2 border-[#007AFF] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) return <LoginPage />;

  return <>{children}</>;
}
