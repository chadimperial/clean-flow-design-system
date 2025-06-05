
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  BarChart3
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const OperationalReports = () => {
  const servicePerformanceData = [
    { week: 'Week 1', completed: 89, scheduled: 95, efficiency: 93.7 },
    { week: 'Week 2', completed: 92, scheduled: 98, efficiency: 93.9 },
    { week: 'Week 3', completed: 87, scheduled: 90, efficiency: 96.7 },
    { week: 'Week 4', completed: 94, scheduled: 100, efficiency: 94.0 }
  ];

  const routeEfficiencyData = [
    { route: 'Downtown', avgTime: 4.2, services: 12, efficiency: 95 },
    { route: 'Suburbs', avgTime: 5.8, services: 8, efficiency: 87 },
    { route: 'Industrial', avgTime: 6.1, services: 15, efficiency: 92 },
    { route: 'Residential', avgTime: 3.9, services: 10, efficiency: 98 }
  ];

  const qualityMetrics = [
    { month: 'Jan', satisfaction: 4.2, complaints: 8, rework: 3 },
    { month: 'Feb', satisfaction: 4.3, complaints: 6, rework: 2 },
    { month: 'Mar', satisfaction: 4.1, complaints: 9, rework: 4 },
    { month: 'Apr', satisfaction: 4.5, complaints: 5, rework: 1 },
    { month: 'May', satisfaction: 4.4, complaints: 7, rework: 2 },
    { month: 'Jun', satisfaction: 4.6, complaints: 4, rework: 1 }
  ];

  const staffProductivity = [
    { name: 'Sarah Johnson', services: 147, rating: 4.8, efficiency: 98 },
    { name: 'Mike Chen', services: 134, rating: 4.6, efficiency: 95 },
    { name: 'Lisa Rodriguez', services: 128, rating: 4.7, efficiency: 92 },
    { name: 'David Smith', services: 119, rating: 4.5, efficiency: 89 }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Service Performance</TabsTrigger>
          <TabsTrigger value="routes">Route Efficiency</TabsTrigger>
          <TabsTrigger value="quality">Quality Metrics</TabsTrigger>
          <TabsTrigger value="productivity">Staff Productivity</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Service Completion Rates
                </CardTitle>
                <CardDescription>Weekly completion vs scheduled services</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={servicePerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#22c55e" name="Completed" />
                    <Bar dataKey="scheduled" fill="#3b82f6" name="Scheduled" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Efficiency Trends
                </CardTitle>
                <CardDescription>Service efficiency percentage over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={servicePerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[90, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Efficiency']} />
                    <Line type="monotone" dataKey="efficiency" stroke="#2563eb" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="routes" className="mt-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Route Performance Analysis
              </CardTitle>
              <CardDescription>Efficiency metrics by service route</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routeEfficiencyData.map((route, index) => (
                  <div key={index} className="p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{route.route}</h3>
                      <Badge className={`${
                        route.efficiency >= 95 ? 'bg-green-100 text-green-800' :
                        route.efficiency >= 90 ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {route.efficiency}% Efficient
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <p className="font-medium">Avg Time per Service</p>
                        <p>{route.avgTime} hours</p>
                      </div>
                      <div>
                        <p className="font-medium">Services per Route</p>
                        <p>{route.services} services</p>
                      </div>
                      <div>
                        <p className="font-medium">Total Daily Time</p>
                        <p>{(route.avgTime * route.services).toFixed(1)} hours</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Customer Satisfaction
                </CardTitle>
                <CardDescription>Monthly satisfaction scores</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={qualityMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[4, 5]} />
                    <Tooltip formatter={(value) => [value, 'Rating']} />
                    <Area type="monotone" dataKey="satisfaction" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Quality Issues
                </CardTitle>
                <CardDescription>Complaints and rework trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={qualityMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="complaints" fill="#f59e0b" name="Complaints" />
                    <Bar dataKey="rework" fill="#ef4444" name="Rework" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="productivity" className="mt-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Top Performing Staff
              </CardTitle>
              <CardDescription>Staff productivity and performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {staffProductivity.map((staff, index) => (
                  <div key={index} className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{staff.name}</h3>
                          <p className="text-sm text-gray-600">{staff.services} services completed</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-gray-600">Rating:</span>
                          <Badge className="bg-yellow-100 text-yellow-800">
                            ⭐ {staff.rating}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Efficiency:</span>
                          <Badge className={`${
                            staff.efficiency >= 95 ? 'bg-green-100 text-green-800' :
                            staff.efficiency >= 90 ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {staff.efficiency}%
                          </Badge>
                        </div>
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

export { OperationalReports };
