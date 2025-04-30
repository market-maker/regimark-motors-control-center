
import { useState, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { motion } from "framer-motion";
import { Customer, DebtRecord } from "@/types/customer";

// Mock customers with debts
const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "555-123-4567",
    address: "123 Main St, City",
    totalSpent: 1250.50,
    lastVisit: "2023-04-15",
    status: "Active",
    debtRecords: [
      {
        id: "d1",
        date: "2023-04-01",
        amount: 250.50,
        dueDate: "2023-05-01",
        status: "Overdue",
        notes: "For car parts"
      },
      {
        id: "d2",
        date: "2023-03-15",
        amount: 120.75,
        dueDate: "2023-04-15",
        status: "Paid",
        paymentHistory: [
          {
            date: "2023-04-10",
            amount: 120.75
          }
        ]
      }
    ]
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "555-987-6543",
    address: "456 Oak St, Town",
    totalSpent: 875.25,
    lastVisit: "2023-04-20",
    status: "Active",
    debtRecords: [
      {
        id: "d3",
        date: "2023-04-10",
        amount: 350.00,
        dueDate: "2023-05-10",
        status: "Pending"
      }
    ]
  }
];

const DebtorsList = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showAddDebtDialog, setShowAddDebtDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState<DebtRecord | null>(null);
  
  // Form fields
  const [debtAmount, setDebtAmount] = useState("");
  const [debtDueDate, setDebtDueDate] = useState("");
  const [debtNotes, setDebtNotes] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  
  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get all debt records across all customers
  const allDebtRecords = customers.flatMap(customer => 
    (customer.debtRecords || []).map(debt => ({
      ...debt,
      customerName: customer.name,
      customerId: customer.id
    }))
  );
  
  const handleAddDebt = () => {
    if (!selectedCustomer) return;
    if (!debtAmount || !debtDueDate) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const newDebt: DebtRecord = {
      id: `d${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      amount: parseFloat(debtAmount),
      dueDate: debtDueDate,
      status: "Pending",
      notes: debtNotes
    };
    
    const updatedCustomers = customers.map(customer => {
      if (customer.id === selectedCustomer.id) {
        return {
          ...customer,
          debtRecords: [...(customer.debtRecords || []), newDebt]
        };
      }
      return customer;
    });
    
    setCustomers(updatedCustomers);
    setShowAddDebtDialog(false);
    setDebtAmount("");
    setDebtDueDate("");
    setDebtNotes("");
    toast.success(`Debt record added for ${selectedCustomer.name}`);
  };
  
  const handleRecordPayment = () => {
    if (!selectedDebt || !selectedCustomer) return;
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      toast.error("Please enter a valid payment amount");
      return;
    }
    
    const paymentAmountNum = parseFloat(paymentAmount);
    const remainingAmount = selectedDebt.amount - paymentAmountNum;
    
    let newStatus: "Paid" | "Partially Paid" | "Pending" | "Overdue" = "Paid";
    if (remainingAmount > 0) {
      newStatus = "Partially Paid";
    }
    
    const payment = {
      date: new Date().toISOString().split('T')[0],
      amount: paymentAmountNum
    };
    
    const updatedCustomers = customers.map(customer => {
      if (customer.id === selectedCustomer.id) {
        const updatedDebtRecords = (customer.debtRecords || []).map(debt => {
          if (debt.id === selectedDebt.id) {
            return {
              ...debt,
              status: newStatus,
              paymentHistory: [...(debt.paymentHistory || []), payment]
            };
          }
          return debt;
        });
        
        return {
          ...customer,
          debtRecords: updatedDebtRecords
        };
      }
      return customer;
    });
    
    setCustomers(updatedCustomers);
    setShowPaymentDialog(false);
    setPaymentAmount("");
    toast.success(`Payment recorded successfully`);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Partially Paid":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search customers..."
              className="pl-10 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Customers with Outstanding Debts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Outstanding Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => {
                    // Calculate total outstanding amount
                    const outstandingAmount = (customer.debtRecords || [])
                      .filter(debt => debt.status !== "Paid")
                      .reduce((sum, debt) => {
                        // If partially paid, calculate remaining amount
                        if (debt.status === "Partially Paid" && debt.paymentHistory) {
                          const paidAmount = debt.paymentHistory.reduce((total, payment) => total + payment.amount, 0);
                          return sum + (debt.amount - paidAmount);
                        }
                        return sum + debt.amount;
                      }, 0);
                    
                    // Skip customers with no outstanding debts
                    if (outstandingAmount === 0) return null;
                    
                    // Determine worst status
                    const hasOverdue = (customer.debtRecords || []).some(debt => debt.status === "Overdue");
                    const hasPending = (customer.debtRecords || []).some(debt => debt.status === "Pending");
                    const hasPartial = (customer.debtRecords || []).some(debt => debt.status === "Partially Paid");
                    
                    let status = "No Debts";
                    if (hasOverdue) status = "Overdue";
                    else if (hasPending) status = "Pending";
                    else if (hasPartial) status = "Partially Paid";
                    
                    return (
                      <TableRow key={customer.id}>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>${outstandingAmount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(status)}>
                            {status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedCustomer(customer);
                                setShowAddDebtDialog(true);
                              }}
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add Debt
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedCustomer(customer)}
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              Details
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {filteredCustomers.filter(customer => {
                    const outstandingAmount = (customer.debtRecords || [])
                      .filter(debt => debt.status !== "Paid")
                      .reduce((sum, debt) => sum + debt.amount, 0);
                    return outstandingAmount > 0;
                  }).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No customers with outstanding debts found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Debts Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Outstanding:</span>
                <span className="text-lg font-bold text-regimark-primary">
                  ${allDebtRecords
                    .filter(debt => debt.status !== "Paid")
                    .reduce((sum, debt) => sum + debt.amount, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Overdue Amount:</span>
                <span className="text-lg font-bold text-red-600">
                  ${allDebtRecords
                    .filter(debt => debt.status === "Overdue")
                    .reduce((sum, debt) => sum + debt.amount, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Customers with Debt:</span>
                <span className="text-lg font-bold">
                  {customers.filter(customer => 
                    (customer.debtRecords || []).some(debt => debt.status !== "Paid")
                  ).length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {selectedCustomer && (
        <motion.div variants={itemVariants}>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Debt Records for {selectedCustomer.name}</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedCustomer(null)}
                >
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(selectedCustomer.debtRecords || []).map((debt) => (
                      <TableRow key={debt.id}>
                        <TableCell>{debt.date}</TableCell>
                        <TableCell>${debt.amount.toFixed(2)}</TableCell>
                        <TableCell>{debt.dueDate}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(debt.status)}>
                            {debt.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{debt.notes || '-'}</TableCell>
                        <TableCell>
                          {debt.status !== "Paid" && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedDebt(debt);
                                setShowPaymentDialog(true);
                              }}
                            >
                              Record Payment
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {(selectedCustomer.debtRecords || []).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No debt records found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Add Debt Dialog */}
      <Dialog open={showAddDebtDialog} onOpenChange={setShowAddDebtDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Debt for {selectedCustomer?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={debtAmount}
                onChange={(e) => setDebtAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={debtDueDate}
                onChange={(e) => setDebtDueDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Input
                id="notes"
                placeholder="Add any relevant notes"
                value={debtNotes}
                onChange={(e) => setDebtNotes(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowAddDebtDialog(false)}>Cancel</Button>
            <Button onClick={handleAddDebt}>Add Debt</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Record Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Original Debt Amount</Label>
              <Input value={`$${selectedDebt?.amount.toFixed(2)}`} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentAmount">Payment Amount</Label>
              <Input
                id="paymentAmount"
                type="number"
                step="0.01"
                min="0"
                max={selectedDebt?.amount}
                placeholder="0.00"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>Cancel</Button>
            <Button onClick={handleRecordPayment}>Record Payment</Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default DebtorsList;
