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
  
  // Empty initial state instead of mock data
  const [receipts, setReceipts] = useState<SaleData[]>([]);
  
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
                      No receipts found. Process a sale to generate receipts.
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