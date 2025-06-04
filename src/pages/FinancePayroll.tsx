
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  FileText, 
  CreditCard, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  PieChart,
  BarChart3,
  Receipt,
  Banknote
} from 'lucide-react';
import { FinanceDashboard } from '@/components/FinanceDashboard';
import { InvoiceManagement } from '@/components/InvoiceManagement';
import { PayrollManagement } from '@/components/PayrollManagement';
import { ExpenseTracker } from '@/components/ExpenseTracker';
import { FinancialReports } from '@/components/FinancialReports';

const FinancePayroll = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const kpiData = [
    {
      title: "Monthly Revenue",
      value: "$142,580",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Outstanding Payments",
      value: "$23,450",
      change: "-8.2%",
      trend: "down",
      icon: CreditCard,
      color: "text-orange-600"
    },
    {
      title: "Monthly Expenses",
      value: "$87,320",
      change: "+3.1%",
      trend: "up",
      icon: Receipt,
      color: "text-red-600"
    },
    {
      title: "Net Profit",
      value: "$55,260",
      change: "+18.7%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-600"
    }
  ];

  const upcomingPayments = [
    { client: "Downtown Office Complex", amount: "$2,580", dueDate: "2024-06-08", status: "due" },
    { client: "City Hospital", amount: "$4,200", dueDate: "2024-06-10", status: "pending" },
    { client: "Tech Solutions Inc", amount: "$1,850", dueDate: "2024-06-12", status: "overdue" },
    { client: "Retail Chain Store", amount: "$3,450", dueDate: "2024-06-15", status: "scheduled" }
  ];

  const recentInvoices = [
    { id: "INV-2024-001", client: "Corporate Plaza", amount: "$3,200", status: "paid", date: "2024-06-01" },
    { id: "INV-2024-002", client: "Medical Center", amount: "$2,850", status: "pending", date: "2024-06-02" },
    { id: "INV-2024-003", client: "Shopping Mall", amount: "$5,100", status: "overdue", date: "2024-05-28" },
    { id: "INV-2024-004", client: "Office Tower", amount: "$2,750", status: "paid", date: "2024-06-03" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'due': return 'bg-orange-100 text-orange-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Finance & Payroll</h1>
            <p className="text-gray-600 mt-1">Comprehensive financial management and payroll processing</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-primary hover:bg-primary/90">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline">
              <DollarSign className="h-4 w-4 mr-2" />
              Process Payroll
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="invoices" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Invoices
            </TabsTrigger>
            <TabsTrigger value="payroll" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Payroll
            </TabsTrigger>
            <TabsTrigger value="expenses" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              Expenses
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {kpiData.map((kpi, index) => (
                <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                        <div className="flex items-center mt-2">
                          {kpi.trend === 'up' ? (
                            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                          )}
                          <span className={`text-sm font-medium ${kpi.color}`}>
                            {kpi.change}
                          </span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-full bg-gray-100`}>
                        <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Payments */}
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Upcoming Payments
                  </CardTitle>
                  <CardDescription>Payments due in the next 14 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingPayments.map((payment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <div>
                          <p className="font-medium text-gray-900">{payment.client}</p>
                          <p className="text-sm text-gray-600">Due: {payment.dueDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{payment.amount}</p>
                          <Badge className={getStatusColor(payment.status)}>
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Invoices */}
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Recent Invoices
                  </CardTitle>
                  <CardDescription>Latest invoice activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentInvoices.map((invoice, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <div>
                          <p className="font-medium text-gray-900">{invoice.id}</p>
                          <p className="text-sm text-gray-600">{invoice.client}</p>
                          <p className="text-xs text-gray-500">{invoice.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{invoice.amount}</p>
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cash Flow Chart */}
            <Card className="bg-white shadow-sm mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Cash Flow Overview
                </CardTitle>
                <CardDescription>Monthly cash flow trends and projections</CardDescription>
              </CardHeader>
              <CardContent>
                <FinanceDashboard />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="mt-6">
            <InvoiceManagement />
          </TabsContent>

          <TabsContent value="payroll" className="mt-6">
            <PayrollManagement />
          </TabsContent>

          <TabsContent value="expenses" className="mt-6">
            <ExpenseTracker />
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <FinancialReports />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FinancePayroll;
