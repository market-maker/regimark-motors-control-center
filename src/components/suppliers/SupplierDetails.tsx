
import { Supplier } from "@/types/supplier";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Edit } from "lucide-react";

interface SupplierDetailsProps {
  supplier: Supplier;
  onBack: () => void;
}

const SupplierDetails = ({ supplier, onBack }: SupplierDetailsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Suppliers
        </Button>
        <Button size="sm">
          <Edit className="mr-2 h-4 w-4" />
          Edit Supplier
        </Button>
      </div>
      
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-2xl font-bold">{supplier.name}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-3">
                  <span className="font-medium">Contact Person:</span>
                  <span className="col-span-2">{supplier.contactPerson}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium">Email:</span>
                  <span className="col-span-2">{supplier.email}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium">Phone:</span>
                  <span className="col-span-2">{supplier.phone}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium">Address:</span>
                  <span className="col-span-2">{supplier.address}</span>
                </div>
                {supplier.website && (
                  <div className="grid grid-cols-3">
                    <span className="font-medium">Website:</span>
                    <a 
                      href={supplier.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="col-span-2 text-regimark-primary hover:underline"
                    >
                      {supplier.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Business Details</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-3">
                  <span className="font-medium">Payment Terms:</span>
                  <span className="col-span-2">{supplier.paymentTerms}</span>
                </div>
                {supplier.notes && (
                  <div className="grid grid-cols-3">
                    <span className="font-medium">Notes:</span>
                    <span className="col-span-2">{supplier.notes}</span>
                  </div>
                )}
                <div className="grid grid-cols-3">
                  <span className="font-medium">Products:</span>
                  <span className="col-span-2">{supplier.products.length} products</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="products">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="border rounded-md mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supplier.products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="orders" className="p-4 border rounded-md mt-4">
          <div className="text-center py-8 text-muted-foreground">
            No order history available
          </div>
        </TabsContent>
        
        <TabsContent value="documents" className="p-4 border rounded-md mt-4">
          <div className="text-center py-8 text-muted-foreground">
            No documents available
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierDetails;
