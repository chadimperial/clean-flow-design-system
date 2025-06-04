
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const InventoryAnalytics = () => {
  const turnoverData = [
    { month: 'Jan', chemicals: 4.2, supplies: 6.1, packaging: 8.3 },
    { month: 'Feb', chemicals: 3.8, supplies: 5.9, packaging: 7.8 },
    { month: 'Mar', chemicals: 4.5, supplies: 6.4, packaging: 8.1 },
    { month: 'Apr', chemicals: 4.1, supplies: 6.2, packaging: 8.5 },
    { month: 'May', chemicals: 4.7, supplies: 6.8, packaging: 8.9 },
    { month: 'Jun', chemicals: 4.3, supplies: 6.5, packaging: 8.2 }
  ];

  const costAnalysis = [
    { category: 'Chemicals', cost: 45600, percentage: 42 },
    { category: 'Supplies', cost: 28400, percentage: 26 },
    { category: 'Packaging', cost: 18200, percentage: 17 },
    { category: 'Tools', cost: 12800, percentage: 12 },
    { category: 'Maintenance', cost: 3000, percentage: 3 }
  ];

  const consumptionForecast = [
    { month: 'Jul', actual: 2800, forecast: 2950 },
    { month: 'Aug', actual: 2900, forecast: 3100 },
    { month: 'Sep', actual: null, forecast: 3200 },
    { month: 'Oct', actual: null, forecast: 3150 },
    { month: 'Nov', actual: null, forecast: 3300 },
    { month: 'Dec', actual: null, forecast: 3450 }
  ];

  const COLORS = ['#2563eb', '#059669', '#d97706', '#dc2626', '#7c3aed'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Inventory Analytics</h2>
        <p className="text-gray-600">Comprehensive analysis of inventory performance and trends</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Turnover */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Inventory Turnover Rate</CardTitle>
            <CardDescription>Monthly turnover rates by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={turnoverData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}x`, '']} />
                <Line type="monotone" dataKey="chemicals" stroke="#2563eb" strokeWidth={2} />
                <Line type="monotone" dataKey="supplies" stroke="#059669" strokeWidth={2} />
                <Line type="monotone" dataKey="packaging" stroke="#d97706" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Inventory Cost Distribution</CardTitle>
            <CardDescription>Cost breakdown by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costAnalysis}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="cost"
                  label={({ category, percentage }) => `${category}: ${percentage}%`}
                >
                  {costAnalysis.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Cost']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Consumption Forecast */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Consumption Forecast</CardTitle>
          <CardDescription>Actual vs predicted consumption patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={consumptionForecast}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="actual" stackId="1" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
              <Area type="monotone" dataKey="forecast" stackId="2" stroke="#059669" fill="#059669" fillOpacity={0.4} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Average Turnover</p>
              <p className="text-2xl font-bold text-blue-600">5.2x</p>
              <p className="text-sm text-green-600">+0.3 from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Carrying Cost</p>
              <p className="text-2xl font-bold text-orange-600">12.8%</p>
              <p className="text-sm text-red-600">+0.5% from target</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Stock Accuracy</p>
              <p className="text-2xl font-bold text-green-600">97.2%</p>
              <p className="text-sm text-green-600">+1.2% improvement</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Cost per Service</p>
              <p className="text-2xl font-bold text-purple-600">$4.85</p>
              <p className="text-sm text-green-600">-$0.15 from last month</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { InventoryAnalytics };
