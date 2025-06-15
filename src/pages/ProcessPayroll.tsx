
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { 
  ArrowLeft,
  Users, 
  Clock, 
  DollarSign, 
  Calendar, 
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  FileText,
  Download,
  Play,
  Settings,
  Calculator,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PayrollProcessForm {
  payPeriod: string;
  payDate: string;
  bonuses: string;
  deductions: string;
  notes: string;
  includeOvertime: boolean;
  generatePayStubs: boolean;
  sendNotifications: boolean;
}

const ProcessPayroll = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const form = useForm<PayrollProcessForm>({
    defaultValues: {
      payPeriod: '',
      payDate: '',
      bonuses: '0',
      deductions: '0',
      notes: '',
      includeOvertime: true,
      generatePayStubs: true,
      sendNotifications: true
    }
  });

  const employees = [
    {
      id: 'EMP-001',
      name: 'Sarah Johnson',
      position: 'Team Leader',
      hoursWorked: 168,
      overtimeHours: 8,
      hourlyRate: 25,
      grossPay: 4200,
      deductions: 1050,
      netPay: 3150,
      status: 'ready'
    },
    {
      id: 'EMP-002',
      name: 'Mike Chen',
      position: 'Cleaning Specialist',
      hoursWorked: 160,
      overtimeHours: 5,
      hourlyRate: 22,
      grossPay: 3800,
      deductions: 950,
      netPay: 2850,
      status: 'ready'
    },
    {
      id: 'EMP-003',
      name: 'Lisa Rodriguez',
      position: 'Quality Inspector',
      hoursWorked: 155,
      overtimeHours: 0,
      hourlyRate: 23,
      grossPay: 3600,
      deductions: 900,
      netPay: 2700,
      status: 'ready'
    },
    {
      id: 'EMP-004',
      name: 'David Kim',
      position: 'Equipment Specialist',
      hoursWorked: 162,
      overtimeHours: 12,
      hourlyRate: 24,
      grossPay: 4100,
      deductions: 1025,
      netPay: 3075,
      status: 'review'
    }
  ];

  const payrollSummary = {
    totalEmployees: employees.length,
    totalHours: employees.reduce((sum, emp) => sum + emp.hoursWorked, 0),
    totalOvertime: employees.reduce((sum, emp) => sum + emp.overtimeHours, 0),
    totalGrossPay: employees.reduce((sum, emp) => sum + emp.grossPay, 0),
    totalDeductions: employees.reduce((sum, emp) => sum + emp.deductions, 0),
    totalNetPay: employees.reduce((sum, emp) => sum + emp.netPay, 0)
  };

  const handleEmployeeSelection = (employeeId: string, checked: boolean) => {
    if (checked) {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    } else {
      setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEmployees(employees.map(emp => emp.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const onSubmit = async (data: PayrollProcessForm) => {
    if (selectedEmployees.length === 0) {
      alert('Please select at least one employee to process payroll');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payroll processing
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      // You could update a progress state here
    }
    
    console.log('Processing payroll:', { ...data, selectedEmployees });
    
    setIsProcessing(false);
    alert(`Payroll processed successfully for ${selectedEmployees.length} employees!`);
    navigate('/finance');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'review': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Payroll Configuration
              </CardTitle>
              <CardDescription>Set up the basic parameters for this payroll run</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="payPeriod"
                  rules={{ required: 'Please select a pay period' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pay Period</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select pay period" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="2024-06">June 2024</SelectItem>
                          <SelectItem value="2024-05">May 2024</SelectItem>
                          <SelectItem value="2024-04">April 2024</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="payDate"
                  rules={{ required: 'Please select a pay date' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pay Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="bonuses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Bonuses ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.00" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deductions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Deductions ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.00" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Any additional notes for this payroll run..." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <h4 className="font-medium">Processing Options</h4>
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="includeOvertime"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Include overtime calculations</FormLabel>
                          <p className="text-sm text-gray-600">Calculate overtime pay at 1.5x rate for hours over 40</p>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="generatePayStubs"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Generate pay stubs automatically</FormLabel>
                          <p className="text-sm text-gray-600">Create PDF pay stubs for all employees</p>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sendNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Send email notifications</FormLabel>
                          <p className="text-sm text-gray-600">Notify employees when payroll is processed</p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Employee Selection
              </CardTitle>
              <CardDescription>Select employees to include in this payroll run</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedEmployees.length === employees.length}
                      onCheckedChange={handleSelectAll}
                    />
                    <span className="font-medium">Select All Employees</span>
                  </div>
                  <Badge variant="outline">
                    {selectedEmployees.length} of {employees.length} selected
                  </Badge>
                </div>

                <div className="space-y-3">
                  {employees.map((employee) => (
                    <div key={employee.id} className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={selectedEmployees.includes(employee.id)}
                            onCheckedChange={(checked) => handleEmployeeSelection(employee.id, checked as boolean)}
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                            <p className="text-gray-600 text-sm">{employee.position} • {employee.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className={getStatusColor(employee.status)}>
                            {employee.status}
                          </Badge>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">${employee.netPay.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">{employee.hoursWorked}h worked</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Payroll Summary
              </CardTitle>
              <CardDescription>Review the payroll calculations before processing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-800">Employees</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900 mt-1">{selectedEmployees.length}</p>
                    <p className="text-sm text-blue-700">selected for processing</p>
                  </div>

                  <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">Total Gross Pay</span>
                    </div>
                    <p className="text-2xl font-bold text-green-900 mt-1">
                      ${payrollSummary.totalGrossPay.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-700">before deductions</p>
                  </div>

                  <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                      <span className="font-medium text-purple-800">Total Net Pay</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-900 mt-1">
                      ${payrollSummary.totalNetPay.toLocaleString()}
                    </p>
                    <p className="text-sm text-purple-700">after deductions</p>
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Detailed Breakdown</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Total Hours</p>
                      <p className="font-medium">{payrollSummary.totalHours.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Overtime Hours</p>
                      <p className="font-medium text-orange-600">{payrollSummary.totalOvertime}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Deductions</p>
                      <p className="font-medium">${payrollSummary.totalDeductions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Processing Date</p>
                      <p className="font-medium">{form.watch('payDate') || 'Not set'}</p>
                    </div>
                  </div>
                </div>

                {/* Selected Options */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Processing Options</h4>
                  <div className="flex flex-wrap gap-2">
                    {form.watch('includeOvertime') && (
                      <Badge variant="outline">Include Overtime</Badge>
                    )}
                    {form.watch('generatePayStubs') && (
                      <Badge variant="outline">Generate Pay Stubs</Badge>
                    )}
                    {form.watch('sendNotifications') && (
                      <Badge variant="outline">Send Notifications</Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/finance')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Finance
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Process Payroll</h1>
              <p className="text-gray-600 mt-1">Configure and process employee payroll</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= activeStep ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step < activeStep ? <CheckCircle className="h-4 w-4" /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-24 h-1 mx-4 ${
                      step < activeStep ? 'bg-primary' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Configuration</span>
              <span>Employee Selection</span>
              <span>Review & Process</span>
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                disabled={activeStep === 1}
              >
                Previous
              </Button>
              
              {activeStep < 3 ? (
                <Button
                  type="button"
                  onClick={() => setActiveStep(Math.min(3, activeStep + 1))}
                >
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing Payroll...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Process Payroll
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProcessPayroll;
