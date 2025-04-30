
import { useState } from 'react';
import { Bell, Search, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { toast } from '@/components/ui/sonner';
import { motion } from 'framer-motion';
import { useTheme } from '@/providers/ThemeProvider';

const Header = () => {
  const [notifications] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      toast.info(`Searching for: ${searchTerm}`);
      // In a real app, we would handle the search functionality here
      setSearchTerm('');
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: { type: "spring", stiffness: 400 }
    },
    tap: {
      scale: 0.9
    }
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`py-4 px-6 flex items-center justify-between border-b ${theme === 'dark' ? 'bg-black/40 backdrop-blur-lg border-gray-800' : 'bg-white/80 backdrop-blur-lg border-gray-200'}`}
    >
      <div className="flex items-center">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search..." 
            className={`pl-10 w-64 transition-all focus:shadow-lg ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : ''}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
      <div className="flex items-center space-x-4">
        <motion.div 
          whileHover="hover" 
          whileTap="tap"
          variants={iconVariants}
        >
          <ThemeToggle />
        </motion.div>
        
        <motion.div 
          className="relative"
          whileHover="hover" 
          whileTap="tap"
          variants={iconVariants}
        >
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            {notifications > 0 && (
              <motion.span 
                className="absolute top-0 right-0 h-4 w-4 bg-regimark-primary text-white text-xs flex items-center justify-center rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                {notifications}
              </motion.span>
            )}
          </Button>
        </motion.div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Avatar className="h-8 w-8 shadow-md">
                  <AvatarFallback className="bg-regimark-primary text-white">
                    RM
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">Admin User</span>
              </Button>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
              <DropdownMenuItem onClick={() => toast.info("Profile view not implemented yet")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </motion.div>
            <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
              <DropdownMenuItem onClick={() => toast.info("Settings view not implemented yet")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </motion.div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
};

export default Header;
