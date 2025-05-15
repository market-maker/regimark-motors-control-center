
import React, { Suspense } from "react";

/**
 * Helper for lazy-loading components with proper typing
 */
export function lazyImport<
  T extends React.ComponentType<any>,
  I extends { [K2 in K]: T },
  K extends keyof I
>(factory: () => Promise<I>, name: K): I {
  return Object.create({
    [name]: React.lazy(() => factory().then((module) => ({ default: module[name] })))
  });
}

/**
 * Suspense wrapper for lazy-loaded components
 */
export const PageSuspense = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      {children}
    </Suspense>
  );
};
