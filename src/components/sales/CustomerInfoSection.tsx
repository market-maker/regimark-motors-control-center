
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User } from "lucide-react";
import { Customer } from "@/types/customer";
import { motion } from "framer-motion";

interface CustomerInfoSectionProps {
  customerName: string;
  setCustomerName: (name: string) => void;
  customerPhone: string;
  setCustomerPhone: (phone: string) => void;
  customerEmail: string;
  setCustomerEmail: (email: string) => void;
  isCredit: boolean;
  setIsCredit: (isCredit: boolean) => void;
  dueDate: string;
  setDueDate: (dueDate: string) => void;
  selectedCustomer: Customer | null;
  onOpenCustomerDialog: () => void;
}

const CustomerInfoSection = ({
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  customerEmail,
  setCustomerEmail,
  isCredit,
  setIsCredit,
  dueDate,
  setDueDate,
  selectedCustomer,
  onOpenCustomerDialog,
}: CustomerInfoSectionProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <div className="flex space-x-2">
                <Input
                  id="customerName"
                  placeholder="Enter customer name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={onOpenCustomerDialog}
                  title="Select Customer"
                >
                  <User size={16} />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerPhone">Phone Number</Label>
              <Input 
                id="customerPhone" 
                placeholder="Enter phone number" 
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerEmail">Email Address</Label>
            <Input 
              id="customerEmail" 
              placeholder="Enter email address" 
              type="email" 
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </div>
          
          {/* Credit sale toggle */}
          <div className="flex items-center space-x-2">
            <Switch
              checked={isCredit}
              onCheckedChange={setIsCredit}
              id="credit-sale"
            />
            <Label htmlFor="credit-sale" className="cursor-pointer">
              Credit Sale (Add to Customer's Account)
            </Label>
          </div>
          
          {/* Due date field for credit sales */}
          {isCredit && (
            <div className="space-y-2">
              <Label htmlFor="dueDate">Payment Due Date</Label>
              <Input 
                id="dueDate" 
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              {!selectedCustomer && (
                <p className="text-sm text-amber-600 mt-2">
                  Please select a registered customer for credit sales.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CustomerInfoSection;
