
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Receipt, 
  Plus, 
  Search, 
  Filter, 
  Camera,
  Car,
  ShoppingCart,
  Wrench,
  Zap,
  DollarSign,
  Calendar,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const ExpenseTracker = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const budgetData = [
    { category: 'Supplies', budget: 15000, spent: 12500, percentage: 83 },
    { category: 'Equipment', budget: 8000, spent: 6200, percentage: 78 },
    { category: 'Transportation', budget: 5000, spent: 4100, percentage: 82 },
    { category: 'Utilities', budget: 3000, spent: 2800, percentage: 93 },
    { category: 'Marketing', budget: 2000, spent: 1200, percentage: 60 }
  ];

  const recentExpenses = [
    {
      id: 'EXP-001',
      description: 'Cleaning Supplies - Disinfectants',
      category: 'Supplies',
      amount: 450,
      date: '2024-06-05',
      vendor: 'CleanCorp Supply',
      status: 'approved',
      receipt: true
    },
    {
      id: 'EXP-002',
      description: 'Fuel for Delivery Vehicles',
      category: 'Transportation',
      amount: 280,
      date: '2024-06-04',
      vendor: 'Shell Gas Station',
      status: 'pending',
      receipt: true
    },
    {
      id: 'EXP-003',
      description: 'New Vacuum Cleaner',
      category: 'Equipment',
      amount: 350,
      date: '2024-06-03',
      vendor: 'Equipment World',
      status: 'approved',
      receipt: false
    },
    {
      id: 'EXP-004',
      description: 'Office Electricity Bill',
      category: 'Utilities',
      amount: 420,
      date: '2024-06-02',
      vendor: 'City Power Company',
      status: 'approved',
      receipt: true
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Supplies': return <ShoppingCart className="h-5 w-5" />;
      case 'Equipment': return <Wrench className="h-5 w-5" />;
      case 'Transportation': return <Car className="h-5 w-5" />;
      case 'Utilities': return <Zap className="h-5 w-5" />;
      default: return <Receipt className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBudgetColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Camera className="h-4 w-4 mr-2" />
            Add Receipt
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Budget Overview */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Monthly Budget Overview
          </CardTitle>
          <CardDescription>Track spending against budgeted amounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {budgetData.map((budget, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(budget.category)}
                    <span className="font-medium text-gray-900">{budget.category}</span>
                  </div>
                  <div className="text-right">
                    <span className={`font-semibold ${getBudgetColor(budget.percentage)}`}>
                      ${budget.spent.toLocaleString()} / ${budget.budget.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-600 ml-2">
                      ({budget.percentage}%)
                    </span>
                  </div>
                </div>
                <Progress 
                  value={budget.percentage} 
                  className={`h-2 ${budget.percentage >= 90 ? 'progress-red' : budget.percentage >= 75 ? 'progress-orange' : 'progress-green'}`}
                />
                {budget.percentage >= 90 && (
                  <div className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    Budget limit approaching
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Expenses */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" />
            Recent Expenses
          </CardTitle>
          <CardDescription>Latest expense entries and approvals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentExpenses.map((expense) => (
              <div key={expense.id} className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{expense.description}</h3>
                      <Badge className={getStatusColor(expense.status)}>
                        {expense.status}
                      </Badge>
                      {expense.receipt && (
                        <Badge variant="outline" className="text-xs">
                          <Camera className="h-3 w-3 mr-1" />
                          Receipt
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        {getCategoryIcon(expense.category)}
                        {expense.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        ${expense.amount.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {expense.date}
                      </span>
                      <span>{expense.vendor}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    {expense.status === 'pending' && (
                      <>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Camera className="h-8 w-8 mx-auto text-primary mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Mobile Receipt Scan</h3>
            <p className="text-sm text-gray-600">Quickly capture receipts with your phone</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Car className="h-8 w-8 mx-auto text-primary mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Mileage Tracker</h3>
            <p className="text-sm text-gray-600">Track vehicle expenses and mileage</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Wrench className="h-8 w-8 mx-auto text-primary mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Equipment Costs</h3>
            <p className="text-sm text-gray-600">Track equipment purchases and maintenance</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto text-primary mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Expense Analytics</h3>
            <p className="text-sm text-gray-600">Analyze spending patterns and trends</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { ExpenseTracker };
