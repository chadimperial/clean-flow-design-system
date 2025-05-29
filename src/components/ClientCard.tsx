
import React from 'react';
import { Building2, Phone, Mail, MapPin, Star, Calendar, DollarSign, Users, Eye, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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

interface ClientCardProps {
  client: Client;
  onSelect: () => void;
}

export const ClientCard: React.FC<ClientCardProps> = ({ client, onSelect }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'at-risk': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className="bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 cursor-pointer group">
      <CardContent className="p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              {client.logo ? (
                <img src={client.logo} alt={client.name} className="w-full h-full rounded-lg object-cover" />
              ) : (
                <Building2 className="h-6 w-6" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors">
                {client.name}
              </h3>
              <p className="text-sm text-gray-600">{client.industry}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            {client.isVIP && (
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 font-medium">
                <Star className="h-3 w-3 mr-1 fill-current" />
                VIP
              </Badge>
            )}
            <Badge className={`font-medium ${getStatusColor(client.status)}`}>
              {client.status === 'at-risk' ? 'At Risk' : client.status.charAt(0).toUpperCase() + client.status.slice(1)}
            </Badge>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="font-medium text-gray-900">{client.contactPerson}</span>
            <span className="text-gray-500">• {client.contactTitle}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-4 w-4 text-gray-400" />
            <span>{client.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="h-4 w-4 text-gray-400" />
            <span>{client.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{client.address}</span>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-xl font-bold text-primary">${client.contractValue.toLocaleString()}</p>
            <p className="text-xs text-gray-600">Contract Value</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-green-600">{client.servicesThisMonth}</p>
            <p className="text-xs text-gray-600">Services This Month</p>
          </div>
        </div>

        {/* Status Information */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Last Service:</span>
            <span className="text-sm font-medium text-gray-900">{client.lastService}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Next Service:</span>
            <span className={`text-sm font-medium ${
              client.nextService === 'Overdue' ? 'text-red-600' : 'text-gray-900'
            }`}>
              {client.nextService}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Satisfaction:</span>
            <div className="flex items-center gap-1">
              {renderStars(client.satisfaction)}
              <span className="text-sm font-medium text-gray-900 ml-1">{client.satisfaction}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Payment:</span>
            <Badge className={`text-xs ${getPaymentStatusColor(client.paymentStatus)}`}>
              {client.paymentStatus.charAt(0).toUpperCase() + client.paymentStatus.slice(1)}
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={onSelect} 
            className="flex-1 bg-primary hover:bg-primary/90 text-white"
            size="sm"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Profile
          </Button>
          <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50">
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50">
            <Phone className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
