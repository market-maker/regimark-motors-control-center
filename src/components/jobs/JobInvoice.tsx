
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { JobCard } from "@/types/job";
import { FileText, Printer, Download } from "lucide-react";
import { useState } from "react";

interface JobInvoiceProps {
  job: JobCard;
}

const JobInvoice = ({ job }: JobInvoiceProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePrint = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.print();
      setIsLoading(false);
    }, 500);
  };

  // Calculate totals
  const partsTotal = job.parts?.reduce((total, part) => total + (part.cost * part.quantity), 0) || 0;
  const laborTotal = job.labor ? job.labor.hours * job.labor.rate : 0;
  const subtotal = partsTotal + laborTotal;
  const taxRate = 0.07; // 7% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  // Format date
  const formatSafeDate = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    try {
      return formatDate(new Date(dateString));
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid Date";
    }
  };

  const invoiceNumber = `INV-${job.id.substring(0, 6).toUpperCase()}`;
  const invoiceDate = formatSafeDate(job.completedAt || job.completedDate || job.createdAt || job.createdDate);

  return (
    <div className="space-y-6 print:p-6" id="invoice-content">
      <div className="print:hidden flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="h-6 w-6" />
          Invoice #{invoiceNumber}
        </h2>
        <div className="space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handlePrint}
            disabled={isLoading}
          >
            <Printer className="h-4 w-4" />
            {isLoading ? "Preparing..." : "Print"}
          </Button>
          <Button 
            size="sm" 
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Save PDF
          </Button>
        </div>
      </div>

      {/* Invoice Header - Company Information */}
      <div className="flex justify-between items-start print:mt-0">
        <div>
          <h1 className="text-2xl font-bold print:text-3xl">AUTO REPAIR SHOP</h1>
          <p className="text-muted-foreground">123 Main Street</p>
          <p className="text-muted-foreground">Anytown, ST 12345</p>
          <p className="text-muted-foreground">Phone: (555) 123-4567</p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-semibold">INVOICE</h2>
          <p><span className="font-medium">Invoice #:</span> {invoiceNumber}</p>
          <p><span className="font-medium">Date:</span> {invoiceDate}</p>
          <p><span className="font-medium">Job #:</span> {job.jobNumber || job.id.substring(0, 8)}</p>
        </div>
      </div>

      {/* Customer & Vehicle Information */}
      <div className="grid grid-cols-2 gap-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-lg">{job.customerName}</p>
            <p>{job.customerEmail || "No email provided"}</p>
            <p>{job.customerPhone || "No phone provided"}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Vehicle Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p><span className="font-medium">Make/Model:</span> {job.vehicleMake} {job.vehicleModel}</p>
            <p><span className="font-medium">Year:</span> {job.vehicleYear}</p>
            <p><span className="font-medium">Registration:</span> {job.vehicleRegistration}</p>
          </CardContent>
        </Card>
      </div>

      {/* Job Description */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Job Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{job.jobDescription}</p>
        </CardContent>
      </Card>

      {/* Parts & Labor Details */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Parts & Labor</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Description</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {job.parts && job.parts.length > 0 ? (
                job.parts.map((part, index) => (
                  <TableRow key={part.id || `part-${index}`}>
                    <TableCell className="font-medium">{part.name}</TableCell>
                    <TableCell className="text-center">{part.quantity}</TableCell>
                    <TableCell className="text-right">${part.cost.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${(part.quantity * part.cost).toFixed(2)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">No parts used</TableCell>
                </TableRow>
              )}
              
              {/* Labor row */}
              {job.labor && (
                <TableRow>
                  <TableCell className="font-medium">Labor</TableCell>
                  <TableCell className="text-center">{job.labor.hours} hours</TableCell>
                  <TableCell className="text-right">${job.labor.rate.toFixed(2)}/hr</TableCell>
                  <TableCell className="text-right">${(job.labor.hours * job.labor.rate).toFixed(2)}</TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Subtotal</TableCell>
                <TableCell className="text-right">${subtotal.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>Tax (7%)</TableCell>
                <TableCell className="text-right">${tax.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} className="font-bold">Total</TableCell>
                <TableCell className="text-right font-bold">${total.toFixed(2)}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>

      {/* Notes & Terms */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Notes & Terms</CardTitle>
        </CardHeader>
        <CardContent>
          <p>All parts are warranted for 90 days. Labor warranty varies by repair type.</p>
          <p className="mt-2">Payment is due upon completion of service. We accept cash, credit cards, and checks.</p>
        </CardContent>
        <CardFooter className="pt-4 border-t flex items-center justify-between">
          <p>Thank you for your business!</p>
          <p className="font-medium">Technician: {job.technicianName}</p>
        </CardFooter>
      </Card>

      {/* Print styles - these will only apply when printing */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #invoice-content, #invoice-content * {
            visibility: visible;
          }
          #invoice-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default JobInvoice;
