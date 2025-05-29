
import { MapPin, Phone, Clock, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface StaffCardProps {
  name: string
  role: string
  status: "online" | "offline" | "on-job"
  location?: string
  phone: string
  rating: number
  jobsToday: number
}

export function StaffCard({ 
  name, 
  role, 
  status, 
  location, 
  phone, 
  rating, 
  jobsToday 
}: StaffCardProps) {
  const statusConfig = {
    online: { color: "bg-success", text: "Available" },
    offline: { color: "bg-gray-400", text: "Offline" },
    "on-job": { color: "bg-orange-500", text: "On Job" }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${statusConfig[status].color}`} />
          </div>
          <div className="flex-1">
            <CardTitle className="text-sm font-medium">{name}</CardTitle>
            <p className="text-xs text-muted-foreground">{role}</p>
          </div>
          <Badge className={`${statusConfig[status].color} text-white text-xs`}>
            {statusConfig[status].text}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {location && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{location}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span>{phone}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-warning fill-current" />
            <span>{rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{jobsToday} jobs today</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">
            Message
          </Button>
          <Button size="sm" className="flex-1 h-8 text-xs bg-primary hover:bg-primary/90">
            Assign Job
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
