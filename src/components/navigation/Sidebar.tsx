
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
  ChevronDown,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { useTheme } from "@/providers/ThemeProvider";
import { 
  Sidebar as UISidebar,
  SidebarContext,
  SidebarItem, 
  SidebarSection, 
  SidebarHeader, 
  SidebarSearch,
  SidebarNestedItem,
  SidebarDivider,
  SidebarUser
} from "@/components/ui/sidebar";

interface SidebarProps {
  onClose: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { theme } = useTheme();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    if (!collapsed) {
      onClose();
    }
  };

  // Primary navigation items
  const primaryNavItems = [
    { path: "/", icon: <Home size={20} />, label: "Dashboard" },
    { path: "/inventory", icon: <Package size={20} />, label: "Inventory", badge: <Badge variant="outline" className="bg-amber-500 text-white">7</Badge> },
    { path: "/sales", icon: <ShoppingCart size={20} />, label: "Sales" },
    { path: "/jobs", icon: <Wrench size={20} />, label: "Jobs" },
    { path: "/customers", icon: <Users size={20} />, label: "Customers" },
    { path: "/suppliers", icon: <TruckIcon size={20} />, label: "Suppliers" },
  ];

  // Secondary navigation items
  const secondaryNavItems = [
    { path: "/reports", icon: <BarChart2 size={20} />, label: "Reports" },
    { path: "/accounting", icon: <FileText size={20} />, label: "Accounting" },
    { path: "/expenses", icon: <FileSpreadsheet size={20} />, label: "Personal Expenses" },
    { path: "/receipt-templates", icon: <Receipt size={20} />, label: "Receipt Templates" },
    { path: "/stores", icon: <Store size={20} />, label: "Stores" },
    { path: "/store-management", icon: <StoreManageIcon size={20} />, label: "Store Management" },
    { path: "/settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  // Filter navigation items based on search
  const filteredPrimaryItems = primaryNavItems.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredSecondaryItems = secondaryNavItems.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <UISidebar 
      defaultCollapsed={collapsed} 
      onCollapseChange={(state) => {
        setCollapsed(state);
        if (state) onClose();
      }}
      className={cn(
        theme === 'dark' ? 'border-gray-800' : 'border-gray-200',
        "fixed inset-y-0 left-0 z-20 h-full lg:static"
      )}
    >
      <SidebarHeader
        logo={
          <img 
            src="/lovable-uploads/b5b79438-1e8e-447e-9c8f-c886b1ed204a.png" 
            alt="RegiMark Logo" 
            className="h-8 w-auto" 
          />
        }
        title="RegiMark"
      />
      
      <SidebarSearch
        onSearch={handleSearch}
        placeholder="Search menu..."
      />
      
      <div className="flex-1 overflow-y-auto scrollbar-none">
        <SidebarSection title="Navigation">
          {filteredPrimaryItems.map((item) => (
            <SidebarItem
              key={item.path}
              icon={item.icon}
              title={item.label}
              href={item.path}
              isActive={isActive(item.path)}
              badge={item.badge}
              activeClasses="bg-primary/20 text-primary glow-primary"
            />
          ))}
        </SidebarSection>
        
        <SidebarDivider />
        
        <SidebarSection title="Management">
          {filteredSecondaryItems.map((item) => (
            <SidebarItem
              key={item.path}
              icon={item.icon}
              title={item.label}
              href={item.path}
              isActive={isActive(item.path)}
              activeClasses="bg-primary/20 text-primary glow-primary"
            />
          ))}
        </SidebarSection>
      </div>
      
      <SidebarDivider />
      
      <SidebarUser
        name="John Doe"
        email="john@regimark.com"
        avatar="https://github.com/shadcn.png"
      />
    </UISidebar>
  );
};

export default Sidebar;
