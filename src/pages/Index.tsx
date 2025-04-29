
import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/dashboard/StatCard";
import RecentSales from "../components/dashboard/RecentSales";
import LowStockAlert from "../components/dashboard/LowStockAlert";
import SalesChart from "../components/dashboard/SalesChart";
import { ShoppingCart, Package, Users, DollarSign } from "lucide-react";

const Index = () => {
  return (
    <MainLayout>
      <div className="page-container">
        <h1 className="text-3xl font-bold mb-8 text-regimark-primary">Dashboard</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Total Sales" 
            value="$12,452.75" 
            icon={<ShoppingCart className="h-5 w-5" />} 
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard 
            title="Inventory Items" 
            value="1,245" 
            icon={<Package className="h-5 w-5" />}
          />
          <StatCard 
            title="Active Customers" 
            value="348" 
            icon={<Users className="h-5 w-5" />} 
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatCard 
            title="Net Profit" 
            value="$4,325.90" 
            icon={<DollarSign className="h-5 w-5" />} 
            trend={{ value: 2.1, isPositive: false }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <SalesChart />
          </div>
          <div>
            <LowStockAlert />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <RecentSales />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
