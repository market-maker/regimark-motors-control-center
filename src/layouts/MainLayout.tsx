
import { useState, useEffect } from "react";
import Header from "../components/navigation/Header";
import Sidebar from "../components/navigation/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNotifications } from "@/providers/NotificationsProvider";
import { toast } from "sonner";

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
  const { addNotification } = useNotifications();
  
  // Close sidebar by default on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);
  
  // Check for overdue debtors on component mount and send notifications
  useEffect(() => {
    // This would normally be an API call to get actual overdue debtors
    const mockOverdueDebtors = [
      { id: "d1", customerName: "John Smith", amount: 450, daysOverdue: 15 },
      { id: "d2", customerName: "Mary Johnson", amount: 780.25, daysOverdue: 30 }
    ];
    
    if (mockOverdueDebtors.length > 0) {
      // Add a notification for overdue debtors
      addNotification({
        title: "Overdue Debts Alert",
        message: `There are ${mockOverdueDebtors.length} customers with overdue payments`,
        type: "debtor",
        date: new Date().toISOString(),
        linkTo: "/sales?tab=debtors"
      });
      
      // Show a toast alert for the first overdue debtor
      if (mockOverdueDebtors[0]) {
        const debtor = mockOverdueDebtors[0];
        toast.warning(
          `${debtor.customerName} has an overdue payment of $${debtor.amount} (${debtor.daysOverdue} days)`,
          {
            duration: 5000,
            action: {
              label: "View Debtors",
              onClick: () => window.location.href = "/sales?tab=debtors"
            }
          }
        );
      }
    }
  }, [addNotification]);

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
