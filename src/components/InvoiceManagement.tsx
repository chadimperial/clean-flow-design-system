
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  Mail, 
  Download, 
  Eye,
  Edit,
  MoreHorizontal,
  DollarSign,
  Calendar,
  User
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreateInvoiceModal } from '@/components/CreateInvoiceModal';

const InvoiceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const invoices = [
    {
      id: 'INV-2024-001',
      client: 'Downtown Office Complex',
      amount: 3200,
      status: 'paid',
      dueDate: '2024-06-15',
      issueDate: '2024-06-01',
      services: ['Office Cleaning', 'Window Cleaning']
    },
    {
      id: 'INV-2024-002',
      client: 'City Hospital',
      amount: 4200,
      status: 'pending',
      dueDate: '2024-06-20',
      issueDate: '2024-06-05',
      services: ['Deep Cleaning', 'Floor Maintenance']
    },
    {
      id: 'INV-2024-003',
      client: 'Tech Solutions Inc',
      amount: 1850,
      status: 'overdue',
      dueDate: '2024-05-28',
      issueDate: '2024-05-14',
      services: ['Office Cleaning']
    },
    {
      id: 'INV-2024-004',
      client: 'Retail Chain Store',
      amount: 2750,
      status: 'draft',
      dueDate: '2024-06-25',
      issueDate: '2024-06-08',
      services: ['Store Cleaning', 'Carpet Cleaning']
    }
  ];

  const quotes = [
    {
      id: 'QUO-2024-015',
      client: 'New Corporate Center',
      amount: 5500,
      status: 'pending',
      expiryDate: '2024-06-30',
      issueDate: '2024-06-05',
      services: ['Office Cleaning', 'Deep Cleaning', 'Window Cleaning']
    },
    {
      id: 'QUO-2024-016',
      client: 'Medical Plaza',
      amount: 3800,
      status: 'approved',
      expiryDate: '2024-06-25',
      issueDate: '2024-06-03',
      services: ['Medical Facility Cleaning']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return '✓';
      case 'pending': return '⏳';
      case 'overdue': return '⚠️';
      case 'draft': return '📝';
      case 'approved': return '✅';
      default: return '❓';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search invoices and quotes..."
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
          <Button onClick={() => setIsCreateModalOpen(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      </div>

      <Tabs defaultValue="invoices" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="quotes">Quotes</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="mt-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Invoice Management
              </CardTitle>
              <CardDescription>Manage and track all client invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{invoice.id}</h3>
                          <Badge className={getStatusColor(invoice.status)}>
                            {getStatusIcon(invoice.status)} {invoice.status}
                          </Badge>
                        </div>
                        <p className="text-gray-700 font-medium">{invoice.client}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            ${invoice.amount.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Due: {invoice.dueDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            Issued: {invoice.issueDate}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {invoice.services.map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quotes" className="mt-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Quote Management
              </CardTitle>
              <CardDescription>Create and manage service quotes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quotes.map((quote) => (
                  <div key={quote.id} className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{quote.id}</h3>
                          <Badge className={getStatusColor(quote.status)}>
                            {getStatusIcon(quote.status)} {quote.status}
                          </Badge>
                        </div>
                        <p className="text-gray-700 font-medium">{quote.client}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            ${quote.amount.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Expires: {quote.expiryDate}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {quote.services.map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {quote.status === 'approved' && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Convert to Invoice
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Quote
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateInvoiceModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
};

export { InvoiceManagement };
