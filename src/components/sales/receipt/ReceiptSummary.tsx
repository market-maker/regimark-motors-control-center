
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { SaleData } from "../types/salesTypes";

interface ReceiptSummaryProps {
  saleData: SaleData;
}

const ReceiptSummary: React.FC<ReceiptSummaryProps> = ({ saleData }) => {
  const getPaymentMethodDisplay = () => {
    if (saleData.isCredit) {
      return "Credit (Payment Due)";
    } else {
      return saleData.paymentMethod === "card" ? "Credit Card" : "Cash";
    }
  };

  return (
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

      <div className="mt-8 text-center text-xs text-muted-foreground">
        <p>Thank you for your business!</p>
        <p>Return policy: Items can be returned within 30 days with receipt.</p>
      </div>
    </div>
  );
};

export default ReceiptSummary;
