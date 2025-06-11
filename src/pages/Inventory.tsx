import MainLayout from "../layouts/MainLayout";
import InventoryTable from "../components/inventory/InventoryTable";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Scissors } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

const Inventory = () => {
  const navigate = useNavigate();
  const [showSplitDialog, setShowSplitDialog] = useState(false);
  
  const handleOpenSplitDialog = () => {
    setShowSplitDialog(true);
  };
  
  const handleSplitProduct = () => {
    // In a real app, this would open a more complex dialog to select products and components
    toast.success("Product has been split into components");
    setShowSplitDialog(false);
  };
  
  return (
    <MainLayout>
      <div className="page-container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-regimark-primary">Inventory Management</h1>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleOpenSplitDialog}>
              <Scissors className="mr-2 h-4 w-4" />
              Split Product
            </Button>
            <Button onClick={() => navigate('/import')}>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Import Data
            </Button>
          </div>
        </div>
        <InventoryTable />
      </div>
      
      <Dialog open={showSplitDialog} onOpenChange={setShowSplitDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Split Product into Components</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Splitting a product allows you to break it down into individual components that can be sold separately.
              For example, you could split a car stereo system into the head unit, speakers, and wiring kit.
            </p>
            
            <div className="space-y-4">
              <div className="border p-4 rounded-md bg-muted/30">
                <p className="font-medium mb-2">How product splitting works:</p>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Select a product from inventory to split</li>
                  <li>Define the components that make up the product</li>
                  <li>Set quantities and prices for each component</li>
                  <li>Add notes about the splitting process</li>
                </ol>
              </div>
              
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Splitting a product will reduce its inventory count 
                  and create new inventory items for each component.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSplitDialog(false)}>Cancel</Button>
            <Button onClick={handleSplitProduct}>Continue to Split Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Inventory;
