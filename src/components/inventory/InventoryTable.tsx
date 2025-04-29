
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

const mockInventoryItems: InventoryItem[] = [
  {
    id: "1",
    sku: "BP-T19-001",
    name: "Brake Pads - Toyota Camry 2019",
    category: "Brakes",
    price: 89.99,
    cost: 45.00,
    stock: 15,
    status: "In Stock",
  },
  {
    id: "2",
    sku: "OF-H20-002",
    name: "Oil Filter - Honda Civic 2020",
    category: "Filters",
    price: 12.99,
    cost: 5.50,
    stock: 8,
    status: "In Stock",
  },
  {
    id: "3",
    sku: "SP-F18-003",
    name: "Spark Plugs - Ford F-150 2018",
    category: "Ignition",
    price: 7.99,
    cost: 3.25,
    stock: 24,
    status: "In Stock",
  },
  {
    id: "4",
    sku: "AT-H19-004",
    name: "Air Filter - Honda Accord 2019",
    category: "Filters",
    price: 15.99,
    cost: 6.75,
    stock: 3,
    status: "Low Stock",
  },
  {
    id: "5",
    sku: "TB-T20-005",
    name: "Timing Belt - Toyota RAV4 2020",
    category: "Engine",
    price: 45.99,
    cost: 22.50,
    stock: 0,
    status: "Out of Stock",
  },
];

const statusColor = {
  "In Stock": "bg-green-100 text-green-800",
  "Low Stock": "bg-yellow-100 text-yellow-800",
  "Out of Stock": "bg-red-100 text-red-800",
};

const InventoryTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [items] = useState(mockInventoryItems);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search products..."
            className="pl-10 w-full sm:w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>All Items</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>In Stock</DropdownMenuItem>
              <DropdownMenuItem>Low Stock</DropdownMenuItem>
              <DropdownMenuItem>Out of Stock</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Brakes</DropdownMenuItem>
              <DropdownMenuItem>Engine</DropdownMenuItem>
              <DropdownMenuItem>Filters</DropdownMenuItem>
              <DropdownMenuItem>Ignition</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Cost</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.sku}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">${item.cost.toFixed(2)}</TableCell>
                <TableCell className="text-right">{item.stock}</TableCell>
                <TableCell>
                  <Badge className={statusColor[item.status]} variant="outline">
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InventoryTable;
