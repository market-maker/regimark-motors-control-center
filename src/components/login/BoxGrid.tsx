
import { motion } from "framer-motion";

// BoxGrid component for animated background with hover effects
const BoxGrid = () => {
  const boxes = Array(20).fill(0).map((_, i) => i);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="relative h-full w-full">
        {boxes.map((i) => (
          <motion.div
            key={i}
            className="animated-box"
            initial={{ 
              opacity: Math.random() * 0.2 + 0.1,
              scale: Math.random() * 0.4 + 0.8
            }}
            animate={{ 
              x: [
                `${Math.random() * 90 + 5}%`,
                `${Math.random() * 90 + 5}%`,
                `${Math.random() * 90 + 5}%`,
              ],
              y: [
                `${Math.random() * 90 + 5}%`,
                `${Math.random() * 90 + 5}%`,
                `${Math.random() * 90 + 5}%`,
              ],
              opacity: [0.1, 0.2, 0.1],
              scale: [0.8, 1, 0.9]
            }}
            transition={{ 
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "mirror"
            }}
            style={{ 
              width: `${Math.random() * 10 + 5}rem`,
              height: `${Math.random() * 10 + 5}rem`,
              filter: `blur(${Math.random() * 40 + 20}px)`,
            }}
            whileHover={{
              backgroundColor: "rgba(255,255,255,0.1)",
              transition: { duration: 0.2 }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BoxGrid;
