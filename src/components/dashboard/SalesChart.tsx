import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart, Legend } from 'recharts';
import { motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";

// Empty data for initial state
const emptyData = [
  { name: 'Mon', sales: 0 },
  { name: 'Tue', sales: 0 },
  { name: 'Wed', sales: 0 },
  { name: 'Thu', sales: 0 },
  { name: 'Fri', sales: 0 },
  { name: 'Sat', sales: 0 },
  { name: 'Sun', sales: 0 },
];

const emptyWeeklyData = [
  { name: 'Week 1', sales: 0, trend: 0 },
  { name: 'Week 2', sales: 0, trend: 0 },
  { name: 'Week 3', sales: 0, trend: 0 },
  { name: 'Week 4', sales: 0, trend: 0 },
];

const emptyMonthlyData = [
  { name: 'Jan', sales: 0, trend: 0 },
  { name: 'Feb', sales: 0, trend: 0 },
  { name: 'Mar', sales: 0, trend: 0 },
  { name: 'Apr', sales: 0, trend: 0 },
  { name: 'May', sales: 0, trend: 0 },
  { name: 'Jun', sales: 0, trend: 0 },
  { name: 'Jul', sales: 0, trend: 0 },
];

const SalesChart = () => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const { theme } = useTheme();
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const [data, setData] = useState({
    daily: emptyData,
    weekly: emptyWeeklyData,
    monthly: emptyMonthlyData
  });

  const getActiveData = () => {
    switch (timeRange) {
      case 'daily':
        return data.daily;
      case 'weekly':
        return data.weekly;
      case 'monthly':
      default:
        return data.monthly;
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
              aria-pressed={timeRange === 'daily'}
            >
              Daily
            </button>
            <button 
              onClick={() => setTimeRange('weekly')}
              className={`px-3 py-1 rounded-md transition-all ${timeRange === 'weekly' 
                ? 'bg-regimark-primary text-white' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              aria-pressed={timeRange === 'weekly'}
            >
              Weekly
            </button>
            <button 
              onClick={() => setTimeRange('monthly')}
              className={`px-3 py-1 rounded-md transition-all ${timeRange === 'monthly' 
                ? 'bg-regimark-primary text-white' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              aria-pressed={timeRange === 'monthly'}
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
                  aria-label={`${timeRange} sales chart`}
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
                  aria-label="Daily sales chart"
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
          <div className="text-center mt-4 text-sm text-muted-foreground">
            <p>No sales data available. Data will appear as sales are recorded.</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SalesChart;