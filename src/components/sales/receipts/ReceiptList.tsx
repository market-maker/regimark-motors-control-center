
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Printer, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Receipt from "../Receipt";
import { SaleData } from "../types/salesTypes";

const ReceiptList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReceipt, setSelectedReceipt] = useState<SaleData | null>(null);
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  
  // Sample receipts data - in a real application this would be fetched from an API
  const receipts: SaleData[] = [
    {
      saleId: "INV-123456",
      date: "May 9, 2025, 10:30 AM",
      customerName: "John Doe",
      customerEmail: "john@example.com",
      paymentMethod: "cash",
      items: [
        {
          id: "1",
          name: "Oil Change Service",
          sku: "OIL-CHANGE-1",
          price: 49.99,
          quantity: 1,
        },
        {
          id: "2",
          name: "Oil Filter",
          sku: "FILTER-1",
          price: 12.99,
          quantity: 1,
        }
      ],
      subtotal: 62.98,
      tax: 4.41,
      total: 67.39,
      status: "Completed"
    },
    {
      saleId: "INV-123457",
      date: "May 8, 2025, 3:15 PM",
      customerName: "Jane Smith",
      customerEmail: "jane@example.com",
      paymentMethod: "card",
      items: [
        {
          id: "3",
          name: "Brake Inspection",
          sku: "BRAKE-INSP-1",
          price: 29.99,
          quantity: 1,
        }
      ],
      subtotal: 29.99,
      tax: 2.10,
      total: 32.09,
      status: "Completed"
    },
    {
      saleId: "INV-123458",
      date: "May 7, 2025, 2:45 PM",
      customerName: "Robert Johnson",
      customerEmail: "robert@example.com",
      paymentMethod: "credit",
      items: [
        {
          id: "4",
          name: "Tire Rotation",
          sku: "TIRE-ROT-1",
          price: 39.99,
          quantity: 4,
        }
      ],
      subtotal: 159.96,
      tax: 11.20,
      total: 171.16,
      isCredit: true,
      dueDate: "May 21, 2025",
      status: "Pending"
    }
  ];
  
  // Filter receipts based on search term
  const filteredReceipts = receipts.filter(receipt => 
    receipt.saleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // View receipt details
  const handleViewReceipt = (receipt: SaleData) => {
    setSelectedReceipt(receipt);
    setShowReceiptDialog(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sales Receipts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-6 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by invoice #, customer name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReceipts.length > 0 ? (
                  filteredReceipts.map((receipt) => (
                    <TableRow key={receipt.saleId}>
                      <TableCell className="font-medium">{receipt.saleId}</TableCell>
                      <TableCell>{receipt.date}</TableCell>
                      <TableCell>{receipt.customerName}</TableCell>
                      <TableCell className="capitalize">
                        {receipt.isCredit ? (
                          <span className="flex items-center">
                            <Badge variant="outline" className="mr-2">Credit</Badge>
                            {receipt.paymentMethod}
                          </span>
                        ) : receipt.paymentMethod}
                      </TableCell>
                      <TableCell className="text-right">${receipt.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={
                          receipt.status === "Completed" 
                            ? "bg-green-100 text-green-800" 
                            : receipt.status === "Pending" 
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }>
                          {receipt.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleViewReceipt(receipt)}
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            title="Print"
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            title="Download"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      No receipts found matching your search
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Receipt Dialog */}
      <Dialog open={showReceiptDialog} onOpenChange={setShowReceiptDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Receipt #{selectedReceipt?.saleId}</DialogTitle>
          </DialogHeader>
          {selectedReceipt && (
            <Receipt 
              saleData={selectedReceipt} 
              onClose={() => setShowReceiptDialog(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReceiptList;
