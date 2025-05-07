
import { motion } from "framer-motion";
import LoginForm from "./LoginForm";

interface LoginCardProps {
  isLoggingIn: boolean;
  loginError: string;
  handleLogin: (email: string, password: string) => Promise<void>;
}

const LoginCard = ({ isLoggingIn, loginError, handleLogin }: LoginCardProps) => {
  return (
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
          
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white"
          >
            Login
          </motion.h1>

          <LoginForm 
            onSubmit={handleLogin}
            isLoggingIn={isLoggingIn}
            loginError={loginError}
          />
        </div>
      </div>
      
      {/* Decorative shadow/reflection effect */}
      <div 
        className="absolute -bottom-6 left-0 right-0 h-12 mx-auto w-4/5 rounded-full blur-xl"
        style={{ 
          background: 'linear-gradient(rgba(227, 6, 19, 0.2), transparent)'
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
};

export default LoginCard;
