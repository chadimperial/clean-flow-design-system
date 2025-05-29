
import React, { useState } from 'react';
import { Search, Plus, Filter, Building2, Phone, Mail, MapPin, Star, Calendar, DollarSign, AlertTriangle, Users, TrendingUp, FileText, MessageSquare, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClientCard } from '@/components/ClientCard';
import { ClientProfile } from '@/components/ClientProfile';
import { CreateClientModal } from '@/components/CreateClientModal';
import { LeadPipeline } from '@/components/LeadPipeline';

const clients = [
  {
    id: "1",
    name: "Sunshine Office Complex",
    industry: "Commercial Real Estate",
    status: "active" as const,
    contactPerson: "Sarah Johnson",
    contactTitle: "Property Manager",
    phone: "(555) 123-4567",
    email: "sarah@sunshineoffice.com",
    address: "123 Business Park, Downtown",
    contractValue: 15000,
    servicesThisMonth: 12,
    lastService: "2 days ago",
    nextService: "Tomorrow",
    satisfaction: 4.8,
    paymentStatus: "current" as const,
    isVIP: true,
    logo: null
  },
  {
    id: "2",
    name: "Metro Hospital",
    industry: "Healthcare",
    status: "active" as const,
    contactPerson: "Dr. Michael Chen",
    contactTitle: "Facilities Director",
    phone: "(555) 234-5678",
    email: "mchen@metrohospital.com",
    address: "456 Health Plaza",
    contractValue: 25000,
    servicesThisMonth: 20,
    lastService: "1 day ago",
    nextService: "Today",
    satisfaction: 4.9,
    paymentStatus: "current" as const,
    isVIP: true,
    logo: null
  },
  {
    id: "3",
    name: "TechStart Inc",
    industry: "Technology",
    status: "new" as const,
    contactPerson: "Alex Rodriguez",
    contactTitle: "Office Manager",
    phone: "(555) 345-6789",
    email: "alex@techstart.com",
    address: "789 Innovation Drive",
    contractValue: 8000,
    servicesThisMonth: 4,
    lastService: "1 week ago",
    nextService: "Next Monday",
    satisfaction: 4.5,
    paymentStatus: "current" as const,
    isVIP: false,
    logo: null
  },
  {
    id: "4",
    name: "Downtown Restaurant Group",
    industry: "Food Service",
    status: "at-risk" as const,
    contactPerson: "Maria Garcia",
    contactTitle: "Operations Manager",
    phone: "(555) 456-7890",
    email: "maria@downtownrestaurants.com",
    address: "321 Culinary Street",
    contractValue: 12000,
    servicesThisMonth: 6,
    lastService: "2 weeks ago",
    nextService: "Overdue",
    satisfaction: 3.8,
    paymentStatus: "overdue" as const,
    isVIP: false,
    logo: null
  }
];

const ClientCRM = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.industry.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusStats = () => {
    return {
      total: clients.length,
      active: clients.filter(c => c.status === 'active').length,
      vip: clients.filter(c => c.isVIP).length,
      atRisk: clients.filter(c => c.status === 'at-risk').length,
      totalRevenue: clients.reduce((sum, c) => sum + c.contractValue, 0)
    };
  };

  const stats = getStatusStats();

  if (selectedClient) {
    const client = clients.find(c => c.id === selectedClient);
    if (client) {
      return (
        <ClientProfile
          client={client}
          onBack={() => setSelectedClient(null)}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-6 p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Client CRM</h1>
            <p className="text-gray-600">Manage your client relationships and grow your business</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button onClick={() => setShowCreateModal(true)} className="bg-primary hover:bg-primary/90 shadow-md">
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Clients</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Clients</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">VIP Clients</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.vip}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">At Risk</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.atRisk}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-gray-200 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Building2 className="h-4 w-4 mr-2" />
              Client Overview
            </TabsTrigger>
            <TabsTrigger value="pipeline" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              Sales Pipeline
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Search and Filters */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search clients, contacts, or industry..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Clients</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="vip">VIP</SelectItem>
                      <SelectItem value="at-risk">At Risk</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Client Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredClients.map((client) => (
                <ClientCard
                  key={client.id}
                  client={client}
                  onSelect={() => setSelectedClient(client.id)}
                />
              ))}
            </div>

            {filteredClients.length === 0 && (
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardContent className="p-12 text-center">
                  <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No clients found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                  <Button onClick={() => setShowCreateModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Client
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="pipeline">
            <LeadPipeline />
          </TabsContent>
        </Tabs>

        {/* Create Client Modal */}
        <CreateClientModal
          open={showCreateModal}
          onOpenChange={setShowCreateModal}
        />
      </div>
    </div>
  );
};

export default ClientCRM;
