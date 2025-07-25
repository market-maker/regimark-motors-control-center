
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import ImportData from "./pages/ImportData";
import Customers from "./pages/Customers";
import Suppliers from "./pages/Suppliers";
import Reports from "./pages/Reports";
import Accounting from "./pages/Accounting";
import NotFound from "./pages/NotFound";
import ReceiptTemplates from "./pages/ReceiptTemplates";
import Settings from "./pages/Settings";
import Stores from "./pages/Stores";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import PersonalExpenses from "./pages/PersonalExpenses";
import StoreManagement from "./pages/StoreManagement";
import IconDemo from "./pages/IconDemo";
import { ThemeProvider } from "./providers/ThemeProvider";
import { NotificationsProvider } from "./providers/NotificationsProvider";
import { AuthProvider } from "./providers/AuthProvider";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";
import { Toaster } from "sonner";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <NotificationsProvider>
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                
                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/sales" element={<Sales />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/suppliers" element={<Suppliers />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/receipt-templates" element={<ReceiptTemplates />} />
                  <Route path="/stores" element={<Stores />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/icons" element={<IconDemo />} />
                </Route>
                
                {/* Admin-only routes */}
                <Route element={<ProtectedRoute requiresAdmin />}>
                  <Route path="/import" element={<ImportData />} />
                  <Route path="/accounting" element={<Accounting />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/expenses" element={<PersonalExpenses />} />
                  <Route path="/store-management" element={<StoreManagement />} />
                </Route>
                
                {/* Fallback routes */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster 
                position="top-center"
                expand={false}
                closeButton
                richColors
                toastOptions={{
                  duration: 6000,
                  className: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg"
                }}
              />
            </NotificationsProvider>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
