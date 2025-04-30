
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart, Legend } from 'recharts';
import { motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";

const dailyData = [
  { name: 'Mon', sales: 1200 },
  { name: 'Tue', sales: 1800 },
  { name: 'Wed', sales: 1400 },
  { name: 'Thu', sales: 2200 },
  { name: 'Fri', sales: 2600 },
  { name: 'Sat', sales: 1800 },
  { name: 'Sun', sales: 1100 },
];

const weeklyData = [
  { name: 'Week 1', sales: 7000, trend: 6800 },
  { name: 'Week 2', sales: 8200, trend: 7900 },
  { name: 'Week 3', sales: 6800, trend: 7200 },
  { name: 'Week 4', sales: 9100, trend: 8500 },
];

const monthlyData = [
  { name: 'Jan', sales: 4000, trend: 3800 },
  { name: 'Feb', sales: 3000, trend: 3200 },
  { name: 'Mar', sales: 2000, trend: 2400 },
  { name: 'Apr', sales: 2780, trend: 2600 },
  { name: 'May', sales: 1890, trend: 2100 },
  { name: 'Jun', sales: 2390, trend: 2200 },
  { name: 'Jul', sales: 3490, trend: 3100 },
];

const SalesChart = () => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const { theme } = useTheme();
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('monthly');

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
                    fill="url(#salesGradient)" 
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
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E30613" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#FF5A5A" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
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
                    fill="url(#salesGradient)" 
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
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E30613" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#FF5A5A" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SalesChart;
