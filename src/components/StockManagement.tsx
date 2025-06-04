
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Package, 
  Plus, 
  Edit, 
  Trash, 
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin
} from 'lucide-react';

const StockManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories', count: 1247 },
    { id: 'chemicals', name: 'Chemicals', count: 342 },
    { id: 'supplies', name: 'Supplies', count: 458 },
    { id: 'packaging', name: 'Packaging', count: 234 },
    { id: 'tools', name: 'Tools & Equipment', count: 156 },
    { id: 'maintenance', name: 'Maintenance', count: 57 }
  ];

  const stockItems = [
    {
      id: 1,
      name: 'Premium Laundry Detergent',
      category: 'Chemicals',
      sku: 'DET-001',
      currentStock: 145,
      minStock: 100,
      maxStock: 500,
      unit: 'Gallons',
      costPerUnit: 12.50,
      location: 'Warehouse A-1',
      supplier: 'ChemCorp Solutions',
      lastRestocked: '2024-05-20',
      status: 'In Stock'
    },
    {
      id: 2,
      name: 'Industrial Fabric Softener',
      category: 'Chemicals',
      sku: 'SOF-002',
      currentStock: 45,
      minStock: 75,
      maxStock: 300,
      unit: 'Gallons',
      costPerUnit: 8.75,
      location: 'Warehouse A-2',
      supplier: 'CleanSolutions Inc',
      lastRestocked: '2024-05-15',
      status: 'Low Stock'
    },
    {
      id: 3,
      name: 'Heavy Duty Stain Remover',
      category: 'Chemicals',
      sku: 'STN-003',
      currentStock: 8,
      minStock: 25,
      maxStock: 150,
      unit: 'Gallons',
      costPerUnit: 15.25,
      location: 'Warehouse A-3',
      supplier: 'ProClean Industries',
      lastRestocked: '2024-04-28',
      status: 'Critical'
    },
    {
      id: 4,
      name: 'Plastic Hangers (Pack of 100)',
      category: 'Supplies',
      sku: 'HNG-001',
      currentStock: 25,
      minStock: 50,
      maxStock: 200,
      unit: 'Packs',
      costPerUnit: 18.00,
      location: 'Warehouse B-1',
      supplier: 'SupplyPro Ltd',
      lastRestocked: '2024-05-10',
      status: 'Low Stock'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-orange-100 text-orange-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Out of Stock': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Stock': return <CheckCircle className="w-4 h-4" />;
      case 'Low Stock': return <Clock className="w-4 h-4" />;
      case 'Critical': return <AlertTriangle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Import CSV
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      <Tabs defaultValue="catalog" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="catalog">Product Catalog</TabsTrigger>
          <TabsTrigger value="receiving">Receiving</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="movements">Movements</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Categories Sidebar */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                        selectedCategory === category.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Items Grid */}
            <div className="lg:col-span-3 space-y-4">
              {stockItems.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <Badge className={getStatusColor(item.status)}>
                            {getStatusIcon(item.status)}
                            {item.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">SKU: {item.sku} • {item.category}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {item.location}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Current Stock</p>
                        <p className="text-lg font-semibold">{item.currentStock} {item.unit}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Min/Max</p>
                        <p className="text-sm">{item.minStock} / {item.maxStock}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Cost per Unit</p>
                        <p className="text-lg font-semibold">${item.costPerUnit}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Value</p>
                        <p className="text-lg font-semibold">${(item.currentStock * item.costPerUnit).toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Stock Level Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Stock Level</span>
                        <span>{Math.round((item.currentStock / item.maxStock) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            item.currentStock <= item.minStock ? 'bg-red-500' : 
                            item.currentStock <= item.minStock * 1.5 ? 'bg-orange-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min((item.currentStock / item.maxStock) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Supplier: {item.supplier}</span>
                      <span>Last restocked: {item.lastRestocked}</span>
                    </div>

                    {item.currentStock <= item.minStock && (
                      <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-orange-600" />
                            <span className="text-sm font-medium text-orange-800">Reorder recommended</span>
                          </div>
                          <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                            Create PO
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="receiving">
          <Card>
            <CardHeader>
              <CardTitle>Receiving & Put-Away</CardTitle>
              <CardDescription>Process incoming inventory and assign locations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">Receiving interface coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations">
          <Card>
            <CardHeader>
              <CardTitle>Storage Locations</CardTitle>
              <CardDescription>Manage warehouse locations and bin assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">Location management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Movements</CardTitle>
              <CardDescription>Track all inventory transactions and adjustments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">Movement tracking coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { StockManagement };
