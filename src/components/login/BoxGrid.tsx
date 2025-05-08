
// BoxGrid component simplified to a plain background
const BoxGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="relative h-full w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black"></div>
    </div>
  );
};

export default BoxGrid;
