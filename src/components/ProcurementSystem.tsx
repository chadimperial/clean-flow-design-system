
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  Users, 
  FileText, 
  TrendingUp,
  Plus,
  Edit,
  Eye
} from 'lucide-react';

const ProcurementSystem = () => {
  const purchaseOrders = [
    {
      id: 'PO-2024-001',
      supplier: 'ChemCorp Solutions',
      date: '2024-06-01',
      amount: 2450.00,
      status: 'Pending Approval',
      items: 5
    },
    {
      id: 'PO-2024-002',
      supplier: 'SupplyPro Ltd',
      date: '2024-05-28',
      amount: 1280.00,
      status: 'Approved',
      items: 3
    },
    {
      id: 'PO-2024-003',
      supplier: 'ProClean Industries',
      date: '2024-05-25',
      amount: 890.00,
      status: 'Delivered',
      items: 2
    }
  ];

  const suppliers = [
    {
      name: 'ChemCorp Solutions',
      contact: 'John Smith',
      email: 'john@chemcorp.com',
      phone: '+1 (555) 123-4567',
      rating: 4.8,
      orders: 12,
      totalSpent: 45600
    },
    {
      name: 'SupplyPro Ltd',
      contact: 'Sarah Johnson',
      email: 'sarah@supplypro.com',
      phone: '+1 (555) 987-6543',
      rating: 4.6,
      orders: 8,
      totalSpent: 23400
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Approval': return 'bg-orange-100 text-orange-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Procurement Management</h2>
          <p className="text-gray-600">Manage purchase orders and supplier relationships</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create PO
        </Button>
      </div>

      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="analytics">Cost Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Orders</CardTitle>
              <CardDescription>Track and manage all purchase orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {purchaseOrders.map((po) => (
                  <Card key={po.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold">{po.id}</h4>
                            <Badge className={getStatusColor(po.status)}>
                              {po.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{po.supplier}</p>
                          <p className="text-sm text-gray-600">{po.items} items • {po.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">${po.amount.toFixed(2)}</p>
                          <div className="flex gap-2 mt-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Management</CardTitle>
              <CardDescription>Manage supplier relationships and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {suppliers.map((supplier, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2">{supplier.name}</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p><span className="font-medium">Contact:</span> {supplier.contact}</p>
                              <p><span className="font-medium">Email:</span> {supplier.email}</p>
                              <p><span className="font-medium">Phone:</span> {supplier.phone}</p>
                            </div>
                            <div>
                              <p><span className="font-medium">Rating:</span> ⭐ {supplier.rating}/5</p>
                              <p><span className="font-medium">Orders:</span> {supplier.orders}</p>
                              <p><span className="font-medium">Total Spent:</span> ${supplier.totalSpent.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Contact
                          </Button>
                          <Button size="sm">
                            Create PO
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Cost Analytics</CardTitle>
              <CardDescription>Procurement spending analysis and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">Cost analytics coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { ProcurementSystem };
