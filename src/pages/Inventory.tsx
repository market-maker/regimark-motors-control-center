
import MainLayout from "../layouts/MainLayout";
import InventoryTable from "../components/inventory/InventoryTable";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
  const navigate = useNavigate();
  
  return (
    <MainLayout>
      <div className="page-container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-regimark-primary">Inventory Management</h1>
          <Button onClick={() => navigate('/import')}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Import Data
          </Button>
        </div>
        <InventoryTable />
      </div>
    </MainLayout>
  );
};

export default Inventory;
