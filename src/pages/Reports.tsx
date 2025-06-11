import MainLayout from "../layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { useState } from "react";

const COLORS = ['#E30613', '#333333', '#FF5A5A', '#771D1D', '#FFCCCB'];

const Reports = () => {
  const { theme } = useTheme();
  
  // Empty initial state for report data
  const [salesData, setSalesData] = useState<{ name: string; sales: number }[]>([]);
  const [inventoryData, setInventoryData] = useState<{ name: string; value: number }[]>([]);
  const [profitData, setProfitData] = useState<{ name: string; revenue: number; cost: number; profit: number }[]>([]);
  
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
                  {salesData.length > 0 ? (
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
                  ) : (
                    <div className="h-80 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-muted-foreground mb-4">No sales data available</p>
                        <p className="text-sm text-muted-foreground">Sales data will appear here as transactions are processed</p>
                      </div>
                    </div>
                  )}
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
                    {inventoryData.length > 0 ? (
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
                    ) : (
                      <div className="h-80 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-muted-foreground mb-4">No inventory data available</p>
                          <p className="text-sm text-muted-foreground">Inventory data will appear here as items are added</p>
                        </div>
                      </div>
                    )}
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
                        <p className="text-4xl font-bold text-regimark-primary">$0.00</p>
                        <p className="text-sm text-regimark-secondary mt-2">0 SKUs in stock</p>
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
                  {profitData.length > 0 ? (
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
                  ) : (
                    <div className="h-80 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-muted-foreground mb-4">No financial data available</p>
                        <p className="text-sm text-muted-foreground">Financial data will appear here as sales and expenses are recorded</p>
                      </div>
                    </div>
                  )}
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