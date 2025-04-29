
import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/dashboard/StatCard";
import RecentSales from "../components/dashboard/RecentSales";
import LowStockAlert from "../components/dashboard/LowStockAlert";
import SalesChart from "../components/dashboard/SalesChart";
import { ShoppingCart, Package, Users, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
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
        <motion.h1 
          className="text-3xl font-bold mb-8 text-regimark-primary bg-gradient-to-r from-regimark-primary to-regimark-accent bg-clip-text text-transparent"
          variants={itemAnimation}
        >
          Dashboard Overview
        </motion.h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div variants={itemAnimation}>
            <StatCard 
              title="Total Sales" 
              value="$12,452.75" 
              icon={<ShoppingCart className="h-5 w-5" />} 
              trend={{ value: 12.5, isPositive: true }}
              className="dashboard-card-glow blue-glow"
            />
          </motion.div>
          <motion.div variants={itemAnimation}>
            <StatCard 
              title="Inventory Items" 
              value="1,245" 
              icon={<Package className="h-5 w-5" />}
              className="dashboard-card-glow green-glow"
            />
          </motion.div>
          <motion.div variants={itemAnimation}>
            <StatCard 
              title="Active Customers" 
              value="348" 
              icon={<Users className="h-5 w-5" />} 
              trend={{ value: 8.2, isPositive: true }}
              className="dashboard-card-glow purple-glow"
            />
          </motion.div>
          <motion.div variants={itemAnimation}>
            <StatCard 
              title="Net Profit" 
              value="$4,325.90" 
              icon={<DollarSign className="h-5 w-5" />} 
              trend={{ value: 2.1, isPositive: false }}
              className="dashboard-card-glow amber-glow"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <motion.div 
            className="lg:col-span-2"
            variants={itemAnimation}
          >
            <SalesChart />
          </motion.div>
          <motion.div variants={itemAnimation}>
            <LowStockAlert />
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 gap-6"
          variants={itemAnimation}
        >
          <RecentSales />
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default Index;
