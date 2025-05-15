
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Trash2, Plus, Info } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface CartItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  isSplit?: boolean;
  components?: {
    id: string;
    name: string;
    quantity: number;
    originalProductId: string;
    originalProductName: string;
    dateExtracted: string;
  }[];
  notes?: string;
}

interface CartItemsSectionProps {
  cartItems: CartItem[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleQuantityChange: (id: string, quantity: number) => void;
  handleRemoveItem: (id: string) => void;
  onOpenAddProductDialog: () => void;
}

const CartItemsSection = ({
  cartItems,
  searchTerm,
  setSearchTerm,
  handleQuantityChange,
  handleRemoveItem,
  onOpenAddProductDialog,
}: CartItemsSectionProps) => {
  const [activeItemInfo, setActiveItemInfo] = useState<CartItem | null>(null);
  
  const filteredItems = cartItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Cart Items</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search cart..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{item.name}</p>
                      {item.isSplit && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 flex items-center gap-1 cursor-help">
                                <Info size={12} />
                                Split Product
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>This product has been split into components</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      {item.components && item.components.length > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 p-0"
                          onClick={() => setActiveItemInfo(item)}
                        >
                          <Info size={16} className="text-blue-500" />
                        </Button>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                    <p className="text-sm">${item.price.toFixed(2)}</p>
                    {item.notes && (
                      <p className="text-xs italic text-amber-600">Note: {item.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </Button>
                      <Input
                        className="h-8 w-12 text-center"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value) || 1
                          )
                        }
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No items in cart. Add products to continue.
              </div>
            )}

            <Button variant="outline" className="w-full mt-4" onClick={onOpenAddProductDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Product Components Dialog */}
      {activeItemInfo && (
        <Dialog open={!!activeItemInfo} onOpenChange={(open) => !open && setActiveItemInfo(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Product Components</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <h3 className="font-medium mb-2">{activeItemInfo.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This product contains components from other items.
              </p>
              
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Component</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-muted-foreground">Quantity</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeItemInfo.components?.map((component, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{component.name}</td>
                        <td className="px-4 py-2 text-right">{component.quantity}</td>
                        <td className="px-4 py-2">{component.originalProductName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {activeItemInfo.notes && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                  <p className="text-sm font-medium text-amber-800">Notes:</p>
                  <p className="text-sm text-amber-700">{activeItemInfo.notes}</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button onClick={() => setActiveItemInfo(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </motion.div>
  );
};

export default CartItemsSection;
