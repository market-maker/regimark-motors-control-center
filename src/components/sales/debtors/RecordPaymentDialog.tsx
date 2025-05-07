
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DebtRecord } from "@/types/customer";

interface RecordPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDebt: DebtRecord | null;
  paymentAmount: string;
  setPaymentAmount: (value: string) => void;
  onRecordPayment: () => void;
}

const RecordPaymentDialog: React.FC<RecordPaymentDialogProps> = ({
  open,
  onOpenChange,
  selectedDebt,
  paymentAmount,
  setPaymentAmount,
  onRecordPayment
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Record Payment</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Original Debt Amount</Label>
            <Input value={`$${selectedDebt?.amount.toFixed(2)}`} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="paymentAmount">Payment Amount</Label>
            <Input
              id="paymentAmount"
              type="number"
              step="0.01"
              min="0"
              max={selectedDebt?.amount}
              placeholder="0.00"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onRecordPayment}>Record Payment</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecordPaymentDialog;
