
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { Skeleton } from '../ui/skeleton';

interface ProtectedRouteProps {
  requiresAdmin?: boolean;
}

export const ProtectedRoute = ({ requiresAdmin = false }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state if authentication is being checked
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-32 w-80" />
          <Skeleton className="h-6 w-60" />
          <Skeleton className="h-6 w-12" />
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If admin access is required, check if user has admin role
  if (requiresAdmin) {
    // Implement admin role check
    const isAdmin = user?.user_metadata?.is_admin || false;
    
    if (!isAdmin) {
      return <Navigate to="/" replace />;
    }
  }

  // User is authenticated, render the protected route
  return <Outlet />;
};
