
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  category: string;
  stock: number;
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
  
  // Reset search when dialog opens
  useEffect(() => {
    if (open) {
      setSearchTerm("");
    }
  }, [open]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
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
                    <td className="px-4 py-2 text-sm">{product.name}</td>
                    <td className="px-4 py-2 text-sm">{product.sku}</td>
                    <td className="px-4 py-2 text-sm text-right">${product.price.toFixed(2)}</td>
                    <td className="px-4 py-2 text-sm text-right">{product.stock}</td>
                    <td className="px-4 py-2 text-right">
                      <Button 
                        size="sm" 
                        onClick={() => onAddProduct(product)}
                        disabled={product.stock <= 0}
                      >
                        {product.stock > 0 ? "Add" : "Out of Stock"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
