import React from "react";
import { cn } from "@/lib/utils";

interface DashboardIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  title?: string;
  description?: string;
}

const DashboardIcon = ({
  size = 24,
  className,
  title = "Dashboard",
  description = "Dashboard control panel icon",
  ...props
}: DashboardIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-current", className)}
      aria-labelledby="dashboard-icon-title dashboard-icon-desc"
      role="img"
      {...props}
    >
      <title id="dashboard-icon-title">{title}</title>
      <desc id="dashboard-icon-desc">{description}</desc>
      
      {/* Main container with rounded corners */}
      <rect 
        x="3" 
        y="3" 
        width="18" 
        height="18" 
        rx="2" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Top bar representing a header */}
      <line 
        x1="3" 
        y1="8" 
        x2="21" 
        y2="8" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      
      {/* Left card/widget */}
      <rect 
        x="5" 
        y="11" 
        width="6" 
        height="7" 
        rx="1" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Right top mini-chart */}
      <polyline 
        points="13,12 15,11 17,13 19,11" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Right bottom mini-chart (bar chart) */}
      <line 
        x1="14" 
        y1="16" 
        x2="14" 
        y2="17" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <line 
        x1="16" 
        y1="15" 
        x2="16" 
        y2="17" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <line 
        x1="18" 
        y1="14" 
        x2="18" 
        y2="17" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
    </svg>
  );
};

export default DashboardIcon;