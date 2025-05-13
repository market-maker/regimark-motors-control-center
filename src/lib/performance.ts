
// Simple performance monitoring utility
export const measurePerformance = (name: string, fn: () => any) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`[Performance] ${name}: ${end - start}ms`);
  return result;
};

export const usePerformanceMonitor = () => {
  const measure = (name: string, fn: () => any) => {
    return measurePerformance(name, fn);
  };
  
  return { measure };
};
