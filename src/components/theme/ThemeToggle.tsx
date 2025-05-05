
import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/ThemeProvider";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();

  const variants = {
    light: { rotate: 0, scale: 1 },
    dark: { rotate: 180, scale: 1 }
  };

  return (
    <motion.div
      animate={theme}
      variants={variants}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <Button
        variant="ghost"
        size={isMobile ? "sm" : "icon"}
        onClick={toggleTheme}
        className="relative rounded-full overflow-hidden touch-action-manipulation"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <motion.div
          initial={false}
          animate={{ 
            scale: theme === 'dark' ? 0 : 1,
            opacity: theme === 'dark' ? 0 : 1
          }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <Sun className="h-4 w-4 md:h-5 md:w-5" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ 
            scale: theme === 'light' ? 0 : 1,
            opacity: theme === 'light' ? 0 : 1
          }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <Moon className="h-4 w-4 md:h-5 md:w-5" />
        </motion.div>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  );
}
