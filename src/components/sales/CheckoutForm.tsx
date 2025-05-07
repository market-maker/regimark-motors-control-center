import { useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

// Import components
import CustomerInfoSection from "./CustomerInfoSection";
import CartItemsSection from "./CartItemsSection";
import PaymentSummarySection from "./PaymentSummarySection";
import ProductDialog from "./dialogs/ProductDialog";
import CustomerDialog from "./dialogs/CustomerDialog";
import AdviceDialog from "./dialogs/AdviceDialog";
import ReceiptDialog from "./dialogs/ReceiptDialog";

// Import data, types and hooks
import { mockCustomers, availableProducts } from "./data/mockData";
import { useCheckout } from "./hooks/useCheckout";

const CheckoutForm = () => {
  const isMobile = useIsMobile();
  const {
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
  } = useCheckout();

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
