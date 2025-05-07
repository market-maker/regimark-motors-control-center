
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { SaleData } from "../types/salesTypes";

interface ReceiptCustomerInfoProps {
  saleData: SaleData;
}

const ReceiptCustomerInfo: React.FC<ReceiptCustomerInfoProps> = ({ saleData }) => {
  return (
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
  );
};

export default ReceiptCustomerInfo;
