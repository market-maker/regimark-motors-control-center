
import { lazy, Suspense, ComponentType } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Utility for lazy loading pages with fallback
export function lazyImport<T extends ComponentType<any>, I extends { [K2 in K]: T }, K extends keyof I>(
  factory: () => Promise<I>,
  name: K
): I {
  return Object.create({
    [name]: lazy(() => factory().then((module) => ({ default: module[name] })))
  });
}

// Wrapper component for lazy loaded pages with skeleton fallback
export const PageSuspense = ({ children }: { children: React.ReactNode }) => (
  <Suspense
    fallback={
      <div className="w-full h-[60vh] flex flex-col gap-6 p-8">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-64 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    }
  >
    {children}
  </Suspense>
);
