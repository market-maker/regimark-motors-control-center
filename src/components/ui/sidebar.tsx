
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SidebarProps {
  children: React.ReactNode;
  className?: string;
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
export function Sidebar({ children, className }: SidebarProps) {
  return (
    <motion.div
      className={cn("h-full w-64 bg-background border-r p-4 overflow-y-auto flex flex-col gap-2", className)}
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ ease: "easeOut", duration: 0.3 }}
    >
      {children}
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
      <div className="flex items-center gap-3">
        {icon && <div className="w-6 h-6">{icon}</div>}
        <span>{title}</span>
      </div>
      {badge && <div>{badge}</div>}
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
