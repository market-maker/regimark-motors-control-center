
import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/providers/ThemeProvider";
import { Separator } from "@/components/ui/separator";
import { Building, CreditCard, Bell, User, Store } from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("general");

  // General settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoPrintReceipts, setAutoPrintReceipts] = useState(false);
  const [defaultTax, setDefaultTax] = useState("7");
  
  // Store settings
  const [businessName, setBusinessName] = useState("My Auto Parts Shop");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [lowStockThreshold, setLowStockThreshold] = useState("5");
  const [storeType, setStoreType] = useState("main"); // "main" or "secondary"
  
  // Notification settings
  const [salesNotifications, setSalesNotifications] = useState(true);
  const [inventoryNotifications, setInventoryNotifications] = useState(true);
  const [debtorNotifications, setDebtorNotifications] = useState(true);
  
  // User settings
  const [userName, setUserName] = useState("Admin User");
  const [userEmail, setUserEmail] = useState("admin@example.com");
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been successfully saved.",
    });
  };

  return (
    <MainLayout>
      <motion.div 
        className="page-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-8 text-regimark-primary">Settings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <Card className="md:col-span-3 shadow-lg">
            <CardContent className="p-4">
              <Tabs 
                orientation="vertical" 
                defaultValue="general" 
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="flex flex-col h-auto space-y-1 w-full bg-transparent">
                  <TabsTrigger 
                    value="general"
                    className="justify-start w-full text-left px-3 py-2"
                  >
                    <div className="flex items-center space-x-2">
                      <Building size={18} />
                      <span>General</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="stores" 
                    className="justify-start w-full text-left px-3 py-2"
                  >
                    <div className="flex items-center space-x-2">
                      <Store size={18} />
                      <span>Stores & Locations</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                    className="justify-start w-full text-left px-3 py-2"
                  >
                    <div className="flex items-center space-x-2">
                      <Bell size={18} />
                      <span>Notifications</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="users" 
                    className="justify-start w-full text-left px-3 py-2"
                  >
                    <div className="flex items-center space-x-2">
                      <User size={18} />
                      <span>User Profile</span>
                    </div>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-9 shadow-lg">
            <CardHeader>
              <CardTitle>
                {activeTab === "general" && "General Settings"}
                {activeTab === "stores" && "Store & Locations Settings"}
                {activeTab === "notifications" && "Notification Settings"}
                {activeTab === "users" && "User Profile Settings"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <TabsContent value="general" className="mt-0 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="theme" className="text-base">Theme</Label>
                      <p className="text-sm text-muted-foreground">Choose between light and dark mode</p>
                    </div>
                    <Select 
                      value={theme} 
                      onValueChange={(value) => setTheme(value as "light" | "dark")}
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-print" className="text-base">Auto-Print Receipts</Label>
                      <p className="text-sm text-muted-foreground">Automatically print receipts after sales</p>
                    </div>
                    <Switch 
                      id="auto-print" 
                      checked={autoPrintReceipts} 
                      onCheckedChange={setAutoPrintReceipts}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="default-tax" className="text-base">Default Tax Rate (%)</Label>
                    <Input 
                      id="default-tax" 
                      type="number"
                      min="0"
                      max="100"
                      value={defaultTax}
                      onChange={(e) => setDefaultTax(e.target.value)}
                    />
                  </div>
                </div>
                
                <Button onClick={handleSaveSettings} className="w-full">Save Settings</Button>
              </TabsContent>
              
              <TabsContent value="stores" className="mt-0 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-name" className="text-base">Business Name</Label>
                    <Input 
                      id="business-name" 
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="store-type" className="text-base">Store Type</Label>
                    <Select 
                      value={storeType} 
                      onValueChange={setStoreType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select store type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Main Store</SelectItem>
                        <SelectItem value="secondary">Secondary Store</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Main stores can view inventory across all locations. Secondary stores can only view their own inventory.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="currency" className="text-base">Currency Symbol</Label>
                    <Input 
                      id="currency" 
                      value={currencySymbol}
                      onChange={(e) => setCurrencySymbol(e.target.value)}
                      maxLength={1}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="low-stock" className="text-base">Low Stock Threshold</Label>
                    <Input 
                      id="low-stock" 
                      type="number"
                      min="1"
                      value={lowStockThreshold}
                      onChange={(e) => setLowStockThreshold(e.target.value)}
                    />
                  </div>
                </div>
                
                <Button onClick={handleSaveSettings} className="w-full">Save Settings</Button>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notifications-enabled" className="text-base">Enable Notifications</Label>
                      <p className="text-sm text-muted-foreground">Master toggle for all notifications</p>
                    </div>
                    <Switch 
                      id="notifications-enabled" 
                      checked={notificationsEnabled} 
                      onCheckedChange={setNotificationsEnabled}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sales-notifications" className="text-base">Sales Notifications</Label>
                      <p className="text-sm text-muted-foreground">Updates on sale status changes</p>
                    </div>
                    <Switch 
                      id="sales-notifications" 
                      checked={salesNotifications} 
                      onCheckedChange={setSalesNotifications}
                      disabled={!notificationsEnabled}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="inventory-notifications" className="text-base">Inventory Notifications</Label>
                      <p className="text-sm text-muted-foreground">Alerts for low stock and inventory changes</p>
                    </div>
                    <Switch 
                      id="inventory-notifications" 
                      checked={inventoryNotifications} 
                      onCheckedChange={setInventoryNotifications}
                      disabled={!notificationsEnabled}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="debtor-notifications" className="text-base">Debtor Notifications</Label>
                      <p className="text-sm text-muted-foreground">Alerts for overdue payments from debtors</p>
                    </div>
                    <Switch 
                      id="debtor-notifications" 
                      checked={debtorNotifications} 
                      onCheckedChange={setDebtorNotifications}
                      disabled={!notificationsEnabled}
                    />
                  </div>
                </div>
                
                <Button onClick={handleSaveSettings} className="w-full">Save Settings</Button>
              </TabsContent>
              
              <TabsContent value="users" className="mt-0 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-name" className="text-base">Full Name</Label>
                    <Input 
                      id="user-name" 
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="user-email" className="text-base">Email Address</Label>
                    <Input 
                      id="user-email" 
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-base">Change Password</Label>
                    <Input 
                      id="password" 
                      type="password"
                      placeholder="New password"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-base">Confirm Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                
                <Button onClick={handleSaveSettings} className="w-full">Save Settings</Button>
              </TabsContent>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Settings;
