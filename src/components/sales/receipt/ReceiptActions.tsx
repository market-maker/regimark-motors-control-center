
import React from 'react';
import { Button } from "@/components/ui/button";
import { Printer, Mail, Download } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { toast } from "@/components/ui/sonner";

interface ReceiptActionsProps {
  printRef: React.RefObject<HTMLDivElement>;
  customerEmail?: string;
}

const ReceiptActions: React.FC<ReceiptActionsProps> = ({ 
  printRef, 
  customerEmail 
}) => {
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Receipt-${Date.now()}`,
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
    if (!customerEmail) {
      toast.error("Customer email address is required to send receipt");
      return;
    }
    
    // Simulate sending email
    toast.success(`Receipt sent to ${customerEmail}`);
  };

  return (
    <div className="flex justify-between">
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
        disabled={!customerEmail}
      >
        <Mail className="mr-2 h-4 w-4" />
        Email
      </Button>
    </div>
  );
};

export default ReceiptActions;
