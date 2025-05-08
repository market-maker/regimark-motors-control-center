
import { Customer, DebtRecord } from "@/types/customer";

// Mock customers with debts
export const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "555-123-4567",
    address: "123 Main St, City",
    totalSpent: 1250.50,
    lastVisit: "2023-04-15",
    status: "Active",
    debtRecords: [
      {
        id: "d1",
        date: "2023-04-01",
        amount: 250.50,
        dueDate: "2023-05-01",
        status: "Overdue",
        notes: "For car parts"
      },
      {
        id: "d2",
        date: "2023-03-15",
        amount: 120.75,
        dueDate: "2023-04-15",
        status: "Paid",
        paymentHistory: [
          {
            date: "2023-04-10",
            amount: 120.75
          }
        ]
      }
    ]
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "555-987-6543",
    address: "456 Oak St, Town",
    totalSpent: 875.25,
    lastVisit: "2023-04-20",
    status: "Active",
    debtRecords: [
      {
        id: "d3",
        date: "2023-04-10",
        amount: 350.00,
        dueDate: "2023-05-10",
        status: "Pending"
      }
    ]
  }
];
