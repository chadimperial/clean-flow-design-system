
import { Clock, MapPin, User, CheckCircle, Circle, Phone, MessageCircle, Navigation, Edit, Copy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface JobCardProps {
  id: string
  client: string
  service: string
  time: string
  address: string
  staff: string[]
  status: "scheduled" | "in-progress" | "completed" | "overdue" | "cancelled"
  priority?: "urgent" | "normal" | "vip"
  serviceType?: string
  duration?: number
  completionPercentage?: number
  expanded?: boolean
}

export function JobCard({ 
  id, 
  client, 
  service, 
  time, 
  address, 
  staff, 
  status,
  priority = "normal",
  serviceType,
  duration,
  completionPercentage = 0,
  expanded = false
}: JobCardProps) {
  const statusConfig = {
    scheduled: { color: "bg-blue-500", text: "Scheduled", bgColor: "bg-blue-50", borderColor: "border-blue-500" },
    "in-progress": { color: "bg-orange-500", text: "In Progress", bgColor: "bg-orange-50", borderColor: "border-orange-500" },
    completed: { color: "bg-green-500", text: "Completed", bgColor: "bg-green-50", borderColor: "border-green-500" },
    overdue: { color: "bg-red-500", text: "Overdue", bgColor: "bg-red-50", borderColor: "border-red-500" },
    cancelled: { color: "bg-gray-500", text: "Cancelled", bgColor: "bg-gray-50", borderColor: "border-gray-500" }
  }

  const priorityConfig = {
    urgent: "border-l-4 border-l-red-500",
    vip: "border-l-4 border-l-yellow-500",
    normal: ""
  }

  const StatusIcon = status === "completed" ? CheckCircle : Circle

  const getServiceIcon = (serviceType?: string) => {
    switch (serviceType) {
      case "office-cleaning": return "🏢"
      case "medical-cleaning": return "🏥"
      case "restaurant-cleaning": return "🍽️"
      case "residential": return "🏠"
      default: return "🧹"
    }
  }

  return (
    <Card className={`hover:shadow-lg transition-all duration-200 ${priorityConfig[priority]} ${expanded ? "shadow-md" : "hover:shadow-md"}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{getServiceIcon(serviceType)}</div>
            <div>
              <CardTitle className="text-base font-semibold text-gray-900">{client}</CardTitle>
              <p className="text-sm text-gray-600">{service}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {priority === "urgent" && (
              <Badge className="bg-red-500 text-white text-xs">URGENT</Badge>
            )}
            {priority === "vip" && (
              <Badge className="bg-yellow-500 text-white text-xs">VIP</Badge>
            )}
            <Badge className={`${statusConfig[status].color} text-white`}>
              {statusConfig[status].text}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Time and Duration */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="font-medium">{time}</span>
            {duration && <span className="text-gray-500">({duration}h)</span>}
          </div>
          {status === "in-progress" && completionPercentage > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">{completionPercentage}%</span>
              <div className="w-16">
                <Progress value={completionPercentage} className="h-2" />
              </div>
            </div>
          )}
        </div>
        
        {/* Address */}
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="text-gray-700 truncate">{address}</span>
        </div>

        {/* Staff Assignment */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-500" />
            <div className="flex -space-x-2">
              {staff.slice(0, 3).map((person, index) => (
                <Avatar key={index} className="h-7 w-7 border-2 border-white ring-1 ring-gray-200">
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground font-semibold">
                    {person.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              ))}
              {staff.length > 3 && (
                <div className="h-7 w-7 bg-gray-100 border-2 border-white ring-1 ring-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xs text-gray-600 font-medium">+{staff.length - 3}</span>
                </div>
              )}
            </div>
            {staff.length > 0 && (
              <span className="text-xs text-gray-500 ml-2">
                {staff.length === 1 ? staff[0] : `${staff[0]} +${staff.length - 1}`}
              </span>
            )}
          </div>
        </div>

        {/* Expanded Details */}
        {expanded && (
          <div className="border-t border-gray-100 pt-4 space-y-3">
            {/* Client Contact */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-900">Client Contact</h4>
                <p className="text-sm text-gray-600">Main contact person</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Equipment Requirements */}
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Equipment Required</h4>
              <div className="flex flex-wrap gap-1">
                {["Vacuum", "Mop", "Chemicals", "Gloves"].map((equipment) => (
                  <Badge key={equipment} variant="outline" className="text-xs border-blue-200 text-blue-700">
                    {equipment}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Special Instructions */}
            <div className="p-3 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-1">Special Instructions</h4>
              <p className="text-sm text-yellow-800">
                Building requires key card access. Contact security at front desk.
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
            <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
              <Copy className="h-3 w-3 mr-1" />
              Clone
            </Button>
            <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
              <Navigation className="h-3 w-3 mr-1" />
              Directions
            </Button>
          </div>
          
          {status !== "completed" && status !== "cancelled" && (
            <Button size="sm" className="h-8 px-3 text-xs bg-primary hover:bg-primary/90">
              <StatusIcon className="h-3 w-3 mr-1" />
              {status === "scheduled" ? "Start" : status === "in-progress" ? "Complete" : "Update"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
