
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  Wrench, 
  DollarSign, 
  AlertTriangle, 
  TrendingUp, 
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const InventoryDashboard = () => {
  const inventoryMetrics = [
    { title: 'Total Items', value: '1,247', icon: Package, color: 'text-blue-600', change: '+12%' },
    { title: 'Low Stock Items', value: '23', icon: AlertTriangle, color: 'text-orange-600', change: '-5%' },
    { title: 'Total Value', value: '$84,550', icon: DollarSign, color: 'text-green-600', change: '+8%' },
    { title: 'Equipment Active', value: '45/48', icon: Wrench, color: 'text-purple-600', change: '94%' }
  ];

  const stockLevels = [
    { name: 'In Stock', value: 75, color: '#22c55e' },
    { name: 'Low Stock', value: 15, color: '#f59e0b' },
    { name: 'Out of Stock', value: 10, color: '#ef4444' }
  ];

  const consumptionData = [
    { month: 'Jan', chemicals: 2400, supplies: 1800, packaging: 1200 },
    { month: 'Feb', chemicals: 2100, supplies: 1900, packaging: 1100 },
    { month: 'Mar', chemicals: 2800, supplies: 2000, packaging: 1300 },
    { month: 'Apr', chemicals: 2600, supplies: 1700, packaging: 1400 },
    { month: 'May', chemicals: 2900, supplies: 2100, packaging: 1250 },
    { month: 'Jun', chemicals: 3200, supplies: 2200, packaging: 1350 }
  ];

  const equipmentStatus = [
    { name: 'Washer #1', status: 'Operational', lastMaintenance: '2024-05-15', nextDue: '2024-06-15' },
    { name: 'Dryer #3', status: 'Maintenance Due', lastMaintenance: '2024-04-10', nextDue: '2024-06-01' },
    { name: 'Press #2', status: 'Down for Repair', lastMaintenance: '2024-05-20', nextDue: '2024-06-20' },
    { name: 'Boiler #1', status: 'Operational', lastMaintenance: '2024-05-25', nextDue: '2024-07-25' }
  ];

  const lowStockItems = [
    { name: 'Laundry Detergent', current: 45, minimum: 100, supplier: 'ChemCorp' },
    { name: 'Fabric Softener', current: 12, minimum: 50, supplier: 'CleanSolutions' },
    { name: 'Stain Remover', current: 8, minimum: 25, supplier: 'ProClean' },
    { name: 'Hangers', current: 150, minimum: 500, supplier: 'SupplyPro' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Operational': return 'text-green-600 bg-green-100';
      case 'Maintenance Due': return 'text-orange-600 bg-orange-100';
      case 'Down for Repair': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {inventoryMetrics.map((metric, index) => (
          <Card key={index} className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className="text-sm text-green-600">{metric.change}</p>
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
        {/* Stock Level Overview */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Stock Level Overview</CardTitle>
            <CardDescription>Current inventory status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={stockLevels}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {stockLevels.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Consumption Trends */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Monthly Consumption</CardTitle>
            <CardDescription>Consumption trends by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={consumptionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="chemicals" stackId="1" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
                <Area type="monotone" dataKey="supplies" stackId="1" stroke="#059669" fill="#059669" fillOpacity={0.6} />
                <Area type="monotone" dataKey="packaging" stackId="1" stroke="#d97706" fill="#d97706" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equipment Status */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Equipment Status</CardTitle>
            <CardDescription>Current equipment operational status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {equipmentStatus.map((equipment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Wrench className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium">{equipment.name}</p>
                      <p className="text-sm text-gray-600">Next: {equipment.nextDue}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(equipment.status)}>
                    {equipment.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
            <CardDescription>Items requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.supplier}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-orange-600">
                      {item.current}/{item.minimum}
                    </p>
                    <Button size="sm" variant="outline" className="mt-1">
                      Reorder
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest inventory movements and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'Received', item: 'Laundry Detergent (50 units)', time: '10 minutes ago', type: 'receive' },
              { action: 'Consumed', item: 'Fabric Softener (15 units)', time: '1 hour ago', type: 'consume' },
              { action: 'Maintenance', item: 'Washer #2 - Scheduled service', time: '2 hours ago', type: 'maintenance' },
              { action: 'Reorder', item: 'Stain Remover - Auto reorder triggered', time: '3 hours ago', type: 'reorder' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-full ${
                  activity.type === 'receive' ? 'bg-green-100 text-green-600' :
                  activity.type === 'consume' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'maintenance' ? 'bg-orange-100 text-orange-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {activity.type === 'receive' ? <CheckCircle className="w-4 h-4" /> :
                   activity.type === 'consume' ? <Package className="w-4 h-4" /> :
                   activity.type === 'maintenance' ? <Wrench className="w-4 h-4" /> :
                   <TrendingUp className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.item}</p>
                </div>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { InventoryDashboard };
