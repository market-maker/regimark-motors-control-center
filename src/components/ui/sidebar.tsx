
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarProps {
  children: React.ReactNode;
  className?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
}

interface SidebarItemProps {
  icon?: React.ReactNode;
  title: string;
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
  badge?: React.ReactNode;
  activeClasses?: string;
}

interface SidebarSectionProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

// Export the components properly
export function Sidebar({ 
  children, 
  className, 
  collapsible = true,
  defaultCollapsed = false,
  onCollapseChange
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const toggleCollapse = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    if (onCollapseChange) {
      onCollapseChange(newState);
    }
  };

  return (
    <motion.div
      className={cn(
        "h-full bg-background border-r p-4 overflow-y-auto flex flex-col gap-2 transition-all duration-300",
        collapsed ? "w-20" : "w-64",
        className
      )}
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1, width: collapsed ? 80 : 256 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ ease: "easeOut", duration: 0.3 }}
    >
      {children}

      {collapsible && (
        <div className="mt-auto pt-4 border-t flex justify-center">
          <button 
            onClick={toggleCollapse}
            className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      )}
    </motion.div>
  );
}

export function SidebarItem({ 
  icon, 
  title, 
  isActive = false, 
  href,
  onClick,
  className,
  badge,
  activeClasses = "bg-primary/10 text-primary",
}: SidebarItemProps) {
  const Element = href ? 'a' : 'button';
  const props = href ? { href } : { onClick };

  // Access collapsed state from parent context if needed
  const sidebarContext = React.useContext(SidebarContext);
  const isCollapsed = sidebarContext?.collapsed;

  return (
    <Element
      {...props}
      className={cn(
        "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        isActive ? activeClasses : "text-muted-foreground",
        className
      )}
    >
      <div className={cn("flex items-center gap-3", isCollapsed && "justify-center w-full")}>
        {icon && <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">{icon}</div>}
        {!isCollapsed && <span>{title}</span>}
      </div>
      {!isCollapsed && badge && <div>{badge}</div>}
    </Element>
  );
}

export function SidebarSection({ children, title, className }: SidebarSectionProps) {
  return (
    <div className={cn("py-2", className)}>
      {title && (
        <h3 className="mb-1 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  );
}

// Create a context to manage collapse state
interface SidebarContextType {
  collapsed: boolean;
  toggleCollapse: () => void;
}

export const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ 
  children, 
  defaultCollapsed = false 
}: { 
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  
  const toggleCollapse = () => setCollapsed(!collapsed);

  return (
    <SidebarContext.Provider value={{ collapsed, toggleCollapse }}>
      {children}
    </SidebarContext.Provider>
  );
}
