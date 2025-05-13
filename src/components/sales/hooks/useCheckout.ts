
import { useState, useMemo, useCallback } from "react";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "@/providers/NotificationsProvider";
import { Customer } from "@/types/customer";
import { CartItem, SaleData } from "../types/salesTypes";

export const useCheckout = () => {
  const navigate = useNavigate();
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
  const [completedSaleData, setCompletedSaleData] = useState<SaleData | null>(null);
  
  // Dialog states
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);
  const [showAdviceDialog, setShowAdviceDialog] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [adviceType, setAdviceType] = useState<"job" | "card" | "vehicle">("job");
  
  // Calculate totals with memoization
  const subtotal = useMemo(() => 
    cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ), 
    [cartItems]
  );
  
  const tax = useMemo(() => subtotal * 0.07, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  // Memoized event handlers
  const handleRemoveItem = useCallback((id: string) => {
    setCartItems(prevItems => prevItems.filter((item) => item.id !== id));
    toast.success("Item removed from cart");
  }, []);

  const handleQuantityChange = useCallback((id: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  }, []);

  const handleAddProduct = useCallback((product: any) => {
    // Check if product is already in cart
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Increment quantity if already in cart
        const updatedItems = prevItems.map(item => 
          item.id === existingItem.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
        toast.success(`Increased quantity of ${product.name}`);
        return updatedItems;
      } else {
        // Add new item to cart
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          sku: product.sku,
          price: product.price,
          quantity: 1,
        };
        toast.success(`${product.name} added to cart`);
        return [...prevItems, newItem];
      }
    });
    
    setIsAddProductDialogOpen(false);
  }, []);

  const handleSelectCustomer = useCallback((customer: Customer) => {
    setSelectedCustomer(customer);
    setCustomerName(customer.name);
    setCustomerPhone(customer.phone);
    setCustomerEmail(customer.email);
    setShowCustomerDialog(false);
    toast.success(`Selected customer: ${customer.name}`);
  }, []);

  const handleCompleteSale = useCallback(() => {
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

    // Calculate discounted total - moved to a separate function for clarity
    const { discountedTotal, discountAmount } = calculateDiscount(total, discountType, discountValue);

    // Prepare sale data for receipt
    const saleData: SaleData = {
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

    // Use requestAnimationFrame for smoother UI
    requestAnimationFrame(() => {
      // Simulate processing delay with a shorter timeout
      setTimeout(() => {
        setIsProcessing(false);
        setCompletedSaleData(saleData);
        setShowReceipt(true);
      }, 500); // Reduced from 1500ms to 500ms
    });
  }, [
    cartItems, customerName, isCredit, dueDate, selectedCustomer,
    paymentMethod, cashReceived, total, cardNumber, 
    discountType, discountValue, subtotal, tax, saleStatus,
    addNotification
  ]);

  const handleCloseReceipt = useCallback(() => {
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
  }, []);

  // Helper function to calculate discount
  const calculateDiscount = (total: number, discountType: "none" | "percentage" | "fixed", discountValue: number) => {
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

    return { discountedTotal, discountAmount };
  };

  return {
    // Cart state
    cartItems,
    
    // Customer information
    customerName,
    setCustomerName,
    customerPhone,
    setCustomerPhone,
    customerEmail,
    setCustomerEmail,
    selectedCustomer,
    
    // Payment details
    paymentMethod,
    setPaymentMethod,
    cashReceived,
    setCashReceived,
    cardNumber,
    setCardNumber,
    
    // Credit sale details
    isCredit,
    setIsCredit,
    dueDate,
    setDueDate,
    
    // Discount details
    discountType,
    setDiscountType,
    discountValue,
    setDiscountValue,
    
    // Sale status
    saleStatus,
    setSaleStatus,
    
    // UI state
    searchTerm,
    setSearchTerm,
    isProcessing,
    completedSaleData,
    
    // Dialog states
    isAddProductDialogOpen,
    setIsAddProductDialogOpen,
    showCustomerDialog,
    setShowCustomerDialog,
    showAdviceDialog,
    setShowAdviceDialog,
    showReceipt,
    setShowReceipt,
    
    // Calculated values
    subtotal,
    tax,
    total,
    
    // Event handlers
    handleRemoveItem,
    handleQuantityChange,
    handleAddProduct,
    handleSelectCustomer,
    handleCompleteSale,
    handleCloseReceipt,
    
    // Navigation
    navigate
  };
};
