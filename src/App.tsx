
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";
import Accounting from "./pages/Accounting";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./providers/ThemeProvider";
import ImportData from "./pages/ImportData";
import Suppliers from "./pages/Suppliers"; // Add Suppliers page
import ReceiptTemplates from "./pages/ReceiptTemplates"; // Add Receipt Templates page
import { useEffect } from "react";

const queryClient = new QueryClient();

// Auto-authenticate user
const AutoAuth = () => {
  useEffect(() => {
    // Set a default user
    localStorage.setItem('user', JSON.stringify({ email: 'default@example.com', isLoggedIn: true }));
  }, []);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AutoAuth />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/import" element={<ImportData />} />
            <Route path="/suppliers" element={<Suppliers />} /> {/* New route */}
            <Route path="/receipt-templates" element={<ReceiptTemplates />} /> {/* New route */}
            {/* Redirect any other paths to home */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
