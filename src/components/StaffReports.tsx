
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users,
  Clock,
  DollarSign,
  Star,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StaffReports = () => {
  const staffPerformanceData = [
    { name: 'Sarah Johnson', services: 147, hours: 162, rating: 4.8, revenue: 18400 },
    { name: 'Mike Chen', services: 134, hours: 155, rating: 4.6, revenue: 16800 },
    { name: 'Lisa Rodriguez', services: 128, hours: 148, rating: 4.7, revenue: 16000 },
    { name: 'David Smith', services: 119, hours: 140, rating: 4.5, revenue: 14875 }
  ];

  const laborCostData = [
    { month: 'Jan', wages: 28500, benefits: 5700, total: 34200 },
    { month: 'Feb', wages: 29200, benefits: 5840, total: 35040 },
    { month: 'Mar', wages: 30100, benefits: 6020, total: 36120 },
    { month: 'Apr', wages: 31500, benefits: 6300, total: 37800 },
    { month: 'May', wages: 30800, benefits: 6160, total: 36960 },
    { month: 'Jun', wages: 32200, benefits: 6440, total: 38640 }
  ];

  const attendanceData = [
    { week: 'Week 1', present: 18, absent: 2, late: 1 },
    { week: 'Week 2', present: 19, absent: 1, late: 0 },
    { week: 'Week 3', present: 17, absent: 3, late: 2 },
    { week: 'Week 4', present: 20, absent: 0, late: 1 }
  ];

  return (
    <div className="space-y-6">
      {/* Staff Performance Table */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Staff Performance Overview
          </CardTitle>
          <CardDescription>Individual staff metrics and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {staffPerformanceData.map((staff, index) => (
              <div key={index} className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{staff.name}</h3>
                      <p className="text-sm text-gray-600">{staff.services} services | {staff.hours} hours</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-right">
                    <div>
                      <p className="text-sm text-gray-600">Rating</p>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        ⭐ {staff.rating}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Revenue</p>
                      <p className="font-semibold text-green-600">${staff.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Labor Costs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Labor Cost Analysis
            </CardTitle>
            <CardDescription>Monthly wages and benefits breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={laborCostData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                <Bar dataKey="wages" fill="#2563eb" name="Wages" />
                <Bar dataKey="benefits" fill="#059669" name="Benefits" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Attendance Tracking
            </CardTitle>
            <CardDescription>Weekly attendance patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="present" fill="#22c55e" name="Present" />
                <Bar dataKey="absent" fill="#ef4444" name="Absent" />
                <Bar dataKey="late" fill="#f59e0b" name="Late" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Staff Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 mx-auto text-primary mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Avg Hours/Week</h3>
            <p className="text-2xl font-bold text-primary">38.2</p>
            <p className="text-sm text-gray-600">Per employee</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto text-primary mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Productivity</h3>
            <p className="text-2xl font-bold text-green-600">94.5%</p>
            <p className="text-sm text-gray-600">Efficiency rate</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6 text-center">
            <Star className="h-8 w-8 mx-auto text-primary mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Avg Rating</h3>
            <p className="text-2xl font-bold text-yellow-600">4.6</p>
            <p className="text-sm text-gray-600">Customer satisfaction</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6 text-center">
            <DollarSign className="h-8 w-8 mx-auto text-primary mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Revenue/Hour</h3>
            <p className="text-2xl font-bold text-blue-600">$125</p>
            <p className="text-sm text-gray-600">Per staff member</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { StaffReports };
