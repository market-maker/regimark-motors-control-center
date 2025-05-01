
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import { ThemeProvider } from "./providers/ThemeProvider";
import { NotificationsProvider } from "./providers/NotificationsProvider";
import "./App.css";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <ThemeProvider>
      <NotificationsProvider>
        <Toaster richColors position="top-right" />
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/import" element={<ImportData />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/receipt-templates" element={<ReceiptTemplates />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </NotificationsProvider>
    </ThemeProvider>
  );
}

export default App;
