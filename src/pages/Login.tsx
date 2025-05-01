
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

// BoxGrid component for animated background with hover effects
const BoxGrid = () => {
  const boxes = Array(20).fill(0).map((_, i) => i);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="relative h-full w-full">
        {boxes.map((i) => (
          <motion.div
            key={i}
            className="animated-box"
            initial={{ 
              opacity: Math.random() * 0.2 + 0.1,
              scale: Math.random() * 0.4 + 0.8
            }}
            animate={{ 
              x: [
                `${Math.random() * 90 + 5}%`,
                `${Math.random() * 90 + 5}%`,
                `${Math.random() * 90 + 5}%`,
              ],
              y: [
                `${Math.random() * 90 + 5}%`,
                `${Math.random() * 90 + 5}%`,
                `${Math.random() * 90 + 5}%`,
              ],
              opacity: [0.1, 0.2, 0.1],
              scale: [0.8, 1, 0.9]
            }}
            transition={{ 
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "mirror"
            }}
            style={{ 
              width: `${Math.random() * 10 + 5}rem`,
              height: `${Math.random() * 10 + 5}rem`,
              filter: `blur(${Math.random() * 40 + 20}px)`,
            }}
            whileHover={{
              backgroundColor: "rgba(0,0,0,0.2)",
              transition: { duration: 0.2 }
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [focusedField, setFocusedField] = useState<"email" | "password" | null>(null);
  const { isAuthenticated, login } = useAuth();
  const { toast } = useToast();
  const { theme } = useTheme();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);
    
    try {
      const success = await login(email, password);
      if (!success) {
        setLoginError("Invalid email or password");
        toast({
          variant: "destructive",
          title: "Authentication Failed",
          description: "Please check your credentials and try again.",
        });
      }
    } catch (error) {
      setLoginError("An unexpected error occurred. Please try again.");
      toast({
        variant: "destructive",
        title: "Login Error",
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Animated background boxes */}
      <BoxGrid />
      
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.6,
          type: "spring", 
          stiffness: 100 
        }}
        className="relative z-10"
      >
        {/* 3D Card with glassmorphism effect */}
        <div 
          className={`
            w-96 rounded-3xl ${theme === 'dark' ? 'bg-slate-800/80' : 'bg-white/80'} 
            backdrop-blur-xl shadow-2xl overflow-hidden
            transform perspective-1000 rotate-x-1 hover:rotate-x-0
            transition-all duration-500 float-card
          `}
          style={{ 
            boxShadow: theme === 'dark' 
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 25px -5px rgba(255, 90, 90, 0.25)' 
              : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 15px -5px rgba(227, 6, 19, 0.2)'
          }}
        >
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <img 
                src="/lovable-uploads/b5b79438-1e8e-447e-9c8f-c886b1ed204a.png"
                alt="RegiMark Logo" 
                className="h-16 w-auto drop-shadow-lg"
              />
            </div>
            
            <motion.h1 
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl font-bold mb-6 text-center"
            >
              Login
            </motion.h1>

            {loginError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`h-12 px-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-opacity-50 backdrop-blur-sm 
                      text-black dark:text-white
                      ${focusedField === "email" ? "text-glow-red" : ""}`}
                  />
                  <div className={`absolute inset-0 rounded-md pointer-events-none ${focusedField === "email" ? "shadow-[0_0_15px_rgba(220,38,38,0.5)]" : "shadow-[0_0_15px_rgba(227,6,19,0.1)]"}`} />
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`h-12 px-4 pr-10 shadow-md hover:shadow-lg transition-shadow duration-300 bg-opacity-50 backdrop-blur-sm 
                      text-black dark:text-white
                      ${focusedField === "password" ? "text-glow-red" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                  <div className={`absolute inset-0 rounded-md pointer-events-none ${focusedField === "password" ? "shadow-[0_0_15px_rgba(220,38,38,0.5)]" : "shadow-[0_0_15px_rgba(227,6,19,0.1)]"}`} />
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="pt-2"
              >
                <Button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full h-12 bg-regimark-primary hover:bg-regimark-primary/90 btn-3d shadow-lg hover:shadow-xl transition-all"
                >
                  {isLoggingIn ? "Signing in..." : "Sign In"}
                </Button>
              </motion.div>
            </form>
            
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Demo credentials:</p>
              <p>Email: admin@regimark.com</p>
              <p>Password: admin123</p>
            </div>
          </div>
        </div>
        
        {/* Decorative shadow/reflection effect */}
        <div 
          className="absolute -bottom-6 left-0 right-0 h-12 mx-auto w-4/5 rounded-full blur-xl"
          style={{ 
            background: theme === 'dark' 
              ? 'linear-gradient(rgba(227, 6, 19, 0.2), transparent)' 
              : 'linear-gradient(rgba(0, 0, 0, 0.05), transparent)' 
          }}
        />
      </motion.div>
      
      {/* Copyright footer */}
      <div className="absolute bottom-4 text-center text-sm text-slate-500 dark:text-slate-400">
        Market.Maker.Software©2025
      </div>
    </div>
  );
};

export default Login;
