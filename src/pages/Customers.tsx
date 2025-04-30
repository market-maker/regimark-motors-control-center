
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

// Enhanced mock data for customers with debt records
const mockCustomers: CustomerWithDebt[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, AT 12345",
    totalSpent: 1245.80,
    lastVisit: "2 days ago",
    status: "Active",
    debtRecords: [
      {
        id: "debt1",
        date: "2025-02-15",
        amount: 350.75,
        dueDate: "2025-03-15",
        status: "Pending",
        notes: "Vehicle service invoice #45932"
      }
    ]
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "(555) 987-6543",
    address: "456 Oak Ave, Somewhere, SW 67890",
    totalSpent: 875.25,
    lastVisit: "1 week ago",
    status: "Active",
    debtRecords: []
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "(555) 456-7890",
    address: "789 Elm St, Nowhere, NW 45678",
    totalSpent: 2542.99,
    lastVisit: "Yesterday",
    status: "Active",
    debtRecords: [
      {
        id: "debt2",
        date: "2025-01-10",
        amount: 780.50,
        dueDate: "2025-02-10",
        status: "Overdue",
        notes: "Electrical system repair"
      },
      {
        id: "debt3",
        date: "2025-02-25",
        amount: 420.25,
        dueDate: "2025-03-25",
        status: "Pending",
        notes: "Parts and labor for alternator replacement"
      }
    ]
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "(555) 234-5678",
    address: "101 Pine St, Elsewhere, EW 23456",
    totalSpent: 489.50,
    lastVisit: "3 weeks ago",
    status: "Inactive",
    debtRecords: [
      {
        id: "debt4",
        date: "2025-01-05",
        amount: 300.00,
        dueDate: "2025-02-05",
        status: "Partially Paid",
        notes: "Battery and starter system repair",
        paymentHistory: [
          {
            date: "2025-01-20",
            amount: 150.00
          }
        ]
      }
    ]
  },
  {
    id: "5",
    name: "Robert Brown",
    email: "robert@example.com",
    phone: "(555) 876-5432",
    address: "234 Maple Dr, Anyplace, AP 34567",
    totalSpent: 1765.30,
    lastVisit: "2 days ago",
    status: "Active",
    debtRecords: []
  },
];

const Customers = () => {
  const [currentTab, setCurrentTab] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerWithDebt | null>(null);
  
  // Filter customers based on the selected tab
  const filteredCustomers = currentTab === "all" 
    ? mockCustomers 
    : currentTab === "debtors"
    ? mockCustomers.filter(c => c.debtRecords && c.debtRecords.length > 0)
    : mockCustomers.filter(c => c.status === currentTab);

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
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button>
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
                  {filteredCustomers.map((customer) => {
                    const totalDebt = customer.debtRecords
                      .filter(d => d.status !== "Paid")
                      .reduce((sum, debt) => {
                        const paidAmount = debt.paymentHistory 
                          ? debt.paymentHistory.reduce((total, payment) => total + payment.amount, 0) 
                          : 0;
                        return sum + (debt.amount - paidAmount);
                      }, 0);
                      
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
                  })}
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
