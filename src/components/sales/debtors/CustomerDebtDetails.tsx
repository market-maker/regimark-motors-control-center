
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Customer, DebtRecord } from "@/types/customer";
import { getStatusColor } from "./debtUtils";
import { motion } from "framer-motion";

interface CustomerDebtDetailsProps {
  customer: Customer;
  onClose: () => void;
  onRecordPayment: (debt: DebtRecord) => void;
}

const CustomerDebtDetails: React.FC<CustomerDebtDetailsProps> = ({ 
  customer, 
  onClose,
  onRecordPayment
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Debt Records for {customer.name}</CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(customer.debtRecords || []).map((debt) => (
                  <TableRow key={debt.id}>
                    <TableCell>{debt.date}</TableCell>
                    <TableCell>${debt.amount.toFixed(2)}</TableCell>
                    <TableCell>{debt.dueDate}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(debt.status, debt.highlighted)}>
                        {debt.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{debt.notes || '-'}</TableCell>
                    <TableCell>
                      {debt.status !== "Paid" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onRecordPayment(debt)}
                        >
                          Record Payment
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {(customer.debtRecords || []).length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No debt records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CustomerDebtDetails;
