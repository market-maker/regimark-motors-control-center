
import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { PersonalExpense } from "@/types/customer";
import { Plus, Trash2, FileText } from "lucide-react";

const initialExpenses: PersonalExpense[] = [
  {
    id: "1",
    date: "2023-05-01",
    category: "Office Supplies",
    amount: 125.50,
    description: "Printer ink and paper",
    userId: "admin"
  },
  {
    id: "2",
    date: "2023-05-03",
    category: "Travel",
    amount: 350.00,
    description: "Client meeting travel expenses",
    userId: "admin"
  },
  {
    id: "3",
    date: "2023-05-10",
    category: "Meals",
    amount: 45.75,
    description: "Lunch with supplier",
    userId: "admin"
  }
];

const Accounting = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [personalExpenses, setPersonalExpenses] = useState<PersonalExpense[]>(initialExpenses);
  const [showAddExpenseDialog, setShowAddExpenseDialog] = useState(false);
  
  // New expense form fields
  const [expenseDate, setExpenseDate] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  
  const handleAddExpense = () => {
    if (!expenseDate || !expenseCategory || !expenseAmount || !expenseDescription) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const newExpense: PersonalExpense = {
      id: Date.now().toString(),
      date: expenseDate,
      category: expenseCategory,
      amount: parseFloat(expenseAmount),
      description: expenseDescription,
      userId: "admin" // In a real app, this would be the logged-in user's ID
    };
    
    setPersonalExpenses([...personalExpenses, newExpense]);
    setShowAddExpenseDialog(false);
    resetExpenseForm();
    toast.success("Personal expense added successfully");
  };
  
  const handleDeleteExpense = (id: string) => {
    setPersonalExpenses(personalExpenses.filter(expense => expense.id !== id));
    toast.success("Expense deleted successfully");
  };
  
  const resetExpenseForm = () => {
    setExpenseDate("");
    setExpenseCategory("");
    setExpenseAmount("");
    setExpenseDescription("");
  };
  
  const totalExpenses = personalExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const expensesByCategory = personalExpenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <MainLayout>
      <motion.div 
        className="page-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-8 text-regimark-primary">Accounting</h1>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="overview" className="text-lg">
              Overview
            </TabsTrigger>
            <TabsTrigger value="expenses" className="text-lg">
              Personal Expenses
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-lg">
              Financial Reports
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$12,450.75</div>
                  <p className="text-muted-foreground text-sm">Last 30 days</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Outstanding Debts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$3,245.50</div>
                  <p className="text-muted-foreground text-sm">From 5 customers</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Total Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$4,125.00</div>
                  <p className="text-muted-foreground text-sm">Including inventory purchases</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="expenses">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="md:col-span-3">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Personal Expenses</CardTitle>
                  <Button onClick={() => setShowAddExpenseDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Expense
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {personalExpenses.map((expense) => (
                          <TableRow key={expense.id}>
                            <TableCell>{expense.date}</TableCell>
                            <TableCell>{expense.category}</TableCell>
                            <TableCell>{expense.description}</TableCell>
                            <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleDeleteExpense(expense.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                        {personalExpenses.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-4">
                              No personal expenses recorded
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Expense Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Total Expenses</span>
                      <span>${totalExpenses.toFixed(2)}</span>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium mb-2">By Category:</p>
                      <ul className="space-y-1">
                        {Object.entries(expensesByCategory).map(([category, amount]) => (
                          <li key={category} className="flex justify-between">
                            <span>{category}</span>
                            <span>${amount.toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reports">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Generate Reports</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Report Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="profit-loss">Profit & Loss</SelectItem>
                        <SelectItem value="sales-tax">Sales & Tax</SelectItem>
                        <SelectItem value="inventory">Inventory Valuation</SelectItem>
                        <SelectItem value="customer">Customer Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input type="date" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input type="date" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Generate Report</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">Profit & Loss</p>
                        <p className="text-sm text-muted-foreground">April 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">Sales & Tax</p>
                        <p className="text-sm text-muted-foreground">Q1 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between pb-2">
                      <div>
                        <p className="font-medium">Inventory Valuation</p>
                        <p className="text-sm text-muted-foreground">March 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Add Personal Expense Dialog */}
        <Dialog open={showAddExpenseDialog} onOpenChange={setShowAddExpenseDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Personal Expense</DialogTitle>
              <DialogDescription>
                Record a new personal expense for tracking purposes.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="expense-date">Date</Label>
                <Input
                  id="expense-date"
                  type="date"
                  value={expenseDate}
                  onChange={(e) => setExpenseDate(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expense-category">Category</Label>
                <Select value={expenseCategory} onValueChange={setExpenseCategory}>
                  <SelectTrigger id="expense-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="Meals">Meals</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Rent">Rent</SelectItem>
                    <SelectItem value="Salaries">Salaries</SelectItem>
                    <SelectItem value="Miscellaneous">Miscellaneous</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expense-amount">Amount</Label>
                <Input
                  id="expense-amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expense-description">Description</Label>
                <Input
                  id="expense-description"
                  value={expenseDescription}
                  onChange={(e) => setExpenseDescription(e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddExpenseDialog(false)}>Cancel</Button>
              <Button onClick={handleAddExpense}>Add Expense</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </MainLayout>
  );
};

export default Accounting;
