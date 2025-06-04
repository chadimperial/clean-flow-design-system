
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Clock, 
  DollarSign, 
  Calendar, 
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  FileText,
  Download,
  Play
} from 'lucide-react';

const PayrollManagement = () => {
  const [currentPeriod, setCurrentPeriod] = useState('2024-06');

  const payrollSummary = {
    totalEmployees: 24,
    hoursWorked: 3840,
    grossPay: 89500,
    netPay: 67200,
    deductions: 22300,
    overtimeHours: 156,
    overtimePay: 4680
  };

  const employees = [
    {
      id: 'EMP-001',
      name: 'Sarah Johnson',
      position: 'Team Leader',
      hoursWorked: 168,
      overtimeHours: 8,
      grossPay: 4200,
      netPay: 3150,
      status: 'processed'
    },
    {
      id: 'EMP-002',
      name: 'Mike Chen',
      position: 'Cleaning Specialist',
      hoursWorked: 160,
      overtimeHours: 5,
      grossPay: 3800,
      netPay: 2850,
      status: 'pending'
    },
    {
      id: 'EMP-003',
      name: 'Lisa Rodriguez',
      position: 'Quality Inspector',
      hoursWorked: 155,
      overtimeHours: 0,
      grossPay: 3600,
      netPay: 2700,
      status: 'processed'
    },
    {
      id: 'EMP-004',
      name: 'David Kim',
      position: 'Equipment Specialist',
      hoursWorked: 162,
      overtimeHours: 12,
      grossPay: 4100,
      netPay: 3075,
      status: 'review'
    }
  ];

  const payrollHistory = [
    { period: '2024-05', employees: 24, grossPay: 87300, netPay: 65475, status: 'completed' },
    { period: '2024-04', employees: 22, grossPay: 82100, netPay: 61575, status: 'completed' },
    { period: '2024-03', employees: 21, grossPay: 78900, netPay: 59175, status: 'completed' },
    { period: '2024-02', employees: 20, grossPay: 75600, netPay: 56700, status: 'completed' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed': case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processed': case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'review': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Payroll Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900">{payrollSummary.totalEmployees}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hours Worked</p>
                <p className="text-2xl font-bold text-gray-900">{payrollSummary.hoursWorked.toLocaleString()}</p>
                <p className="text-xs text-orange-600">+{payrollSummary.overtimeHours} overtime</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gross Pay</p>
                <p className="text-2xl font-bold text-gray-900">${payrollSummary.grossPay.toLocaleString()}</p>
                <p className="text-xs text-green-600">+5.2% from last month</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Pay</p>
                <p className="text-2xl font-bold text-gray-900">${payrollSummary.netPay.toLocaleString()}</p>
                <p className="text-xs text-gray-600">${payrollSummary.deductions.toLocaleString()} deductions</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="grid w-fit grid-cols-3">
            <TabsTrigger value="current">Current Payroll</TabsTrigger>
            <TabsTrigger value="employees">Employee Details</TabsTrigger>
            <TabsTrigger value="history">Payroll History</TabsTrigger>
          </TabsList>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Play className="h-4 w-4 mr-2" />
              Process Payroll
            </Button>
          </div>
        </div>

        <TabsContent value="current">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Current Pay Period: {currentPeriod}
              </CardTitle>
              <CardDescription>Monthly payroll processing status and overview</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Payroll Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Payroll Processing Progress</span>
                  <span className="text-sm text-gray-600">18/24 employees processed</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>

              {/* Processing Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">Processed</span>
                  </div>
                  <p className="text-2xl font-bold text-green-900 mt-1">18</p>
                  <p className="text-sm text-green-700">employees</p>
                </div>
                <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Pending</span>
                  </div>
                  <p className="text-2xl font-bold text-yellow-900 mt-1">4</p>
                  <p className="text-sm text-yellow-700">employees</p>
                </div>
                <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <span className="font-medium text-orange-800">Review Needed</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-900 mt-1">2</p>
                  <p className="text-sm text-orange-700">employees</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <FileText className="h-6 w-6 mb-2" />
                  Generate Pay Stubs
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Download className="h-6 w-6 mb-2" />
                  Export Tax Reports
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <DollarSign className="h-6 w-6 mb-2" />
                  Setup Direct Deposit
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Calendar className="h-6 w-6 mb-2" />
                  Schedule Payments
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Employee Payroll Details
              </CardTitle>
              <CardDescription>Individual employee payroll information and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employees.map((employee) => (
                  <div key={employee.id} className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                          <Badge className={getStatusColor(employee.status)}>
                            {getStatusIcon(employee.status)}
                            {employee.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{employee.position} • {employee.id}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Regular Hours</p>
                            <p className="font-medium">{employee.hoursWorked}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Overtime</p>
                            <p className="font-medium text-orange-600">{employee.overtimeHours}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Gross Pay</p>
                            <p className="font-medium">${employee.grossPay.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Net Pay</p>
                            <p className="font-medium text-green-600">${employee.netPay.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Payroll History
              </CardTitle>
              <CardDescription>Historical payroll data and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payrollHistory.map((period) => (
                  <div key={period.period} className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{period.period}</h3>
                          <Badge className={getStatusColor(period.status)}>
                            {getStatusIcon(period.status)}
                            {period.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Employees</p>
                            <p className="font-medium">{period.employees}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Gross Pay</p>
                            <p className="font-medium">${period.grossPay.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Net Pay</p>
                            <p className="font-medium text-green-600">${period.netPay.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Deductions</p>
                            <p className="font-medium">${(period.grossPay - period.netPay).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
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

export { PayrollManagement };
