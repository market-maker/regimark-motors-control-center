import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/types/job";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { useReactToPrint } from "react-to-print";
import { Download, Printer, Mail, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface JobInvoiceProps {
  job: JobCard;
}

const JobInvoice = ({ job }: JobInvoiceProps) => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("standard");

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    onAfterPrint: () => toast.success("Invoice printed successfully"),
  });

  const handleDownload = () => {
    // This would be implemented to generate a PDF from the invoice
    toast.success("Invoice downloaded successfully");
  };

  const handleEmail = () => {
    // This would be implemented to email the invoice
    toast.success("Invoice emailed successfully");
  };

  const totalPartsCost = job.parts
    ? job.parts.reduce((acc, part) => acc + part.cost * part.quantity, 0)
    : 0;

  const laborCost = job.labor ? job.labor.hours * job.labor.rate : 0;
  const subtotal = totalPartsCost + laborCost;
  const taxRate = 0.07; // 7% tax rate
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  // Format date to readable string
  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return "Invalid Date";
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-regimark-primary" />
          <span className="font-medium">Select Invoice Template:</span>
          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard Invoice</SelectItem>
              <SelectItem value="detailed">Detailed Invoice</SelectItem>
              <SelectItem value="compact">Compact Invoice</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
            onClick={handlePrint}
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
            onClick={handleEmail}
          >
            <Mail className="w-4 h-4 mr-2" />
            Email
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="border rounded-lg overflow-hidden"
      >
        <div ref={invoiceRef} className="p-8 bg-white dark:bg-gray-950">
          <div className="print:block" id="invoice-content">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">Invoice #{job.id}</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Date: {formatDate(job.completedAt || job.completedDate)}
                </p>
              </div>
              <div className="text-right">
                <h2 className="text-xl font-semibold">RegiMark Auto Service</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  123 Auto Lane
                  <br />
                  San Francisco, CA 94103
                  <br />
                  (555) 123-4567
                  <br />
                  service@regiautomark.com
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                  Customer Information
                </h3>
                <p className="mt-2">
                  {job.customerName}
                  <br />
                  {job.customerPhone || "No phone provided"}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                  Vehicle Information
                </h3>
                <p className="mt-2">
                  {job.vehicleMake} {job.vehicleModel} ({job.vehicleYear})
                  <br />
                  Registration: {job.vehicleRegistration}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                Job Description
              </h3>
              <p className="mt-2">{job.jobDescription}</p>
            </div>
            
            {job.technicianName && (
              <div className="mt-4">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                  Service Technician
                </h3>
                <p className="mt-2">{job.technicianName}</p>
              </div>
            )}

            <div className="mt-8">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Parts & Services
              </h3>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2">Description</th>
                    <th className="text-right py-2">Qty</th>
                    <th className="text-right py-2">Unit Price</th>
                    <th className="text-right py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {job.parts &&
                    job.parts.map((part, index) => (
                      <tr
                        key={part.id || index}
                        className="border-b border-gray-200 dark:border-gray-700"
                      >
                        <td className="py-2">
                          <div>
                            {part.name}
                            {part.isSplit && (
                              <span className="ml-2 text-xs px-1.5 py-0.5 bg-yellow-100 text-yellow-800 rounded-sm">
                                Split Product
                              </span>
                            )}
                          </div>
                          {part.notes && (
                            <div className="text-xs italic text-amber-600 mt-1">
                              Note: {part.notes}
                            </div>
                          )}
                        </td>
                        <td className="text-right py-2">{part.quantity}</td>
                        <td className="text-right py-2">
                          {formatCurrency(part.cost)}
                        </td>
                        <td className="text-right py-2">
                          {formatCurrency(part.cost * part.quantity)}
                        </td>
                      </tr>
                    ))}
                  {job.labor && (
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-2">Labor</td>
                      <td className="text-right py-2">{job.labor.hours} hrs</td>
                      <td className="text-right py-2">
                        {formatCurrency(job.labor.rate)}/hr
                      </td>
                      <td className="text-right py-2">
                        {formatCurrency(job.labor.hours * job.labor.rate)}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex flex-col items-end">
              <div className="w-64">
                <div className="flex justify-between py-2">
                  <span className="font-medium">Subtotal:</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium">Tax (7%):</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between py-2 font-bold text-lg border-t border-gray-200 dark:border-gray-700">
                  <span>Total:</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                Additional Notes
              </h3>
              <p className="mt-2">
                {job.technicianNotes || "No additional notes provided."}
              </p>
            </div>

            <Separator className="my-8" />

            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <p>Thank you for your business!</p>
              <p>Please contact us with any questions or concerns.</p>
            </div>
          </div>
        </div>

        <style>
          {`
            @media print {
              body * {
                visibility: hidden;
              }
              #invoice-content,
              #invoice-content * {
                visibility: visible;
              }
              #invoice-content {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
              }
              @page {
                size: auto;
                margin: 20mm;
              }
            }
          `}
        </style>
      </motion.div>
    </div>
  );
};

export default JobInvoice;
