
import React, { useState } from 'react';
import { Plus, Eye, Phone, Mail, Calendar, DollarSign, User, Building2, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const pipelineStages = [
  { id: 'lead', name: 'Lead', color: 'bg-blue-100 text-blue-800' },
  { id: 'qualified', name: 'Qualified', color: 'bg-purple-100 text-purple-800' },
  { id: 'quoted', name: 'Quoted', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'negotiation', name: 'Negotiation', color: 'bg-orange-100 text-orange-800' },
  { id: 'won', name: 'Won', color: 'bg-green-100 text-green-800' },
  { id: 'lost', name: 'Lost', color: 'bg-red-100 text-red-800' }
];

const leads = [
  {
    id: '1',
    companyName: 'Acme Corporation',
    contactPerson: 'John Smith',
    email: 'john@acme.com',
    phone: '(555) 123-4567',
    stage: 'qualified',
    value: 15000,
    probability: 70,
    source: 'Website',
    industry: 'Technology',
    lastContact: '2 days ago',
    nextFollowUp: 'Tomorrow'
  },
  {
    id: '2',
    companyName: 'Global Manufacturing',
    contactPerson: 'Sarah Johnson',
    email: 'sarah@global.com',
    phone: '(555) 234-5678',
    stage: 'quoted',
    value: 25000,
    probability: 85,
    source: 'Referral',
    industry: 'Manufacturing',
    lastContact: '1 day ago',
    nextFollowUp: 'Next week'
  },
  {
    id: '3',
    companyName: 'City Medical Center',
    contactPerson: 'Dr. Mike Wilson',
    email: 'mwilson@citymedical.com',
    phone: '(555) 345-6789',
    stage: 'negotiation',
    value: 35000,
    probability: 90,
    source: 'Cold Call',
    industry: 'Healthcare',
    lastContact: '3 hours ago',
    nextFollowUp: 'Today'
  },
  {
    id: '4',
    companyName: 'Downtown Retailers',
    contactPerson: 'Lisa Chen',
    email: 'lisa@downtown.com',
    phone: '(555) 456-7890',
    stage: 'lead',
    value: 8000,
    probability: 30,
    source: 'LinkedIn',
    industry: 'Retail',
    lastContact: '1 week ago',
    nextFollowUp: 'Overdue'
  }
];

export const LeadPipeline: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const getLeadsByStage = (stageId: string) => {
    return leads.filter(lead => lead.stage === stageId);
  };

  const getTotalValue = () => {
    return leads.reduce((sum, lead) => sum + lead.value, 0);
  };

  const getWeightedValue = () => {
    return leads.reduce((sum, lead) => sum + (lead.value * lead.probability / 100), 0);
  };

  const getConversionRate = () => {
    const wonLeads = leads.filter(l => l.stage === 'won').length;
    const totalLeads = leads.length;
    return totalLeads > 0 ? (wonLeads / totalLeads * 100) : 0;
  };

  return (
    <div className="space-y-6">
      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Pipeline</p>
                <p className="text-2xl font-bold text-gray-900">${getTotalValue().toLocaleString()}</p>
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
                <p className="text-sm text-gray-600">Weighted Value</p>
                <p className="text-2xl font-bold text-gray-900">${getWeightedValue().toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Leads</p>
                <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{getConversionRate().toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Board */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Sales Pipeline</CardTitle>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            {pipelineStages.map((stage) => {
              const stageLeads = getLeadsByStage(stage.id);
              const stageValue = stageLeads.reduce((sum, lead) => sum + lead.value, 0);
              
              return (
                <div key={stage.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{stage.name}</h3>
                    <Badge className={stage.color}>
                      {stageLeads.length}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    ${stageValue.toLocaleString()}
                  </div>

                  <div className="space-y-3 min-h-[400px]">
                    {stageLeads.map((lead) => (
                      <Card key={lead.id} className="bg-gray-50 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-semibold text-gray-900 text-sm">{lead.companyName}</h4>
                              <p className="text-xs text-gray-600">{lead.industry}</p>
                            </div>

                            <div className="flex items-center gap-2">
                              <User className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-600">{lead.contactPerson}</span>
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-600">Value:</span>
                                <span className="text-xs font-medium">${lead.value.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-600">Probability:</span>
                                <span className="text-xs font-medium">{lead.probability}%</span>
                              </div>
                            </div>

                            <Progress value={lead.probability} className="h-1" />

                            <div className="flex justify-between items-center text-xs text-gray-500">
                              <span>Last: {lead.lastContact}</span>
                              <span className={lead.nextFollowUp === 'Overdue' ? 'text-red-600' : ''}>
                                Next: {lead.nextFollowUp}
                              </span>
                            </div>

                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                <Phone className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                <Mail className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                <Calendar className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
