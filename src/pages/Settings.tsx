
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon, 
  User, 
  Building2, 
  Bell, 
  Lock, 
  Database,
  Mail,
  DollarSign,
  Clock,
  Shield,
  Save,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    companyName: 'CleanFlow Professional',
    email: 'admin@cleanflow.com',
    phone: '(555) 123-4567',
    address: '123 Business St, City, State 12345',
    currency: 'USD',
    timezone: 'America/New_York',
    language: 'en',
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      sms: false,
      lowStock: true,
      maintenance: true,
      overduePayments: true
    },
    business: {
      autoInvoicing: true,
      paymentReminders: true,
      maintenanceAlerts: true,
      inventoryTracking: true
    }
  });

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Here you would typically save to your backend
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <SettingsIcon className="h-8 w-8 text-primary" />
              Settings
            </h1>
            <p className="text-gray-600 mt-1">Manage your system preferences and configuration</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white p-1 rounded-lg shadow-sm">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span className="hidden md:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden md:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden md:inline">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span className="hidden md:inline">Business</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden md:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span className="hidden md:inline">System</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>Basic information about your business</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input 
                      id="companyName" 
                      value={settings.companyName}
                      onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({...settings, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={settings.phone}
                      onChange={(e) => setSettings({...settings, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Business Address</Label>
                    <Textarea 
                      id="address" 
                      value={settings.address}
                      onChange={(e) => setSettings({...settings, address: e.target.value})}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Regional Settings</CardTitle>
                  <CardDescription>Configure your locale and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={settings.currency} onValueChange={(value) => setSettings({...settings, currency: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={settings.timezone} onValueChange={(value) => setSettings({...settings, timezone: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={settings.language} onValueChange={(value) => setSettings({...settings, language: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={settings.theme} onValueChange={(value) => setSettings({...settings, theme: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>User Profile</CardTitle>
                <CardDescription>Manage your personal account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Profile Picture</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </Button>
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" value="Administrator" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" placeholder="Management" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure how you want to receive alerts and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Delivery Methods</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailNotifications">Email Notifications</Label>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                      <Switch 
                        id="emailNotifications" 
                        checked={settings.notifications.email}
                        onCheckedChange={(checked) => setSettings({
                          ...settings, 
                          notifications: {...settings.notifications, email: checked}
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pushNotifications">Push Notifications</Label>
                        <p className="text-sm text-gray-600">Browser push notifications</p>
                      </div>
                      <Switch 
                        id="pushNotifications" 
                        checked={settings.notifications.push}
                        onCheckedChange={(checked) => setSettings({
                          ...settings, 
                          notifications: {...settings.notifications, push: checked}
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="smsNotifications">SMS Notifications</Label>
                        <p className="text-sm text-gray-600">Text message alerts</p>
                      </div>
                      <Switch 
                        id="smsNotifications" 
                        checked={settings.notifications.sms}
                        onCheckedChange={(checked) => setSettings({
                          ...settings, 
                          notifications: {...settings.notifications, sms: checked}
                        })}
                      />
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Alert Types</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="lowStockAlerts">Low Stock Alerts</Label>
                        <p className="text-sm text-gray-600">When inventory levels are low</p>
                      </div>
                      <Switch 
                        id="lowStockAlerts" 
                        checked={settings.notifications.lowStock}
                        onCheckedChange={(checked) => setSettings({
                          ...settings, 
                          notifications: {...settings.notifications, lowStock: checked}
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="maintenanceAlerts">Maintenance Alerts</Label>
                        <p className="text-sm text-gray-600">Equipment maintenance due</p>
                      </div>
                      <Switch 
                        id="maintenanceAlerts" 
                        checked={settings.notifications.maintenance}
                        onCheckedChange={(checked) => setSettings({
                          ...settings, 
                          notifications: {...settings.notifications, maintenance: checked}
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="overduePayments">Overdue Payments</Label>
                        <p className="text-sm text-gray-600">When invoices are overdue</p>
                      </div>
                      <Switch 
                        id="overduePayments" 
                        checked={settings.notifications.overduePayments}
                        onCheckedChange={(checked) => setSettings({
                          ...settings, 
                          notifications: {...settings.notifications, overduePayments: checked}
                        })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Business Settings */}
          <TabsContent value="business">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Automation Settings</CardTitle>
                  <CardDescription>Configure automated business processes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoInvoicing">Auto Invoicing</Label>
                      <p className="text-sm text-gray-600">Generate invoices automatically</p>
                    </div>
                    <Switch 
                      id="autoInvoicing" 
                      checked={settings.business.autoInvoicing}
                      onCheckedChange={(checked) => setSettings({
                        ...settings, 
                        business: {...settings.business, autoInvoicing: checked}
                      })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="paymentReminders">Payment Reminders</Label>
                      <p className="text-sm text-gray-600">Send automatic payment reminders</p>
                    </div>
                    <Switch 
                      id="paymentReminders" 
                      checked={settings.business.paymentReminders}
                      onCheckedChange={(checked) => setSettings({
                        ...settings, 
                        business: {...settings.business, paymentReminders: checked}
                      })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenanceAlertsB">Maintenance Scheduling</Label>
                      <p className="text-sm text-gray-600">Auto-schedule equipment maintenance</p>
                    </div>
                    <Switch 
                      id="maintenanceAlertsB" 
                      checked={settings.business.maintenanceAlerts}
                      onCheckedChange={(checked) => setSettings({
                        ...settings, 
                        business: {...settings.business, maintenanceAlerts: checked}
                      })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="inventoryTracking">Inventory Auto-Reorder</Label>
                      <p className="text-sm text-gray-600">Automatically reorder low stock items</p>
                    </div>
                    <Switch 
                      id="inventoryTracking" 
                      checked={settings.business.inventoryTracking}
                      onCheckedChange={(checked) => setSettings({
                        ...settings, 
                        business: {...settings.business, inventoryTracking: checked}
                      })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                  <CardDescription>Set your operating schedule</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                      <div key={day} className="flex items-center justify-between">
                        <span className="font-medium">{day}</span>
                        <div className="flex items-center gap-2">
                          <Input className="w-24" placeholder="09:00" />
                          <span>to</span>
                          <Input className="w-24" placeholder="17:00" />
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Saturday</span>
                      <div className="flex items-center gap-2">
                        <Input className="w-24" placeholder="09:00" />
                        <span>to</span>
                        <Input className="w-24" placeholder="14:00" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Sunday</span>
                      <Badge variant="secondary">Closed</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Password & Authentication</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button className="w-full">Update Password</Button>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-6">
                    <Shield className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Secure your account with an additional verification step
                    </p>
                    <Button>Enable 2FA</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="system">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Backup and restore your data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Database Backup</h4>
                      <p className="text-sm text-gray-600">Last backup: 2 hours ago</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Backup Now
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Export Data</h4>
                      <p className="text-sm text-gray-600">Download your data as CSV/Excel</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Import Data</h4>
                      <p className="text-sm text-gray-600">Import from external sources</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Import
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>System Information</CardTitle>
                  <CardDescription>Current system status and information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Version</span>
                      <span className="font-medium">2.1.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Updated</span>
                      <span className="font-medium">Jan 15, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Database Size</span>
                      <span className="font-medium">2.4 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Users</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Server Status</span>
                      <Badge className="bg-green-100 text-green-800">Online</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
