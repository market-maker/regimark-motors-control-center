
import MainLayout from "../layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Plus } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  description: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  status: "completed" | "pending";
}

const mockTransactions: Transaction[] = [
  {
    id: "tx-001",
    date: "2023-04-28",
    description: "Sale #34928",
    type: "income",
    amount: 789.95,
    category: "Sales",
    status: "completed",
  },
  {
    id: "tx-002",
    date: "2023-04-27",
    description: "Inventory Restock",
    type: "expense",
    amount: 1250.00,
    category: "Inventory",
    status: "completed",
  },
  {
    id: "tx-003",
    date: "2023-04-26",
    description: "Utility Bill",
    type: "expense",
    amount: 145.78,
    category: "Utilities",
    status: "completed",
  },
  {
    id: "tx-004",
    date: "2023-04-25",
    description: "Sale #34897",
    type: "income",
    amount: 329.99,
    category: "Sales",
    status: "completed",
  },
  {
    id: "tx-005",
    date: "2023-04-25",
    description: "Employee Wages",
    type: "expense",
    amount: 2450.00,
    category: "Payroll",
    status: "pending",
  },
];

const Accounting = () => {
  return (
    <MainLayout>
      <div className="page-container">
        <h1 className="text-3xl font-bold mb-8 text-regimark-primary">Accounting</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-regimark-primary">$24,567.89</div>
              <p className="text-sm text-green-500">+12.5% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-regimark-primary">$15,234.56</div>
              <p className="text-sm text-red-500">+8.2% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Net Profit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-regimark-primary">$9,333.33</div>
              <p className="text-sm text-green-500">+18.7% from last month</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="transactions">
          <TabsList className="mb-6">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="reports">Financial Reports</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    New Transaction
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTransactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell>{tx.date}</TableCell>
                        <TableCell>{tx.description}</TableCell>
                        <TableCell>{tx.category}</TableCell>
                        <TableCell className={`text-right ${tx.type === "income" ? "text-green-600" : "text-red-600"}`}>
                          {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={tx.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                          >
                            {tx.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Income Statement</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="p-6 flex items-center justify-center border-2 border-dashed rounded-md">
                    <div className="text-center">
                      <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
                      <h3 className="mt-2 text-sm font-semibold">Income Statement</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        For the period ending Apr 30, 2023
                      </p>
                      <Button variant="link" size="sm">
                        View Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Balance Sheet</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="p-6 flex items-center justify-center border-2 border-dashed rounded-md">
                    <div className="text-center">
                      <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
                      <h3 className="mt-2 text-sm font-semibold">Balance Sheet</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        As of Apr 30, 2023
                      </p>
                      <Button variant="link" size="sm">
                        View Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="invoices">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Invoices</CardTitle>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Invoice
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>INV-001</TableCell>
                      <TableCell>John Doe</TableCell>
                      <TableCell>2023-04-28</TableCell>
                      <TableCell>2023-05-12</TableCell>
                      <TableCell className="text-right">$789.95</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800" variant="outline">
                          Paid
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>INV-002</TableCell>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>2023-04-25</TableCell>
                      <TableCell>2023-05-09</TableCell>
                      <TableCell className="text-right">$329.99</TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-100 text-yellow-800" variant="outline">
                          Pending
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Accounting;
