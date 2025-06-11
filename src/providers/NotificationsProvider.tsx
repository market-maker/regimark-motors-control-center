import { createContext, useContext, useEffect, useState } from "react";
import { Notification } from "@/types/notification";
import { toast } from "sonner";
import { useAuth } from "@/providers/AuthProvider";
import { useLocation } from "react-router-dom";

type NotificationsContextType = {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'date'>) => void;
  deleteNotification: (id: string) => void;
};

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

// Start with empty notifications
const initialNotifications: Notification[] = [];

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const savedNotifications = localStorage.getItem("regimark-notifications");
    return savedNotifications ? JSON.parse(savedNotifications) : initialNotifications;
  });
  
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  // Persist notifications to localStorage
  useEffect(() => {
    localStorage.setItem("regimark-notifications", JSON.stringify(notifications));
  }, [notifications]);

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
    // Only add notification if it's relevant to the current user's data
    // For example, if it's an inventory notification, check if the user has inventory items
    // If it's a debtor notification, check if the user has debtors
    
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      read: false,
      date: new Date().toISOString()
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast for new notification only if user is authenticated and not on login page
    if (isAuthenticated && !isLoginPage) {
      toast(notification.title, {
        description: notification.message,
        duration: 5000
      });
    }
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