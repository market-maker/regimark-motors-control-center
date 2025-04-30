
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import { Printer, Mail, Download } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface ReceiptProps {
  saleData: {
    saleId: string;
    date: string;
    customerName: string;
    customerEmail: string;
    paymentMethod: string;
    items: Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
    }>;
    subtotal: number;
    tax: number;
    total: number;
    cashReceived?: number;
    change?: number;
    isCredit?: boolean;
    dueDate?: string;
  };
  onClose: () => void;
}

const Receipt = ({ saleData, onClose }: ReceiptProps) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle: `Receipt-${saleData.saleId}`,
    onAfterPrint: () => {
      toast.success("Receipt printed successfully");
    },
  });

  const handleDownloadPDF = () => {
    // In a real implementation, this would convert the receipt to a PDF and save it
    toast.success("Receipt downloaded as PDF");
  };

  const handleSendEmail = () => {
    // In a real implementation, this would send the actual email with the receipt
    if (!saleData.customerEmail) {
      toast.error("Customer email address is required to send receipt");
      return;
    }
    
    // Simulate sending email
    toast.success(`Receipt sent to ${saleData.customerEmail}`);
  };
  
  const getPaymentMethodDisplay = () => {
    if (saleData.isCredit) {
      return "Credit (Payment Due)";
    } else {
      return saleData.paymentMethod === "card" ? "Credit Card" : "Cash";
    }
  };

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
            <div className="text-center mb-6">
              <img 
                src="/lovable-uploads/153ce379-8cc5-4fd7-ae3b-0d0434c5e23c.png" 
                alt="Logo" 
                className="h-10 mx-auto mb-2"
              />
              <p className="text-sm text-muted-foreground">123 Automotive Ave</p>
              <p className="text-sm text-muted-foreground">Motorville, CA 90210</p>
              <p className="text-sm text-muted-foreground">Tel: (555) 123-4567</p>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <span className="font-medium">Receipt #:</span>
                <span>{saleData.saleId}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Date:</span>
                <span>{saleData.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Customer:</span>
                <span>{saleData.customerName}</span>
              </div>
              
              {saleData.isCredit && saleData.dueDate && (
                <div className="flex justify-between mt-1">
                  <span className="font-medium">Payment Due:</span>
                  <span>{saleData.dueDate}</span>
                </div>
              )}
              
              {saleData.isCredit && (
                <div className="mt-2">
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                    Credit Sale
                  </Badge>
                </div>
              )}
            </div>
            
            <Separator className="my-4" />
            
            <div className="mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Item</th>
                    <th className="text-right py-2">Qty</th>
                    <th className="text-right py-2">Price</th>
                    <th className="text-right py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {saleData.items.map(item => (
                    <tr key={item.id} className="border-b border-dashed">
                      <td className="py-2 text-left">{item.name}</td>
                      <td className="py-2 text-right">{item.quantity}</td>
                      <td className="py-2 text-right">${item.price.toFixed(2)}</td>
                      <td className="py-2 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${saleData.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (7%):</span>
                <span>${saleData.tax.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${saleData.total.toFixed(2)}</span>
              </div>
              
              {saleData.paymentMethod === "cash" && !saleData.isCredit && saleData.cashReceived && (
                <>
                  <div className="flex justify-between">
                    <span>Cash Received:</span>
                    <span>${saleData.cashReceived.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Change:</span>
                    <span>${(saleData.cashReceived - saleData.total).toFixed(2)}</span>
                  </div>
                </>
              )}
              
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span>{getPaymentMethodDisplay()}</span>
              </div>
              
              {saleData.isCredit && (
                <div className="p-2 mt-2 border border-yellow-300 rounded-md bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800">
                  <p className="text-xs text-center font-medium text-yellow-800 dark:text-yellow-400">
                    This is a credit sale. Payment is due by {saleData.dueDate}.
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-8 text-center text-xs text-muted-foreground">
              <p>Thank you for your business!</p>
              <p>Return policy: Items can be returned within 30 days with receipt.</p>
            </div>
          </div>
          
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" onClick={handleDownloadPDF}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button 
              onClick={handleSendEmail}
              disabled={!saleData.customerEmail}
            >
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Receipt;
