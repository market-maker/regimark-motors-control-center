
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
  LogOut
} from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: BarChart },
  { path: '/inventory', label: 'Inventory', icon: Package },
  { path: '/sales', label: 'Sales', icon: ShoppingCart },
  { path: '/customers', label: 'Customers', icon: Users },
  { path: '/reports', label: 'Reports', icon: FileText },
  { path: '/accounting', label: 'Accounting', icon: Database },
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
          <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-regimark-secondary">
              <circle cx="12" cy="12" r="10"/>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
              <line x1="9" y1="9" x2="9.01" y2="9"/>
              <line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>
          </span>
          Regimark Motors
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
      <div className={cn(
        "p-4 border-t",
        theme === 'dark' ? "border-gray-800" : "border-gray-200"
      )}>
        <button className={cn(
          "flex items-center px-4 py-2 text-sm font-medium w-full",
          theme === 'dark' 
            ? "text-gray-300 hover:text-white"
            : "text-regimark-dark hover:text-regimark-secondary"
        )}>
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
