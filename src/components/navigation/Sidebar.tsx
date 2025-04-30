
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BarChart, 
  Package, 
  ShoppingCart, 
  Users, 
  FileText, 
  Settings, 
  Database,
  Receipt,
  X
} from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  onClose?: () => void;
}

const menuItems = [
  { path: '/', label: 'Dashboard', icon: BarChart },
  { path: '/inventory', label: 'Inventory', icon: Package },
  { path: '/sales', label: 'Sales', icon: ShoppingCart },
  { path: '/customers', label: 'Customers', icon: Users },
  { path: '/suppliers', label: 'Suppliers', icon: Database },
  { path: '/reports', label: 'Reports', icon: FileText },
  { path: '/accounting', label: 'Accounting', icon: Database },
  { path: '/receipt-templates', label: 'Receipt Templates', icon: Receipt },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation();
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  return (
    <div className={cn(
      "w-64 border-r h-full flex flex-col",
      theme === 'dark' 
        ? "bg-black border-gray-800" 
        : "bg-white border-gray-200"
    )}>
      {isMobile && (
        <div className="flex justify-end p-2">
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-500">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      <div className={cn(
        "p-4 border-b",
        theme === 'dark' ? "border-gray-800" : "border-gray-200"
      )}>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center justify-center"
        >
          <img 
            src="/lovable-uploads/153ce379-8cc5-4fd7-ae3b-0d0434c5e23c.png" 
            alt="Logo" 
            className="h-12"
          />
        </motion.div>
      </div>
      <nav className="flex-1 pt-4 pb-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <motion.li 
                key={item.path}
                whileHover={{ scale: 1.03, x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-300",
                    isActive 
                      ? "bg-regimark-primary text-white shadow-lg" 
                      : theme === "dark"
                        ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                        : "text-regimark-dark hover:bg-regimark-light hover:text-regimark-primary",
                    "sidebar-menu-item"
                  )}
                >
                  <motion.div
                    whileHover={{ rotate: isActive ? 0 : 10 }}
                    className="mr-3"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                  {item.label}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
