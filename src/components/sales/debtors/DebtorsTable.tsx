
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText } from "lucide-react";
import { Customer } from "@/types/customer";
import { DebtorRecord } from "./types";
import { getStatusColor } from "./debtUtils";
import { motion } from "framer-motion";

interface DebtorsTableProps {
  debtors: DebtorRecord[];
  onSelectCustomer: (customer: Customer) => void;
  onShowAddDebtDialog: (customer: Customer) => void;
}

const DebtorsTable: React.FC<DebtorsTableProps> = ({ 
  debtors,
  onSelectCustomer,
  onShowAddDebtDialog
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Outstanding Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {debtors.length > 0 ? (
            debtors.map((debtor) => (
              <TableRow 
                key={debtor.customer.id}
                className={debtor.isHighlighted ? "bg-red-50 dark:bg-red-900/20" : ""}
              >
                <TableCell>{debtor.customer.name}</TableCell>
                <TableCell>{debtor.customer.phone}</TableCell>
                <TableCell>${debtor.outstandingAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(debtor.status, debtor.isHighlighted)}>
                    {debtor.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onShowAddDebtDialog(debtor.customer)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Debt
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onSelectCustomer(debtor.customer)}
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No customers with outstanding debts found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DebtorsTable;
