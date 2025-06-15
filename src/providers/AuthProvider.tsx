
import React from "react";
import { getAuthFromLocalStorage, saveAuthToLocalStorage, clearAuth, isAuthExpired } from "@/lib/utils";
import { toast } from "sonner";

type User = {
  email: string;
  role: string;
  token: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
};

// Predefined users - only admin and sales
const PREDEFINED_USERS = [
  {
    email: "admin@regimark.com",
    password: "admin123",
    role: "admin",
    token: "admin-token-12345"
  },
  {
    email: "sales@regimark.com",
    password: "sales123",
    role: "sales",
    token: "sales-token-67890"
  }
];

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Check for existing session on mount
  React.useEffect(() => {
    const checkAuth = () => {
      if (isAuthExpired()) {
        clearAuth();
        setUser(null);
        setIsLoading(false);
        return;
      }

      const authData = getAuthFromLocalStorage();
      if (authData) {
        setUser({
          email: authData.email,
          role: authData.role,
          token: authData.token
        });
        
        // Show notification when reconnecting while authenticated
        if (navigator.onLine) {
          toast.success(`Welcome back, ${authData.email}`, {
            description: "You are now connected and authenticated",
          });
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Handle online/offline status
  React.useEffect(() => {
    const handleOnline = () => {
      console.log("Application is online");
      if (user) {
        toast.success("You're back online", {
          description: "All features are now available"
        });
      }
    };

    const handleOffline = () => {
      console.log("Application is offline");
      if (user) {
        toast.warning("You're offline", {
          description: "Limited functionality available. Changes will sync when you reconnect."
        });
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulating network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = PREDEFINED_USERS.find(
      user => user.email === email && user.password === password
    );

    if (user) {
      const userData = {
        email: user.email,
        role: user.role,
        token: user.token
      };
      
      setUser(userData);
      saveAuthToLocalStorage(userData);
      
      toast.success(`Welcome, ${user.email}`, {
        description: `Logged in as ${user.role}`,
      });
      
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    const email = user?.email;
    setUser(null);
    clearAuth();
    toast.info(`Goodbye, ${email || 'user'}`, {
      description: "You have been logged out",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        isAdmin: user?.role === "admin"
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
