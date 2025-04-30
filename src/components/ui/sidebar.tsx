
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ children, className, isOpen = true, onClose, ...props }, ref) => {
    return (
      <>
        {/* Mobile backdrop */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
              onClick={onClose}
            />
          )}
        </AnimatePresence>

        {/* Sidebar content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={ref}
              className={cn(
                "fixed inset-y-0 left-0 z-50 flex flex-col w-[250px] border-r bg-background md:relative",
                className
              )}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              {...props}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }
);

Sidebar.displayName = "Sidebar";

export interface SidebarItemProps extends React.HTMLAttributes<HTMLLIElement> {
  icon?: React.ReactNode;
  label: string;
  isActive?: boolean;
  href?: string;
  notification?: number;
}

export const SidebarItem = forwardRef<HTMLLIElement, SidebarItemProps>(
  ({ className, icon, label, isActive = false, href, notification, ...props }, ref) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (href) {
        navigate(href);
      }
    };

    const currentPath = href === '/' ? href : `/${href?.split('/')[1]}`;
    const isCurrentPath = location.pathname === href || location.pathname.startsWith(currentPath + '/');
    const active = isActive || isCurrentPath;

    return (
      <li ref={ref} {...props}>
        <motion.a
          href={href}
          className={cn(
            "flex items-center gap-4 px-4 py-3 text-base transition-all rounded-lg relative overflow-hidden",
            active
              ? "bg-primary text-primary-foreground font-medium"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            className
          )}
          onClick={handleClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Glowing effect */}
          {active && (
            <motion.div 
              className="absolute inset-0 bg-primary opacity-20 rounded-lg"
              animate={{ 
                boxShadow: ["0 0 0px rgba(227, 6, 19, 0)", "0 0 15px rgba(227, 6, 19, 0.5)", "0 0 0px rgba(227, 6, 19, 0)"],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          )}
          
          {icon && <span className="w-5 h-5">{icon}</span>}
          <span>{label}</span>
          {notification ? (
            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
              {notification}
            </span>
          ) : null}
        </motion.a>
      </li>
    );
  }
);

SidebarItem.displayName = "SidebarItem";

export interface SidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children?: React.ReactNode;
}

export const SidebarSection = forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("py-2", className)} {...props}>
        {title && (
          <div className="px-4 mb-2">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {title}
            </h3>
          </div>
        )}
        <ul className="space-y-1 px-2">{children}</ul>
      </div>
    );
  }
);

SidebarSection.displayName = "SidebarSection";
