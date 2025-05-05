
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { Input } from "./input";
import { Avatar } from "./avatar";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "./tooltip";

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
  children?: React.ReactNode;
}

interface SidebarSectionProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

interface SidebarSearchProps {
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
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
    <SidebarContext.Provider value={{ collapsed, toggleCollapse }}>
      <motion.div
        className={cn(
          "h-full bg-background border-r overflow-y-auto flex flex-col gap-2 transition-all duration-300 relative",
          "scrollbar-none backdrop-blur-sm bg-background/95 shadow-md",
          collapsed ? "w-[70px]" : "w-64",
          className
        )}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1, width: collapsed ? 70 : 256 }}
        exit={{ x: -20, opacity: 0 }}
        transition={{ ease: "easeOut", duration: 0.3 }}
      >
        <div className="p-3 flex-1 flex flex-col gap-3">
          {children}
        </div>

        {collapsible && (
          <div className="sticky bottom-0 pt-2 pb-2 border-t flex justify-center bg-background/95 backdrop-blur-sm">
            <button 
              onClick={toggleCollapse}
              className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center w-8 h-8"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>
        )}
      </motion.div>
    </SidebarContext.Provider>
  );
}

export function SidebarHeader({ 
  className, 
  children,
  logo,
  title
}: { 
  className?: string; 
  children?: React.ReactNode;
  logo?: React.ReactNode;
  title?: string;
}) {
  const sidebarContext = React.useContext(SidebarContext);
  const isCollapsed = sidebarContext?.collapsed ?? false;

  return (
    <div className={cn(
      "flex items-center h-14 px-3 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10",
      className
    )}>
      {children ? children : (
        <>
          <div className="flex items-center gap-3">
            {logo && <div className="flex-shrink-0">{logo}</div>}
            {!isCollapsed && title && (
              <span className="font-semibold text-lg truncate">{title}</span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export function SidebarSearch({ 
  onSearch,
  placeholder = "Search...",
  className 
}: SidebarSearchProps) {
  const sidebarContext = React.useContext(SidebarContext);
  const isCollapsed = sidebarContext?.collapsed ?? false;
  
  if (isCollapsed) {
    return (
      <div className="px-2 py-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className="w-full p-2 rounded-full bg-accent/50 hover:bg-accent text-accent-foreground flex items-center justify-center transition-colors"
                aria-label="Search"
              >
                <Search size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Search</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  return (
    <div className={cn("px-2 py-2", className)}>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          className="pl-8 h-9 bg-accent/50 border-0 focus-visible:ring-1 text-sm"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>
    </div>
  );
}

export function SidebarUser({
  name,
  email,
  avatar,
  className
}: {
  name?: string;
  email?: string;
  avatar?: string;
  className?: string;
}) {
  const sidebarContext = React.useContext(SidebarContext);
  const isCollapsed = sidebarContext?.collapsed ?? false;

  return (
    <div className={cn(
      "flex items-center gap-3 p-2 rounded-md hover:bg-accent/50 transition-colors mt-auto",
      className
    )}>
      <Avatar className="h-9 w-9">
        <img src={avatar} alt={name} />
      </Avatar>
      {!isCollapsed && (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{name}</span>
          {email && <span className="text-xs text-muted-foreground truncate">{email}</span>}
        </div>
      )}
    </div>
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
  children
}: SidebarItemProps) {
  const Element = href ? 'a' : 'button';
  const props = href ? { href } : { onClick };

  // Access collapsed state from parent context
  const sidebarContext = React.useContext(SidebarContext);
  const isCollapsed = sidebarContext?.collapsed;

  return (
    <TooltipProvider disableHoverableContent={!isCollapsed}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Element
            {...props}
            className={cn(
              "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-all",
              "hover:bg-accent hover:text-accent-foreground relative group",
              isActive ? activeClasses : "text-muted-foreground",
              isActive && "after:absolute after:top-1/2 after:-translate-y-1/2 after:left-0 after:h-8 after:w-0.5 after:bg-primary after:rounded-r",
              className
            )}
          >
            <div className={cn("flex items-center gap-3", isCollapsed && "justify-center w-full")}>
              {icon && (
                <div className={cn(
                  "flex-shrink-0 w-5 h-5 flex items-center justify-center",
                  isActive && "text-primary"
                )}>
                  {icon}
                </div>
              )}
              {!isCollapsed && <span className="truncate">{title}</span>}
            </div>
            
            {!isCollapsed && badge && <div>{badge}</div>}
            
            {children && !isCollapsed && (
              <div className="ml-auto pl-2 flex items-center">
                <ChevronRight size={16} className="text-muted-foreground transition-transform group-data-[state=open]:rotate-90" />
              </div>
            )}
          </Element>
        </TooltipTrigger>
        {isCollapsed && (
          <TooltipContent side="right" sideOffset={10}>
            <div className="flex items-center gap-2">
              <span>{title}</span>
              {badge && <span>{badge}</span>}
            </div>
          </TooltipContent>
        )}
      </Tooltip>

      {children && (
        <div className={cn("pl-4 mt-1", isCollapsed && "hidden")}>
          {children}
        </div>
      )}
    </TooltipProvider>
  );
}

export function SidebarNestedItem({ 
  children, 
  title, 
  icon, 
  isActive, 
  defaultOpen,
  className 
}: SidebarItemProps & { defaultOpen?: boolean }) {
  const sidebarContext = React.useContext(SidebarContext);
  const isCollapsed = sidebarContext?.collapsed;
  
  if (isCollapsed) {
    return (
      <SidebarItem 
        icon={icon} 
        title={title} 
        isActive={isActive} 
        className={className}
      />
    );
  }

  return (
    <Collapsible defaultOpen={defaultOpen} className="transition-all">
      <CollapsibleTrigger className="w-full">
        <SidebarItem 
          icon={icon} 
          title={title} 
          isActive={isActive} 
          className={cn("cursor-pointer", className)}
        >
          <></>
        </SidebarItem>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-8 pt-1">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function SidebarSection({ 
  children, 
  title, 
  className, 
  collapsible = false,
  defaultExpanded = true
}: SidebarSectionProps) {
  const sidebarContext = React.useContext(SidebarContext);
  const isCollapsed = sidebarContext?.collapsed;

  if (isCollapsed) {
    return (
      <div className={cn("py-2", className)}>
        <div className="space-y-1">{children}</div>
      </div>
    );
  }

  if (collapsible) {
    return (
      <Collapsible defaultOpen={defaultExpanded} className={cn("py-2", className)}>
        <div className="flex items-center justify-between px-3 mb-1">
          {title && (
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {title}
            </h3>
          )}
          <CollapsibleTrigger className="p-1 rounded-md hover:bg-accent/50 text-muted-foreground">
            <ChevronRight size={14} className="transition-transform data-[state=open]:rotate-90" />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-1 mt-1">
          {children}
        </CollapsibleContent>
      </Collapsible>
    );
  }

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

// New divider component for visual separation
export function SidebarDivider() {
  return <div className="h-px bg-border my-2 mx-2" />;
}
