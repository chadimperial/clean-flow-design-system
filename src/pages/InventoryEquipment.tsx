
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Package, Wrench, ShoppingCart, FlaskConical, BarChart } from 'lucide-react';
import { InventoryDashboard } from '@/components/InventoryDashboard';
import { StockManagement } from '@/components/StockManagement';
import { EquipmentManagement } from '@/components/EquipmentManagement';
import { ProcurementSystem } from '@/components/ProcurementSystem';
import { ChemicalManagement } from '@/components/ChemicalManagement';
import { InventoryAnalytics } from '@/components/InventoryAnalytics';

const InventoryEquipment = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inventory & Equipment</h1>
            <p className="text-gray-600 mt-1">Manage inventory, equipment, and supplies</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Package className="w-4 h-4 mr-2" />
              Quick Reorder
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white p-1 rounded-lg shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="equipment" className="flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              Equipment
            </TabsTrigger>
            <TabsTrigger value="procurement" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Procurement
            </TabsTrigger>
            <TabsTrigger value="chemicals" className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4" />
              Chemicals
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <InventoryDashboard />
          </TabsContent>

          <TabsContent value="inventory">
            <StockManagement />
          </TabsContent>

          <TabsContent value="equipment">
            <EquipmentManagement />
          </TabsContent>

          <TabsContent value="procurement">
            <ProcurementSystem />
          </TabsContent>

          <TabsContent value="chemicals">
            <ChemicalManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <InventoryAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InventoryEquipment;
