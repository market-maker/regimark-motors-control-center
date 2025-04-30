
import React, { useState } from "react";
import { ThemeToggle } from "../theme/ThemeToggle";
import { Menu, Search } from "lucide-react";
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

interface HeaderProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 backdrop-blur-sm transition-all">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setSidebarOpen(true)}
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
              placeholder="Search inventory, customers, and more..."
            />
          </div>
        </SheetContent>
      </Sheet>

      <div className="hidden md:flex-1 md:flex md:gap-2">
        <Button variant="outline" className="hidden lg:flex">
          Dashboard
        </Button>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden md:flex md:flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="w-64 pl-8"
              placeholder="Search inventory, customers, and more..."
            />
          </div>
        </div>
        <NotificationBell />
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback>AU</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
