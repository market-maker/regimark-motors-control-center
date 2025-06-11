import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard = ({ title, value, icon, trend, className }: StatCardProps) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
        z: 10
      }}
      style={{ perspective: "1000px" }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card 
        className={cn(
          "dashboard-card relative overflow-hidden backdrop-blur-sm",
          theme === "dark" ? "border-white/5 bg-gradient-to-br from-black to-gray-900" : "border border-white/20",
          className
        )}
      >
        <div 
          className={cn(
            "absolute inset-0 z-0",
            theme === "dark" 
              ? "bg-gradient-to-br from-white/5 to-white/1" 
              : "bg-gradient-to-br from-white/50 to-white/20"
          )}
        ></div>
        
        <motion.div 
          className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-20"
          style={{ 
            background: theme === "dark" 
              ? "radial-gradient(circle, rgba(255,90,90,0.3) 0%, rgba(0,0,0,0) 70%)" 
              : "radial-gradient(circle, rgba(227,6,19,0.2) 0%, rgba(255,255,255,0) 70%)" 
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 4,
            ease: "easeInOut" 
          }}
        />
        
        <CardContent className="relative z-10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={cn(
                  "stats-label text-sm uppercase tracking-wider font-medium",
                  theme === "dark" ? "text-gray-300" : "text-regimark-dark/70"
                )}
              >
                {title}
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="stats-value text-2xl font-bold mt-1"
                aria-live="polite"
              >
                {value}
              </motion.p>
              {trend && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center mt-2"
                >
                  <span
                    className={cn(
                      "text-xs font-semibold rounded-full px-2 py-0.5",
                      trend.isPositive 
                        ? "text-regimark-success bg-regimark-success/10" 
                        : "text-regimark-error bg-regimark-error/10"
                    )}
                  >
                    {trend.isPositive ? "+" : "-"}
                    {Math.abs(trend.value)}%
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">vs last month</span>
                </motion.div>
              )}
            </div>
            <motion.div 
              whileHover={{ rotate: [0, -10, 10, -5, 5, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className={cn(
                "p-3 rounded-full shadow-glow",
                theme === "dark" ? "bg-white/5 text-white" : "bg-white/10 text-regimark-primary"
              )}
              aria-hidden="true"
            >
              {icon}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;