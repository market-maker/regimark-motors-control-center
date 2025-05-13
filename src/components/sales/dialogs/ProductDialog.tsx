
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductComponent {
  id: string;
  name: string;
  quantity: number;
  originalProductId: string;
  originalProductName: string;
  dateExtracted: string;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  category: string;
  stock: number;
  isSplit?: boolean;
  components?: ProductComponent[];
  notes?: string;
}

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddProduct: (product: Product) => void;
  products: Product[];
}

const ProductDialog = ({
  open,
  onOpenChange,
  onAddProduct,
  products,
}: ProductDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Reset search when dialog opens
  useEffect(() => {
    if (open) {
      setSearchTerm("");
      setSelectedProduct(null);
    }
  }, [open]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add Product to Cart</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search products..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Product Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">SKU</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-muted-foreground">Price</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-muted-foreground">Stock</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-t">
                    <td className="px-4 py-2 text-sm">
                      <div className="flex items-center gap-2">
                        {product.name}
                        {product.isSplit && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 flex items-center gap-1 cursor-help">
                                  <Info size={12} />
                                  Split
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>This product has been split into components</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      {product.notes && (
                        <p className="text-xs italic text-amber-600 mt-1">{product.notes}</p>
                      )}
                    </td>
                    <td className="px-4 py-2 text-sm">{product.sku}</td>
                    <td className="px-4 py-2 text-sm text-right">${product.price.toFixed(2)}</td>
                    <td className="px-4 py-2 text-sm text-right">{product.stock}</td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex justify-end gap-2">
                        {product.components && product.components.length > 0 && (
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => setSelectedProduct(product)}
                          >
                            <Info size={16} />
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          onClick={() => onAddProduct(product)}
                          disabled={product.stock <= 0}
                        >
                          {product.stock > 0 ? "Add" : "Out of Stock"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Product Components Modal */}
        {selectedProduct && (
          <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Product Components</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <h3 className="font-medium mb-2">{selectedProduct.name}</h3>
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
                      {selectedProduct.components?.map((component, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2">{component.name}</td>
                          <td className="px-4 py-2 text-right">{component.quantity}</td>
                          <td className="px-4 py-2">{component.originalProductName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {selectedProduct.notes && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                    <p className="text-sm font-medium text-amber-800">Notes:</p>
                    <p className="text-sm text-amber-700">{selectedProduct.notes}</p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button onClick={() => setSelectedProduct(null)}>Close</Button>
                <Button 
                  onClick={() => {
                    onAddProduct(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  disabled={selectedProduct.stock <= 0}
                >
                  Add to Cart
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
