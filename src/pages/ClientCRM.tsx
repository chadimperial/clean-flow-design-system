
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
import { useClients } from '@/hooks/useSupabaseQuery';
import { useQueryClient } from '@tanstack/react-query';

// Transform database client to match the expected interface
const transformClient = (dbClient: any) => {
  // Parse notes to extract additional information
  const notes = dbClient.notes || '';
  const notesLines = notes.split('\n');
  
  let industry = 'Other';
  let contactTitle = '';
  let serviceType = '';
  let contractValue = 0;
  let additionalNotes = '';

  notesLines.forEach((line: string) => {
    if (line.startsWith('Industry:')) {
      industry = line.replace('Industry:', '').trim();
    } else if (line.startsWith('Contact Title:')) {
      contactTitle = line.replace('Contact Title:', '').trim();
    } else if (line.startsWith('Service Type:')) {
      serviceType = line.replace('Service Type:', '').trim();
    } else if (line.startsWith('Contract Value:')) {
      const value = line.replace('Contract Value:', '').trim().replace(/[$,]/g, '');
      contractValue = parseFloat(value) || 0;
    } else if (line.startsWith('Notes:')) {
      additionalNotes = line.replace('Notes:', '').trim();
    }
  });

  return {
    id: dbClient.id,
    name: dbClient.name,
    industry,
    status: 'active' as const, // Default status
    contactPerson: dbClient.contact_person || '',
    contactTitle,
    phone: dbClient.phone || '',
    email: dbClient.email || '',
    address: dbClient.address || '',
    contractValue,
    servicesThisMonth: Math.floor(Math.random() * 20) + 1, // Random for now
    lastService: '2 days ago', // Default for now
    nextService: 'Tomorrow', // Default for now
    satisfaction: 4.5 + Math.random() * 0.5, // Random between 4.5-5.0
    paymentStatus: 'current' as const, // Default status
    isVIP: contractValue > 20000, // VIP if contract value > 20k
    logo: null
  };
};

const ClientCRM = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  
  const { data: dbClients = [], isLoading, error } = useClients();
  const queryClient = useQueryClient();

  // Transform database clients to match the expected interface
  const clients = dbClients.map(transformClient);

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

  const handleCreateModalClose = (wasCreated: boolean) => {
    setShowCreateModal(false);
    if (wasCreated) {
      // Refetch clients data when a new client is created
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    }
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading clients...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600">Error loading clients. Please try again.</p>
        </div>
      </div>
    );
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
          onOpenChange={handleCreateModalClose}
        />
      </div>
    </div>
  );
};

export default ClientCRM;
