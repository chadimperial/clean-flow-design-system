
import React, { useState } from 'react';
import { ArrowLeft, Building2, Star, Phone, Mail, MapPin, Calendar, DollarSign, FileText, MessageSquare, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

interface Client {
  id: string;
  name: string;
  industry: string;
  status: 'active' | 'inactive' | 'new' | 'at-risk' | 'vip';
  contactPerson: string;
  contactTitle: string;
  phone: string;
  email: string;
  address: string;
  contractValue: number;
  servicesThisMonth: number;
  lastService: string;
  nextService: string;
  satisfaction: number;
  paymentStatus: 'current' | 'overdue' | 'pending';
  isVIP: boolean;
  logo?: string | null;
}

interface ClientProfileProps {
  client: Client;
  onBack: () => void;
}

export const ClientProfile: React.FC<ClientProfileProps> = ({ client, onBack }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'at-risk': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center text-white">
              {client.logo ? (
                <img src={client.logo} alt={client.name} className="w-full h-full rounded-lg object-cover" />
              ) : (
                <Building2 className="h-8 w-8" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
                {client.isVIP && (
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    VIP Client
                  </Badge>
                )}
                <Badge className={getStatusColor(client.status)}>
                  {client.status === 'at-risk' ? 'At Risk' : client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                </Badge>
              </div>
              <p className="text-gray-600">{client.industry}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Service
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">${client.contractValue.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Contract Value</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Calendar className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{client.servicesThisMonth}</p>
              <p className="text-sm text-gray-600">Services This Month</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="flex justify-center mb-2">
                {renderStars(client.satisfaction)}
              </div>
              <p className="text-2xl font-bold text-yellow-600">{client.satisfaction}</p>
              <p className="text-sm text-gray-600">Satisfaction</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">87%</p>
              <p className="text-sm text-gray-600">Retention Score</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-gray-200 p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Service History</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Key Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      {client.contactPerson.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{client.contactPerson}</h4>
                      <p className="text-sm text-gray-600">{client.contactTitle}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Phone className="h-3 w-3" />
                          {client.phone}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Mail className="h-3 w-3" />
                          {client.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Site Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Site Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Primary Location</label>
                      <p className="text-gray-900">{client.address}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Building Type</label>
                      <p className="text-gray-900">Commercial Office Complex</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Square Footage</label>
                      <p className="text-gray-900">15,000 sq ft</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Access Instructions</label>
                      <p className="text-gray-900">Main entrance, check in with security</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Service Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Service Preferences & Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Cleaning Specifications</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service Days:</span>
                        <span className="font-medium">Monday, Wednesday, Friday</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Preferred Time:</span>
                        <span className="font-medium">8:00 PM - 6:00 AM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Special Requirements:</span>
                        <span className="font-medium">Green cleaning products</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Staff Preferences</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Preferred Team:</span>
                        <span className="font-medium">Team A (John, Maria)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Background Check:</span>
                        <span className="font-medium">Required</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Language:</span>
                        <span className="font-medium">English</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Service History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Service timeline would go here */}
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Service history will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Billing Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Billing Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-3xl font-bold text-green-600">$0.00</p>
                      <p className="text-sm text-gray-600">Current Balance</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Terms:</span>
                        <span className="font-medium">Net 30</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Auto-billing:</span>
                        <span className="font-medium">Enabled</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="font-medium">ACH Transfer</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contract Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contract Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Contract Start:</span>
                        <span className="font-medium">Jan 1, 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Contract End:</span>
                        <span className="font-medium">Dec 31, 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service Frequency:</span>
                        <span className="font-medium">3x per week</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Rate:</span>
                        <span className="font-medium">${(client.contractValue / 12).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Contract Progress</span>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Customer Satisfaction</span>
                        <span className="text-sm font-medium">{client.satisfaction}/5.0</span>
                      </div>
                      <Progress value={(client.satisfaction / 5) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Service Quality</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Issue Resolution</span>
                        <span className="text-sm font-medium">98%</span>
                      </div>
                      <Progress value={98} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Relationship Health */}
              <Card>
                <CardHeader>
                  <CardTitle>Relationship Health Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 relative">
                      <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-green-600">87</p>
                          <p className="text-sm text-gray-600">Score</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-green-600 font-medium">Healthy Relationship</p>
                    <p className="text-sm text-gray-600 mt-2">
                      High satisfaction and engagement levels
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="communications">
            <Card>
              <CardHeader>
                <CardTitle>Communication History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Communication history will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
