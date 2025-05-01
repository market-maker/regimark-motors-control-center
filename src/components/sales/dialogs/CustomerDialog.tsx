
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Customer } from "@/types/customer";

interface CustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectCustomer: (customer: Customer) => void;
  customers: Customer[];
}

const CustomerDialog = ({
  open,
  onOpenChange,
  onSelectCustomer,
  customers,
}: CustomerDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Reset search when dialog opens
  useEffect(() => {
    if (open) {
      setSearchTerm("");
    }
  }, [open]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Customer</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search customers..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Email</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Phone</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-t">
                    <td className="px-4 py-2 text-sm">{customer.name}</td>
                    <td className="px-4 py-2 text-sm">{customer.email}</td>
                    <td className="px-4 py-2 text-sm">{customer.phone}</td>
                    <td className="px-4 py-2 text-right">
                      <Button 
                        size="sm"
                        onClick={() => onSelectCustomer(customer)}
                      >
                        Select
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDialog;
