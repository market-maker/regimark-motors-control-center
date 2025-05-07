
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DebtSummary } from "./types";

interface DebtSummaryCardProps {
  summary: DebtSummary;
}

const DebtSummaryCard: React.FC<DebtSummaryCardProps> = ({ summary }) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Debts Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total Outstanding:</span>
            <span className="text-lg font-bold text-regimark-primary">
              ${summary.totalOutstanding.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Overdue Amount:</span>
            <span className="text-lg font-bold text-red-600">
              ${summary.overdueAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total Customers with Debt:</span>
            <span className="text-lg font-bold">
              {summary.totalCustomersWithDebt}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DebtSummaryCard;
