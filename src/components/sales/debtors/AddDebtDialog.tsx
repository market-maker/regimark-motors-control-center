
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Customer } from "@/types/customer";

interface AddDebtDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer | null;
  debtAmount: string;
  setDebtAmount: (value: string) => void;
  debtDueDate: string;
  setDebtDueDate: (value: string) => void;
  debtNotes: string;
  setDebtNotes: (value: string) => void;
  onAddDebt: () => void;
}

const AddDebtDialog: React.FC<AddDebtDialogProps> = ({
  open,
  onOpenChange,
  customer,
  debtAmount,
  setDebtAmount,
  debtDueDate,
  setDebtDueDate,
  debtNotes,
  setDebtNotes,
  onAddDebt
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Debt for {customer?.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={debtAmount}
              onChange={(e) => setDebtAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={debtDueDate}
              onChange={(e) => setDebtDueDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Input
              id="notes"
              placeholder="Add any relevant notes"
              value={debtNotes}
              onChange={(e) => setDebtNotes(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onAddDebt}>Add Debt</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddDebtDialog;
