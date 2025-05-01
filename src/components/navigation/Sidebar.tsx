
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  TruckIcon,
  BarChart2,
  FileText,
  Settings,
  Receipt,
  Store,
  Wrench,
  Store as StoreManageIcon,
  FileSpreadsheet,
  ChevronLeft
} from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onClose: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation();
  const [expanded, setExpanded] = useState<string | null>(null);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleExpand = (section: string) => {
    setExpanded(expanded === section ? null : section);
  };

  // Define sidebar navigation items
  const navItems = [
    { path: "/", icon: <Home size={20} />, label: "Dashboard" },
    { path: "/inventory", icon: <Package size={20} />, label: "Inventory" },
    { path: "/sales", icon: <ShoppingCart size={20} />, label: "Sales" },
    { path: "/jobs", icon: <Wrench size={20} />, label: "Jobs" },
    { path: "/customers", icon: <Users size={20} />, label: "Customers" },
    { path: "/suppliers", icon: <TruckIcon size={20} />, label: "Suppliers" },
    { path: "/reports", icon: <BarChart2 size={20} />, label: "Reports" },
    { path: "/accounting", icon: <FileText size={20} />, label: "Accounting" },
    { path: "/expenses", icon: <FileSpreadsheet size={20} />, label: "Personal Expenses" },
    { path: "/receipt-templates", icon: <Receipt size={20} />, label: "Receipt Templates" },
    { path: "/stores", icon: <Store size={20} />, label: "Stores" },
    { path: "/store-management", icon: <StoreManageIcon size={20} />, label: "Store Management" },
    { path: "/settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      exit={{ x: -280 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-y-0 left-0 z-20 h-full w-64 bg-background shadow-lg border-r lg:static overflow-hidden"
    >
      <div className="flex h-full flex-col">
        <div className="p-4 flex justify-center items-center">
          <img 
            src="/lovable-uploads/b5b79438-1e8e-447e-9c8f-c886b1ed204a.png" 
            alt="RegiMark Logo" 
            className="h-16 object-contain" 
          />
        </div>
        
        <ScrollArea className="flex-1 px-2">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors sidebar-menu-item relative",
                  isActive(item.path)
                    ? "bg-primary/20 text-primary glow-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
              >
                <div className={cn(
                  "mr-3 transition-all",
                  isActive(item.path) && "text-primary"
                )}>
                  {item.icon}
                </div>
                <span>{item.label}</span>
                {item.label === "Inventory" && (
                  <Badge variant="outline" className="ml-auto bg-amber-500 text-white">7</Badge>
                )}
              </Link>
            ))}
          </nav>
        </ScrollArea>
        
        <div className="p-4 border-t flex justify-end">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Collapse Sidebar</span>
          </Button>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
