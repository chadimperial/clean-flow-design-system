
import { Clock, MapPin, User, CheckCircle, Circle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface JobCardProps {
  id: string
  client: string
  service: string
  time: string
  address: string
  staff: string[]
  status: "scheduled" | "in-progress" | "completed"
  priority?: "urgent" | "normal"
}

export function JobCard({ 
  id, 
  client, 
  service, 
  time, 
  address, 
  staff, 
  status,
  priority = "normal" 
}: JobCardProps) {
  const statusConfig = {
    scheduled: { color: "bg-blue-500", text: "Scheduled" },
    "in-progress": { color: "bg-orange-500", text: "In Progress" },
    completed: { color: "bg-success", text: "Completed" }
  }

  const StatusIcon = status === "completed" ? CheckCircle : Circle

  return (
    <Card className={`hover:shadow-md transition-shadow ${priority === "urgent" ? "border-l-4 border-l-error" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{client}</CardTitle>
          <Badge className={`${statusConfig[status].color} text-white`}>
            {statusConfig[status].text}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">{service}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{time}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="truncate">{address}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <div className="flex -space-x-1">
              {staff.map((person, index) => (
                <Avatar key={index} className="h-6 w-6 border-2 border-background">
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                    {person.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
          
          <div className="flex gap-1">
            <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
              Edit
            </Button>
            {status !== "completed" && (
              <Button size="sm" className="h-7 px-2 text-xs bg-primary hover:bg-primary/90">
                <StatusIcon className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
