
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ExecutiveDashboard = () => {
  const kpiMetrics = [
    { 
      title: 'Monthly Revenue', 
      value: '$142,580', 
      change: '+12.5%', 
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    { 
      title: 'Active Clients', 
      value: '248', 
      change: '+8 new', 
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    { 
      title: 'Services Completed', 
      value: '1,247', 
      change: '+15.2%', 
      trend: 'up',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    { 
      title: 'Net Profit Margin', 
      value: '24.8%', 
      change: '+2.1%', 
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 125000, target: 120000, expenses: 85000 },
    { month: 'Feb', revenue: 132000, target: 125000, expenses: 88000 },
    { month: 'Mar', revenue: 128000, target: 130000, expenses: 92000 },
    { month: 'Apr', revenue: 145000, target: 135000, expenses: 95000 },
    { month: 'May', revenue: 138000, target: 140000, expenses: 89000 },
    { month: 'Jun', revenue: 142580, target: 145000, expenses: 87000 }
  ];

  const serviceBreakdown = [
    { name: 'Office Cleaning', value: 35, revenue: 49700 },
    { name: 'Residential', value: 25, revenue: 35500 },
    { name: 'Deep Cleaning', value: 20, revenue: 28400 },
    { name: 'Laundry Services', value: 12, revenue: 17040 },
    { name: 'Specialized Services', value: 8, revenue: 11360 }
  ];

  const customerSatisfaction = [
    { month: 'Jan', score: 4.2, responses: 156 },
    { month: 'Feb', score: 4.3, responses: 168 },
    { month: 'Mar', score: 4.1, responses: 142 },
    { month: 'Apr', score: 4.5, responses: 189 },
    { month: 'May', score: 4.4, responses: 172 },
    { month: 'Jun', score: 4.6, responses: 195 }
  ];

  const alerts = [
    { type: 'warning', message: '5 invoices overdue (>30 days)', priority: 'high' },
    { type: 'info', message: '12 maintenance schedules due this week', priority: 'medium' },
    { type: 'success', message: 'Monthly revenue target achieved', priority: 'low' },
    { type: 'warning', message: '3 staff members approaching overtime limit', priority: 'medium' }
  ];

  const COLORS = ['#2563eb', '#059669', '#d97706', '#dc2626', '#7c3aed'];

  return (
    <div className="space-y-6">
      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiMetrics.map((metric, index) => (
          <Card key={index} className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${metric.color}`}>
                  <metric.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Target */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Revenue vs Target</CardTitle>
            <CardDescription>Monthly performance against targets</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} />
                <Line type="monotone" dataKey="target" stroke="#059669" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Service Revenue Distribution */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Service Revenue Distribution</CardTitle>
            <CardDescription>Revenue breakdown by service type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {serviceBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}%`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Satisfaction Trend */}
        <Card className="lg:col-span-2 bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Customer Satisfaction Trend</CardTitle>
            <CardDescription>Monthly satisfaction scores and response rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={customerSatisfaction}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[3.5, 5]} />
                <Tooltip />
                <Area type="monotone" dataKey="score" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Alerts & Notifications</CardTitle>
            <CardDescription>Important business alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <div className={`p-1 rounded-full ${
                    alert.type === 'warning' ? 'bg-orange-100 text-orange-600' :
                    alert.type === 'success' ? 'bg-green-100 text-green-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {alert.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
                     alert.type === 'success' ? <CheckCircle className="w-4 h-4" /> :
                     <Clock className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{alert.message}</p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {alert.priority} priority
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { ExecutiveDashboard };
