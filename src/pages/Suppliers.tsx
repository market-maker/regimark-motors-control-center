
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
import { Search, Plus, Filter, ChevronDown } from "lucide-react";
import { useState } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Supplier } from "@/types/supplier";
import SupplierDetails from "@/components/suppliers/SupplierDetails";
import AddSupplierDialog from "@/components/suppliers/AddSupplierDialog";

// Mock data for suppliers
const mockSuppliers: Supplier[] = [
  {
    id: "1",
    name: "AutoParts Inc",
    contactPerson: "John Smith",
    email: "john@autoparts.com",
    phone: "(555) 123-4567",
    address: "123 Parts Ave, Mechanic City, MC 12345",
    website: "https://www.autopartsinc.com",
    paymentTerms: "Net 30",
    notes: "Preferred supplier for electrical components",
    products: [
      {
        id: "p1",
        name: "Alternator - Standard",
        description: "12V 120A alternator for standard vehicles",
        price: 89.99,
        category: "Electrical",
        sku: "ALT-120-STD"
      },
      {
        id: "p2",
        name: "Starter Motor - Economy",
        description: "Standard replacement starter motor",
        price: 75.50,
        category: "Electrical",
        sku: "SM-ECO-01"
      }
    ]
  },
  {
    id: "2",
    name: "ElectroMotive Supply",
    contactPerson: "Sarah Johnson",
    email: "sarah@electromotive.com",
    phone: "(555) 987-6543",
    address: "456 Electric Rd, Circuit City, CC 67890",
    website: "https://www.electromotivesupply.com",
    paymentTerms: "Net 15",
    products: [
      {
        id: "p3",
        name: "Battery - Premium",
        description: "High-performance automotive battery",
        price: 129.99,
        category: "Electrical",
        sku: "BAT-PREM-01"
      },
      {
        id: "p4",
        name: "Wiring Harness Kit - Universal",
        description: "Universal wiring harness with multiple connectors",
        price: 45.75,
        category: "Electrical",
        sku: "WH-UNI-01"
      },
      {
        id: "p5",
        name: "LED Headlight Conversion Kit",
        description: "Convert standard headlights to LED",
        price: 89.95,
        category: "Lighting",
        sku: "LED-HL-KIT"
      }
    ]
  },
  {
    id: "3",
    name: "PowerTech Distributors",
    contactPerson: "Mike Rodriguez",
    email: "mike@powertech.com",
    phone: "(555) 456-7890",
    address: "789 Voltage St, Amp City, AC 34567",
    paymentTerms: "COD",
    notes: "Specializes in performance electrical components",
    products: [
      {
        id: "p6",
        name: "Ignition Coil Pack - Performance",
        description: "High-output ignition coils for performance applications",
        price: 65.25,
        category: "Ignition",
        sku: "IC-PERF-01"
      },
      {
        id: "p7",
        name: "ECU Tuning Module",
        description: "Programmable ECU module for engine tuning",
        price: 249.99,
        category: "Performance",
        sku: "ECU-TUN-01"
      }
    ]
  }
];

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter suppliers based on search term
    if (searchTerm) {
      const filtered = mockSuppliers.filter(
        supplier => 
          supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
          supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuppliers(filtered);
    } else {
      setSuppliers(mockSuppliers);
    }
  };

  const handleAddSupplier = (newSupplier: Supplier) => {
    setSuppliers(prev => [...prev, newSupplier]);
    setIsAddDialogOpen(false);
  };

  return (
    <MainLayout>
      <div className="page-container">
        <h1 className="text-3xl font-bold mb-8 text-regimark-primary">Supplier Management</h1>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0 mb-6">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search suppliers..."
              className="pl-10 w-full sm:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <div className="flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSuppliers(mockSuppliers)}>
                  All Suppliers
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  const filtered = mockSuppliers.filter(s => s.paymentTerms === "Net 30");
                  setSuppliers(filtered);
                }}>
                  Net 30 Terms
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  const filtered = mockSuppliers.filter(s => s.paymentTerms === "COD");
                  setSuppliers(filtered);
                }}>
                  COD Terms
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Supplier
            </Button>
          </div>
        </div>

        {selectedSupplier ? (
          <SupplierDetails 
            supplier={selectedSupplier} 
            onBack={() => setSelectedSupplier(null)} 
          />
        ) : (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Payment Terms</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">{supplier.name}</TableCell>
                    <TableCell>{supplier.contactPerson}</TableCell>
                    <TableCell>{supplier.email}</TableCell>
                    <TableCell>{supplier.phone}</TableCell>
                    <TableCell>{supplier.paymentTerms}</TableCell>
                    <TableCell>{supplier.products.length} products</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedSupplier(supplier)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      
      <AddSupplierDialog 
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddSupplier}
      />
    </MainLayout>
  );
};

export default Suppliers;
