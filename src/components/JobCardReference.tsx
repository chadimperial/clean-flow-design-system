
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Building2, 
  Clock, 
  Calendar, 
  Star, 
  User, 
  MapPin, 
  MessageCircle, 
  Phone 
} from "lucide-react"

interface JobCardReferenceProps {
  job: any
  onUpdate: () => void
  onViewDetails: (job: any) => void
}

export function JobCardReference({ job, onUpdate, onViewDetails }: JobCardReferenceProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'in-progress': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{job.client}</h3>
              <p className="text-gray-600">{job.service}</p>
            </div>
          </div>
          <Badge className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(job.status)}`}>
            {job.status}
          </Badge>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Time */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Time</span>
            </div>
            <p className="text-blue-900 font-semibold">{job.time}</p>
          </div>

          {/* Duration */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">Duration</span>
            </div>
            <p className="text-green-900 font-semibold">{job.duration}h</p>
          </div>

          {/* Service */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-yellow-600 mb-2">
              <Star className="h-4 w-4" />
              <span className="text-sm font-medium">Service</span>
            </div>
            <p className="text-yellow-900 font-semibold">{job.service}</p>
          </div>

          {/* Staff */}
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-purple-600 mb-2">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">Staff</span>
            </div>
            <p className="text-purple-900 font-semibold">{job.staff.length || 0}</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{job.address}</span>
            </div>
            {job.price && (
              <div className="text-xl font-bold text-green-600">
                ${Number(job.price).toLocaleString()}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <MessageCircle className="h-4 w-4" />
              Message
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Phone className="h-4 w-4" />
              Call
            </Button>
            <Button 
              size="sm" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={() => onViewDetails(job)}
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
