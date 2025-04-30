
import { createContext, useContext, useEffect, useState } from "react";
import { Notification } from "@/types/customer";
import { toast } from "@/components/ui/sonner";

type NotificationsContextType = {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'date'>) => void;
  deleteNotification: (id: string) => void;
};

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

// Sample initial notifications
const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Overdue Payment",
    message: "John Smith has an overdue payment of $250.50",
    type: "debtor",
    read: false,
    date: new Date().toISOString(),
    linkTo: "/sales?tab=debtors"
  },
  {
    id: "2",
    title: "Low Stock Alert",
    message: "5 items are running low on stock",
    type: "inventory",
    read: false,
    date: new Date().toISOString(),
    linkTo: "/inventory"
  }
];

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const savedNotifications = localStorage.getItem("regimark-notifications");
    return savedNotifications ? JSON.parse(savedNotifications) : initialNotifications;
  });

  useEffect(() => {
    localStorage.setItem("regimark-notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Show notifications on load for unread debtors
  useEffect(() => {
    const unreadDebtorNotifications = notifications.filter(
      n => n.type === "debtor" && !n.read
    );
    
    if (unreadDebtorNotifications.length > 0) {
      unreadDebtorNotifications.forEach(notification => {
        toast(notification.title, {
          description: notification.message,
          duration: 5000
        });
      });
    }
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'read' | 'date'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      read: false,
      date: new Date().toISOString()
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast for new notification
    toast(notification.title, {
      description: notification.message,
      duration: 5000
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <NotificationsContext.Provider value={{ 
      notifications, 
      unreadCount, 
      markAsRead, 
      markAllAsRead, 
      addNotification, 
      deleteNotification 
    }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
};
