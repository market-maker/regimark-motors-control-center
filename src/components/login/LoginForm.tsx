
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLoggingIn: boolean;
  loginError: string;
}

const LoginForm = ({ onSubmit, isLoggingIn, loginError }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<"email" | "password" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {loginError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{loginError}</AlertDescription>
        </Alert>
      )}

      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="relative">
          <label htmlFor="email" className="sr-only">Email</label>
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
            className={`h-12 px-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-opacity-50 backdrop-blur-sm
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
            className={`h-12 px-4 pr-10 shadow-md hover:shadow-lg transition-shadow duration-300 bg-opacity-50 backdrop-blur-sm
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
          disabled={isLoggingIn}
          aria-busy={isLoggingIn}
          className="w-full h-12 bg-regimark-primary hover:bg-regimark-primary/90 btn-3d shadow-lg hover:shadow-xl transition-all"
        >
          {isLoggingIn ? "Signing in..." : "Sign In"}
        </Button>
      </motion.div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Demo credentials:</p>
        <div className="space-y-1">
          <p><strong>Admin:</strong> admin@regimark.com / admin123</p>
          <p><strong>Sales:</strong> sales@regimark.com / sales123</p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
