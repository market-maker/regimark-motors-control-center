
import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useTheme } from "@/providers/ThemeProvider";
import { Separator } from "@/components/ui/separator";
import { Settings2, CreditCard, Bell, UserRoundCog, Store, Cog, Calendar, Globe, Wrench } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

const SettingsPage = () => {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("general");
  const isAdmin = user?.role === "admin";

  // General settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoPrintReceipts, setAutoPrintReceipts] = useState(false);
  const [defaultTax, setDefaultTax] = useState("7");
  const [language, setLanguage] = useState("en");
  const [timeFormat, setTimeFormat] = useState("12h");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  
  // Store settings
  const [businessName, setBusinessName] = useState("My Auto Parts Shop");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [lowStockThreshold, setLowStockThreshold] = useState("5");
  const [storeType, setStoreType] = useState("main"); 
  const [storeAddress, setStoreAddress] = useState("");
  const [storePhone, setStorePhone] = useState("");
  const [storeEmail, setStoreEmail] = useState("");
  const [storeHours, setStoreHours] = useState("");
  
  // Notification settings
  const [salesNotifications, setSalesNotifications] = useState(true);
  const [inventoryNotifications, setInventoryNotifications] = useState(true);
  const [debtorNotifications, setDebtorNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  
  // User settings
  const [userName, setUserName] = useState(user?.email.split('@')[0] || "User");
  const [userEmail, setUserEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Accessibility settings
  const [fontSize, setFontSize] = useState("medium");
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [screenReaderOptimized, setScreenReaderOptimized] = useState(false);
  
  // System settings (admin only)
  const [backupFrequency, setBackupFrequency] = useState("daily");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  
  useEffect(() => {
    // Apply accessibility settings
    document.documentElement.classList.toggle('text-lg', fontSize === 'large');
    document.documentElement.classList.toggle('text-xl', fontSize === 'x-large');
    document.documentElement.classList.toggle('high-contrast', highContrast);
    document.documentElement.classList.toggle('reduced-motion', reducedMotion);
    
    return () => {
      document.documentElement.classList.remove('text-lg', 'text-xl', 'high-contrast', 'reduced-motion');
    };
  }, [fontSize, highContrast, reducedMotion]);
  
  const handleSaveSettings = () => {
    // In a real app, we would save to backend/localStorage
    toast.success("Settings saved", {
      description: "Your settings have been successfully updated.",
    });
  };
  
  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match", {
        description: "Please make sure your new passwords match.",
      });
      return;
    }
    
    if (!currentPassword) {
      toast.error("Current password required", {
        description: "Please enter your current password.",
      });
      return;
    }
    
    // In a real app, we'd verify the current password and update to new password
    toast.success("Password updated", {
      description: "Your password has been successfully changed.",
    });
    
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  
  const handleToggleMaintenance = () => {
    setMaintenanceMode(prev => !prev);
    toast.info(
      maintenanceMode 
        ? "Maintenance mode disabled" 
        : "Maintenance mode enabled",
      {
        description: maintenanceMode 
          ? "The system is now accessible to all users." 
          : "Only administrators can access the system now.",
      }
    );
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
                      <Settings2 size={18} />
                      <span>General</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="stores" 
                    className="justify-start w-full text-left px-3 py-2"
                  >
                    <div className="flex items-center space-x-2">
                      <Store size={18} />
                      <span>Business Details</span>
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
                      <UserRoundCog size={18} />
                      <span>User Profile</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="accessibility" 
                    className="justify-start w-full text-left px-3 py-2"
                  >
                    <div className="flex items-center space-x-2">
                      <Cog size={18} />
                      <span>Accessibility</span>
                    </div>
                  </TabsTrigger>
                  {isAdmin && (
                    <TabsTrigger 
                      value="system" 
                      className="justify-start w-full text-left px-3 py-2"
                    >
                      <div className="flex items-center space-x-2">
                        <Wrench size={18} />
                        <span>System</span>
                      </div>
                    </TabsTrigger>
                  )}
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-9 shadow-lg">
            <CardHeader>
              <CardTitle>
                {activeTab === "general" && "General Settings"}
                {activeTab === "stores" && "Business Details"}
                {activeTab === "notifications" && "Notification Settings"}
                {activeTab === "users" && "User Profile Settings"}
                {activeTab === "accessibility" && "Accessibility Settings"}
                {activeTab === "system" && "System Settings"}
              </CardTitle>
              <CardDescription>
                {activeTab === "general" && "Configure basic application settings"}
                {activeTab === "stores" && "Manage your business information"}
                {activeTab === "notifications" && "Control your notification preferences"}
                {activeTab === "users" && "Update your account information"}
                {activeTab === "accessibility" && "Customize the application for better accessibility"}
                {activeTab === "system" && "Advanced system configuration (Admin only)"}
              </CardDescription>
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
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-base">Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="time-format" className="text-base">Time Format</Label>
                      <Select value={timeFormat} onValueChange={setTimeFormat}>
                        <SelectTrigger id="time-format">
                          <SelectValue placeholder="Select time format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                          <SelectItem value="24h">24-hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date-format" className="text-base">Date Format</Label>
                      <Select value={dateFormat} onValueChange={setDateFormat}>
                        <SelectTrigger id="date-format">
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="store-type" className="text-base">Store Type</Label>
                      <Select 
                        value={storeType} 
                        onValueChange={setStoreType}
                      >
                        <SelectTrigger id="store-type">
                          <SelectValue placeholder="Select store type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="main">Main Store</SelectItem>
                          <SelectItem value="secondary">Secondary Store</SelectItem>
                          <SelectItem value="warehouse">Warehouse</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency" className="text-base">Currency Symbol</Label>
                      <Input 
                        id="currency" 
                        value={currencySymbol}
                        onChange={(e) => setCurrencySymbol(e.target.value)}
                        maxLength={1}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="store-address" className="text-base">Address</Label>
                    <Textarea 
                      id="store-address" 
                      value={storeAddress}
                      onChange={(e) => setStoreAddress(e.target.value)}
                      placeholder="Enter your business address"
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="store-phone" className="text-base">Phone Number</Label>
                      <Input 
                        id="store-phone" 
                        value={storePhone}
                        onChange={(e) => setStorePhone(e.target.value)}
                        placeholder="Enter contact phone"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="store-email" className="text-base">Business Email</Label>
                      <Input 
                        id="store-email" 
                        type="email"
                        value={storeEmail}
                        onChange={(e) => setStoreEmail(e.target.value)}
                        placeholder="Enter business email"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="store-hours" className="text-base">Business Hours</Label>
                    <Textarea 
                      id="store-hours" 
                      value={storeHours}
                      onChange={(e) => setStoreHours(e.target.value)}
                      placeholder="e.g. Mon-Fri: 9am-5pm, Sat: 10am-2pm, Sun: Closed"
                      rows={2}
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
                      <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive important alerts via email</p>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications}
                      disabled={!notificationsEnabled}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications" className="text-base">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive alerts in your browser</p>
                    </div>
                    <Switch 
                      id="push-notifications" 
                      checked={pushNotifications} 
                      onCheckedChange={setPushNotifications}
                      disabled={!notificationsEnabled}
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
                      <p className="text-sm text-muted-foreground">Alerts for inventory changes</p>
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
                      <Label htmlFor="low-stock-alerts" className="text-base">Low Stock Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified when products are running low</p>
                    </div>
                    <Switch 
                      id="low-stock-alerts" 
                      checked={lowStockAlerts} 
                      onCheckedChange={setLowStockAlerts}
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
                      readOnly={!isAdmin}
                    />
                    {!isAdmin && (
                      <p className="text-xs text-muted-foreground mt-1">Email can only be changed by an administrator</p>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Change Password</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password" className="text-base">Current Password</Label>
                        <Input 
                          id="current-password" 
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="Enter current password"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password" className="text-base">New Password</Label>
                        <Input 
                          id="new-password" 
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="text-base">Confirm New Password</Label>
                        <Input 
                          id="confirm-password" 
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                        />
                      </div>
                      
                      <Button 
                        onClick={handlePasswordChange} 
                        className="w-full"
                        disabled={!currentPassword || !newPassword || !confirmPassword}
                      >
                        Update Password
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <Button onClick={handleSaveSettings} className="w-full">Save Profile</Button>
              </TabsContent>
              
              <TabsContent value="accessibility" className="mt-0 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="font-size" className="text-base">Font Size</Label>
                    <Select value={fontSize} onValueChange={setFontSize}>
                      <SelectTrigger id="font-size">
                        <SelectValue placeholder="Select font size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="x-large">Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="high-contrast" className="text-base">High Contrast Mode</Label>
                      <p className="text-sm text-muted-foreground">Increase color contrast for better readability</p>
                    </div>
                    <Switch 
                      id="high-contrast" 
                      checked={highContrast} 
                      onCheckedChange={setHighContrast}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="reduced-motion" className="text-base">Reduced Motion</Label>
                      <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                    </div>
                    <Switch 
                      id="reduced-motion" 
                      checked={reducedMotion} 
                      onCheckedChange={setReducedMotion}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="screen-reader" className="text-base">Screen Reader Optimization</Label>
                      <p className="text-sm text-muted-foreground">Enhance compatibility with screen readers</p>
                    </div>
                    <Switch 
                      id="screen-reader" 
                      checked={screenReaderOptimized} 
                      onCheckedChange={setScreenReaderOptimized}
                    />
                  </div>
                </div>
                
                <Button onClick={handleSaveSettings} className="w-full">Save Accessibility Settings</Button>
              </TabsContent>
              
              {isAdmin && (
                <TabsContent value="system" className="mt-0 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="backup-frequency" className="text-base">Database Backup Frequency</Label>
                      <Select value={backupFrequency} onValueChange={setBackupFrequency}>
                        <SelectTrigger id="backup-frequency">
                          <SelectValue placeholder="Select backup frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="maintenance-mode" className="text-base">Maintenance Mode</Label>
                        <p className="text-sm text-muted-foreground">Restrict access to administrators only</p>
                      </div>
                      <Switch 
                        id="maintenance-mode" 
                        checked={maintenanceMode} 
                        onCheckedChange={handleToggleMaintenance}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="debug-mode" className="text-base">Debug Mode</Label>
                        <p className="text-sm text-muted-foreground">Show detailed error messages and logs</p>
                      </div>
                      <Switch 
                        id="debug-mode" 
                        checked={debugMode} 
                        onCheckedChange={setDebugMode}
                      />
                    </div>
                    
                    <Separator />
                    
                    <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base text-amber-700 dark:text-amber-400">Danger Zone</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Clear All Data</p>
                            <p className="text-sm text-muted-foreground">This will permanently delete all data</p>
                          </div>
                          <Button variant="destructive" size="sm">
                            Clear Data
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Reset to Factory Settings</p>
                            <p className="text-sm text-muted-foreground">Return application to default state</p>
                          </div>
                          <Button variant="destructive" size="sm">
                            Reset
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Button onClick={handleSaveSettings} className="w-full">Save System Settings</Button>
                </TabsContent>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default SettingsPage;
