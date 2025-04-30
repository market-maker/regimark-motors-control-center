
import MainLayout from "../layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { AlertCircle, Save, User, Settings as SettingsIcon, Bell, Database, Shield, Smartphone } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { motion } from "framer-motion";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  
  // General settings
  const [businessName, setBusinessName] = useState("Regimark Autoelectrics");
  const [businessEmail, setBusinessEmail] = useState("info@regimark.com");
  const [businessPhone, setBusinessPhone] = useState("(555) 123-4567");
  const [businessAddress, setBusinessAddress] = useState("123 Automotive Ave, Motorville, CA 90210");
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const [paymentReminders, setPaymentReminders] = useState(true);
  
  // Tax settings
  const [taxRate, setTaxRate] = useState("7");
  const [enableTax, setEnableTax] = useState(true);
  
  // User preferences
  const [defaultView, setDefaultView] = useState("dashboard");
  const [itemsPerPage, setItemsPerPage] = useState("10");
  
  // Security settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [passwordExpiryDays, setPasswordExpiryDays] = useState("90");
  
  const handleSaveSettings = (section: string) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success(`${section} settings saved successfully`);
    }, 800);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <MainLayout>
      <motion.div 
        className="page-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-3xl font-bold mb-8 text-regimark-primary"
          variants={itemVariants}
        >
          Settings
        </motion.h1>
        
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="general" className="w-full">
            <div className="overflow-x-auto pb-4">
              <TabsList className="mb-8 inline-flex w-auto">
                <TabsTrigger value="general" className="flex items-center space-x-2 px-4">
                  <SettingsIcon className="h-4 w-4" />
                  <span>General</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center space-x-2 px-4">
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="tax" className="flex items-center space-x-2 px-4">
                  <Database className="h-4 w-4" />
                  <span>Tax Settings</span>
                </TabsTrigger>
                <TabsTrigger value="user" className="flex items-center space-x-2 px-4">
                  <User className="h-4 w-4" />
                  <span>User Preferences</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center space-x-2 px-4">
                  <Shield className="h-4 w-4" />
                  <span>Security</span>
                </TabsTrigger>
                <TabsTrigger value="mobile" className="flex items-center space-x-2 px-4">
                  <Smartphone className="h-4 w-4" />
                  <span>Mobile App</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="general">
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                  <CardDescription>
                    Manage your business details displayed throughout the application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input 
                      id="businessName"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessEmail">Business Email</Label>
                      <Input 
                        id="businessEmail"
                        type="email"
                        value={businessEmail}
                        onChange={(e) => setBusinessEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessPhone">Business Phone</Label>
                      <Input 
                        id="businessPhone"
                        value={businessPhone}
                        onChange={(e) => setBusinessPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessAddress">Business Address</Label>
                    <Input 
                      id="businessAddress"
                      value={businessAddress}
                      onChange={(e) => setBusinessAddress(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="theme">Application Theme</Label>
                    <Select defaultValue={theme} onValueChange={(value) => setTheme(value)}>
                      <SelectTrigger id="theme">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-4">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <span className="text-sm text-muted-foreground">
                      Changes to business information will be reflected throughout the application
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleSaveSettings("General")} 
                    disabled={loading}
                    className="ml-auto"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Manage how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications" className="font-medium">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive important updates via email
                      </p>
                    </div>
                    <Switch 
                      id="emailNotifications" 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smsNotifications" className="font-medium">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive important updates via SMS
                      </p>
                    </div>
                    <Switch 
                      id="smsNotifications" 
                      checked={smsNotifications} 
                      onCheckedChange={setSmsNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="lowStockAlerts" className="font-medium">Low Stock Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when inventory items are running low
                      </p>
                    </div>
                    <Switch 
                      id="lowStockAlerts" 
                      checked={lowStockAlerts} 
                      onCheckedChange={setLowStockAlerts}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="paymentReminders" className="font-medium">Payment Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Send reminders to customers about upcoming payments
                      </p>
                    </div>
                    <Switch 
                      id="paymentReminders" 
                      checked={paymentReminders} 
                      onCheckedChange={setPaymentReminders}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleSaveSettings("Notification")} 
                    disabled={loading}
                    className="ml-auto"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="tax">
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Tax Settings</CardTitle>
                  <CardDescription>
                    Configure tax rates and calculation methods
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableTax" className="font-medium">Enable Tax Calculation</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically calculate taxes on sales
                      </p>
                    </div>
                    <Switch 
                      id="enableTax" 
                      checked={enableTax} 
                      onCheckedChange={setEnableTax}
                    />
                  </div>
                  
                  {enableTax && (
                    <div className="space-y-2">
                      <Label htmlFor="taxRate">Tax Rate (%)</Label>
                      <Input 
                        id="taxRate"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={taxRate}
                        onChange={(e) => setTaxRate(e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground">
                        Current tax rate: {taxRate}%
                      </p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleSaveSettings("Tax")} 
                    disabled={loading}
                    className="ml-auto"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="user">
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>User Preferences</CardTitle>
                  <CardDescription>
                    Customize your experience using the application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultView">Default View</Label>
                    <Select defaultValue={defaultView} onValueChange={setDefaultView}>
                      <SelectTrigger id="defaultView">
                        <SelectValue placeholder="Select default view" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dashboard">Dashboard</SelectItem>
                        <SelectItem value="inventory">Inventory</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="customers">Customers</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      The page you see when you first log in
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="itemsPerPage">Items Per Page</Label>
                    <Select defaultValue={itemsPerPage} onValueChange={setItemsPerPage}>
                      <SelectTrigger id="itemsPerPage">
                        <SelectValue placeholder="Select number of items" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Number of items to show in tables and lists
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleSaveSettings("User preferences")} 
                    disabled={loading}
                    className="ml-auto"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Configure security options for your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="twoFactorAuth" className="font-medium">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch 
                      id="twoFactorAuth" 
                      checked={twoFactorAuth} 
                      onCheckedChange={setTwoFactorAuth}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                    <Input 
                      id="passwordExpiry"
                      type="number"
                      min="0"
                      value={passwordExpiryDays}
                      onChange={(e) => setPasswordExpiryDays(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      Set to 0 to disable password expiry
                    </p>
                  </div>
                  
                  <div className="pt-2">
                    <Button variant="outline">
                      Change Password
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleSaveSettings("Security")} 
                    disabled={loading}
                    className="ml-auto"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="mobile">
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Mobile App Settings</CardTitle>
                  <CardDescription>
                    Configure settings for the mobile application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="mobileSync" className="font-medium">Auto-Sync Data</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically sync data between mobile and web app
                      </p>
                    </div>
                    <Switch 
                      id="mobileSync" 
                      checked={true}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="mobileNotifications" className="font-medium">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications on your mobile device
                      </p>
                    </div>
                    <Switch 
                      id="mobileNotifications" 
                      checked={true}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="offlineMode" className="font-medium">Offline Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow app to function without internet connection
                      </p>
                    </div>
                    <Switch 
                      id="offlineMode" 
                      checked={true}
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button variant="outline">
                      <Smartphone className="mr-2 h-4 w-4" />
                      Download Mobile App
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleSaveSettings("Mobile app")} 
                    disabled={loading}
                    className="ml-auto"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default Settings;
