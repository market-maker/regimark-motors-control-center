
import { useState } from 'react';
import { Bell, Search, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { toast } from '@/components/ui/sonner';

const Header = () => {
  const [notifications] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      toast.info(`Searching for: ${searchTerm}`);
      // In a real app, we would handle the search functionality here
      setSearchTerm('');
    }
  };

  return (
    <header className="bg-background border-b border-border py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search..." 
            className="pl-10 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-regimark-secondary text-white text-xs flex items-center justify-center rounded-full">
                {notifications}
              </span>
            )}
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-regimark-primary text-white">
                  RM
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Admin User</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toast.info("Profile view not implemented yet")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.info("Settings view not implemented yet")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
