export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "sale" | "inventory" | "debtor" | "system";
  read: boolean;
  date: string;
  linkTo?: string; // URL to navigate to when clicked
  userId?: string; // To associate notifications with specific users
  source?: string; // Source of the notification (e.g., "inventory-system", "sales-module")
  priority?: "low" | "medium" | "high"; // Priority level for the notification
  expiresAt?: string; // Optional expiration date for time-sensitive notifications
}