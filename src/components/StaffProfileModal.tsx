
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Phone, Mail, MapPin, Calendar, Clock } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface StaffProfileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  staffMember: any
  onUpdate?: () => void
}

export function StaffProfileModal({ open, onOpenChange, staffMember, onUpdate }: StaffProfileModalProps) {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: staffMember?.name || "",
    email: staffMember?.email || "",
    phone: staffMember?.phone || "",
    role: staffMember?.role || "",
    hourly_rate: staffMember?.hourly_rate || "",
    location: staffMember?.location || ""
  })

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('staff')
        .update(formData)
        .eq('id', staffMember.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Staff member updated successfully",
      })

      setIsEditing(false)
      if (onUpdate) onUpdate()
    } catch (error) {
      console.error('Error updating staff:', error)
      toast({
        title: "Error",
        description: "Failed to update staff member",
        variant: "destructive",
      })
    }
  }

  if (!staffMember) return null

  const avatar = staffMember.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-indigo-100 text-indigo-700">
                {avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{staffMember.name}</h2>
              <p className="text-gray-600">{staffMember.role}</p>
            </div>
            <Badge className={`ml-auto ${
              staffMember.status === 'available' ? 'bg-green-500' :
              staffMember.status === 'on-job' ? 'bg-blue-500' :
              staffMember.status === 'on-break' ? 'bg-orange-500' : 'bg-gray-500'
            } text-white`}>
              {staffMember.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                <Button 
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                  {isEditing ? "Save" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hourly_rate">Hourly Rate</Label>
                      <Input
                        id="hourly_rate"
                        type="number"
                        value={formData.hourly_rate}
                        onChange={(e) => setFormData({...formData, hourly_rate: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{staffMember.email || 'No email'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{staffMember.phone || 'No phone'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{staffMember.location || 'No location set'}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{staffMember.rating || 0} Rating</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>Hired: {staffMember.hire_date || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>${staffMember.hourly_rate || 0}/hour</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Performance tracking will be displayed here based on job completion data.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Schedule & Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Schedule information will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
