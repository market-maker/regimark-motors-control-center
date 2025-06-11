
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "../types/salesTypes";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddProduct: (product: Product, quantity: number) => void;
  products: Product[];
}

const ProductDialog: React.FC<ProductDialogProps> = ({ open, onOpenChange, onAddProduct, products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    if (selectedProduct) {
      onAddProduct(selectedProduct, quantity);
      onOpenChange(false);
      setSelectedProduct(null);
      setQuantity(1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="relative">
            <Input
              id="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          <div className="max-h-80 overflow-y-auto">
            {filteredProducts.map(product => (
              <motion.div
                key={product.id}
                className={`flex items-center justify-between py-2 px-3 rounded-md cursor-pointer hover:bg-accent ${selectedProduct?.id === product.id ? 'bg-accent' : ''}`}
                onClick={() => setSelectedProduct(product)}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-3">
                  <Package className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    {product.description && (
                      <p className="text-xs text-muted-foreground">{product.description}</p>
                    )}
                  </div>
                </div>
                <Badge variant="secondary">${product.price}</Badge>
              </motion.div>
            ))}
            {filteredProducts.length === 0 && (
              <div className="text-center py-4 text-muted-foreground">
                No products found.
              </div>
            )}
          </div>

          {selectedProduct && (
            <div className="grid grid-cols-2 items-center gap-2">
              <Label htmlFor="quantity">Quantity:</Label>
              <Input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="text-center"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleAdd} disabled={!selectedProduct}>
            Add Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
