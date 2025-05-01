
import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Store } from "@/types/customer"; // We'll use the existing Store type
import { Plus, Store as StoreIcon, Edit, Trash, ArrowRight, Eye, EyeOff } from "lucide-react";

// Sample stores for demonstration
const sampleStores: Store[] = [
  {
    id: "1",
    name: "Main Store",
    type: "Main",
    address: "123 Main St, City",
    phone: "555-123-4567",
    email: "main@regimark.com"
  },
  {
    id: "2",
    name: "Downtown Branch",
    type: "Secondary",
    address: "456 Market St, City",
    phone: "555-987-6543",
    email: "downtown@regimark.com"
  },
  {
    id: "3",
    name: "East Side Location",
    type: "Secondary",
    address: "789 East Rd, City",
    phone: "555-456-7890",
    email: "eastside@regimark.com"
  }
];

// Sample inventory data showing stock across stores
const inventoryData = [
  { 
    id: "1", 
    name: "Brake Pads - Toyota Camry", 
    sku: "BP-T19-001", 
    mainStore: 15, 
    store2: 8, 
    store3: 5 
  },
  { 
    id: "2", 
    name: "Oil Filter - Honda Civic", 
    sku: "OF-H20-002", 
    mainStore: 23, 
    store2: 0, 
    store3: 7 
  },
  { 
    id: "3", 
    name: "Spark Plugs - Ford F-150", 
    sku: "SP-F18-003", 
    mainStore: 42, 
    store2: 16, 
    store3: 9 
  },
  { 
    id: "4", 
    name: "Air Filter - Honda Accord", 
    sku: "AT-H19-004", 
    mainStore: 19, 
    store2: 5, 
    store3: 0 
  },
];

const StoreManagement = () => {
  const [stores, setStores] = useState<Store[]>(sampleStores);
  const [showStoreForm, setShowStoreForm] = useState(false);
  const [activeTab, setActiveTab] = useState("stores");
  const [currentStore, setCurrentStore] = useState<Store | null>(null);
  const [selectedStoreId, setSelectedStoreId] = useState<string>("1"); // Default to main store
  const [isMainStore, setIsMainStore] = useState(true);
  
  // Form states
  const [formStoreName, setFormStoreName] = useState("");
  const [formStoreType, setFormStoreType] = useState<"Main" | "Secondary">("Secondary");
  const [formStoreAddress, setFormStoreAddress] = useState("");
  const [formStorePhone, setFormStorePhone] = useState("");
  const [formStoreEmail, setFormStoreEmail] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const handleOpenStoreForm = (store?: Store) => {
    if (store) {
      // Edit mode
      setFormStoreName(store.name);
      setFormStoreType(store.type);
      setFormStoreAddress(store.address || "");
      setFormStorePhone(store.phone || "");
      setFormStoreEmail(store.email || "");
      setEditingId(store.id);
    } else {
      // Create mode
      setFormStoreName("");
      setFormStoreType("Secondary"); // Default to Secondary for new stores
      setFormStoreAddress("");
      setFormStorePhone("");
      setFormStoreEmail("");
      setEditingId(null);
    }
    
    setShowStoreForm(true);
  };
  
  const handleDeleteStore = (id: string) => {
    // Check if it's the main store
    const storeToDelete = stores.find(store => store.id === id);
    if (storeToDelete?.type === "Main") {
      toast.error("Cannot delete the main store");
      return;
    }
    
    // Check if it's the currently selected store
    if (id === selectedStoreId) {
      // Reset to main store
      const mainStore = stores.find(store => store.type === "Main");
      if (mainStore) {
        setSelectedStoreId(mainStore.id);
        setIsMainStore(true);
      }
    }
    
    setStores(stores.filter(store => store.id !== id));
    toast.success("Store deleted successfully");
  };
  
  const handleSubmitStore = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formStoreName) {
      toast.error("Store name is required");
      return;
    }
    
    // Check if trying to create multiple main stores
    if (formStoreType === "Main" && !editingId) {
      const existingMainStore = stores.find(store => store.type === "Main");
      if (existingMainStore) {
        toast.error("A main store already exists");
        return;
      }
    }
    
    // If editing a store that was previously the main store and trying to change it to secondary
    if (editingId) {
      const currentStore = stores.find(store => store.id === editingId);
      if (currentStore?.type === "Main" && formStoreType === "Secondary") {
        // Check if this is the only main store
        const mainStoresCount = stores.filter(store => store.type === "Main").length;
        if (mainStoresCount <= 1) {
          toast.error("At least one main store is required");
          return;
        }
      }
    }
    
    if (editingId) {
      // Update existing store
      setStores(stores.map(store => 
        store.id === editingId ? {
          ...store,
          name: formStoreName,
          type: formStoreType,
          address: formStoreAddress,
          phone: formStorePhone,
          email: formStoreEmail
        } : store
      ));
      toast.success("Store updated successfully");
    } else {
      // Create new store
      const newStore: Store = {
        id: `store-${Date.now()}`,
        name: formStoreName,
        type: formStoreType,
        address: formStoreAddress,
        phone: formStorePhone,
        email: formStoreEmail
      };
      
      setStores([...stores, newStore]);
      toast.success("Store added successfully");
    }
    
    setShowStoreForm(false);
  };
  
  const handleSelectStore = (storeId: string) => {
    const selectedStore = stores.find(store => store.id === storeId);
    if (selectedStore) {
      setSelectedStoreId(storeId);
      setIsMainStore(selectedStore.type === "Main");
      setCurrentStore(selectedStore);
    }
  };
  
  // Filter stores based on type
  const mainStore = stores.find(store => store.type === "Main");
  const secondaryStores = stores.filter(store => store.type === "Secondary");
  
  return (
    <MainLayout>
      <motion.div 
        className="page-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold text-regimark-primary">Store Management</h1>
          <Button 
            onClick={() => handleOpenStoreForm()} 
            className="mt-4 md:mt-0"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Store
          </Button>
        </div>
        
        <Tabs defaultValue="stores" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="stores">Stores</TabsTrigger>
            <TabsTrigger value="inventory">Inventory Across Stores</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stores" className="m-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Store */}
              {mainStore && (
                <Card className="col-span-1 lg:col-span-3">
                  <CardHeader className="bg-primary/5">
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center">
                        <StoreIcon className="h-5 w-5 mr-2" />
                        <span>{mainStore.name}</span>
                        <Badge className="ml-2 bg-primary">Main Store</Badge>
                      </CardTitle>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenStoreForm(mainStore)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Address</h4>
                        <p>{mainStore.address || "Not specified"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Phone</h4>
                        <p>{mainStore.phone || "Not specified"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
                        <p>{mainStore.email || "Not specified"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Secondary Stores */}
              {secondaryStores.map(store => (
                <Card key={store.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center text-lg">
                        <StoreIcon className="h-5 w-5 mr-2" />
                        <span>{store.name}</span>
                      </CardTitle>
                      <Badge variant="outline">Secondary</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      {store.address && (
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Address</h4>
                          <p className="text-sm">{store.address}</p>
                        </div>
                      )}
                      {store.phone && (
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Phone</h4>
                          <p className="text-sm">{store.phone}</p>
                        </div>
                      )}
                      {store.email && (
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
                          <p className="text-sm">{store.email}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => handleOpenStoreForm(store)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleDeleteStore(store.id)}
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {stores.length === 0 && (
                <div className="col-span-3 text-center py-12 border rounded-lg">
                  <p className="text-muted-foreground">No stores found</p>
                  <Button variant="outline" className="mt-4" onClick={() => handleOpenStoreForm()}>
                    <Plus className="mr-2 h-4 w-4" /> Add Your First Store
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="inventory" className="m-0">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <CardTitle>Inventory Across Stores</CardTitle>
                  <div className="mt-4 md:mt-0">
                    <Select
                      value={selectedStoreId}
                      onValueChange={handleSelectStore}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select store view" />
                      </SelectTrigger>
                      <SelectContent>
                        {stores.map(store => (
                          <SelectItem key={store.id} value={store.id}>
                            {store.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {currentStore && (
                  <div className="mb-4">
                    <p>
                      Viewing inventory from: <span className="font-medium">{currentStore.name}</span>
                      <Badge className="ml-2" variant={isMainStore ? "default" : "outline"}>
                        {currentStore.type}
                      </Badge>
                    </p>
                    {isMainStore ? (
                      <p className="text-xs text-muted-foreground mt-1">
                        <Eye className="h-3 w-3 inline mr-1" />
                        As a main store, you can view inventory across all stores
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground mt-1">
                        <EyeOff className="h-3 w-3 inline mr-1" />
                        As a secondary store, you can only view your own inventory
                      </p>
                    )}
                  </div>
                )}
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Product</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead className="text-center">Main Store</TableHead>
                        {isMainStore && (
                          <>
                            <TableHead className="text-center">Downtown Branch</TableHead>
                            <TableHead className="text-center">East Side Location</TableHead>
                          </>
                        )}
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inventoryData.map(item => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.sku}</TableCell>
                          <TableCell className="text-center">{item.mainStore}</TableCell>
                          {isMainStore && (
                            <>
                              <TableCell className="text-center">
                                {item.store2 === 0 ? (
                                  <Badge variant="destructive" className="bg-red-100 hover:bg-red-100 text-red-800">Out of stock</Badge>
                                ) : item.store2}
                              </TableCell>
                              <TableCell className="text-center">
                                {item.store3 === 0 ? (
                                  <Badge variant="destructive" className="bg-red-100 hover:bg-red-100 text-red-800">Out of stock</Badge>
                                ) : item.store3}
                              </TableCell>
                            </>
                          )}
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <ArrowRight className="h-4 w-4" />
                              <span className="sr-only">View Details</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Store Form Dialog */}
        <Dialog open={showStoreForm} onOpenChange={setShowStoreForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit" : "Add"} Store</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitStore} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Store Name *</Label>
                <Input
                  id="name"
                  value={formStoreName}
                  onChange={(e) => setFormStoreName(e.target.value)}
                  placeholder="Enter store name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Store Type</Label>
                <Select value={formStoreType} onValueChange={(value: "Main" | "Secondary") => setFormStoreType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select store type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Main">Main Store</SelectItem>
                    <SelectItem value="Secondary">Secondary Store</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {formStoreType === "Main" 
                    ? "Main store can view inventory across all stores"
                    : "Secondary store can only view its own inventory"}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formStoreAddress}
                  onChange={(e) => setFormStoreAddress(e.target.value)}
                  placeholder="Enter store address"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formStorePhone}
                    onChange={(e) => setFormStorePhone(e.target.value)}
                    placeholder="Enter store phone"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formStoreEmail}
                    onChange={(e) => setFormStoreEmail(e.target.value)}
                    placeholder="Enter store email"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowStoreForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingId ? "Update" : "Add"} Store
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>
    </MainLayout>
  );
};

export default StoreManagement;
