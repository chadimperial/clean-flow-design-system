
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { 
  FileText, 
  Download, 
  Calendar, 
  BarChart3,
  PieChart,
  DollarSign,
  Users,
  Loader2
} from 'lucide-react';

interface GenerateReportModalProps {
  open: boolean;
  onClose: () => void;
}

interface ReportForm {
  reportType: string;
  period: string;
  format: string;
}

const GenerateReportModal = ({ open, onClose }: GenerateReportModalProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('financial');

  const form = useForm<ReportForm>({
    defaultValues: {
      reportType: '',
      period: '',
      format: 'pdf'
    }
  });

  const reportTypes = {
    financial: [
      { value: 'profit-loss', label: 'Profit & Loss Statement', icon: BarChart3 },
      { value: 'balance-sheet', label: 'Balance Sheet', icon: PieChart },
      { value: 'cash-flow', label: 'Cash Flow Statement', icon: DollarSign },
      { value: 'expense-summary', label: 'Expense Summary', icon: FileText }
    ],
    payroll: [
      { value: 'payroll-summary', label: 'Payroll Summary Report', icon: Users },
      { value: 'employee-earnings', label: 'Employee Earnings Report', icon: DollarSign },
      { value: 'tax-summary', label: 'Tax Summary Report', icon: FileText },
      { value: 'overtime-report', label: 'Overtime Analysis', icon: BarChart3 }
    ],
    operational: [
      { value: 'customer-revenue', label: 'Customer Revenue Analysis', icon: PieChart },
      { value: 'service-performance', label: 'Service Performance Report', icon: BarChart3 },
      { value: 'monthly-summary', label: 'Monthly Operations Summary', icon: FileText },
      { value: 'financial-overview', label: 'Financial Overview', icon: DollarSign }
    ]
  };

  const periods = [
    { value: 'current-month', label: 'Current Month' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'current-quarter', label: 'Current Quarter' },
    { value: 'last-quarter', label: 'Last Quarter' },
    { value: 'current-year', label: 'Current Year' },
    { value: 'last-year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Date Range' }
  ];

  const formats = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'csv', label: 'CSV File' }
  ];

  const onSubmit = async (data: ReportForm) => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Generating report:', data);
    
    // Here you would typically call an API to generate the report
    // For now, we'll simulate a successful generation
    
    setIsGenerating(false);
    onClose();
    
    // Show success message (you could use a toast here)
    alert(`Report generated successfully! ${data.reportType} for ${data.period} in ${data.format} format.`);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200 shadow-xl">
        <DialogHeader className="bg-white">
          <DialogTitle className="flex items-center gap-2 text-gray-900">
            <FileText className="h-5 w-5 text-primary" />
            Generate Financial Report
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Select the type of report you want to generate and customize the parameters
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                <TabsTrigger value="financial" className="bg-white data-[state=active]:bg-primary data-[state=active]:text-white">Financial Reports</TabsTrigger>
                <TabsTrigger value="payroll" className="bg-white data-[state=active]:bg-primary data-[state=active]:text-white">Payroll Reports</TabsTrigger>
                <TabsTrigger value="operational" className="bg-white data-[state=active]:bg-primary data-[state=active]:text-white">Operational Reports</TabsTrigger>
              </TabsList>

              {Object.entries(reportTypes).map(([category, reports]) => (
                <TabsContent key={category} value={category} className="space-y-4 bg-white">
                  <FormField
                    control={form.control}
                    name="reportType"
                    rules={{ required: 'Please select a report type' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900">Select Report Type</FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {reports.map((report) => {
                            const IconComponent = report.icon;
                            return (
                              <Card
                                key={report.value}
                                className={`cursor-pointer transition-all hover:shadow-md bg-white border border-gray-200 ${
                                  field.value === report.value ? 'ring-2 ring-primary bg-blue-50 border-primary' : 'hover:border-gray-300'
                                }`}
                                onClick={() => field.onChange(report.value)}
                              >
                                <CardContent className="p-4 bg-white">
                                  <div className="flex items-center gap-3">
                                    <IconComponent className="h-8 w-8 text-primary" />
                                    <div>
                                      <h3 className="font-semibold text-sm text-gray-900">{report.label}</h3>
                                      <p className="text-xs text-gray-600 capitalize">{category} report</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              ))}
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white">
              <FormField
                control={form.control}
                name="period"
                rules={{ required: 'Please select a time period' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900">Time Period</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white border-gray-300">
                          <SelectValue placeholder="Select time period" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                        {periods.map((period) => (
                          <SelectItem key={period.value} value={period.value} className="bg-white hover:bg-gray-100">
                            {period.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="format"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900">Output Format</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white border-gray-300">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                        {formats.map((format) => (
                          <SelectItem key={format.value} value={format.value} className="bg-white hover:bg-gray-100">
                            {format.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 bg-white">
              <Button type="button" variant="outline" onClick={onClose} className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                Cancel
              </Button>
              <Button type="submit" disabled={isGenerating} className="bg-primary text-white hover:bg-primary/90">
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { GenerateReportModal };
