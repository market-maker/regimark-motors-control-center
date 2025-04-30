
import MainLayout from "../layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
];

const inventoryData = [
  { name: 'Brakes', value: 35 },
  { name: 'Filters', value: 25 },
  { name: 'Engine', value: 20 },
  { name: 'Ignition', value: 15 },
  { name: 'Other', value: 5 },
];

const profitData = [
  { name: 'Jan', revenue: 4000, cost: 2400, profit: 1600 },
  { name: 'Feb', revenue: 3000, cost: 1398, profit: 1602 },
  { name: 'Mar', revenue: 2000, cost: 980, profit: 1020 },
  { name: 'Apr', revenue: 2780, cost: 1908, profit: 872 },
  { name: 'May', revenue: 1890, cost: 1800, profit: 90 },
  { name: 'Jun', revenue: 2390, cost: 1800, profit: 590 },
  { name: 'Jul', revenue: 3490, cost: 2300, profit: 1190 },
];

const COLORS = ['#E30613', '#333333', '#FF5A5A', '#771D1D', '#FFCCCB'];

const Reports = () => {
  const { theme } = useTheme();
  
  return (
    <MainLayout>
      <div className="page-container">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-8 bg-gradient-to-r from-regimark-primary to-regimark-accent bg-clip-text text-transparent"
        >
          Reports & Analytics
        </motion.h1>
        
        <Tabs defaultValue="sales">
          <TabsList className="mb-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <TabsTrigger value="sales" className="relative overflow-hidden">
                <motion.span
                  className="absolute bottom-0 left-0 h-[2px] bg-regimark-primary"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
                Sales Reports
              </TabsTrigger>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <TabsTrigger value="inventory" className="relative overflow-hidden">
                <motion.span
                  className="absolute bottom-0 left-0 h-[2px] bg-regimark-primary"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
                Inventory Reports
              </TabsTrigger>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <TabsTrigger value="financial" className="relative overflow-hidden">
                <motion.span
                  className="absolute bottom-0 left-0 h-[2px] bg-regimark-primary"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
                Financial Reports
              </TabsTrigger>
            </motion.div>
          </TabsList>
          
          <TabsContent value="sales" className="animate-fade-in">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className={`shadow-xl ${theme === 'dark' ? 'bg-black/40' : ''}`}>
                <CardHeader>
                  <CardTitle>Monthly Sales Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={salesData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#333' : '#fff', borderRadius: '0.5rem' }} />
                        <Legend />
                        <Bar dataKey="sales" name="Monthly Sales" fill="#E30613" barSize={40} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="inventory" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className={`shadow-xl ${theme === 'dark' ? 'bg-black/40' : ''}`}>
                  <CardHeader>
                    <CardTitle>Inventory by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={inventoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {inventoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value, name) => [`${value} items`, name]} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className={`shadow-xl ${theme === 'dark' ? 'bg-black/40' : ''}`}>
                  <CardHeader>
                    <CardTitle>Inventory Value Report</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center">
                      <motion.div 
                        className="text-center"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <p className="text-muted-foreground mb-2">Total Inventory Value</p>
                        <p className="text-4xl font-bold text-regimark-primary">$45,672.89</p>
                        <p className="text-sm text-regimark-secondary mt-2">125 SKUs in stock</p>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="financial" className="animate-fade-in">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className={`shadow-xl ${theme === 'dark' ? 'bg-black/40' : ''}`}>
                <CardHeader>
                  <CardTitle>Revenue vs. Cost Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={profitData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#333' : '#fff', borderRadius: '0.5rem' }} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#E30613" 
                          strokeWidth={2} 
                          activeDot={{ r: 8 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="cost" 
                          stroke="#333333" 
                          strokeWidth={2} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="profit" 
                          stroke="#38A169" 
                          strokeWidth={2} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Reports;
