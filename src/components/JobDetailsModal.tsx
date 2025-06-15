
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Building2, 
  DollarSign, 
  Star,
  MessageCircle,
  Navigation,
  Edit,
  CheckCircle,
  Circle,
  AlertTriangle
} from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface JobDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  job: any
  onUpdate?: () => void
}

export function JobDetailsModal({ isOpen, onClose, job, onUpdate }: JobDetailsModalProps) {
  const { toast } = useToast()
  const [isUpdating, setIsUpdating] = useState(false)

  if (!job) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500 text-white'
      case 'in-progress': return 'bg-orange-500 text-white'
      case 'scheduled': return 'bg-blue-500 text-white'
      case 'cancelled': return 'bg-red-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'normal': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleStatusUpdate = async () => {
    setIsUpdating(true)
    
    try {
      let newStatus = job.status
      
      if (job.status === "scheduled") {
        newStatus = "in-progress"
      } else if (job.status === "in-progress") {
        newStatus = "completed"
      }

      const { error } = await supabase
        .from('jobs')
        .update({ status: newStatus })
        .eq('id', job.id)

      if (error) throw error

      toast({
        title: "Success",
        description: `Job ${newStatus === "in-progress" ? "started" : "completed"} successfully!`,
      })

      if (onUpdate) {
        onUpdate()
      }
    } catch (error) {
      console.error('Error updating job status:', error)
      toast({
        title: "Error",
        description: "Failed to update job status. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDirections = () => {
    if (job.address) {
      const encodedAddress = encodeURIComponent(job.address)
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
      window.open(googleMapsUrl, '_blank')
    } else {
      toast({
        title: "No Address",
        description: "No address available for this job.",
        variant: "destructive",
      })
    }
  }

  const StatusIcon = job.status === "completed" ? CheckCircle : Circle

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{job.client}</h1>
              <p className="text-lg text-gray-600">{job.serviceType}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Priority */}
          <div className="flex items-center gap-3">
            <Badge className={getStatusColor(job.status)}>
              {job.status}
            </Badge>
            {job.priority !== 'normal' && (
              <Badge variant="outline" className={getPriorityColor(job.priority)}>
                <AlertTriangle className="h-3 w-3 mr-1" />
                {job.priority} priority
              </Badge>
            )}
          </div>

          {/* Job Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">Scheduled Time</span>
                </div>
                <p className="text-xl font-bold text-blue-900">{job.time}</p>
                <p className="text-sm text-gray-600">
                  {job.scheduledDate ? new Date(job.scheduledDate).toLocaleDateString() : 'No date set'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-green-600 mb-2">
                  <Calendar className="h-5 w-5" />
                  <span className="font-medium">Duration</span>
                </div>
                <p className="text-xl font-bold text-green-900">{job.duration}h</p>
                <p className="text-sm text-gray-600">Estimated time</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-purple-600 mb-2">
                  <User className="h-5 w-5" />
                  <span className="font-medium">Staff Assigned</span>
                </div>
                <p className="text-xl font-bold text-purple-900">{job.staff.length}</p>
                <p className="text-sm text-gray-600">Team members</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-yellow-600 mb-2">
                  <DollarSign className="h-5 w-5" />
                  <span className="font-medium">Service Fee</span>
                </div>
                <p className="text-xl font-bold text-yellow-900">
                  {job.price ? `$${Number(job.price).toLocaleString()}` : 'TBD'}
                </p>
                <p className="text-sm text-gray-600">Total amount</p>
              </CardContent>
            </Card>
          </div>

          {/* Location Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-600" />
                Location Details
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-700">Service Address</p>
                  <p className="text-gray-600">{job.address || 'No address provided'}</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleDirections}
                  className="w-full sm:w-auto"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Service Details */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-gray-600" />
                Service Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-700 mb-1">Service Type</p>
                  <p className="text-gray-600">{job.serviceType}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">Service Title</p>
                  <p className="text-gray-600">{job.service}</p>
                </div>
                {job.description && (
                  <div className="md:col-span-2">
                    <p className="font-medium text-gray-700 mb-1">Description</p>
                    <p className="text-gray-600">{job.description}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Staff Assignment */}
          {job.staff.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-600" />
                  Assigned Staff
                </h3>
                <div className="flex flex-wrap gap-3">
                  {job.staff.map((staffName: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-indigo-100 text-indigo-700 text-sm">
                          {staffName.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-900">{staffName}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <div className="flex gap-3">
              <Button variant="outline" size="lg">
                <Edit className="h-4 w-4 mr-2" />
                Edit Job
              </Button>
              <Button variant="outline" size="lg">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message Client
              </Button>
              <Button variant="outline" size="lg">
                <Phone className="h-4 w-4 mr-2" />
                Call Client
              </Button>
            </div>
            
            {job.status !== "completed" && job.status !== "cancelled" && (
              <Button 
                size="lg" 
                className="bg-indigo-600 hover:bg-indigo-700"
                onClick={handleStatusUpdate}
                disabled={isUpdating}
              >
                <StatusIcon className="h-4 w-4 mr-2" />
                {isUpdating ? "Updating..." : 
                 job.status === "scheduled" ? "Start Job" : 
                 job.status === "in-progress" ? "Complete Job" : "Update Status"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
