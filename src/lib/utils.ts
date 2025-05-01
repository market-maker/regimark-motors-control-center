
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
}

// New utility functions for consistent UI effects
export function getCardGlowClass(theme: "light" | "dark", variant: "primary" | "secondary" = "primary"): string {
  const baseClasses = "dashboard-card-glow transition-all duration-300 hover:shadow-xl";
  
  if (variant === "primary") {
    return `${baseClasses} ${theme === "dark" ? "dark:red-glow" : "red-glow"}`;
  }
  
  return `${baseClasses} ${theme === "dark" ? "dark:black-glow" : "black-glow"}`;
}

export function getGlowEffect(variant: "primary" | "secondary" | "subtle" = "primary"): string {
  switch (variant) {
    case "primary":
      return "hover:shadow-glow shadow-md transition-all duration-300";
    case "secondary":
      return "hover:shadow-lg shadow-sm transition-all duration-300";
    case "subtle":
      return "hover:shadow-md transition-all duration-300";
    default:
      return "hover:shadow-glow";
  }
}

export function isUserAdmin(role: string): boolean {
  return role === "admin";
}

// Function to save authentication data for offline access
export function saveAuthToLocalStorage(userData: { email: string; role: string; token: string }): void {
  localStorage.setItem('regimark-auth', JSON.stringify({
    email: userData.email,
    role: userData.role,
    token: userData.token,
    timestamp: new Date().getTime()
  }));
}

// Function to get authentication data for offline access
export function getAuthFromLocalStorage(): { email: string; role: string; token: string; timestamp: number } | null {
  const authData = localStorage.getItem('regimark-auth');
  if (!authData) return null;
  
  try {
    return JSON.parse(authData);
  } catch (e) {
    localStorage.removeItem('regimark-auth');
    return null;
  }
}

// Function to check if auth token is expired (14 days)
export function isAuthExpired(): boolean {
  const authData = getAuthFromLocalStorage();
  if (!authData) return true;
  
  const now = new Date().getTime();
  const expiryTime = 14 * 24 * 60 * 60 * 1000; // 14 days in milliseconds
  
  return now - authData.timestamp > expiryTime;
}

// Function to clear authentication data
export function clearAuth(): void {
  localStorage.removeItem('regimark-auth');
}
