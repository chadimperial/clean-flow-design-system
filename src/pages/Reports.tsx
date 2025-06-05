
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  FileText, 
  TrendingUp, 
  Calendar,
  Download,
  Mail,
  Settings,
  Filter,
  Search,
  RefreshCw
} from 'lucide-react';
import { FinancialReports } from '@/components/FinancialReports';
import { OperationalReports } from '@/components/OperationalReports';
import { CustomerReports } from '@/components/CustomerReports';
import { StaffReports } from '@/components/StaffReports';
import { InventoryReports } from '@/components/InventoryReports';
import { ExecutiveDashboard } from '@/components/ExecutiveDashboard';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('executive');
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');

  const reportCategories = [
    { id: 'executive', name: 'Executive Dashboard', icon: BarChart3, count: 12 },
    { id: 'financial', name: 'Financial Reports', icon: FileText, count: 8 },
    { id: 'operational', name: 'Operations', icon: TrendingUp, count: 15 },
    { id: 'customer', name: 'Customer Analytics', icon: Calendar, count: 6 },
    { id: 'staff', name: 'Staff Performance', icon: Calendar, count: 9 },
    { id: 'inventory', name: 'Inventory Reports', icon: Calendar, count: 7 }
  ];

  const quickActions = [
    { name: 'Generate Monthly Report', icon: FileText, action: 'monthly' },
    { name: 'Schedule Report', icon: Calendar, action: 'schedule' },
    { name: 'Export Data', icon: Download, action: 'export' },
    { name: 'Email Reports', icon: Mail, action: 'email' }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">Comprehensive business insights and performance tracking</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {quickActions.map((action, index) => (
            <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <action.icon className="h-8 w-8 mx-auto text-primary mb-2" />
                <h3 className="font-semibold text-gray-900 text-sm">{action.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Reports Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white p-1 rounded-lg shadow-sm">
            {reportCategories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id} 
                className="flex items-center gap-2 relative"
              >
                <category.icon className="w-4 h-4" />
                <span className="hidden md:inline">{category.name}</span>
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="executive">
            <ExecutiveDashboard />
          </TabsContent>

          <TabsContent value="financial">
            <FinancialReports />
          </TabsContent>

          <TabsContent value="operational">
            <OperationalReports />
          </TabsContent>

          <TabsContent value="customer">
            <CustomerReports />
          </TabsContent>

          <TabsContent value="staff">
            <StaffReports />
          </TabsContent>

          <TabsContent value="inventory">
            <InventoryReports />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;
