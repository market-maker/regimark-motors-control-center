
import { useState, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { toast } from "sonner";
import BoxGrid from "@/components/login/BoxGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, AlertCircle, Mail, Key, User } from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, login, signup } = useAuth();

  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<"email" | "password" | "username" | null>(null);

  // Signup state
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (!success) {
        setAuthError("Invalid email or password");
        toast.error("Authentication Failed", {
          description: "Please check your credentials and try again.",
        });
      }
    } catch (error) {
      setAuthError("An unexpected error occurred. Please try again.");
      toast.error("Login Error", {
        description: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsLoading(true);
    
    try {
      const success = await signup(signupEmail, signupPassword, username);
      if (!success) {
        setAuthError("Failed to create account. Email may already be in use.");
        toast.error("Registration Failed", {
          description: "Please try again with a different email.",
        });
      } else {
        toast.success("Account Created", {
          description: "Your account has been created successfully. You can now log in.",
        });
        setActiveTab("login");
        setEmail(signupEmail);
      }
    } catch (error: any) {
      setAuthError(error.message || "Failed to create account.");
      toast.error("Registration Error", {
        description: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-black relative overflow-hidden">
      {/* Simple background */}
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
          className="w-96 rounded-3xl bg-white/90 dark:bg-black/80 backdrop-blur-xl shadow-2xl overflow-hidden transform perspective-1000 rotate-x-1 hover:rotate-x-0 transition-all duration-500 float-card border border-gray-200 dark:border-gray-800"
          style={{ 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 15px -5px rgba(227, 6, 19, 0.4)'
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
            
            <Tabs 
              value={activeTab} 
              onValueChange={(v) => setActiveTab(v as 'login' | 'signup')}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="mt-0">
                <form onSubmit={handleLogin} className="space-y-6">
                  {authError && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{authError}</AlertDescription>
                    </Alert>
                  )}

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <div className="relative">
                      <label htmlFor="email" className="sr-only">Email</label>
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        required
                        aria-required="true"
                        className={`h-12 px-4 pl-10 shadow-md hover:shadow-lg transition-shadow duration-300 bg-opacity-50 backdrop-blur-sm
                          bg-white/70 dark:bg-gray-900 text-gray-800 dark:text-white border-gray-300 dark:border-gray-700
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
                      <label htmlFor="password" className="sr-only">Password</label>
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        required
                        aria-required="true"
                        className={`h-12 px-4 pl-10 pr-10 shadow-md hover:shadow-lg transition-shadow duration-300 bg-opacity-50 backdrop-blur-sm
                          bg-white/70 dark:bg-gray-900 text-gray-800 dark:text-white border-gray-300 dark:border-gray-700
                          ${focusedField === "password" ? "text-glow-red" : ""}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
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
                      disabled={isLoading}
                      aria-busy={isLoading}
                      className="w-full h-12 bg-regimark-primary hover:bg-regimark-primary/90 btn-3d shadow-lg hover:shadow-xl transition-all"
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </motion.div>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="mt-0">
                <form onSubmit={handleSignup} className="space-y-6">
                  {authError && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{authError}</AlertDescription>
                    </Alert>
                  )}

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <div className="relative">
                      <label htmlFor="username" className="sr-only">Username</label>
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onFocus={() => setFocusedField("username")}
                        onBlur={() => setFocusedField(null)}
                        required
                        aria-required="true"
                        className={`h-12 px-4 pl-10 shadow-md hover:shadow-lg transition-shadow duration-300 bg-opacity-50 backdrop-blur-sm
                          bg-white/70 dark:bg-gray-900 text-gray-800 dark:text-white border-gray-300 dark:border-gray-700
                          ${focusedField === "username" ? "text-glow-red" : ""}`}
                      />
                      <div className={`absolute inset-0 rounded-md pointer-events-none ${focusedField === "username" ? "shadow-[0_0_15px_rgba(220,38,38,0.5)]" : "shadow-[0_0_15px_rgba(227,6,19,0.1)]"}`} />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <div className="relative">
                      <label htmlFor="signupEmail" className="sr-only">Email</label>
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="signupEmail"
                        type="email"
                        placeholder="Email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        required
                        aria-required="true"
                        className={`h-12 px-4 pl-10 shadow-md hover:shadow-lg transition-shadow duration-300 bg-opacity-50 backdrop-blur-sm
                          bg-white/70 dark:bg-gray-900 text-gray-800 dark:text-white border-gray-300 dark:border-gray-700
                          ${focusedField === "email" ? "text-glow-red" : ""}`}
                      />
                      <div className={`absolute inset-0 rounded-md pointer-events-none ${focusedField === "email" ? "shadow-[0_0_15px_rgba(220,38,38,0.5)]" : "shadow-[0_0_15px_rgba(227,6,19,0.1)]"}`} />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <div className="relative">
                      <label htmlFor="signupPassword" className="sr-only">Password</label>
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="signupPassword"
                        type={showSignupPassword ? "text" : "password"}
                        placeholder="Password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        required
                        aria-required="true"
                        className={`h-12 px-4 pl-10 pr-10 shadow-md hover:shadow-lg transition-shadow duration-300 bg-opacity-50 backdrop-blur-sm
                          bg-white/70 dark:bg-gray-900 text-gray-800 dark:text-white border-gray-300 dark:border-gray-700
                          ${focusedField === "password" ? "text-glow-red" : ""}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignupPassword(!showSignupPassword)}
                        aria-label={showSignupPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                      >
                        {showSignupPassword ? (
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
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="pt-2"
                  >
                    <Button
                      type="submit"
                      disabled={isLoading}
                      aria-busy={isLoading}
                      className="w-full h-12 bg-regimark-primary hover:bg-regimark-primary/90 btn-3d shadow-lg hover:shadow-xl transition-all"
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </motion.div>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Demo credentials:</p>
              <p>Email: admin@regimark.com</p>
              <p>Password: admin123</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Copyright footer */}
      <div className="absolute bottom-4 text-center text-sm text-gray-500">
        Market.Maker.Software©2025
      </div>
    </div>
  );
};

export default Auth;
