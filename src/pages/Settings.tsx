
import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  MonitorCheck, Eye, Gauge, TextCursorInput, Volume2, MonitorSmartphone,
  Users, Lock, Bell, Save
} from "lucide-react";
import { motion } from "framer-motion";

const Settings = () => {
  // Accessibility settings
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [fontFamily, setFontFamily] = useState("system-ui");
  const [textSpacing, setTextSpacing] = useState(1);
  
  // Display settings
  const [zoomLevel, setZoomLevel] = useState(100);
  const [cursorSize, setCursorSize] = useState("medium");
  const [volumeLevel, setVolumeLevel] = useState(80);
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  
  // Security settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [passwordExpiry, setPasswordExpiry] = useState("90");
  
  // Save settings
  const handleSaveSettings = () => {
    // In a real app, this would persist settings to the backend
    
    // Apply accessibility settings to the document
    document.documentElement.style.fontSize = `${fontSize}%`;
    document.documentElement.style.fontFamily = fontFamily;
    document.documentElement.style.letterSpacing = `${textSpacing * 0.05}px`;
    
    if (highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
    
    if (reduceMotion) {
      document.documentElement.classList.add("reduced-motion");
    } else {
      document.documentElement.classList.remove("reduced-motion");
    }
    
    toast.success("Settings saved successfully", {
      description: "Your preferences have been updated"
    });
  };
  
  return (
    <MainLayout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="page-container"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-regimark-primary">Settings</h1>
          <Button className="btn-3d" onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
        
        <Tabs defaultValue="accessibility" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="accessibility" className="flex items-center gap-2">
              <Eye className="h-4 w-4" /> Accessibility
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" /> Security
            </TabsTrigger>
          </TabsList>
          
          {/* Accessibility Settings */}
          <TabsContent value="accessibility" className="space-y-6">
            <Card className="dashboard-card-glow">
              <CardHeader>
                <CardTitle>Accessibility Settings</CardTitle>
                <CardDescription>Configure visual and interaction preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="high-contrast">High Contrast Mode</Label>
                        <p className="text-sm text-muted-foreground">Increase contrast for better readability</p>
                      </div>
                      <Switch 
                        id="high-contrast" 
                        checked={highContrast} 
                        onCheckedChange={setHighContrast}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="reduce-motion">Reduce Motion</Label>
                        <p className="text-sm text-muted-foreground">Minimize animations throughout the application</p>
                      </div>
                      <Switch 
                        id="reduce-motion" 
                        checked={reduceMotion} 
                        onCheckedChange={setReduceMotion}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="font-family">Font Family</Label>
                      <Select value={fontFamily} onValueChange={setFontFamily}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select font family" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="system-ui">System Default</SelectItem>
                          <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                          <SelectItem value="'Times New Roman', serif">Times New Roman</SelectItem>
                          <SelectItem value="'Courier New', monospace">Courier New</SelectItem>
                          <SelectItem value="'Open Dyslexic', sans-serif">Open Dyslexic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="font-size">Font Size: {fontSize}%</Label>
                      </div>
                      <Slider 
                        id="font-size"
                        value={[fontSize]} 
                        min={75} 
                        max={150} 
                        step={5}
                        onValueChange={(value) => setFontSize(value[0])} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="text-spacing">Letter Spacing: {textSpacing}</Label>
                      </div>
                      <Slider 
                        id="text-spacing"
                        value={[textSpacing]} 
                        min={1} 
                        max={5} 
                        step={1}
                        onValueChange={(value) => setTextSpacing(value[0])} 
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button variant="outline" className="w-full" onClick={() => {
                        setFontSize(100);
                        setTextSpacing(1);
                        setFontFamily("system-ui");
                      }}>
                        Reset to Defaults
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="dashboard-card-glow">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure how you receive alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifs">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                  </div>
                  <Switch 
                    id="email-notifs" 
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifs">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts in the browser</p>
                  </div>
                  <Switch 
                    id="push-notifs" 
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="inventory-alerts">Low Stock Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified when inventory is running low</p>
                  </div>
                  <Switch 
                    id="inventory-alerts" 
                    checked={lowStockAlerts}
                    onCheckedChange={setLowStockAlerts}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="dashboard-card-glow">
              <CardHeader>
                <CardTitle>Schedule Settings</CardTitle>
                <CardDescription>Configure notification timing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quiet-start">Quiet Hours Start</Label>
                      <Input 
                        id="quiet-start" 
                        type="time" 
                        defaultValue="22:00" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quiet-end">Quiet Hours End</Label>
                      <Input 
                        id="quiet-end" 
                        type="time" 
                        defaultValue="08:00" 
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekends">Weekend Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications on weekends</p>
                    </div>
                    <Switch id="weekends" defaultChecked={false} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card className="dashboard-card-glow">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure account security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="2fa">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch 
                    id="2fa" 
                    checked={twoFactorAuth}
                    onCheckedChange={setTwoFactorAuth}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                  <Select value={passwordExpiry} onValueChange={setPasswordExpiry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select expiry period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4">
                  <Button variant="destructive" className="w-full">
                    Reset Password
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="dashboard-card-glow">
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Manage your data privacy preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="data-collection">Usage Data Collection</Label>
                      <p className="text-sm text-muted-foreground">Allow collection of anonymized usage data</p>
                    </div>
                    <Switch id="data-collection" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="activity-log">Activity Logging</Label>
                      <p className="text-sm text-muted-foreground">Keep records of your activities for security purposes</p>
                    </div>
                    <Switch id="activity-log" defaultChecked />
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="outline" className="w-full">
                      Download My Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </MainLayout>
  );
};

export default Settings;
