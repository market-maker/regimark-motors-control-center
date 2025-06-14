
import React from "react";
import { DashboardIcon } from "./icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardIconDemo = () => {
  const sizes = [16, 24, 32, 48];
  const colors = [
    { name: "Default", class: "text-current" },
    { name: "Primary", class: "text-regimark-primary" },
    { name: "Accent", class: "text-regimark-accent" },
    { name: "Muted", class: "text-muted-foreground" },
  ];

  return (
    <div className="space-y-6">
      {/* Size Variations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Size Variations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            {sizes.map(size => (
              <div key={size} className="flex flex-col items-center space-y-2">
                <DashboardIcon size={size} />
                <span className="text-xs text-muted-foreground">{size}px</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Color Variations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Color Variations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colors.map(color => (
              <div key={color.name} className="flex flex-col items-center space-y-2 p-4 border rounded-lg">
                <DashboardIcon size={32} className={color.class} />
                <span className="text-xs text-muted-foreground">{color.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Usage Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <DashboardIcon size={20} className="text-regimark-primary" />
              <span className="font-medium">Navigation Item</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-regimark-primary text-white rounded-lg">
              <DashboardIcon size={20} className="text-white" />
              <span className="font-medium">Active State</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 border-l-4 border-regimark-accent bg-regimark-accent/5 rounded-r-lg">
              <DashboardIcon size={24} className="text-regimark-accent" />
              <div>
                <div className="font-medium">Dashboard Section</div>
                <div className="text-sm text-muted-foreground">Overview and analytics</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Accessibility Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">ARIA Support</h4>
              <p className="text-sm text-muted-foreground mb-3">
                The icon includes proper ARIA attributes for screen readers.
              </p>
              <DashboardIcon 
                size={24} 
                title="Main Dashboard" 
                description="Navigate to the main dashboard overview page"
                className="text-regimark-primary"
              />
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">High Contrast Support</h4>
              <p className="text-sm text-muted-foreground mb-3">
                The icon adapts to dark and light themes automatically.
              </p>
              <div className="flex space-x-4">
                <div className="p-2 bg-white border rounded">
                  <DashboardIcon size={24} className="text-black" />
                </div>
                <div className="p-2 bg-black border rounded">
                  <DashboardIcon size={24} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardIconDemo;
