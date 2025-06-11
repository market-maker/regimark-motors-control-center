import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardIconDemo from "@/components/ui/DashboardIconDemo";

const IconDemo = () => {
  return (
    <MainLayout>
      <div className="page-container">
        <h1 className="text-3xl font-bold mb-8 text-regimark-primary">Icon System</h1>
        
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Icon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-muted-foreground">
                This dashboard icon follows UI/UX best practices with clean geometric shapes, 
                consistent line weights, and proper scaling. It works in both light and dark modes
                and includes appropriate ARIA attributes for accessibility.
              </p>
              
              <DashboardIconDemo />
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default IconDemo;