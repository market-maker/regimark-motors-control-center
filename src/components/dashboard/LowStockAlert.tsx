import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

// Empty state for initial render
const emptyLowStockItems: any[] = [];

const LowStockAlert = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <ShoppingBag className="mr-2 h-5 w-5 text-regimark-secondary" />
          Low Stock Alert
        </CardTitle>
      </CardHeader>
      <CardContent>
        {emptyLowStockItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No low stock items to display.</p>
            <p className="text-sm mt-2">Items will appear here when inventory levels drop below minimum thresholds.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {emptyLowStockItems.map((item) => (
              <div key={item.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Category: {item.category}</p>
                  </div>
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    Low
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">Current: {item.currentStock}</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">Min: {item.minStockLevel}</span>
                  </div>
                  <Button variant="outline" size="sm">Restock</Button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4">
          <Link to="/inventory">
            <Button variant="link" className="w-full">View All Inventory</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default LowStockAlert;