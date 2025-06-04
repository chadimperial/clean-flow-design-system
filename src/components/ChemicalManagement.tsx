
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FlaskConical, 
  AlertTriangle, 
  Shield, 
  FileText,
  Plus,
  Calculator,
  Droplets
} from 'lucide-react';

const ChemicalManagement = () => {
  const chemicals = [
    {
      id: 1,
      name: 'Heavy Duty Degreaser',
      category: 'Cleaning Agent',
      hazardClass: 'Corrosive',
      concentration: '25%',
      dilutionRatio: '1:10',
      currentStock: 45,
      unit: 'Gallons',
      location: 'Hazmat Storage A',
      msdsDate: '2024-01-15',
      expiryDate: '2025-01-15'
    },
    {
      id: 2,
      name: 'Bleach Solution',
      category: 'Disinfectant',
      hazardClass: 'Oxidizing',
      concentration: '12%',
      dilutionRatio: '1:20',
      currentStock: 28,
      unit: 'Gallons',
      location: 'Hazmat Storage B',
      msdsDate: '2024-02-10',
      expiryDate: '2024-12-10'
    }
  ];

  const safetyIncidents = [
    {
      date: '2024-05-20',
      type: 'Minor Spill',
      chemical: 'Heavy Duty Degreaser',
      description: 'Small spill during transfer, contained immediately',
      action: 'Reviewed handling procedures with staff'
    }
  ];

  const getHazardColor = (hazardClass: string) => {
    switch (hazardClass) {
      case 'Corrosive': return 'bg-red-100 text-red-800';
      case 'Oxidizing': return 'bg-orange-100 text-orange-800';
      case 'Toxic': return 'bg-purple-100 text-purple-800';
      case 'Flammable': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Chemical & Hazmat Management</h2>
          <p className="text-gray-600">Safely manage chemicals with compliance tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calculator className="w-4 h-4 mr-2" />
            Dilution Calculator
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Chemical
          </Button>
        </div>
      </div>

      <Tabs defaultValue="inventory" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="inventory">Chemical Inventory</TabsTrigger>
          <TabsTrigger value="safety">Safety & Compliance</TabsTrigger>
          <TabsTrigger value="formulations">Formulations</TabsTrigger>
          <TabsTrigger value="waste">Waste Management</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory">
          <div className="grid gap-6">
            {chemicals.map((chemical) => (
              <Card key={chemical.id} className="border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FlaskConical className="w-6 h-6 text-orange-600" />
                        <h3 className="font-semibold text-lg">{chemical.name}</h3>
                        <Badge className={getHazardColor(chemical.hazardClass)}>
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {chemical.hazardClass}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{chemical.category} • {chemical.concentration} concentration</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">{chemical.currentStock} {chemical.unit}</p>
                      <p className="text-sm text-gray-600">{chemical.location}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Droplets className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                      <p className="text-sm font-medium text-blue-600">Dilution Ratio</p>
                      <p className="font-bold text-blue-900">{chemical.dilutionRatio}</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <FileText className="w-5 h-5 text-green-600 mx-auto mb-1" />
                      <p className="text-sm font-medium text-green-600">MSDS Updated</p>
                      <p className="font-bold text-green-900">{chemical.msdsDate}</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                      <p className="text-sm font-medium text-orange-600">Expires</p>
                      <p className="font-bold text-orange-900">{chemical.expiryDate}</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <Shield className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                      <p className="text-sm font-medium text-purple-600">Safety Level</p>
                      <p className="font-bold text-purple-900">Level 3</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View MSDS
                      </Button>
                      <Button variant="outline" size="sm">
                        Calculate Mix
                      </Button>
                    </div>
                    <Button size="sm">
                      Update Stock
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="safety">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Safety Incidents</CardTitle>
                <CardDescription>Track and manage chemical safety incidents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {safetyIncidents.map((incident, index) => (
                    <Card key={index} className="border">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <AlertTriangle className="w-4 h-4 text-orange-600" />
                              <h4 className="font-semibold">{incident.type}</h4>
                              <Badge variant="outline">{incident.date}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">Chemical: {incident.chemical}</p>
                            <p className="text-sm text-gray-600 mb-2">{incident.description}</p>
                            <p className="text-sm"><span className="font-medium">Action Taken:</span> {incident.action}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
                <CardDescription>Regulatory compliance tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">Compliance tracking coming soon...</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="formulations">
          <Card>
            <CardHeader>
              <CardTitle>Custom Formulations</CardTitle>
              <CardDescription>Manage custom chemical blends and recipes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">Formulation management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="waste">
          <Card>
            <CardHeader>
              <CardTitle>Waste Disposal</CardTitle>
              <CardDescription>Track chemical waste and disposal procedures</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">Waste management tracking coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { ChemicalManagement };
