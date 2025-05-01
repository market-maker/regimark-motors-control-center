
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNotifications } from "@/providers/NotificationsProvider";
import { Customer } from "@/types/customer";

// Import the new components
import CustomerInfoSection from "./CustomerInfoSection";
import CartItemsSection from "./CartItemsSection";
import PaymentSummarySection from "./PaymentSummarySection";
import ProductDialog from "./dialogs/ProductDialog";
import CustomerDialog from "./dialogs/CustomerDialog";
import AdviceDialog from "./dialogs/AdviceDialog";
import ReceiptDialog from "./dialogs/ReceiptDialog";

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
  
  // Cart state
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

  // Customer information
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  
  // Payment details
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cashReceived, setCashReceived] = useState<number>(0);
  const [cardNumber, setCardNumber] = useState("");
  
  // Credit sale details
  const [isCredit, setIsCredit] = useState(false);
  const [dueDate, setDueDate] = useState("");
  
  // Discount details
  const [discountType, setDiscountType] = useState<"none" | "percentage" | "fixed">("none");
  const [discountValue, setDiscountValue] = useState<number>(0);
  
  // Sale status
  const [saleStatus, setSaleStatus] = useState<"Completed" | "Pending" | "Revoked">("Completed");
  
  // UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedSaleData, setCompletedSaleData] = useState<any>(null);
  
  // Dialog states
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);
  const [showAdviceDialog, setShowAdviceDialog] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [adviceType, setAdviceType] = useState<"job" | "card" | "vehicle">("job");
  
  // Calculate totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.07; // Assuming 7% tax rate
  const total = subtotal + tax;

  // Event handlers
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      <div className="lg:col-span-2 space-y-6">
        <CustomerInfoSection 
          customerName={customerName}
          setCustomerName={setCustomerName}
          customerPhone={customerPhone}
          setCustomerPhone={setCustomerPhone}
          customerEmail={customerEmail}
          setCustomerEmail={setCustomerEmail}
          isCredit={isCredit}
          setIsCredit={setIsCredit}
          dueDate={dueDate}
          setDueDate={setDueDate}
          selectedCustomer={selectedCustomer}
          onOpenCustomerDialog={() => setShowCustomerDialog(true)}
        />

        <CartItemsSection 
          cartItems={cartItems}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleQuantityChange={handleQuantityChange}
          handleRemoveItem={handleRemoveItem}
          onOpenAddProductDialog={() => setIsAddProductDialogOpen(true)}
        />
      </div>

      <div className="lg:col-span-1">
        <PaymentSummarySection 
          subtotal={subtotal}
          tax={tax}
          total={total}
          isCredit={isCredit}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          cashReceived={cashReceived}
          setCashReceived={setCashReceived}
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          discountType={discountType}
          setDiscountType={setDiscountType}
          discountValue={discountValue}
          setDiscountValue={setDiscountValue}
          saleStatus={saleStatus}
          setSaleStatus={setSaleStatus}
          handleCompleteSale={handleCompleteSale}
          isProcessing={isProcessing}
          onOpenAdviceDialog={() => setShowAdviceDialog(true)}
          cartItemsCount={cartItems.length}
        />
      </div>

      {/* Dialogs */}
      <ProductDialog 
        open={isAddProductDialogOpen}
        onOpenChange={setIsAddProductDialogOpen}
        onAddProduct={handleAddProduct}
        products={availableProducts}
      />
      
      <CustomerDialog 
        open={showCustomerDialog}
        onOpenChange={setShowCustomerDialog}
        onSelectCustomer={handleSelectCustomer}
        customers={mockCustomers}
      />
      
      <AdviceDialog 
        open={showAdviceDialog}
        onOpenChange={setShowAdviceDialog}
        onGoToJobCards={() => navigate('/jobs')}
      />
      
      {showReceipt && completedSaleData && (
        <ReceiptDialog 
          open={showReceipt}
          onOpenChange={setShowReceipt}
          saleData={completedSaleData}
          onClose={handleCloseReceipt}
        />
      )}
    </motion.div>
  );
};

export default CheckoutForm;
