
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Search, Trash2, Plus, CreditCard, Banknote } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  category: string;
  stock: number;
}

// Sample product data for the add product dialog
const availableProducts: Product[] = [
  {
    id: "1",
    name: "Brake Pads - Toyota Camry 2019",
    sku: "BP-T19-001",
    price: 89.99,
    category: "Brakes",
    stock: 15,
  },
  {
    id: "2",
    name: "Oil Filter - Honda Civic 2020",
    sku: "OF-H20-002",
    price: 12.99,
    category: "Filters",
    stock: 8,
  },
  {
    id: "3",
    name: "Spark Plugs - Ford F-150 2018",
    sku: "SP-F18-003",
    price: 7.99,
    category: "Ignition",
    stock: 24,
  },
  {
    id: "4",
    name: "Air Filter - Honda Accord 2019",
    sku: "AT-H19-004",
    price: 15.99,
    category: "Filters",
    stock: 3,
  },
  {
    id: "5",
    name: "Timing Belt - Toyota RAV4 2020",
    sku: "TB-T20-005",
    price: 45.99,
    category: "Engine",
    stock: 5,
  },
  {
    id: "6",
    name: "Windshield Wipers - Subaru Outback",
    sku: "WW-S21-006",
    price: 24.99,
    category: "Exterior",
    stock: 12,
  },
  {
    id: "7",
    name: "Cabin Air Filter - Nissan Altima",
    sku: "CA-N18-007",
    price: 18.99,
    category: "Filters",
    stock: 9,
  },
];

const CheckoutForm = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Brake Pads - Toyota Camry 2019",
      sku: "BP-T19-001",
      price: 89.99,
      quantity: 1,
    },
    {
      id: "2",
      name: "Oil Filter - Honda Civic 2020",
      sku: "OF-H20-002",
      price: 12.99,
      quantity: 2,
    },
  ]);

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [cashReceived, setCashReceived] = useState<number>(0);
  const [cardNumber, setCardNumber] = useState("");
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.success("Item removed from cart");
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleAddProduct = (product: Product) => {
    // Check if product is already in cart
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      // Increment quantity if already in cart
      handleQuantityChange(existingItem.id, existingItem.quantity + 1);
      toast.success(`Increased quantity of ${product.name}`);
    } else {
      // Add new item to cart
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        sku: product.sku,
        price: product.price,
        quantity: 1,
      };
      setCartItems([...cartItems, newItem]);
      toast.success(`${product.name} added to cart`);
    }
    setIsAddProductDialogOpen(false);
  };

  const handleCompleteSale = () => {
    if (cartItems.length === 0) {
      toast.error("Cannot complete sale with empty cart");
      return;
    }

    if (!customerName) {
      toast.error("Please enter customer name");
      return;
    }

    if (paymentMethod === "cash" && (!cashReceived || cashReceived < total)) {
      toast.error("Cash received must be equal to or greater than the total amount");
      return;
    }

    if (paymentMethod === "card" && !cardNumber) {
      toast.error("Please enter card number");
      return;
    }

    // Show processing state
    setIsProcessing(true);

    // Simulate processing delay
    setTimeout(() => {
      // Reset form state
      setIsProcessing(false);
      toast.success("Sale completed successfully!");
      
      // Calculate change if cash payment
      if (paymentMethod === "cash" && cashReceived > total) {
        const change = cashReceived - total;
        toast.info(`Change due: $${change.toFixed(2)}`);
      }

      // Clear the form after successful completion
      setCartItems([]);
      setCustomerName("");
      setCustomerPhone("");
      setCustomerEmail("");
      setCashReceived(0);
      setCardNumber("");
    }, 1500);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.07; // Assuming 7% tax rate
  const total = subtotal + tax;

  const filteredProducts = availableProducts.filter(product =>
    product.name.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(productSearchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  placeholder="Enter customer name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerPhone">Phone Number</Label>
                <Input 
                  id="customerPhone" 
                  placeholder="Enter phone number" 
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerEmail">Email Address</Label>
              <Input 
                id="customerEmail" 
                placeholder="Enter email address" 
                type="email" 
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

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
              {cartItems.length > 0 ? (
                cartItems
                  .filter(item =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b pb-4"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                        <p className="text-sm">${item.price.toFixed(2)}</p>
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

              <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                </DialogTrigger>
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
                        value={productSearchTerm}
                        onChange={(e) => setProductSearchTerm(e.target.value)}
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
                                  onClick={() => handleAddProduct(product)}
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
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (7%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Select 
                defaultValue={paymentMethod} 
                onValueChange={setPaymentMethod}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">
                    <div className="flex items-center">
                      <Banknote className="mr-2 h-4 w-4" />
                      Cash
                    </div>
                  </SelectItem>
                  <SelectItem value="card">
                    <div className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Credit Card
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {paymentMethod === "cash" && (
              <div className="space-y-2">
                <Label htmlFor="cashReceived">Cash Received</Label>
                <Input 
                  id="cashReceived" 
                  type="number" 
                  min={total} 
                  value={cashReceived || ''}
                  onChange={(e) => setCashReceived(parseFloat(e.target.value) || 0)}
                />
                {cashReceived > total && (
                  <div className="flex justify-between text-sm mt-2">
                    <span>Change Due:</span>
                    <span className="font-medium">${(cashReceived - total).toFixed(2)}</span>
                  </div>
                )}
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input 
                  id="cardNumber" 
                  placeholder="XXXX XXXX XXXX XXXX" 
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength={19}
                />
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={handleCompleteSale}
              disabled={isProcessing || cartItems.length === 0}
            >
              {isProcessing ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Complete Sale"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutForm;
