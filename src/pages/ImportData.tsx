
import { useState } from 'react';
import MainLayout from "../layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExcelImport from "../components/import/ExcelImport";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ImportData = () => {
  const [importedData, setImportedData] = useState<any[]>([]);
  const navigate = useNavigate();

  // Template fields for different categories
  const inventoryFields = ['name', 'sku', 'category', 'price', 'quantity', 'supplier', 'reorderLevel'];
  const customerFields = ['name', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
  const salesFields = ['date', 'customer', 'product', 'quantity', 'price', 'total'];

  const handleDataImport = (data: any[]) => {
    setImportedData(data);
    
    // In a real system, we would process this data and save it to a database
    // For now, we just show a success message and the count
    toast.success(`Successfully processed ${data.length} records`);
  };

  return (
    <MainLayout>
      <motion.div 
        className="page-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8 text-regimark-primary">Data Import</h1>
        
        <div className="grid gap-8">
          <Tabs defaultValue="inventory" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
            </TabsList>

            <TabsContent value="inventory" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ExcelImport 
                  onDataImport={handleDataImport} 
                  templateFields={inventoryFields}
                  category="inventory"
                />
              </motion.div>
              
              {importedData.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-8"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">
                      Preview ({importedData.length} items)
                    </h3>
                    <Button onClick={() => navigate('/inventory')}>
                      Go to Inventory
                    </Button>
                  </div>
                  
                  <div className="rounded-lg border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted">
                            {Object.keys(importedData[0]).map((key) => (
                              <th key={key} className="px-4 py-2 text-left font-medium">
                                {key}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {importedData.slice(0, 5).map((item, index) => (
                            <tr key={index} className="border-t">
                              {Object.values(item).map((value: any, i) => (
                                <td key={i} className="px-4 py-2">
                                  {value.toString()}
                                </td>
                              ))}
                            </tr>
                          ))}
                          {importedData.length > 5 && (
                            <tr className="border-t">
                              <td 
                                colSpan={Object.keys(importedData[0]).length} 
                                className="px-4 py-2 text-center text-muted-foreground"
                              >
                                {importedData.length - 5} more items not shown
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="customers">
              <ExcelImport 
                onDataImport={handleDataImport} 
                templateFields={customerFields}
                category="customers"
              />
            </TabsContent>

            <TabsContent value="sales">
              <ExcelImport 
                onDataImport={handleDataImport} 
                templateFields={salesFields}
                category="sales"
              />
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default ImportData;
