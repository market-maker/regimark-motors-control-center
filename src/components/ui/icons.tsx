import React from "react";
import { cn } from "@/lib/utils";
import DashboardIcon from "./DashboardIcon";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

// Export the DashboardIcon
export { DashboardIcon };

// Create a generic Icon component that can be used for all icons
export const Icon = ({ 
  children, 
  size = 24, 
  className, 
  ...props 
}: React.PropsWithChildren<IconProps>) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-current", className)}
      {...props}
    >
      {children}
    </svg>
  );
};

// Example of how to create additional icons using the same pattern
export const HomeIcon = ({ size = 24, className, ...props }: IconProps) => (
  <Icon size={size} className={className} {...props}>
    <path
      d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="9 22 9 12 15 12 15 22"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);