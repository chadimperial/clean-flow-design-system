
import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const FinanceDashboard = () => {
  const cashFlowData = [
    { month: 'Jan', revenue: 125000, expenses: 85000, profit: 40000 },
    { month: 'Feb', revenue: 132000, expenses: 88000, profit: 44000 },
    { month: 'Mar', revenue: 128000, expenses: 92000, profit: 36000 },
    { month: 'Apr', revenue: 145000, expenses: 95000, profit: 50000 },
    { month: 'May', revenue: 138000, expenses: 89000, profit: 49000 },
    { month: 'Jun', revenue: 142000, expenses: 87000, profit: 55000 }
  ];

  const serviceRevenueData = [
    { name: 'Office Cleaning', value: 35, amount: 49700 },
    { name: 'Residential', value: 25, amount: 35500 },
    { name: 'Deep Cleaning', value: 20, amount: 28400 },
    { name: 'Carpet Cleaning', value: 12, amount: 17040 },
    { name: 'Window Cleaning', value: 8, amount: 11360 }
  ];

  const expenseBreakdownData = [
    { category: 'Labor', amount: 42000, percentage: 48 },
    { category: 'Supplies', amount: 18500, percentage: 21 },
    { category: 'Equipment', amount: 12000, percentage: 14 },
    { category: 'Transportation', amount: 8500, percentage: 10 },
    { category: 'Insurance', amount: 6000, percentage: 7 }
  ];

  const COLORS = ['#2563eb', '#059669', '#d97706', '#dc2626', '#7c3aed', '#0891b2'];

  return (
    <div className="space-y-6">
      {/* Cash Flow Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Monthly Cash Flow</CardTitle>
            <CardDescription>Revenue, expenses, and profit trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                <Area type="monotone" dataKey="revenue" stackId="1" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
                <Area type="monotone" dataKey="expenses" stackId="2" stroke="#dc2626" fill="#dc2626" fillOpacity={0.6} />
                <Area type="monotone" dataKey="profit" stackId="3" stroke="#059669" fill="#059669" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Service Revenue Breakdown */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Revenue by Service Type</CardTitle>
            <CardDescription>Current month service distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceRevenueData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {serviceRevenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}%`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Expense Breakdown */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Monthly Expense Breakdown</CardTitle>
          <CardDescription>Operating expenses by category</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={expenseBreakdownData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="category" type="category" width={100} />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
              <Bar dataKey="amount" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export { FinanceDashboard };
