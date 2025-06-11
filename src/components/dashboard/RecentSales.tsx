import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface SaleItem {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
    initials: string;
  };
  amount: number;
  status: "completed" | "pending" | "canceled";
  date: string;
}

// Empty state for initial render
const emptySales: SaleItem[] = [];

const statusColors = {
  completed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  canceled: "bg-red-100 text-red-800",
};

const RecentSales = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent>
        {emptySales.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No recent sales data available.</p>
            <p className="text-sm mt-2">Sales will appear here as they are processed.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {emptySales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-9 w-9">
                    {sale.customer.avatar && <img src={sale.customer.avatar} alt={sale.customer.name} />}
                    <AvatarFallback className="bg-regimark-primary text-white">
                      {sale.customer.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{sale.customer.name}</p>
                    <p className="text-sm text-muted-foreground">{sale.customer.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${sale.amount.toFixed(2)}</p>
                  <div className="flex items-center justify-end space-x-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        statusColors[sale.status]
                      }`}
                    >
                      {sale.status}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {sale.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentSales;