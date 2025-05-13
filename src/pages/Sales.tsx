import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import CheckoutForm from "../components/sales/CheckoutForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DebtorsList from "../components/sales/DebtorsList";
import { motion } from "framer-motion";
import ReceiptList from "../components/sales/receipts/ReceiptList";
import { Button } from "@/components/ui/button";

const Sales = () => {
  const [activeTab, setActiveTab] = useState("checkout");

  return (
    <MainLayout>
      <motion.div 
        className="page-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-8 text-regimark-primary">Sales & Checkout</h1>
        
        <Tabs defaultValue="checkout" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="checkout" className="text-lg">
              Checkout
            </TabsTrigger>
            <TabsTrigger value="debtors" className="text-lg">
              Credit Sales & Debtors
            </TabsTrigger>
            <TabsTrigger value="receipts" className="text-lg">
              Receipts
            </TabsTrigger>
            <TabsTrigger value="templates" className="text-lg">
              Templates
            </TabsTrigger>
          </TabsList>
          <TabsContent value="checkout">
            <CheckoutForm />
          </TabsContent>
          <TabsContent value="debtors">
            <DebtorsList />
          </TabsContent>
          <TabsContent value="receipts">
            <ReceiptList />
          </TabsContent>
          <TabsContent value="templates">
            <div className="text-center py-12">
              <Button onClick={() => window.location.href = '/templates'}>
                Manage Templates
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Create and manage receipt and invoice templates
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </MainLayout>
  );
};

export default Sales;
