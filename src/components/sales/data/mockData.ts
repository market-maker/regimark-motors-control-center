
import { Product } from "../types/salesTypes";
import { Customer } from "@/types/customer";

// Sample product data for the add product dialog
export const availableProducts: Product[] = [
  {
    id: "1",
    name: "Brake Pads - Toyota Camry 2019",
    sku: "BP-T19-001",
    price: 89.99,
    category: "Brakes",
    stock: 15,
    description: "High-quality brake pads for Toyota Camry 2019 model",
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Oil Filter - Honda Civic 2020",
    sku: "OF-H20-002",
    price: 12.99,
    category: "Filters",
    stock: 8,
    description: "Premium oil filter for Honda Civic 2020 model",
    image: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Spark Plugs - Ford F-150 2018",
    sku: "SP-F18-003",
    price: 7.99,
    category: "Ignition",
    stock: 24,
    description: "OEM spark plugs for Ford F-150 2018 model",
    image: "/placeholder.svg",
  },
  {
    id: "4",
    name: "Air Filter - Honda Accord 2019",
    sku: "AT-H19-004",
    price: 15.99,
    category: "Filters",
    stock: 3,
    description: "High-performance air filter for Honda Accord 2019",
    image: "/placeholder.svg",
  },
  {
    id: "5",
    name: "Timing Belt - Toyota RAV4 2020",
    sku: "TB-T20-005",
    price: 45.99,
    category: "Engine",
    stock: 5,
    description: "Durable timing belt for Toyota RAV4 2020 model",
    image: "/placeholder.svg",
  },
  {
    id: "6",
    name: "Windshield Wipers - Subaru Outback",
    sku: "WW-S21-006",
    price: 24.99,
    category: "Exterior",
    stock: 12,
    description: "All-weather windshield wipers for Subaru Outback",
    image: "/placeholder.svg",
  },
  {
    id: "7",
    name: "Cabin Air Filter - Nissan Altima",
    sku: "CA-N18-007",
    price: 18.99,
    category: "Filters",
    stock: 9,
    description: "Cabin air filter for Nissan Altima, improves air quality",
    image: "/placeholder.svg",
  },
];

// Mock customers for customer selection
export const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "555-123-4567",
    address: "123 Main St, City",
    totalSpent: 1250.50,
    lastVisit: "2023-04-15",
    status: "Active"
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "555-987-6543",
    address: "456 Oak St, Town",
    totalSpent: 875.25,
    lastVisit: "2023-04-20",
    status: "Active"
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "555-456-7890",
    address: "789 Pine St, Village",
    totalSpent: 2350.00,
    lastVisit: "2023-04-18",
    status: "Active"
  }
];
