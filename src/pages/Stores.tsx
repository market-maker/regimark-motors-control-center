import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Store, ArrowRight } from "lucide-react";
import { Store as StoreType } from "@/types/customer";

const Stores = () => {
  // Empty initial state instead of mock data
  const [stores, setStores] = useState<StoreType[]>([]);
  const [showAddStoreDialog, setShowAddStoreDialog] = useState(false);
  const [showInventoryDialog, setShowInventoryDialog] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreType | null>(null);
  const [selectedStoreId, setSelectedStoreId] = useState<string>("");
  const [isCurrentStoreMain, setIsCurrentStoreMain] = useState(false);
  
  // Empty initial state for inventory data
  const [storeInventory, setStoreInventory] = useState<Record<string, {id: string, name: string, sku: string, stock: number}[]>>({});
  
  // Form fields for new store
  const [storeName, setStoreName] = useState("");
  const [storeType, setStoreType] = useState<"Main" | "Secondary">("Secondary");
  const [storeAddress, setStoreAddress] = useState("");
  const [storePhone, setStorePhone] = useState("");
  const [storeEmail, setStoreEmail] = useState("");
  
  const handleAddStore = () => {
    if (!storeName) {
      toast.error("Please enter a store name");
      return;
    }
    
    // Check if a main store already exists when trying to add another main store
    if (storeType === "Main" && stores.some(store => store.type === "Main")) {
      toast.error("A main store already exists. Only one main store is allowed.");
      return;
    }
    
    const newStore: StoreType = {
      id: (stores.length + 1).toString(),
      name: storeName,
      type: storeType,
      address: storeAddress,
      phone: storePhone,
      email: storeEmail
    };
    
    setStores([...stores, newStore]);
    setShowAddStoreDialog(false);
    resetStoreForm();
    toast.success("Store added successfully");
  };
  
  const handleDeleteStore = (id: string) => {
    // Prevent deletion of the main store
    const storeToDelete = stores.find(store => store.id === id);
    if (storeToDelete && storeToDelete.type === "Main") {
      toast.error("Cannot delete the main store. Please change store type first.");
      return;
    }
    
    setStores(stores.filter(store => store.id !== id));
    toast.success("Store deleted successfully");
  };
  
  const handleViewInventory = (store: StoreType) => {
    setSelectedStore(store);
    setIsCurrentStoreMain(store.type === "Main");
    setSelectedStoreId(store.id);
    setShowInventoryDialog(true);
  };
  
  const resetStoreForm = () => {
    setStoreName("");
    setStoreType("Secondary");
    setStoreAddress("");
    setStorePhone("");
    setStoreEmail("");
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
        <h1 className="text-3xl font-bold mb-8 text-regimark-primary">Store Management</h1>
        
        <Card className="shadow-lg mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Stores & Locations</CardTitle>
              <CardDescription>Manage all your store locations</CardDescription>
            </div>
            <Button onClick={() => setShowAddStoreDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Store
            </Button>
          </CardHeader>
          <CardContent>
            {stores.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Store Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stores.map((store) => (
                    <TableRow key={store.id}>
                      <TableCell className="font-medium">{store.name}</TableCell>
                      <TableCell>
                        <Badge className={store.type === "Main" ? "bg-regimark-primary" : "bg-gray-500"}>
                          {store.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{store.address || "—"}</TableCell>
                      <TableCell>
                        {store.phone && <div>{store.phone}</div>}
                        {store.email && <div className="text-xs text-muted-foreground">{store.email}</div>}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewInventory(store)}
                          >
                            <Store className="h-4 w-4 mr-1" />
                            Inventory
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteStore(store.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No stores have been added yet</p>
                <Button variant="outline" onClick={() => setShowAddStoreDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Store
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Store Access Rules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted rounded-md p-4">
              <h3 className="font-medium mb-2 flex items-center">
                <Store className="h-5 w-5 mr-2" />
                Main Store Permissions
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Can view inventory across all locations</li>
                <li>Can transfer inventory between stores</li>
                <li>Can add/edit/delete products and categories</li>
                <li>Full access to sales and financial reports</li>
                <li>Can manage all customers and suppliers</li>
              </ul>
            </div>
            
            <div className="bg-muted rounded-md p-4">
              <h3 className="font-medium mb-2 flex items-center">
                <Store className="h-5 w-5 mr-2" />
                Secondary Store Permissions
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Can view inventory only in their location</li>
                <li>Can request inventory transfers from main store</li>
                <li>Limited access to sales reporting (own location only)</li>
                <li>Can add new customers but not edit global customer records</li>
                <li>Cannot modify product catalog (prices, categories, etc.)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        {/* Add Store Dialog */}
        <Dialog open={showAddStoreDialog} onOpenChange={setShowAddStoreDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Store</DialogTitle>
              <DialogDescription>
                Add a new store location to your business.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name *</Label>
                <Input
                  id="store-name"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-type">Store Type</Label>
                <Select value={storeType} onValueChange={(value) => setStoreType(value as any)}>
                  <SelectTrigger id="store-type">
                    <SelectValue placeholder="Select store type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Main">Main Store</SelectItem>
                    <SelectItem value="Secondary">Secondary Store</SelectItem>
                  </SelectContent>
                </Select>
                {stores.some(store => store.type === "Main") && storeType === "Main" && (
                  <p className="text-xs text-red-500 mt-1">
                    Warning: Only one main store is allowed. Changing this will convert the existing main store to secondary.
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-address">Address</Label>
                <Input
                  id="store-address"
                  value={storeAddress}
                  onChange={(e) => setStoreAddress(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="store-phone">Phone</Label>
                  <Input
                    id="store-phone"
                    value={storePhone}
                    onChange={(e) => setStorePhone(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="store-email">Email</Label>
                  <Input
                    id="store-email"
                    type="email"
                    value={storeEmail}
                    onChange={(e) => setStoreEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddStoreDialog(false)}>Cancel</Button>
              <Button onClick={handleAddStore}>Add Store</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Store Inventory Dialog */}
        {selectedStore && (
          <Dialog open={showInventoryDialog} onOpenChange={setShowInventoryDialog}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>
                  <div className="flex items-center">
                    <Store className="h-5 w-5 mr-2" />
                    {selectedStore.name} Inventory
                  </div>
                </DialogTitle>
                <DialogDescription>
                  {isCurrentStoreMain 
                    ? "As a main store, you can view inventory across all locations."
                    : "As a secondary store, you can only view your own inventory."}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Current store inventory */}
                <div>
                  <h3 className="text-lg font-medium mb-3">{selectedStore.name} Stock</h3>
                  {storeInventory[selectedStoreId]?.length > 0 ? (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product Name</TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead className="text-right">Stock</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {storeInventory[selectedStoreId]?.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.sku}</TableCell>
                              <TableCell className="text-right">{item.stock}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-6 border rounded-md">
                      <p className="text-muted-foreground mb-4">No inventory items found</p>
                      <p className="text-sm text-muted-foreground">Add inventory items to see them here</p>
                    </div>
                  )}
                </div>
                
                {/* Other stores inventory (only visible to main store) */}
                {isCurrentStoreMain && stores.length > 1 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-3">Other Locations Stock</h3>
                    
                    {stores
                      .filter(store => store.id !== selectedStoreId)
                      .map(store => (
                        <div key={store.id} className="mb-6">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium flex items-center">
                              <ArrowRight className="h-4 w-4 mr-1" />
                              {store.name}
                            </h4>
                            <Badge variant="outline">{store.type}</Badge>
                          </div>
                          
                          {storeInventory[store.id]?.length > 0 ? (
                            <div className="rounded-md border">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Product Name</TableHead>
                                    <TableHead>SKU</TableHead>
                                    <TableHead className="text-right">Stock</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {storeInventory[store.id]?.map((item) => (
                                    <TableRow key={item.id}>
                                      <TableCell>{item.name}</TableCell>
                                      <TableCell>{item.sku}</TableCell>
                                      <TableCell className="text-right">{item.stock}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          ) : (
                            <div className="text-center py-4 border rounded-md">
                              <p className="text-muted-foreground">No inventory items found</p>
                            </div>
                          )}
                        </div>
                      ))
                    }
                  </div>
                )}
              </div>
              
              <DialogFooter>
                <Button onClick={() => setShowInventoryDialog(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </motion.div>
    </MainLayout>
  );
};

export default Stores;