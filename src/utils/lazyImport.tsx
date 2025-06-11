
import React, { Suspense, ComponentType } from 'react';

export function lazyImport<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
): T {
  const LazyComponent = React.lazy(factory);
  
  return ((props: any) => (
    <Suspense fallback={<PageSuspense />}>
      <LazyComponent {...props} />
    </Suspense>
  )) as T;
}

const PageSuspense: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-regimark-primary"></div>
    </div>
  );
};

export default lazyImport;
