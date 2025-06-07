
import { Clock, MapPin, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface StaffMember {
  name: string
  status: "available" | "on-job" | "offline" | "break"
  avatar: string
  currentLocation?: string
  nextJob?: string
  phone?: string
  jobsToday?: number
}

interface StaffAvailabilityPanelProps {
  staff: StaffMember[]
}

export function StaffAvailabilityPanel({ staff }: StaffAvailabilityPanelProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "available":
        return { color: "bg-green-500", text: "Available", textColor: "text-green-700" }
      case "break":
        return { color: "bg-yellow-500", text: "On Break", textColor: "text-yellow-700" }
      case "on-job":
        return { color: "bg-blue-500", text: "On Job", textColor: "text-blue-700" }
      case "offline":
        return { color: "bg-gray-500", text: "Off Duty", textColor: "text-gray-700" }
      default:
        return { color: "bg-gray-500", text: "Unknown", textColor: "text-gray-700" }
    }
  }

  return (
    <Card className="shadow-lg border-gray-200 bg-white">
      <CardHeader className="border-b border-gray-100 bg-gray-50/50">
        <CardTitle className="text-lg font-bold text-gray-900">Staff Availability</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        {staff.map((member, index) => {
          const statusConfig = getStatusConfig(member.status)
          
          return (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="relative">
                <Avatar className="h-10 w-10 ring-2 ring-white">
                  <AvatarImage src={`/placeholder-avatar-${index + 1}.jpg`} alt={member.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                    {member.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${statusConfig.color} rounded-full border-2 border-white`}></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-gray-900 truncate">{member.name}</h4>
                  <Badge 
                    className={`${statusConfig.color} text-white text-xs px-2 py-1`}
                  >
                    {statusConfig.text}
                  </Badge>
                </div>
                
                {member.currentLocation && (
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-600 truncate">{member.currentLocation}</span>
                  </div>
                )}
                
                {member.nextJob && (
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-600">Next: {member.nextJob}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">
                    {member.jobsToday || 0} jobs today
                  </span>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <Phone className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        
        <Button variant="outline" className="w-full mt-4 border-gray-300 hover:bg-gray-50">
          View All Staff
        </Button>
      </CardContent>
    </Card>
  )
}
