import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Trash2, Plus, Search, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartItemsSectionProps {
  cartItems: CartItem[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleQuantityChange: (id: string, quantity: number) => void;
  handleRemoveItem: (id: string) => void;
  onOpenAddProductDialog: () => void;
}

const CartItem = ({ item, handleQuantityChange, handleRemoveItem }: { item: CartItem; handleQuantityChange: (id: string, quantity: number) => void; handleRemoveItem: (id: string) => void }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    handleQuantityChange(item.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      handleQuantityChange(item.id, quantity - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity);
    handleQuantityChange(item.id, newQuantity);
  };

  return (
    <motion.li
      layout
      className="flex items-center justify-between py-4 px-6 rounded-md bg-white shadow-sm"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="flex items-center space-x-4">
        {item.image && (
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-500">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center border border-gray-300 rounded-md">
          <Button variant="ghost" size="icon" onClick={handleDecrement} disabled={quantity <= 1}>
            -
          </Button>
          <Input
            type="number"
            value={quantity}
            onChange={handleChange}
            className="w-16 text-center border-none shadow-none focus-visible:ring-0 focus-visible:ring-transparent"
          />
          <Button variant="ghost" size="icon" onClick={handleIncrement}>
            +
          </Button>
        </div>
        <Button variant="destructive" size="icon" onClick={() => handleRemoveItem(item.id)}>
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </motion.li>
  );
};

const CartItemsSection: React.FC<CartItemsSectionProps> = ({
  cartItems,
  searchTerm,
  setSearchTerm,
  handleQuantityChange,
  handleRemoveItem,
  onOpenAddProductDialog,
}) => {
  const filteredItems = cartItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Shopping Cart <Badge className="ml-2">{cartItems.length} Items</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        {filteredItems.length === 0 ? (
          <div className="text-center py-4">No items in cart.</div>
        ) : (
          <motion.ul layout className="space-y-2">
            <AnimatePresence>
              {filteredItems.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  handleQuantityChange={handleQuantityChange}
                  handleRemoveItem={handleRemoveItem}
                />
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
        <Button onClick={onOpenAddProductDialog} className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </CardContent>
    </Card>
  );
};

export default CartItemsSection;
