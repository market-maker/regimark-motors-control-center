
import { createContext, useContext, useState, useEffect } from "react";
import { getAuthFromLocalStorage, saveAuthToLocalStorage, clearAuth, isAuthExpired } from "@/lib/utils";

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

// Predefined admin account
const ADMIN_EMAIL = "admin@regimark.com";
const ADMIN_PASSWORD = "admin123"; // In a real app, this would be stored securely

// Predefined users
const PREDEFINED_USERS = [
  {
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    role: "admin",
    token: "admin-token-12345"
  },
  {
    email: "user@regimark.com",
    password: "user123",
    role: "user",
    token: "user-token-67890"
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
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
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      console.log("Application is online");
      // Here you would normally sync any offline changes with the server
    };

    const handleOffline = () => {
      console.log("Application is offline");
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // In a real app, this would be an API call
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
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    clearAuth();
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
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
