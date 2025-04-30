
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
  User
} from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: BarChart },
  { path: '/inventory', label: 'Inventory', icon: Package },
  { path: '/sales', label: 'Sales', icon: ShoppingCart },
  { path: '/customers', label: 'Customers', icon: Users },
  { path: '/suppliers', label: 'Suppliers', icon: Database }, // Added suppliers menu item
  { path: '/reports', label: 'Reports', icon: FileText },
  { path: '/accounting', label: 'Accounting', icon: Database },
  { path: '/receipt-templates', label: 'Receipt Templates', icon: Receipt }, // Added receipt templates
  { path: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar = () => {
  const location = useLocation();
  const { theme } = useTheme();

  return (
    <div className={cn(
      "w-64 border-r h-full flex flex-col",
      theme === 'dark' 
        ? "bg-gray-900 border-gray-800" 
        : "bg-white border-gray-200"
    )}>
      <div className={cn(
        "p-4 border-b",
        theme === 'dark' ? "border-gray-800" : "border-gray-200"
      )}>
        <h1 className="text-xl font-bold text-regimark-primary flex items-center">
          <img src="/lovable-uploads/916eabaf-754d-4b79-9245-7f184af91ccb.png" alt="Regimark Autoelectrics" className="h-8 mr-2" />
          <span className="hidden lg:inline">Regimark Autoelectrics</span>
        </h1>
      </div>
      <nav className="flex-1 pt-4 pb-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-md",
                    isActive 
                      ? "bg-regimark-primary text-white" 
                      : theme === "dark"
                        ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                        : "text-regimark-dark hover:bg-regimark-light hover:text-regimark-primary"
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
