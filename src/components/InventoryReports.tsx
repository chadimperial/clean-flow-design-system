
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Package,
  TrendingDown,
  AlertTriangle,
  DollarSign,
  BarChart3,
  RefreshCw
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const InventoryReports = () => {
  const inventoryTurnoverData = [
    { category: 'Chemicals', turnover: 8.2, optimal: 6.5 },
    { category: 'Supplies', turnover: 4.7, optimal: 5.0 },
    { category: 'Packaging', turnover: 6.1, optimal: 7.0 },
    { category: 'Equipment', turnover: 2.3, optimal: 3.0 }
  ];

  const costAnalysisData = [
    { name: 'Chemicals', value: 42, cost: 63900 },
    { name: 'Supplies', value: 28, cost: 42600 },
    { name: 'Packaging', value: 18, cost: 27400 },
    { name: 'Equipment', value: 12, cost: 18200 }
  ];

  const wasteAnalysisData = [
    { month: 'Jan', expired: 340, damaged: 180, total: 520 },
    { month: 'Feb', expired: 280, damaged: 145, total: 425 },
    { month: 'Mar', expired: 420, damaged: 210, total: 630 },
    { month: 'Apr', expired: 190, damaged: 95, total: 285 },
    { month: 'May', expired: 250, damaged: 120, total: 370 },
    { month: 'Jun', expired: 180, damaged: 85, total: 265 }
  ];

  const COLORS = ['#2563eb', '#059669', '#d97706', '#dc2626'];

  return (
    <div className="space-y-6">
      {/* Inventory Turnover */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-primary" />
              Inventory Turnover Analysis
            </CardTitle>
            <CardDescription>Actual vs optimal turnover rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={inventoryTurnoverData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}x`, '']} />
                <Bar dataKey="turnover" fill="#2563eb" name="Actual" />
                <Bar dataKey="optimal" fill="#059669" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Inventory Value Distribution
            </CardTitle>
            <CardDescription>Investment breakdown by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costAnalysisData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {costAnalysisData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}%`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Waste Analysis */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-primary" />
            Waste & Loss Analysis
          </CardTitle>
          <CardDescription>Monthly waste tracking by reason</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={wasteAnalysisData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, '']} />
              <Bar dataKey="expired" fill="#f59e0b" name="Expired" />
              <Bar dataKey="damaged" fill="#ef4444" name="Damaged" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Inventory Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6 text-center">
            <Package className="h-8 w-8 mx-auto text-primary mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Stock Value</h3>
            <p className="text-2xl font-bold text-primary">$152,100</p>
            <p className="text-sm text-green-600">+5.2% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6 text-center">
            <BarChart3 className="h-8 w-8 mx-auto text-primary mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Turnover Rate</h3>
            <p className="text-2xl font-bold text-blue-600">5.8x</p>
            <p className="text-sm text-gray-600">Annual average</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-8 w-8 mx-auto text-primary mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Low Stock Items</h3>
            <p className="text-2xl font-bold text-orange-600">23</p>
            <p className="text-sm text-gray-600">Require reordering</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6 text-center">
            <TrendingDown className="h-8 w-8 mx-auto text-primary mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Monthly Waste</h3>
            <p className="text-2xl font-bold text-red-600">$265</p>
            <p className="text-sm text-green-600">-18% improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Inventory List */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Inventory Performance Summary</CardTitle>
          <CardDescription>Detailed breakdown by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {costAnalysisData.map((category, index) => (
              <div key={index} className="p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-gray-500" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-600">{category.value}% of total inventory</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${category.cost.toLocaleString()}</p>
                    <Badge className="mt-1 bg-blue-100 text-blue-800">
                      Active Stock
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { InventoryReports };
