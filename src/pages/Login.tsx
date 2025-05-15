
import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { toast } from "sonner";
import BoxGrid from "@/components/login/BoxGrid";
import LoginCard from "@/components/login/LoginCard";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { isAuthenticated, login } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    setLoginError("");
    setIsLoggingIn(true);
    
    try {
      const success = await login(email, password);
      if (!success) {
        setLoginError("Invalid email or password");
        toast.error("Authentication Failed", {
          description: "Please check your credentials and try again.",
        });
      }
    } catch (error) {
      setLoginError("An unexpected error occurred. Please try again.");
      toast.error("Login Error", {
        description: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-black relative overflow-hidden">
      {/* Simple background */}
      <BoxGrid />
      
      <LoginCard 
        isLoggingIn={isLoggingIn}
        loginError={loginError}
        handleLogin={handleLogin}
      />
      
      <div className="mt-6 relative z-10">
        <Link to="/auth">
          <Button variant="ghost" className="text-regimark-primary">
            New Authentication Page
          </Button>
        </Link>
      </div>
      
      {/* Copyright footer */}
      <div className="absolute bottom-4 text-center text-sm text-gray-500">
        Market.Maker.Software©2025
      </div>
    </div>
  );
};

export default Login;
