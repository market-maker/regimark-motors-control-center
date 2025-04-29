
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";

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

const categories = ["All Categories", "Brakes", "Filters", "Engine", "Ignition"];
const statusOptions = ["All Items", "In Stock", "Low Stock", "Out of Stock"];

const InventoryTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState(mockInventoryItems);
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [filterStatus, setFilterStatus] = useState("All Items");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);

  // Create a form with react-hook-form
  const form = useForm({
    defaultValues: {
      name: "",
      sku: "",
      category: "",
      price: 0,
      cost: 0,
      stock: 0,
    },
  });

  const editForm = useForm({
    defaultValues: {
      name: "",
      sku: "",
      category: "",
      price: 0,
      cost: 0,
      stock: 0,
    },
  });

  // Apply all filters
  const filteredItems = items.filter(item => {
    // Text search
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = filterCategory === "All Categories" || item.category === filterCategory;
    
    // Status filter
    const matchesStatus = filterStatus === "All Items" || item.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddItem = (data: any) => {
    const newItem: InventoryItem = {
      id: `${items.length + 1}`,
      sku: data.sku,
      name: data.name,
      category: data.category,
      price: parseFloat(data.price),
      cost: parseFloat(data.cost),
      stock: parseInt(data.stock),
      status: parseInt(data.stock) > 5 ? "In Stock" : parseInt(data.stock) > 0 ? "Low Stock" : "Out of Stock",
    };

    setItems([...items, newItem]);
    setIsAddDialogOpen(false);
    form.reset();
    toast.success("Item added successfully");
  };

  const handleEditClick = (item: InventoryItem) => {
    setCurrentItem(item);
    editForm.reset({
      name: item.name,
      sku: item.sku,
      category: item.category,
      price: item.price,
      cost: item.cost,
      stock: item.stock,
    });
    setIsEditDialogOpen(true);
  };

  const handleEditItem = (data: any) => {
    if (!currentItem) return;
    
    const updatedItems = items.map(item => {
      if (item.id === currentItem.id) {
        const stock = parseInt(data.stock);
        return {
          ...item,
          name: data.name,
          sku: data.sku,
          category: data.category,
          price: parseFloat(data.price),
          cost: parseFloat(data.cost),
          stock,
          status: stock > 5 ? "In Stock" : stock > 0 ? "Low Stock" : "Out of Stock",
        };
      }
      return item;
    });

    setItems(updatedItems);
    setIsEditDialogOpen(false);
    setCurrentItem(null);
    toast.success("Item updated successfully");
  };

  const applyFilter = (type: string, value: string) => {
    if (type === 'category') {
      setFilterCategory(value);
    } else if (type === 'status') {
      setFilterStatus(value);
    }
  };

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
              <DropdownMenuItem onClick={() => applyFilter('status', 'All Items')}>
                All Items
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => applyFilter('status', 'In Stock')}>
                In Stock
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => applyFilter('status', 'Low Stock')}>
                Low Stock
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => applyFilter('status', 'Out of Stock')}>
                Out of Stock
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {categories.filter(c => c !== 'All Categories').map((category) => (
                <DropdownMenuItem 
                  key={category} 
                  onClick={() => applyFilter('category', category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Inventory Item</DialogTitle>
              </DialogHeader>
              <form onSubmit={form.handleSubmit(handleAddItem)} className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormLabel htmlFor="name">Product Name</FormLabel>
                    <Input
                      id="name"
                      placeholder="Enter product name"
                      {...form.register("name", { required: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormLabel htmlFor="sku">SKU</FormLabel>
                    <Input
                      id="sku"
                      placeholder="Enter SKU"
                      {...form.register("sku", { required: true })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormLabel htmlFor="category">Category</FormLabel>
                    <Select
                      onValueChange={(value) => form.setValue("category", value)}
                      defaultValue={form.getValues("category")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.filter(c => c !== 'All Categories').map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <FormLabel htmlFor="stock">Stock Quantity</FormLabel>
                    <Input
                      id="stock"
                      type="number"
                      min="0"
                      placeholder="Enter quantity"
                      {...form.register("stock", { required: true, min: 0 })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormLabel htmlFor="price">Selling Price ($)</FormLabel>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      {...form.register("price", { required: true, min: 0 })}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormLabel htmlFor="cost">Cost Price ($)</FormLabel>
                    <Input
                      id="cost"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      {...form.register("cost", { required: true, min: 0 })}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Item</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Inventory Item</DialogTitle>
              </DialogHeader>
              <form onSubmit={editForm.handleSubmit(handleEditItem)} className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormLabel htmlFor="edit-name">Product Name</FormLabel>
                    <Input
                      id="edit-name"
                      placeholder="Enter product name"
                      {...editForm.register("name", { required: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormLabel htmlFor="edit-sku">SKU</FormLabel>
                    <Input
                      id="edit-sku"
                      placeholder="Enter SKU"
                      {...editForm.register("sku", { required: true })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormLabel htmlFor="edit-category">Category</FormLabel>
                    <Select
                      onValueChange={(value) => editForm.setValue("category", value)}
                      defaultValue={currentItem?.category || ""}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.filter(c => c !== 'All Categories').map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <FormLabel htmlFor="edit-stock">Stock Quantity</FormLabel>
                    <Input
                      id="edit-stock"
                      type="number"
                      min="0"
                      placeholder="Enter quantity"
                      {...editForm.register("stock", { required: true, min: 0 })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormLabel htmlFor="edit-price">Selling Price ($)</FormLabel>
                    <Input
                      id="edit-price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      {...editForm.register("price", { required: true, min: 0 })}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormLabel htmlFor="edit-cost">Cost Price ($)</FormLabel>
                    <Input
                      id="edit-cost"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      {...editForm.register("cost", { required: true, min: 0 })}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Update Item</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Applied filters display */}
      {(filterCategory !== "All Categories" || filterStatus !== "All Items") && (
        <div className="flex flex-wrap gap-2 pb-2">
          {filterCategory !== "All Categories" && (
            <Badge variant="secondary" className="px-3 py-1">
              Category: {filterCategory}
              <button 
                className="ml-2 text-xs"
                onClick={() => setFilterCategory("All Categories")}
              >
                ×
              </button>
            </Badge>
          )}
          {filterStatus !== "All Items" && (
            <Badge variant="secondary" className="px-3 py-1">
              Status: {filterStatus}
              <button 
                className="ml-2 text-xs"
                onClick={() => setFilterStatus("All Items")}
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}

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
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
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
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No items found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InventoryTable;
