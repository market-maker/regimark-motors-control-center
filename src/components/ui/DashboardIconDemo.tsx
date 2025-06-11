import React, { useState } from "react";
import DashboardIcon from "./DashboardIcon";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "./button";
import { Slider } from "./slider";
import { Label } from "./label";

const DashboardIconDemo = () => {
  const { theme } = useTheme();
  const [size, setSize] = useState(24);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Dashboard Icon</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="preview">
          <TabsList className="mb-4">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="sizes">Sizes</TabsTrigger>
            <TabsTrigger value="states">States</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="space-y-4">
            <div className="flex flex-col items-center justify-center p-8 border rounded-md">
              <DashboardIcon 
                size={48} 
                className={theme === "dark" ? "text-white" : "text-regimark-primary"} 
              />
              <p className="mt-4 text-sm text-muted-foreground">Dashboard Icon</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center p-4 border rounded-md bg-white">
                <DashboardIcon size={32} className="text-regimark-primary" />
                <p className="mt-2 text-xs text-muted-foreground">Light Mode</p>
              </div>
              
              <div className="flex flex-col items-center justify-center p-4 border rounded-md bg-gray-900">
                <DashboardIcon size={32} className="text-white" />
                <p className="mt-2 text-xs text-gray-400">Dark Mode</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sizes" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-8 p-4 border rounded-md">
                <div className="flex flex-col items-center">
                  <DashboardIcon size={16} />
                  <p className="mt-2 text-xs text-muted-foreground">16px</p>
                </div>
                <div className="flex flex-col items-center">
                  <DashboardIcon size={24} />
                  <p className="mt-2 text-xs text-muted-foreground">24px</p>
                </div>
                <div className="flex flex-col items-center">
                  <DashboardIcon size={32} />
                  <p className="mt-2 text-xs text-muted-foreground">32px</p>
                </div>
                <div className="flex flex-col items-center">
                  <DashboardIcon size={48} />
                  <p className="mt-2 text-xs text-muted-foreground">48px</p>
                </div>
                <div className="flex flex-col items-center">
                  <DashboardIcon size={64} />
                  <p className="mt-2 text-xs text-muted-foreground">64px</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="size-slider">Custom Size: {size}px</Label>
                <Slider 
                  id="size-slider"
                  min={12} 
                  max={96} 
                  step={1} 
                  value={[size]} 
                  onValueChange={(value) => setSize(value[0])} 
                />
                <div className="flex items-center justify-center p-4 border rounded-md mt-4">
                  <DashboardIcon size={size} />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="states" className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-4 border rounded-md">
                <DashboardIcon 
                  size={32} 
                  className="text-regimark-primary" 
                />
                <p className="mt-2 text-xs text-muted-foreground">Normal</p>
              </div>
              
              <div className="flex flex-col items-center p-4 border rounded-md">
                <DashboardIcon 
                  size={32} 
                  className={`text-regimark-primary ${isHovered ? 'scale-110' : ''}`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                />
                <p className="mt-2 text-xs text-muted-foreground">Hover</p>
              </div>
              
              <div className="flex flex-col items-center p-4 border rounded-md">
                <DashboardIcon 
                  size={32} 
                  className={`${isActive ? 'text-white bg-regimark-primary p-1 rounded-md' : 'text-regimark-primary'}`}
                  onClick={() => setIsActive(!isActive)}
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  {isActive ? 'Active' : 'Click to Activate'}
                </p>
              </div>
            </div>
            
            <div className="flex justify-center mt-4">
              <Button 
                variant="outline" 
                className="flex items-center space-x-2"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsActive(!isActive)}
              >
                <DashboardIcon 
                  size={20} 
                  className={isActive ? 'text-regimark-primary' : ''}
                />
                <span>Dashboard</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DashboardIconDemo;