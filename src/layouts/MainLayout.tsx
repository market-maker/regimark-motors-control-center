
import { ReactNode, useState, useEffect } from 'react';
import Sidebar from '../components/navigation/Sidebar';
import Header from '../components/navigation/Header';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/providers/ThemeProvider';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  
  // Handle sidebar state when screen size changes
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gradient-to-br from-regimark-light to-white'}`}>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: isMobile ? -280 : 0 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
            className={`${isMobile ? 'fixed z-40' : ''} h-full`}
          >
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <motion.main 
          className="flex-1 overflow-y-auto p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {!sidebarOpen && (
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="mb-4 shadow-glow hover:shadow-lg transition-all duration-300"
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}
          {children}
        </motion.main>
      </div>
      
      {sidebarOpen && isMobile && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default MainLayout;
