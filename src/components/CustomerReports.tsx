
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users,
  TrendingUp,
  DollarSign,
  Star,
  Calendar,
  Target
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomerReports = () => {
  const customerAcquisitionData = [
    { month: 'Jan', new: 12, churned: 3, net: 9 },
    { month: 'Feb', new: 15, churned: 2, net: 13 },
    { month: 'Mar', new: 8, churned: 5, net: 3 },
    { month: 'Apr', new: 18, churned: 1, net: 17 },
    { month: 'May', new: 14, churned: 4, net: 10 },
    { month: 'Jun', new: 20, churned: 2, net: 18 }
  ];

  const customerSegmentation = [
    { segment: 'VIP Clients', count: 45, revenue: 89500, percentage: 35 },
    { segment: 'Regular Commercial', count: 120, revenue: 156000, percentage: 48 },
    { segment: 'Residential', count: 83, revenue: 42300, percentage: 17 }
  ];

  const retentionData = [
    { period: '0-3 months', retention: 95 },
    { period: '3-6 months', retention: 88 },
    { period: '6-12 months', retention: 82 },
    { period: '1-2 years', retention: 76 },
    { period: '2+ years', retention: 91 }
  ];

  const COLORS = ['#2563eb', '#059669', '#d97706', '#dc2626', '#7c3aed'];

  return (
    <div className="space-y-6">
      {/* Customer Acquisition */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Customer Acquisition Trends
            </CardTitle>
            <CardDescription>New customers vs churn rate</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={customerAcquisitionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="new" fill="#22c55e" name="New Customers" />
                <Bar dataKey="churned" fill="#ef4444" name="Churned" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Customer Segmentation
            </CardTitle>
            <CardDescription>Revenue distribution by customer type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={customerSegmentation}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="percentage"
                  label={({ segment, percentage }) => `${segment}: ${percentage}%`}
                >
                  {customerSegmentation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}%`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Customer Retention */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Customer Retention Analysis
          </CardTitle>
          <CardDescription>Retention rates by customer tenure</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={retentionData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="period" type="category" width={100} />
              <Tooltip formatter={(value) => [`${value}%`, 'Retention Rate']} />
              <Bar dataKey="retention" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Customer Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {customerSegmentation.map((segment, index) => (
          <Card key={index} className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">{segment.segment}</CardTitle>
              <CardDescription>{segment.count} customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Revenue</span>
                  <span className="font-semibold">${segment.revenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg per Customer</span>
                  <span className="font-semibold">${(segment.revenue / segment.count).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Revenue Share</span>
                  <Badge className="bg-blue-100 text-blue-800">
                    {segment.percentage}%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { CustomerReports };
