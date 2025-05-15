
import React, { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Lazily import a component to improve initial loading performance
 * @param factory A function that imports the component using dynamic import
 * @returns An object with the named export from the imported module
 */
export function lazyImport<
  T extends Record<string, React.ComponentType<any>>,
  I extends keyof T
>(factory: () => Promise<T>, name: I): { [K in I]: T[K] } {
  const LazyComponent = lazy(async () => {
    const module = await factory();
    return { default: module[name] };
  });

  return {
    [name]: (props: React.ComponentProps<T[I]>) => (
      <PageSuspense>
        <LazyComponent {...props} />
      </PageSuspense>
    ),
  } as { [K in I]: T[K] };
}

/**
 * Suspense wrapper for lazily loaded pages with a loading skeleton
 */
const PageSuspense: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Suspense 
      fallback={
        <div className="flex items-center justify-center w-full h-full min-h-[200px]">
          <Skeleton className="w-full h-[200px]" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};
