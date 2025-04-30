
import { Customer, DebtRecord } from "@/types/customer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Plus, Receipt as ReceiptIcon } from "lucide-react";
import { useState } from "react";

interface CustomerDetailsProps {
  customer: Customer & { debtRecords: DebtRecord[] };
  onBack: () => void;
}

const CustomerDetails = ({ customer, onBack }: CustomerDetailsProps) => {
  const [activeTab, setActiveTab] = useState("info");
  
  const totalDebt = customer.debtRecords
    .filter(d => d.status !== "Paid")
    .reduce((sum, debt) => {
      const paidAmount = debt.paymentHistory 
        ? debt.paymentHistory.reduce((total, payment) => total + payment.amount, 0) 
        : 0;
      return sum + (debt.amount - paidAmount);
    }, 0);
    
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Customers
        </Button>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            <ReceiptIcon className="mr-2 h-4 w-4" />
            Generate Receipt
          </Button>
          <Button size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit Customer
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="bg-muted/50">
          <div className="flex justify-between">
            <CardTitle className="text-2xl font-bold">{customer.name}</CardTitle>
            <Badge className={customer.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
              {customer.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-3">
                  <span className="font-medium">Email:</span>
                  <span className="col-span-2">{customer.email}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium">Phone:</span>
                  <span className="col-span-2">{customer.phone}</span>
                </div>
                {customer.address && (
                  <div className="grid grid-cols-3">
                    <span className="font-medium">Address:</span>
                    <span className="col-span-2">{customer.address}</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Overview</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-3">
                  <span className="font-medium">Total Spent:</span>
                  <span className="col-span-2">${customer.totalSpent.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium">Last Visit:</span>
                  <span className="col-span-2">{customer.lastVisit}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium">Outstanding Debt:</span>
                  <span className={`col-span-2 ${totalDebt > 0 ? 'text-regimark-primary font-medium' : ''}`}>
                    {totalDebt > 0 ? `$${totalDebt.toFixed(2)}` : '-'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="info">Customer Info</TabsTrigger>
          <TabsTrigger value="debts">Debt Records</TabsTrigger>
          <TabsTrigger value="purchases">Purchase History</TabsTrigger>
          <TabsTrigger value="receipts">Receipts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="p-4 border rounded-md mt-4">
          <div className="text-center py-8 text-muted-foreground">
            Additional customer information will appear here
          </div>
        </TabsContent>
        
        <TabsContent value="debts" className="border rounded-md mt-4">
          <div className="p-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Customer Debt Records</h3>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Debt Record
            </Button>
          </div>
          
          {customer.debtRecords.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Paid</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customer.debtRecords.map((debt) => {
                  const paidAmount = debt.paymentHistory 
                    ? debt.paymentHistory.reduce((total, payment) => total + payment.amount, 0) 
                    : 0;
                  const balance = debt.amount - paidAmount;
                    
                  return (
                    <TableRow key={debt.id}>
                      <TableCell>{debt.date}</TableCell>
                      <TableCell className="font-medium">{debt.notes || 'Unspecified'}</TableCell>
                      <TableCell>{debt.dueDate}</TableCell>
                      <TableCell className="text-right">${debt.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-right">${paidAmount.toFixed(2)}</TableCell>
                      <TableCell className="text-right">${balance.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            debt.status === "Paid" 
                              ? "bg-green-100 text-green-800" 
                              : debt.status === "Overdue" 
                              ? "bg-red-100 text-red-800"
                              : debt.status === "Partially Paid"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }
                          variant="outline"
                        >
                          {debt.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Record Payment
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center p-8 text-muted-foreground">
              No debt records for this customer
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="purchases" className="p-4 border rounded-md mt-4">
          <div className="text-center py-8 text-muted-foreground">
            Purchase history will appear here
          </div>
        </TabsContent>
        
        <TabsContent value="receipts" className="p-4 border rounded-md mt-4">
          <div className="text-center py-8 text-muted-foreground">
            Receipts will appear here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerDetails;
