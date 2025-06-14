
import Header from "../components/navigation/Header";
import Sidebar from "../components/navigation/Sidebar";
import { useState } from "react";
import ErrorBoundary from "../components/ErrorBoundary";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <Sidebar onClose={() => setSidebarOpen(false)} />
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="lg:pl-64 pt-16">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default MainLayout;
