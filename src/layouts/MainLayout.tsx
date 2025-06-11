import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/navigation/Header";
import Sidebar from "../components/navigation/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNotifications } from "@/providers/NotificationsProvider";
import { useAuth } from "@/providers/AuthProvider";
import { toast } from "sonner";
import { Wifi, WifiOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MainLayoutProps {
  children: React.ReactNode;
}

// Creating a complete layout component with integrated sidebar and header
const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const isMobile = useIsMobile();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  // Close sidebar by default on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);
  
  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("You're back online", {
        description: "All features are now available"
      });
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast.warning("You're offline", {
        description: "Limited functionality available. Changes will sync when you reconnect."
      });
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Removed automatic notification generation for overdue debtors

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // If not authenticated, return nothing (will redirect in useEffect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background overflow-hidden">
      {/* Offline indicator */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white p-2 flex items-center justify-center"
          >
            <WifiOff size={16} className="mr-2" />
            <span className="text-sm">You are currently offline. Some features may be limited.</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Sidebar - conditionally shown based on sidebarOpen state */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={isMobile ? { x: -300, opacity: 0 } : { opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={isMobile ? { x: -300, opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="z-40"
          >
            <Sidebar onClose={toggleSidebar} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main content area */}
      <div className="flex flex-col flex-1 relative transition-all duration-300 w-full">
        <Header 
          setSidebarOpen={toggleSidebar} 
          isOnline={isOnline}
          userRole={user?.role || "user"}
        />
        <main className={`flex-1 p-4 md:p-6 ${!isOnline ? 'mt-10' : ''} overflow-auto`}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {children}
          </motion.div>
        </main>
        
        {/* Copyright footer with enhanced styling */}
        <footer className="p-2 md:p-4 text-center border-t text-xs md:text-sm text-muted-foreground backdrop-blur-sm bg-background/80">
          <div className="flex items-center justify-center">
            <span className="opacity-80 hover:opacity-100 transition-opacity">
              Market.Maker.Software©2025
            </span>
          </div>
        </footer>
      </div>
      
      {/* Mobile overlay to close sidebar when clicked outside */}
      {sidebarOpen && isMobile && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm" 
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default MainLayout;