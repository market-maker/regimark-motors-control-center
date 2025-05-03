import React from "react";

type ThemeContextType = {
  // Keep empty interface for now to avoid breaking existing imports
};

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}

export const useTheme = () => {
  return {}; // Return empty object to avoid breaking existing code that uses this hook
};
