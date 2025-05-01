
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { 
  DollarSign, 
  LayoutDashboard, 
  Package, 
  FileText, 
  Users, 
  Truck, 
  PieChart, 
  FileCog, 
  Upload, 
  Settings,
  Store,
  CreditCard,
  Car,
} from "lucide-react";
import logoImage from "/placeholder.svg";
import { Button } from "../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar as SidebarComponent, SidebarItem, SidebarSection } from "@/components/ui/sidebar";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  // This function determines if the current path is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Upload logo from user
  const [logoUrl, setLogoUrl] = useState<string>("/placeholder.svg");

  // Check if custom logo exists
  useEffect(() => {
    const img = new Image();
    img.src = "/lovable-uploads/916eabaf-754d-4b79-9245-7f184af91ccb.png";
    img.onload = () => {
      setLogoUrl("/lovable-uploads/916eabaf-754d-4b79-9245-7f184af91ccb.png");
    };
  }, []);

  return (
    <SidebarComponent 
      isOpen={isOpen} 
      onClose={() => setIsOpen(false)}
      className="shadow-lg transition-all duration-300 border-r border-border"
    >
      <div className="p-4 flex justify-center mb-4">
        <Link to="/" className="flex items-center">
          <img
            src={logoUrl}
            alt="Logo"
            className="h-12 w-auto"
          />
        </Link>
      </div>
      
      <ScrollArea className="flex flex-col flex-1">
        <SidebarSection>
          <SidebarItem
            href="/"
            icon={<LayoutDashboard />}
            label="Dashboard"
            isActive={isActive('/')}
          />
          <SidebarItem
            href="/inventory"
            icon={<Package />}
            label="Inventory"
            isActive={isActive('/inventory')}
          />
          <SidebarItem
            href="/sales"
            icon={<DollarSign />}
            label="Sales"
            isActive={isActive('/sales')}
          />
          <SidebarItem
            href="/customers"
            icon={<Users />}
            label="Customers"
            isActive={isActive('/customers')}
          />
        </SidebarSection>

        <SidebarSection title="Business">
          <SidebarItem
            href="/jobs"
            icon={<Car />}
            label="Jobs"
            isActive={isActive('/jobs')}
          />
          <SidebarItem
            href="/stores"
            icon={<Store />}
            label="Stores"
            isActive={isActive('/stores')}
          />
          <SidebarItem
            href="/suppliers"
            icon={<Truck />}
            label="Suppliers"
            isActive={isActive('/suppliers')}
          />
          <SidebarItem
            href="/accounting"
            icon={<CreditCard />}
            label="Accounting"
            isActive={isActive('/accounting')}
          />
          <SidebarItem
            href="/reports"
            icon={<PieChart />}
            label="Reports"
            isActive={isActive('/reports')}
          />
        </SidebarSection>

        <SidebarSection title="System">
          <SidebarItem
            href="/receipt-templates"
            icon={<FileCog />}
            label="Receipt Templates"
            isActive={isActive('/receipt-templates')}
          />
          <SidebarItem
            href="/import"
            icon={<Upload />}
            label="Import Data"
            isActive={isActive('/import')}
          />
          <SidebarItem
            href="/settings"
            icon={<Settings />}
            label="Settings"
            isActive={isActive('/settings')}
          />
        </SidebarSection>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3 mb-2">
          <div className="relative">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
          </div>
          <div className="text-sm font-medium">Auto Parts System</div>
        </div>
        <div className="text-xs text-muted-foreground">
          v1.2.0
        </div>
      </div>
    </SidebarComponent>
  );
};

export default Sidebar;
