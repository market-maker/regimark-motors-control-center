
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

const mockSales: SaleItem[] = [
  {
    id: "1",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      initials: "JD",
    },
    amount: 259.99,
    status: "completed",
    date: "10 minutes ago",
  },
  {
    id: "2",
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
      initials: "JS",
    },
    amount: 124.50,
    status: "pending",
    date: "2 hours ago",
  },
  {
    id: "3",
    customer: {
      name: "Mike Johnson",
      email: "mike@example.com",
      initials: "MJ",
    },
    amount: 489.75,
    status: "completed",
    date: "Yesterday",
  },
  {
    id: "4",
    customer: {
      name: "Sarah Williams",
      email: "sarah@example.com",
      initials: "SW",
    },
    amount: 75.25,
    status: "completed",
    date: "2 days ago",
  },
];

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
        <div className="space-y-4">
          {mockSales.map((sale) => (
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
      </CardContent>
    </Card>
  );
};

export default RecentSales;
