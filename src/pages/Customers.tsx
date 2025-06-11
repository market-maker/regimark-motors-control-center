import MainLayout from "../layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Filter } from "lucide-react";
import { useState } from "react";
import { Customer, DebtRecord } from "@/types/customer";
import CustomerDetails from "@/components/customers/CustomerDetails";

interface CustomerWithDebt extends Customer {
  debtRecords: DebtRecord[];
}

// Empty initial data instead of mock data
const initialCustomers: CustomerWithDebt[] = [];

const Customers = () => {
  const [currentTab, setCurrentTab] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerWithDebt | null>(null);
  const [customers, setCustomers] = useState<CustomerWithDebt[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter customers based on the selected tab and search term
  const filteredCustomers = customers.filter(customer => {
    // First filter by tab
    if (currentTab === "debtors" && (!customer.debtRecords || customer.debtRecords.length === 0)) {
      return false;
    }
    if (currentTab !== "all" && currentTab !== "debtors" && customer.status !== currentTab) {
      return false;
    }
    
    // Then filter by search term
    if (searchTerm) {
      return (
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return true;
  });

  const handleAddCustomer = () => {
    // This would open a dialog to add a new customer
    // For now, we'll just add a placeholder customer
    const newCustomer: CustomerWithDebt = {
      id: `customer-${Date.now()}`,
      name: "New Customer",
      email: "customer@example.com",
      phone: "(555) 123-4567",
      address: "123 Main St",
      totalSpent: 0,
      lastVisit: "Never",
      status: "Active",
      debtRecords: []
    };
    
    setCustomers([...customers, newCustomer]);
  };

  return (
    <MainLayout>
      <div className="page-container">
        <h1 className="text-3xl font-bold mb-8 text-regimark-primary">Customer Management</h1>
        
        {selectedCustomer ? (
          <CustomerDetails 
            customer={selectedCustomer} 
            onBack={() => setSelectedCustomer(null)} 
          />
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search customers..."
                  className="pl-10 w-full sm:w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button onClick={handleAddCustomer}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Customer
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab} className="mb-6">
              <TabsList>
                <TabsTrigger value="all">All Customers</TabsTrigger>
                <TabsTrigger value="Active">Active</TabsTrigger>
                <TabsTrigger value="Inactive">Inactive</TabsTrigger>
                <TabsTrigger value="debtors">Debtors</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className="text-right">Total Spent</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Outstanding Debt</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => {
                      const totalDebt = customer.debtRecords
                        ? customer.debtRecords
                            .filter(d => d.status !== "Paid")
                            .reduce((sum, debt) => {
                              const paidAmount = debt.paymentHistory 
                                ? debt.paymentHistory.reduce((total, payment) => total + payment.amount, 0) 
                                : 0;
                              return sum + (debt.amount - paidAmount);
                            }, 0)
                        : 0;
                        
                      return (
                        <TableRow key={customer.id}>
                          <TableCell className="font-medium">{customer.name}</TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>{customer.phone}</TableCell>
                          <TableCell className="text-right">${customer.totalSpent.toFixed(2)}</TableCell>
                          <TableCell>{customer.lastVisit}</TableCell>
                          <TableCell>
                            {totalDebt > 0 ? (
                              <span className="text-regimark-primary font-medium">
                                ${totalDebt.toFixed(2)}
                              </span>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                customer.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }
                              variant="outline"
                            >
                              {customer.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedCustomer(customer)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <p className="text-muted-foreground mb-4">No customers found</p>
                        <Button variant="outline" onClick={handleAddCustomer}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Your First Customer
                        </Button>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Customers;