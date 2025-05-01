
import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash, Plus, Receipt, Upload } from "lucide-react";
import { PersonalExpense } from "@/types/admin";

// Sample expense categories
const expenseCategories = [
  "Fuel",
  "Tools",
  "Office Supplies",
  "Travel",
  "Meals",
  "Accommodation",
  "Equipment",
  "Training",
  "Software",
  "Other"
];

// Sample personal expenses data
const sampleExpenses: PersonalExpense[] = [
  {
    id: "1",
    date: "2025-04-25",
    category: "Fuel",
    amount: 45.50,
    description: "Fuel for company vehicle",
    userId: "admin1"
  },
  {
    id: "2",
    date: "2025-04-23",
    category: "Tools",
    amount: 120.75,
    description: "New diagnostic tool",
    receiptImage: "/placeholder.svg",
    userId: "admin1"
  },
  {
    id: "3",
    date: "2025-04-20",
    category: "Office Supplies",
    amount: 35.20,
    description: "Printer paper and ink",
    userId: "admin1"
  }
];

const PersonalExpenses = () => {
  const [expenses, setExpenses] = useState<PersonalExpense[]>(sampleExpenses);
  const [activeTab, setActiveTab] = useState("all");
  
  // Form states
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formCategory, setFormCategory] = useState("");
  const [formAmount, setFormAmount] = useState<number | string>("");
  const [formDescription, setFormDescription] = useState("");
  const [formReceipt, setFormReceipt] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Filter expenses based on active tab
  const filteredExpenses = expenses.filter(expense => {
    if (activeTab === "all") return true;
    
    const today = new Date();
    const expenseDate = new Date(expense.date);
    
    if (activeTab === "thisMonth") {
      return expenseDate.getMonth() === today.getMonth() && 
             expenseDate.getFullYear() === today.getFullYear();
    }
    
    if (activeTab === "lastMonth") {
      const lastMonth = new Date(today);
      lastMonth.setMonth(today.getMonth() - 1);
      return expenseDate.getMonth() === lastMonth.getMonth() && 
             expenseDate.getFullYear() === lastMonth.getFullYear();
    }
    
    return true;
  });
  
  // Calculate total expenses
  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const handleOpenForm = (expense?: PersonalExpense) => {
    if (expense) {
      // Edit mode
      setFormDate(expense.date);
      setFormCategory(expense.category);
      setFormAmount(expense.amount);
      setFormDescription(expense.description);
      setFormReceipt(expense.receiptImage || null);
      setEditingId(expense.id);
    } else {
      // Create mode
      setFormDate(new Date().toISOString().split('T')[0]);
      setFormCategory("");
      setFormAmount("");
      setFormDescription("");
      setFormReceipt(null);
      setEditingId(null);
    }
    
    setShowExpenseForm(true);
  };
  
  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
    toast.success("Expense deleted successfully");
  };
  
  const handleSubmitExpense = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formCategory || !formAmount || !formDescription) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const amount = typeof formAmount === 'string' ? parseFloat(formAmount) : formAmount;
    
    if (isNaN(amount)) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (editingId) {
      // Update existing expense
      setExpenses(expenses.map(expense => 
        expense.id === editingId ? {
          ...expense,
          date: formDate,
          category: formCategory,
          amount,
          description: formDescription,
          receiptImage: formReceipt || undefined
        } : expense
      ));
      toast.success("Expense updated successfully");
    } else {
      // Create new expense
      const newExpense: PersonalExpense = {
        id: `exp-${Date.now()}`,
        date: formDate,
        category: formCategory,
        amount,
        description: formDescription,
        receiptImage: formReceipt || undefined,
        userId: "admin1" // In a real app, this would be the current user's ID
      };
      
      setExpenses([newExpense, ...expenses]);
      toast.success("Expense added successfully");
    }
    
    setShowExpenseForm(false);
  };
  
  return (
    <MainLayout>
      <motion.div 
        className="page-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold text-regimark-primary">Personal Expenses</h1>
          <Button 
            onClick={() => handleOpenForm()} 
            className="mt-4 md:mt-0"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Expense
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">
                Based on {filteredExpenses.length} expense records
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Average Per Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                ${filteredExpenses.length > 0 
                  ? (totalExpenses / filteredExpenses.length).toFixed(2) 
                  : "0.00"}
              </p>
              <p className="text-xs text-muted-foreground">
                For the selected period
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Recent Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {filteredExpenses.slice(0, 5).length}
              </p>
              <p className="text-xs text-muted-foreground">
                In the last 30 days
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Expenses</TabsTrigger>
            <TabsTrigger value="thisMonth">This Month</TabsTrigger>
            <TabsTrigger value="lastMonth">Last Month</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="m-0">
            <ExpensesList 
              expenses={filteredExpenses} 
              onEdit={handleOpenForm}
              onDelete={handleDeleteExpense}
            />
          </TabsContent>
          
          <TabsContent value="thisMonth" className="m-0">
            <ExpensesList 
              expenses={filteredExpenses} 
              onEdit={handleOpenForm}
              onDelete={handleDeleteExpense}
            />
          </TabsContent>
          
          <TabsContent value="lastMonth" className="m-0">
            <ExpensesList 
              expenses={filteredExpenses} 
              onEdit={handleOpenForm}
              onDelete={handleDeleteExpense}
            />
          </TabsContent>
        </Tabs>
        
        {/* Expense Form Dialog */}
        <Dialog open={showExpenseForm} onOpenChange={setShowExpenseForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit" : "Add"} Personal Expense</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitExpense} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formCategory} onValueChange={setFormCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {expenseCategories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={formAmount}
                  onChange={(e) => setFormAmount(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Expense description"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Receipt (Optional)</Label>
                <div className="border border-dashed rounded-md p-4 text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop an image or click to upload
                  </p>
                  <Button variant="outline" className="mt-2" type="button">
                    Upload Receipt
                  </Button>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowExpenseForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingId ? "Update" : "Add"} Expense
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>
    </MainLayout>
  );
};

// Expenses list component
const ExpensesList = ({ 
  expenses, 
  onEdit, 
  onDelete 
}: { 
  expenses: PersonalExpense[];
  onEdit: (expense: PersonalExpense) => void;
  onDelete: (id: string) => void;
}) => {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <p className="text-muted-foreground">No expenses found for the selected period.</p>
        <Button variant="outline" className="mt-4">
          <Plus className="mr-2 h-4 w-4" /> Add Your First Expense
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <Card key={expense.id}>
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row justify-between p-6">
              <div className="space-y-1">
                <h3 className="font-medium">{expense.category}</h3>
                <p className="text-sm text-muted-foreground">{expense.description}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(expense.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              
              <div className="flex flex-row md:flex-col items-center md:items-end mt-4 md:mt-0">
                <span className="text-xl font-bold">${expense.amount.toFixed(2)}</span>
                <div className="flex items-center ml-auto md:ml-0 md:mt-2">
                  {expense.receiptImage && (
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 mr-2">
                      <Receipt className="h-4 w-4" />
                      <span className="sr-only">View Receipt</span>
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onEdit(expense)}>
                    <span className="sr-only">Edit</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4">
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      <path d="m15 5 4 4" />
                    </svg>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive" onClick={() => onDelete(expense.id)}>
                    <span className="sr-only">Delete</span>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PersonalExpenses;
