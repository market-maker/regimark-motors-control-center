
// This is a helper file to fix TypeScript errors in the InventoryTable component.
// We can't directly modify the InventoryTable.tsx file as it's marked as read-only,
// but we can provide this helper file with the correct types that should be used.

import { ReceiptStatus } from "@/types/receipt";

// The original error is because the inventory items are using a string type for status
// but the InventoryItem type expects a union type of "In Stock" | "Low Stock" | "Out of Stock"

// When importing data, we need to map the status to one of the valid status values
export const mapImportedStatus = (status: string): ReceiptStatus => {
  if (status === "Out of Stock") return "Out of Stock";
  if (status === "Low Stock") return "Low Stock";
  return "In Stock";
};

// This helper function should be used when importing inventory data
export const transformImportedInventory = (items: any[]) => {
  return items.map(item => ({
    ...item,
    status: mapImportedStatus(item.status)
  }));
};
