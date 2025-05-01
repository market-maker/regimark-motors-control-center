
import { useState, useEffect } from "react";
import Header from "../components/navigation/Header";
import Sidebar from "../components/navigation/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: React.ReactNode;
}

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

interface SidebarProps {
  onClose: () => void;
}

// Creating a complete layout component with integrated sidebar and header
const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Close sidebar by default on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - conditionally shown based on sidebarOpen state */}
      {sidebarOpen && (
        <Sidebar onClose={() => setSidebarOpen(false)} />
      )}
      
      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
      
      {/* Mobile overlay to close sidebar when clicked outside */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-10" 
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default MainLayout;
