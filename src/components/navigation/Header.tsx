
import React, { useState } from "react";
import { Menu, Search, LogOut, Settings as SettingsIcon, User, Wifi, WifiOff } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import NotificationBell from "./NotificationBell";
import { useAuth } from "@/providers/AuthProvider";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { ThemeToggle } from "../theme/ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  setSidebarOpen: (value: React.SetStateAction<boolean>) => void;
  isOnline?: boolean;
  userRole?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  setSidebarOpen, 
  isOnline = true,
  userRole = "user"
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userInitials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : "GU";

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 md:h-16 items-center gap-2 md:gap-4 border-b bg-background/80 px-2 md:px-6 backdrop-blur-sm transition-all shadow-sm">
      <Button
        variant="ghost"
        size="icon"
        className="flex-shrink-0"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="top" className="px-4 sm:px-6">
          <div className="relative py-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-8"
              placeholder="Search..."
              autoFocus
            />
          </div>
        </SheetContent>
      </Sheet>

      <div className="hidden md:flex-1 md:flex md:gap-2">
        <Button variant="outline" className="hidden lg:flex">
          Dashboard
        </Button>
      </div>

      <div className="flex flex-1 md:flex-none items-center justify-end gap-2 md:gap-4">
        <div className="hidden md:flex md:flex-1">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="w-full pl-8 shadow-sm hover:shadow-md transition-all duration-300"
              placeholder="Search inventory, customers, and more..."
            />
          </div>
        </div>
        
        {/* Connectivity status indicator */}
        {isOnline ? (
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="hidden md:flex items-center text-green-500"
            title="Online"
          >
            <Wifi size={16} />
          </motion.div>
        ) : (
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="hidden md:flex items-center text-amber-500"
            title="Offline"
          >
            <WifiOff size={16} />
          </motion.div>
        )}
        
        {/* Admin badge */}
        {userRole === "admin" && (
          <Badge variant="secondary" className="hidden md:flex bg-regimark-primary text-white">
            Admin
          </Badge>
        )}
        
        <ThemeToggle />
        
        <NotificationBell />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full shadow-glow">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-regimark-primary text-white">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 sidebar-menu-item">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="truncate">{user?.email}</span>
                <span className="text-xs text-muted-foreground">
                  {userRole === "admin" ? "Administrator" : "Standard User"}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => navigate("/settings")}
              className="sidebar-menu-item cursor-pointer"
            >
              <SettingsIcon className="h-4 w-4 mr-2" /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="sidebar-menu-item cursor-pointer"
            >
              <User className="h-4 w-4 mr-2" /> Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="text-regimark-primary hover:text-regimark-primary/80 cursor-pointer"
            >
              <LogOut className="h-4 w-4 mr-2" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
