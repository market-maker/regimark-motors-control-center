
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { isUserAdmin } from "@/lib/utils";

interface ProtectedRouteProps {
  requiresAuth?: boolean;
  requiresAdmin?: boolean;
  children?: React.ReactNode;
}

export const ProtectedRoute = ({
  requiresAuth = true,
  requiresAdmin = false,
  children
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // Show loading state if still checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" aria-live="polite" aria-busy="true">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-regimark-primary/20 rounded-full mb-4" role="progressbar"></div>
          <div className="h-4 w-24 bg-regimark-primary/20 rounded">Loading...</div>
        </div>
      </div>
    );
  }

  // If not authenticated and authentication is required, redirect to login
  if (requiresAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authentication is not required but user is authenticated, proceed
  if (!requiresAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Check admin access if required
  if (requiresAdmin && (!user || !isUserAdmin(user.role))) {
    return <Navigate to="/" replace />;
  }

  // Special check for sales users trying to access personal expenses
  if (user?.role === "sales" && location.pathname === "/expenses") {
    return <Navigate to="/" replace />;
  }

  // Render children if provided, otherwise outlet (for nested routes)
  return <>{children ? children : <Outlet />}</>;
};
