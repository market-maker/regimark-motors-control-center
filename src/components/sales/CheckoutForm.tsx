
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
import { Search, Trash2, Plus, CreditCard, Banknote, User, Percent } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import Receipt from "./Receipt";
import { Switch } from "@/components/ui/switch";
import { Customer } from "@/types/customer";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNotifications } from "@/providers/NotificationsProvider";

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

// Mock customers for customer selection
const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "555-123-4567",
    address: "123 Main St, City",
    totalSpent: 1250.50,
    lastVisit: "2023-04-15",
    status: "Active"
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "555-987-6543",
    address: "456 Oak St, Town",
    totalSpent: 875.25,
    lastVisit: "2023-04-20",
    status: "Active"
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "555-456-7890",
    address: "789 Pine St, Village",
    totalSpent: 2350.00,
    lastVisit: "2023-04-18",
    status: "Active"
  }
];

const CheckoutForm = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { addNotification } = useNotifications();
  
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
  const [showReceipt, setShowReceipt] = useState(false);
  const [completedSaleData, setCompletedSaleData] = useState<any>(null);
  
  // New states for credit sales
  const [isCredit, setIsCredit] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");

  // New states for discounts
  const [discountType, setDiscountType] = useState<"none" | "percentage" | "fixed">("none");
  const [discountValue, setDiscountValue] = useState<number>(0);
  
  // New state for sale status
  const [saleStatus, setSaleStatus] = useState<"Completed" | "Pending" | "Revoked">("Completed");
  
  // New state for advice sections
  const [showAdviceDialog, setShowAdviceDialog] = useState(false);
  const [adviceType, setAdviceType] = useState<"job" | "card" | "vehicle">("job");

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

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCustomerName(customer.name);
    setCustomerPhone(customer.phone);
    setCustomerEmail(customer.email);
    setShowCustomerDialog(false);
    toast.success(`Selected customer: ${customer.name}`);
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

    if (isCredit) {
      if (!dueDate) {
        toast.error("Please enter due date for credit sale");
        return;
      }
      
      if (!selectedCustomer) {
        toast.error("Please select a registered customer for credit sale");
        return;
      }
    } else {
      if (paymentMethod === "cash" && (!cashReceived || cashReceived < total)) {
        toast.error("Cash received must be equal to or greater than the total amount");
        return;
      }

      if (paymentMethod === "card" && !cardNumber) {
        toast.error("Please enter card number");
        return;
      }
    }

    // Show processing state
    setIsProcessing(true);

    // Generate a random receipt number
    const receiptNumber = `INV-${Date.now().toString().slice(-6)}`;
    
    // Get current date in readable format
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Calculate discounted total
    let discountedTotal = total;
    let discountAmount = 0;
    
    if (discountType === "percentage" && discountValue > 0) {
      discountAmount = total * (discountValue / 100);
      discountedTotal = total - discountAmount;
    } else if (discountType === "fixed" && discountValue > 0) {
      discountAmount = discountValue;
      discountedTotal = total - discountValue;
      // Make sure discounted total is not negative
      if (discountedTotal < 0) discountedTotal = 0;
    }

    // Prepare sale data for receipt
    const saleData = {
      saleId: receiptNumber,
      date: currentDate,
      customerName: customerName,
      customerEmail: customerEmail,
      paymentMethod: isCredit ? "credit" : paymentMethod,
      items: cartItems,
      subtotal: subtotal,
      tax: tax,
      total: total,
      discountType: discountType !== "none" ? discountType : undefined,
      discountValue: discountType !== "none" ? discountValue : undefined,
      discountAmount: discountType !== "none" ? discountAmount : undefined,
      finalTotal: discountType !== "none" ? discountedTotal : total,
      cashReceived: paymentMethod === "cash" && !isCredit ? cashReceived : undefined,
      change: paymentMethod === "cash" && !isCredit ? cashReceived - (discountType !== "none" ? discountedTotal : total) : undefined,
      isCredit: isCredit,
      dueDate: isCredit ? dueDate : undefined,
      status: saleStatus
    };

    // If this is a credit sale, add it to the customer's debt records
    if (isCredit && selectedCustomer) {
      // This would normally update a database
      toast.info(`Added ${discountType !== "none" ? discountedTotal.toFixed(2) : total.toFixed(2)} to ${selectedCustomer.name}'s account as credit`);
      
      // Add notification for credit sale
      addNotification({
        title: "New Credit Sale",
        message: `A credit sale of $${discountType !== "none" ? discountedTotal.toFixed(2) : total.toFixed(2)} has been added to ${selectedCustomer.name}'s account.`,
        type: "sale",
        linkTo: "/sales?tab=debtors"
      });
    }

    // Add notification based on sale status
    if (saleStatus === "Pending") {
      addNotification({
        title: "Pending Sale",
        message: `Sale #${receiptNumber} has been marked as pending.`,
        type: "sale"
      });
    } else if (saleStatus === "Completed") {
      addNotification({
        title: "Sale Completed",
        message: `Sale #${receiptNumber} has been completed successfully.`,
        type: "sale"
      });
    }

    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setCompletedSaleData(saleData);
      setShowReceipt(true);
    }, 1500);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    
    // Clear the form after successful completion
    setCartItems([]);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setCashReceived(0);
    setCardNumber("");
    setIsCredit(false);
    setDueDate("");
    setSelectedCustomer(null);
    
    toast.success("Sale completed successfully!");
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
  
  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
    customer.phone.toLowerCase().includes(customerSearchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Calculate discounted total
  let finalTotal = total;
  let discountAmount = 0;
  
  if (discountType === "percentage" && discountValue > 0) {
    discountAmount = total * (discountValue / 100);
    finalTotal = total - discountAmount;
  } else if (discountType === "fixed" && discountValue > 0) {
    discountAmount = Math.min(discountValue, total); // Prevent negative total
    finalTotal = total - discountAmount;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      <motion.div 
        variants={itemVariants}
        className="lg:col-span-2 space-y-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <div className="flex space-x-2">
                  <Input
                    id="customerName"
                    placeholder="Enter customer name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setShowCustomerDialog(true)}
                    title="Select Customer"
                  >
                    <User size={16} />
                  </Button>
                </div>
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
            
            {/* Credit sale toggle */}
            <div className="flex items-center space-x-2">
              <Switch
                checked={isCredit}
                onCheckedChange={setIsCredit}
                id="credit-sale"
              />
              <Label htmlFor="credit-sale" className="cursor-pointer">
                Credit Sale (Add to Customer's Account)
              </Label>
            </div>
            
            {/* Due date field for credit sales */}
            {isCredit && (
              <div className="space-y-2">
                <Label htmlFor="dueDate">Payment Due Date</Label>
                <Input 
                  id="dueDate" 
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
                {!selectedCustomer && (
                  <p className="text-sm text-amber-600 mt-2">
                    Please select a registered customer for credit sales.
                  </p>
                )}
              </div>
            )}
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
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="lg:col-span-1"
      >
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
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              {/* Discount section */}
              <div className="pt-2">
                <Label htmlFor="discount-type">Discount</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Select 
                    value={discountType} 
                    onValueChange={(value) => setDiscountType(value as any)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Discount type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Discount</SelectItem>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="relative flex-1">
                    <Input
                      type="number"
                      min="0"
                      step={discountType === "percentage" ? "1" : "0.01"}
                      max={discountType === "percentage" ? "100" : undefined}
                      value={discountValue || ""}
                      onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                      disabled={discountType === "none"}
                      className={discountType === "percentage" ? "pl-7" : ""}
                    />
                    {discountType === "percentage" && (
                      <Percent className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>
              
              {discountType !== "none" && discountValue > 0 && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="text-red-500">-${discountAmount.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Final Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </>
              )}
              
              {/* Sale status section */}
              <div className="pt-2">
                <Label htmlFor="sale-status">Sale Status</Label>
                <Select 
                  value={saleStatus} 
                  onValueChange={(value) => setSaleStatus(value as any)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sale status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Revoked">Revoked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {!isCredit && (
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
            )}

            {!isCredit && paymentMethod === "cash" && (
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

            {!isCredit && paymentMethod === "card" && (
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

            {/* Customer advice button */}
            <Button 
              variant="outline" 
              type="button" 
              className="w-full" 
              onClick={() => setShowAdviceDialog(true)}
            >
              Show Customer Advice
            </Button>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={handleCompleteSale}
              disabled={isProcessing || cartItems.length === 0 || saleStatus === "Revoked"}
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
                `Complete ${isCredit ? "Credit " : ""}Sale (${saleStatus})`
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Customer Selection Dialog */}
      <Dialog open={showCustomerDialog} onOpenChange={setShowCustomerDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Customer</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search customers..."
                className="pl-10"
                value={customerSearchTerm}
                onChange={(e) => setCustomerSearchTerm(e.target.value)}
              />
            </div>

            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Email</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Phone</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-muted-foreground"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-t">
                      <td className="px-4 py-2 text-sm">{customer.name}</td>
                      <td className="px-4 py-2 text-sm">{customer.email}</td>
                      <td className="px-4 py-2 text-sm">{customer.phone}</td>
                      <td className="px-4 py-2 text-right">
                        <Button 
                          size="sm"
                          onClick={() => handleSelectCustomer(customer)}
                        >
                          Select
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
      
      {/* Customer Advice Dialog */}
      <Dialog open={showAdviceDialog} onOpenChange={setShowAdviceDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Customer Advice</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Select
              value={adviceType}
              onValueChange={(value: any) => setAdviceType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select advice type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="job">Job Card</SelectItem>
                <SelectItem value="vehicle">Vehicle Maintenance</SelectItem>
                <SelectItem value="card">Credit Card</SelectItem>
              </SelectContent>
            </Select>
            
            {adviceType === "job" && (
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Job Card Advice</h4>
                <p className="text-sm">Creating a job card helps track vehicle service history and maintenance schedules. It allows for better organization of parts used and labor costs.</p>
                <Button 
                  variant="outline" 
                  className="mt-4 w-full"
                  onClick={() => {
                    setShowAdviceDialog(false);
                    navigate('/jobs');
                  }}
                >
                  Go to Job Cards
                </Button>
              </div>
            )}
            
            {adviceType === "vehicle" && (
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Vehicle Maintenance Advice</h4>
                <p className="text-sm">Regular vehicle maintenance ensures safety, extends vehicle life, and prevents costly repairs. We recommend service every 5,000-7,500 miles depending on driving conditions.</p>
                <ul className="text-sm mt-2 list-disc list-inside space-y-1">
                  <li>Oil change every 3,000-5,000 miles</li>
                  <li>Tire rotation every 6,000-8,000 miles</li>
                  <li>Brake inspection every 10,000 miles</li>
                  <li>Air filter replacement every 15,000-30,000 miles</li>
                </ul>
              </div>
            )}
            
            {adviceType === "card" && (
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Credit Card Payment Advice</h4>
                <p className="text-sm">Credit card payments are processed securely through our payment provider. All card details are encrypted and we do not store complete card numbers in our system.</p>
                <p className="text-sm mt-2">For large transactions, consider our financing options or installment plans which may offer better rates than standard credit cards.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Receipt Dialog */}
      {showReceipt && completedSaleData && (
        <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Sale Receipt</DialogTitle>
            </DialogHeader>
            <Receipt 
              saleData={completedSaleData}
              onClose={handleCloseReceipt}
            />
          </DialogContent>
        </Dialog>
      )}
    </motion.div>
  );
};

export default CheckoutForm;
