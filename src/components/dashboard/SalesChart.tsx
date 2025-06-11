import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart, Legend } from 'recharts';
import { motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";

const SalesChart = () => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const { theme } = useTheme();
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  
  // Empty data arrays instead of mock data
  const [dailyData, setDailyData] = useState<{ name: string; sales: number }[]>([]);
  const [weeklyData, setWeeklyData] = useState<{ name: string; sales: number; trend: number }[]>([]);
  const [monthlyData, setMonthlyData] = useState<{ name: string; sales: number; trend: number }[]>([]);

  const getActiveData = () => {
    switch (timeRange) {
      case 'daily':
        return dailyData;
      case 'weekly':
        return weeklyData;
      case 'monthly':
      default:
        return monthlyData;
    }
  };

  const activeData = getActiveData();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`overflow-hidden backdrop-blur-sm shadow-xl ${theme === 'dark' ? 'border-gray-700' : 'border-white/20'}`}>
        <CardHeader className={`pb-2 ${theme === 'dark' ? 'border-gray-700' : 'border-white/10'} flex flex-row justify-between items-center`}>
          <motion.span 
            initial={{ x: -20, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-semibold"
          >
            Sales Overview
          </motion.span>
          <div className="flex space-x-1 text-sm">
            <button 
              onClick={() => setTimeRange('daily')}
              className={`px-3 py-1 rounded-md transition-all ${timeRange === 'daily' 
                ? 'bg-regimark-primary text-white' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              Daily
            </button>
            <button 
              onClick={() => setTimeRange('weekly')}
              className={`px-3 py-1 rounded-md transition-all ${timeRange === 'weekly' 
                ? 'bg-regimark-primary text-white' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              Weekly
            </button>
            <button 
              onClick={() => setTimeRange('monthly')}
              className={`px-3 py-1 rounded-md transition-all ${timeRange === 'monthly' 
                ? 'bg-regimark-primary text-white' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              Monthly
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {activeData.length > 0 ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {timeRange === 'monthly' || timeRange === 'weekly' ? (
                  <ComposedChart
                    data={activeData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                    onMouseMove={(e) => {
                      if (e.activeTooltipIndex !== undefined) {
                        setHoveredBar(e.activeTooltipIndex);
                      }
                    }}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(8px)',
                        border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '0.5rem',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                      }}
                      cursor={{ fill: 'rgba(227, 6, 19, 0.1)' }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="sales" 
                      name="Sales"
                      fill="#E30613" 
                      barSize={40} 
                      radius={[4, 4, 0, 0]} 
                      animationDuration={1500}
                      className="filter drop-shadow-md"
                    >
                      {activeData.map((entry, index) => (
                        <motion.rect 
                          key={`bar-${index}`}
                          initial={{ opacity: 0.6 }}
                          animate={{ 
                            opacity: hoveredBar === index ? 1 : 0.8,
                            y: hoveredBar === index ? -5 : 0
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      ))}
                    </Bar>
                    <Line 
                      type="monotone" 
                      dataKey="trend" 
                      name="Trend"
                      stroke="#FF8A65" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6, stroke: "#FF8A65", strokeWidth: 2 }}
                    />
                  </ComposedChart>
                ) : (
                  <BarChart
                    data={activeData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                    onMouseMove={(e) => {
                      if (e.activeTooltipIndex !== undefined) {
                        setHoveredBar(e.activeTooltipIndex);
                      }
                    }}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(8px)',
                        border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '0.5rem',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                      }}
                      cursor={{ fill: 'rgba(227, 6, 19, 0.1)' }}
                    />
                    <Bar 
                      dataKey="sales" 
                      fill="#E30613" 
                      barSize={40} 
                      radius={[4, 4, 0, 0]} 
                      animationDuration={1500}
                      className="filter drop-shadow-md"
                    >
                      {activeData.map((entry, index) => (
                        <motion.rect 
                          key={`bar-${index}`}
                          initial={{ opacity: 0.6 }}
                          animate={{ 
                            opacity: hoveredBar === index ? 1 : 0.8,
                            y: hoveredBar === index ? -5 : 0
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                )}
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
  );
};

export default SalesChart;