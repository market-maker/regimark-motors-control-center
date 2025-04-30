
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/ThemeProvider";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

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
        size="icon"
        onClick={toggleTheme}
        className="relative rounded-full overflow-hidden"
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
          <Sun className="h-5 w-5" />
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
          <Moon className="h-5 w-5" />
        </motion.div>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  );
}
