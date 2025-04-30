
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent,
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Trash2, Eye, Plus, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { determineStatus } from "@/utils/inventoryUtils";
import { mapImportedStatus, transformImportedInventory } from "../inventory/FixInventoryTypes";

// Define our own interface to avoid conflict with imported one
interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

// Mock inventory data
const mockInventoryData: InventoryItem[] = [
  {
    id: "1",
    sku: "BP-T19-001",
    name: "Brake Pads - Toyota Camry 2019",
    category: "Brakes",
    price: 89.99,
    cost: 45.00,
    stock: 12,
    status: "In Stock"
  },
  {
    id: "2",
    sku: "OF-H20-002",
    name: "Oil Filter - Honda Civic 2020",
    category: "Filters",
    price: 12.99,
    cost: 5.50,
    stock: 8,
    status: "In Stock"
  },
  {
    id: "3",
    sku: "SP-F18-003",
    name: "Spark Plugs - Ford F-150 2018",
    category: "Ignition",
    price: 7.99,
    cost: 3.25,
    stock: 5,
    status: "Low Stock"
  },
  {
    id: "4",
    sku: "AT-H19-004",
    name: "Air Filter - Honda Accord 2019",
    category: "Filters",
    price: 15.99,
    cost: 7.25,
    stock: 0,
    status: "Out of Stock"
  },
  {
    id: "5",
    sku: "TB-T20-005",
    name: "Timing Belt - Toyota RAV4 2020",
    category: "Engine",
    price: 45.99,
    cost: 22.50,
    stock: 3,
    status: "Low Stock"
  }
];

// Categories for the dropdown
const categories = ["Brakes", "Filters", "Ignition", "Engine", "Electrical", "Suspension", "Exhaust", "Other"];

const InventoryTable = () => {
  const [items, setItems] = useState<InventoryItem[]>(mockInventoryData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    defaultValues: {
      sku: "",
      name: "",
      category: "",
      price: "",
      cost: "",
      stock: ""
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter functionality is handled in the render
  };

  const handleView = (item: InventoryItem) => {
    setCurrentItem(item);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (item: InventoryItem) => {
    setCurrentItem(item);
    setValue("sku", item.sku);
    setValue("name", item.name);
    setValue("category", item.category);
    setValue("price", item.price.toString());
    setValue("cost", item.cost.toString());
    setValue("stock", item.stock.toString());
    setIsEditDialogOpen(true);
  };

  const handleDelete = (item: InventoryItem) => {
    setCurrentItem(item);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (currentItem) {
      setItems(items.filter(item => item.id !== currentItem.id));
      setIsDeleteDialogOpen(false);
      toast.success("Item deleted successfully");
    }
  };

  const handleAddDialog = () => {
    reset();
    setIsAddDialogOpen(true);
  };

  const handleAddItem = (data: any) => {
    const stock = parseInt(data.stock);
    const status = determineStatus(stock);
    
    const newItem: InventoryItem = {
      id: `${items.length + 1}`,
      sku: data.sku,
      name: data.name,
      category: data.category,
      price: parseFloat(data.price),
      cost: parseFloat(data.cost),
      stock,
      status,
    };

    setItems([...items, newItem]);
    setIsAddDialogOpen(false);
    reset();
    toast.success("Item added successfully");
  };

  const filteredItems = items.filter(
    item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleEditItem = (data: any) => {
    if (!currentItem) return;
    
    const stock = parseInt(data.stock);
    const status = determineStatus(stock);
    
    const updatedItems = items.map(item => {
      if (item.id === currentItem.id) {
        return {
          ...item,
          name: data.name,
          sku: data.sku,
          category: data.category,
          price: parseFloat(data.price),
          cost: parseFloat(data.cost),
          stock,
          status,
        };
      }
      return item;
    });

    setItems(updatedItems);
    setIsEditDialogOpen(false);
    toast.success("Item updated successfully");
  };

  const handleImportData = (importedData: any[]) => {
    // Transform the imported data to match our schema
    const transformedData = transformImportedInventory(importedData);
    
    // Add the imported data to our existing items
    setItems([...items, ...transformedData]);
    
    toast.success(`Imported ${transformedData.length} inventory items`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
        <form onSubmit={handleSearch} className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search inventory..."
            className="pl-10"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </form>

        <Button onClick={handleAddDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>
      
      <div className="rounded-md border">
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
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${item.cost.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{item.stock}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleView(item)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(item)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  No items match your search
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Item Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Item Details</DialogTitle>
          </DialogHeader>
          {currentItem && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">SKU</p>
                  <p>{currentItem.sku}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Category</p>
                  <p>{currentItem.category}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p>{currentItem.name}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Price</p>
                  <p>${currentItem.price.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cost</p>
                  <p>${currentItem.cost.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Profit</p>
                  <p>${(currentItem.price - currentItem.cost).toFixed(2)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Stock</p>
                  <p>{currentItem.stock}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge className={getStatusColor(currentItem.status)}>
                    {currentItem.status}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Inventory Item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleAddItem)} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" {...register("sku", { required: "SKU is required" })} />
                {errors.sku && <p className="text-xs text-red-500">{errors.sku.message?.toString()}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={value => setValue("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-xs text-red-500">{errors.category.message?.toString()}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name", { required: "Name is required" })} />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message?.toString()}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" step="0.01" {...register("price", { required: "Price is required" })} />
                {errors.price && <p className="text-xs text-red-500">{errors.price.message?.toString()}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">Cost</Label>
                <Input id="cost" type="number" step="0.01" {...register("cost", { required: "Cost is required" })} />
                {errors.cost && <p className="text-xs text-red-500">{errors.cost.message?.toString()}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" type="number" {...register("stock", { required: "Stock is required" })} />
              {errors.stock && <p className="text-xs text-red-500">{errors.stock.message?.toString()}</p>}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Item</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Inventory Item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleEditItem)} className="space-y-4 py-4">
            {/* Similar form fields as Add Item Dialog */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-sku">SKU</Label>
                <Input id="edit-sku" {...register("sku", { required: "SKU is required" })} />
                {errors.sku && <p className="text-xs text-red-500">{errors.sku.message?.toString()}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select onValueChange={value => setValue("category", value)} defaultValue={currentItem?.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-xs text-red-500">{errors.category.message?.toString()}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input id="edit-name" {...register("name", { required: "Name is required" })} />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message?.toString()}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-price">Price</Label>
                <Input id="edit-price" type="number" step="0.01" {...register("price", { required: "Price is required" })} />
                {errors.price && <p className="text-xs text-red-500">{errors.price.message?.toString()}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-cost">Cost</Label>
                <Input id="edit-cost" type="number" step="0.01" {...register("cost", { required: "Cost is required" })} />
                {errors.cost && <p className="text-xs text-red-500">{errors.cost.message?.toString()}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-stock">Stock</Label>
              <Input id="edit-stock" type="number" {...register("stock", { required: "Stock is required" })} />
              {errors.stock && <p className="text-xs text-red-500">{errors.stock.message?.toString()}</p>}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Update Item</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Item Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentItem && (
              <p>
                <strong>{currentItem.name}</strong> (SKU: {currentItem.sku})
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryTable;
