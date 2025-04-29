
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from "framer-motion";
import { useState } from "react";

const data = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
];

const SalesChart = () => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden border border-white/20 backdrop-blur-sm">
        <CardHeader className="pb-2 border-b border-white/10">
          <CardTitle className="text-xl font-semibold">Monthly Sales</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
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
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '0.5rem',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                  cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                />
                <Bar 
                  dataKey="sales" 
                  fill="url(#salesGradient)" 
                  barSize={40} 
                  radius={[4, 4, 0, 0]} 
                  animationDuration={1500}
                  className="filter drop-shadow-md"
                >
                  {data.map((entry, index) => (
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
                    <stop offset="5%" stopColor="#1A365D" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#4299E1" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SalesChart;
