
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Wrench, 
  Plus, 
  Edit, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Zap,
  DollarSign
} from 'lucide-react';

const EquipmentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const equipment = [
    {
      id: 1,
      name: 'Commercial Washer #1',
      type: 'Washer',
      model: 'UniMac UW60',
      serialNumber: 'UW60-2023-001',
      location: 'Main Floor - Bay 1',
      status: 'Operational',
      installDate: '2023-01-15',
      warrantyExpiry: '2026-01-15',
      lastMaintenance: '2024-05-15',
      nextMaintenance: '2024-06-15',
      utilizationRate: 87,
      energyConsumption: 45.2,
      maintenanceCost: 1250,
      efficiency: 92
    },
    {
      id: 2,
      name: 'Industrial Dryer #3',
      type: 'Dryer',
      model: 'Huebsch HT075',
      serialNumber: 'HT075-2023-003',
      location: 'Main Floor - Bay 3',
      status: 'Maintenance Due',
      installDate: '2023-02-20',
      warrantyExpiry: '2026-02-20',
      lastMaintenance: '2024-04-10',
      nextMaintenance: '2024-06-01',
      utilizationRate: 91,
      energyConsumption: 52.8,
      maintenanceCost: 890,
      efficiency: 89
    },
    {
      id: 3,
      name: 'Steam Press #2',
      type: 'Press',
      model: 'Forenta FP-2040',
      serialNumber: 'FP2040-2023-002',
      location: 'Finishing Area',
      status: 'Down for Repair',
      installDate: '2023-03-10',
      warrantyExpiry: '2026-03-10',
      lastMaintenance: '2024-05-20',
      nextMaintenance: '2024-06-20',
      utilizationRate: 45,
      energyConsumption: 28.5,
      maintenanceCost: 2150,
      efficiency: 78
    }
  ];

  const maintenanceSchedule = [
    {
      id: 1,
      equipmentName: 'Commercial Washer #1',
      type: 'Preventive',
      scheduledDate: '2024-06-15',
      description: 'Monthly filter cleaning and belt inspection',
      assignedTechnician: 'Mike Johnson',
      estimatedDuration: '2 hours',
      priority: 'Medium'
    },
    {
      id: 2,
      equipmentName: 'Industrial Dryer #3',
      type: 'Preventive',
      scheduledDate: '2024-06-01',
      description: 'Quarterly lint system cleaning and heating element check',
      assignedTechnician: 'Sarah Chen',
      estimatedDuration: '3 hours',
      priority: 'High'
    },
    {
      id: 3,
      equipmentName: 'Steam Press #2',
      type: 'Repair',
      scheduledDate: '2024-06-03',
      description: 'Replace damaged steam valve and test pressure system',
      assignedTechnician: 'David Rodriguez',
      estimatedDuration: '4 hours',
      priority: 'Critical'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Operational': return 'bg-green-100 text-green-800';
      case 'Maintenance Due': return 'bg-orange-100 text-orange-800';
      case 'Down for Repair': return 'bg-red-100 text-red-800';
      case 'Offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Operational': return <CheckCircle className="w-4 h-4" />;
      case 'Maintenance Due': return <Clock className="w-4 h-4" />;
      case 'Down for Repair': return <AlertTriangle className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search equipment..."
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
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Maintenance
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Equipment
          </Button>
        </div>
      </div>

      <Tabs defaultValue="equipment" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="equipment">Equipment Registry</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="equipment">
          <div className="grid gap-6">
            {equipment.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Wrench className="w-6 h-6 text-blue-600" />
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <Badge className={getStatusColor(item.status)}>
                          {getStatusIcon(item.status)}
                          {item.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{item.model} • SN: {item.serialNumber}</p>
                      <p className="text-sm text-gray-600">{item.location}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Calendar className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Settings className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-600">Utilization</span>
                      </div>
                      <p className="text-xl font-bold text-blue-900">{item.utilizationRate}%</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-600">Efficiency</span>
                      </div>
                      <p className="text-xl font-bold text-green-900">{item.efficiency}%</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Zap className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-medium text-orange-600">Energy (kWh)</span>
                      </div>
                      <p className="text-xl font-bold text-orange-900">{item.energyConsumption}</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <DollarSign className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-600">Maint. Cost</span>
                      </div>
                      <p className="text-xl font-bold text-purple-900">${item.maintenanceCost}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-600">Installation Date</p>
                      <p>{item.installDate}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Last Maintenance</p>
                      <p>{item.lastMaintenance}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Next Maintenance</p>
                      <p className={item.status === 'Maintenance Due' ? 'text-orange-600 font-semibold' : ''}>
                        {item.nextMaintenance}
                      </p>
                    </div>
                  </div>

                  {item.status === 'Maintenance Due' && (
                    <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-orange-600" />
                          <span className="text-sm font-medium text-orange-800">Maintenance overdue</span>
                        </div>
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                          Schedule Now
                        </Button>
                      </div>
                    </div>
                  )}

                  {item.status === 'Down for Repair' && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          <span className="text-sm font-medium text-red-800">Equipment requires immediate attention</span>
                        </div>
                        <Button size="sm" variant="destructive">
                          View Work Order
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Schedule</CardTitle>
              <CardDescription>Upcoming and overdue maintenance activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {maintenanceSchedule.map((maintenance) => (
                  <Card key={maintenance.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold">{maintenance.equipmentName}</h4>
                            <Badge className={getPriorityColor(maintenance.priority)}>
                              {maintenance.priority}
                            </Badge>
                            <Badge variant="outline">{maintenance.type}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{maintenance.description}</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Scheduled:</span> {maintenance.scheduledDate}
                            </div>
                            <div>
                              <span className="font-medium">Technician:</span> {maintenance.assignedTechnician}
                            </div>
                            <div>
                              <span className="font-medium">Duration:</span> {maintenance.estimatedDuration}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button size="sm">
                            Start Work
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

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Equipment Performance Analytics</CardTitle>
              <CardDescription>Utilization, efficiency, and cost analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">Performance analytics coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { EquipmentManagement };
