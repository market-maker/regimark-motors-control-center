
import React from 'react';
import { CartItem } from "../types/salesTypes";

interface ReceiptItemsTableProps {
  items: CartItem[];
}

const ReceiptItemsTable: React.FC<ReceiptItemsTableProps> = ({ items }) => {
  return (
    <div className="mb-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Item</th>
            <th className="text-right py-2">Qty</th>
            <th className="text-right py-2">Price</th>
            <th className="text-right py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className="border-b border-dashed">
              <td className="py-2 text-left">{item.name}</td>
              <td className="py-2 text-right">{item.quantity}</td>
              <td className="py-2 text-right">${item.price.toFixed(2)}</td>
              <td className="py-2 text-right">${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReceiptItemsTable;
