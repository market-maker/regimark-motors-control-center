
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
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card 
        className={cn(
          "dashboard-card relative overflow-hidden backdrop-blur-sm",
          theme === "dark" ? "border-white/10 bg-white/5" : "border border-white/20",
          className
        )}
      >
        <div 
          className={cn(
            "absolute inset-0 z-0",
            theme === "dark" 
              ? "bg-gradient-to-br from-white/5 to-white/2" 
              : "bg-gradient-to-br from-white/5 to-white/10"
          )}
        ></div>
        <CardContent className="relative z-10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className={cn(
                "stats-label text-sm uppercase tracking-wider font-medium",
                theme === "dark" ? "text-gray-300" : "text-regimark-dark/70"
              )}>{title}</p>
              <p className="stats-value text-2xl font-bold mt-1">{value}</p>
              {trend && (
                <div className="flex items-center mt-2">
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
                </div>
              )}
            </div>
            <div className={cn(
              "p-3 rounded-full shadow-glow",
              theme === "dark" ? "bg-white/10 text-white" : "bg-white/10 text-regimark-primary"
            )}>
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
