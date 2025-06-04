
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  PieChart,
  BarChart3,
  FileSpreadsheet,
  Mail,
  Clock
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const FinancialReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2024-Q2');

  const profitLossData = [
    { month: 'Jan', revenue: 125000, expenses: 85000, profit: 40000 },
    { month: 'Feb', revenue: 132000, expenses: 88000, profit: 44000 },
    { month: 'Mar', revenue: 128000, expenses: 92000, profit: 36000 },
    { month: 'Apr', revenue: 145000, expenses: 95000, profit: 50000 },
    { month: 'May', revenue: 138000, expenses: 89000, profit: 49000 },
    { month: 'Jun', revenue: 142000, expenses: 87000, profit: 55000 }
  ];

  const customerProfitabilityData = [
    { name: 'Corporate Accounts', value: 45, amount: 63900 },
    { name: 'Medical Facilities', value: 25, amount: 35500 },
    { name: 'Retail Stores', value: 20, amount: 28400 },
    { name: 'Residential', value: 10, amount: 14200 }
  ];

  const reportTemplates = [
    {
      name: 'Profit & Loss Statement',
      description: 'Monthly income and expense summary',
      frequency: 'Monthly',
      lastGenerated: '2024-06-01',
      type: 'financial'
    },
    {
      name: 'Balance Sheet',
      description: 'Assets, liabilities, and equity overview',
      frequency: 'Quarterly',
      lastGenerated: '2024-04-01',
      type: 'financial'
    },
    {
      name: 'Cash Flow Statement',
      description: 'Cash receipts and payments analysis',
      frequency: 'Monthly',
      lastGenerated: '2024-06-01',
      type: 'financial'
    },
    {
      name: 'Customer Profitability',
      description: 'Revenue and margin analysis by client',
      frequency: 'Quarterly',
      lastGenerated: '2024-04-01',
      type: 'customer'
    },
    {
      name: 'Service Performance',
      description: 'Revenue and costs by service type',
      frequency: 'Monthly',
      lastGenerated: '2024-06-01',
      type: 'operational'
    },
    {
      name: 'Payroll Summary',
      description: 'Labor costs and employee analytics',
      frequency: 'Monthly',
      lastGenerated: '2024-06-01',
      type: 'payroll'
    }
  ];

  const scheduledReports = [
    {
      name: 'Monthly Financial Package',
      recipients: ['cfo@cleanflow.com', 'accounting@cleanflow.com'],
      frequency: 'Monthly',
      nextRun: '2024-07-01',
      status: 'active'
    },
    {
      name: 'Weekly Operations Report',
      recipients: ['operations@cleanflow.com'],
      frequency: 'Weekly',
      nextRun: '2024-06-10',
      status: 'active'
    },
    {
      name: 'Quarterly Board Report',
      recipients: ['board@cleanflow.com'],
      frequency: 'Quarterly',
      nextRun: '2024-07-01',
      status: 'active'
    }
  ];

  const COLORS = ['#2563eb', '#059669', '#d97706', '#dc2626', '#7c3aed'];

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case 'financial': return 'bg-blue-100 text-blue-800';
      case 'customer': return 'bg-green-100 text-green-800';
      case 'operational': return 'bg-orange-100 text-orange-800';
      case 'payroll': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial Reports</TabsTrigger>
          <TabsTrigger value="operational">Operational Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {/* Key Financial Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Profit & Loss Trends
                </CardTitle>
                <CardDescription>6-month revenue, expenses, and profit overview</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={profitLossData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                    <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} />
                    <Line type="monotone" dataKey="expenses" stroke="#dc2626" strokeWidth={2} />
                    <Line type="monotone" dataKey="profit" stroke="#059669" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  Customer Profitability
                </CardTitle>
                <CardDescription>Revenue distribution by customer segment</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={customerProfitabilityData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {customerProfitabilityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Quick Report Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <FileText className="h-8 w-8 mx-auto text-primary mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Generate P&L</h3>
                <p className="text-sm text-gray-600">Create profit & loss statement</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-8 w-8 mx-auto text-primary mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Cash Flow Report</h3>
                <p className="text-sm text-gray-600">Analyze cash movements</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 mx-auto text-primary mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Tax Summary</h3>
                <p className="text-sm text-gray-600">Prepare tax documentation</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <FileSpreadsheet className="h-8 w-8 mx-auto text-primary mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Custom Report</h3>
                <p className="text-sm text-gray-600">Build custom analytics</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="mt-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Financial Report Templates
              </CardTitle>
              <CardDescription>Pre-built financial reports and statements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportTemplates.filter(report => report.type === 'financial').map((report, index) => (
                  <div key={index} className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{report.name}</h3>
                          <Badge className={getReportTypeColor(report.type)}>
                            {report.type}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{report.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {report.frequency}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Last: {report.lastGenerated}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Generate
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operational" className="mt-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Operational Reports
              </CardTitle>
              <CardDescription>Service performance and customer analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportTemplates.filter(report => ['customer', 'operational', 'payroll'].includes(report.type)).map((report, index) => (
                  <div key={index} className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{report.name}</h3>
                          <Badge className={getReportTypeColor(report.type)}>
                            {report.type}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{report.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {report.frequency}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Last: {report.lastGenerated}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Generate
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="mt-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Scheduled Reports
              </CardTitle>
              <CardDescription>Automated report generation and delivery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledReports.map((report, index) => (
                  <div key={index} className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{report.name}</h3>
                          <Badge className="bg-green-100 text-green-800">
                            {report.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {report.frequency}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Next: {report.nextRun}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Mail className="h-4 w-4" />
                          {report.recipients.join(', ')}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Run Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { FinancialReports };
