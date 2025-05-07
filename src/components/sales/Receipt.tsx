
import React, { useRef } from 'react';
import { SaleData } from "./types/salesTypes";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

// Import refactored components
import ReceiptHeader from "./receipt/ReceiptHeader";
import ReceiptCustomerInfo from "./receipt/ReceiptCustomerInfo";
import ReceiptItemsTable from "./receipt/ReceiptItemsTable";
import ReceiptSummary from "./receipt/ReceiptSummary";
import ReceiptActions from "./receipt/ReceiptActions";

interface ReceiptProps {
  saleData: SaleData;
  onClose: () => void;
}

const Receipt = ({ saleData, onClose }: ReceiptProps) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <Card className="w-full max-w-md bg-white dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Sale Receipt</CardTitle>
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </CardHeader>
          
          <div ref={receiptRef} className="p-6">
            <ReceiptHeader />
            
            <ReceiptCustomerInfo saleData={saleData} />
            
            <Separator className="my-4" />
            
            <ReceiptItemsTable items={saleData.items} />
            
            <ReceiptSummary saleData={saleData} />
          </div>
          
          <CardFooter>
            <ReceiptActions 
              printRef={receiptRef} 
              customerEmail={saleData.customerEmail}
            />
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Receipt;
