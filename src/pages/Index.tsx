import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/dashboard/StatCard";
import RecentSales from "../components/dashboard/RecentSales";
import LowStockAlert from "../components/dashboard/LowStockAlert";
import SalesChart from "../components/dashboard/SalesChart";
import { BarChart3, Package, Users, DollarSign, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { theme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <MainLayout>
      <motion.div 
        className="page-container"
        initial="hidden"
        animate="show"
        variants={containerAnimation}
      >
        <motion.div 
          className="flex justify-between items-center mb-8"
          variants={itemAnimation}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-regimark-primary to-regimark-accent bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            className="flex items-center gap-2 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/30 dark:hover:text-red-400"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div variants={itemAnimation} whileHover={{ scale: 1.03, y: -5 }} transition={{ type: "spring" }}>
            <StatCard 
              title="Total Sales" 
              value="$0.00" 
              icon={<BarChart3 className="h-5 w-5" />} 
              trend={{ value: 0, isPositive: true }}
              className="dashboard-card-glow red-glow"
            />
          </motion.div>
          <motion.div variants={itemAnimation} whileHover={{ scale: 1.03, y: -5 }} transition={{ type: "spring" }}>
            <StatCard 
              title="Inventory Items" 
              value="0" 
              icon={<Package className="h-5 w-5" />}
              className="dashboard-card-glow black-glow"
            />
          </motion.div>
          <motion.div variants={itemAnimation} whileHover={{ scale: 1.03, y: -5 }} transition={{ type: "spring" }}>
            <StatCard 
              title="Active Customers" 
              value="0" 
              icon={<Users className="h-5 w-5" />} 
              trend={{ value: 0, isPositive: true }}
              className="dashboard-card-glow red-glow"
            />
          </motion.div>
          <motion.div variants={itemAnimation} whileHover={{ scale: 1.03, y: -5 }} transition={{ type: "spring" }}>
            <StatCard 
              title="Net Profit" 
              value="$0.00" 
              icon={<DollarSign className="h-5 w-5" />} 
              trend={{ value: 0, isPositive: true }}
              className="dashboard-card-glow black-glow"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <motion.div 
            className="lg:col-span-2"
            variants={itemAnimation}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <SalesChart />
          </motion.div>
          <motion.div 
            variants={itemAnimation}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <LowStockAlert />
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 gap-6"
          variants={itemAnimation}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <RecentSales />
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default Index;