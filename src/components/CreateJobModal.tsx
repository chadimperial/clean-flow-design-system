
import { useState } from "react"
import { X, Calendar, Clock, MapPin, User, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { useStaff } from "@/hooks/useSupabaseQuery"

interface CreateJobModalProps {
  isOpen: boolean
  onClose: () => void
  onJobCreated?: () => void
}

export function CreateJobModal({ isOpen, onClose, onJobCreated }: CreateJobModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { data: staffData = [] } = useStaff()
  
  const [formData, setFormData] = useState({
    client: "",
    service: "",
    date: "",
    time: "",
    duration: "",
    address: "",
    staff: [] as string[],
    equipment: [] as string[],
    notes: ""
  })

  if (!isOpen) return null

  const serviceTypes = [
    { id: "office-cleaning", name: "Office Cleaning", icon: "🏢", duration: "2-4 hours" },
    { id: "residential", name: "Residential", icon: "🏠", duration: "1-3 hours" },
    { id: "medical-cleaning", name: "Medical Facility", icon: "🏥", duration: "3-6 hours" },
    { id: "restaurant-cleaning", name: "Restaurant", icon: "🍽️", duration: "2-5 hours" }
  ]

  const availableStaff = staffData.map(staff => ({
    id: staff.id,
    name: staff.name,
    status: staff.status || "available",
    skills: ["cleaning"] // Default skills since we don't have this field in the database yet
  }))

  const equipment = [
    { id: "vacuum", name: "Industrial Vacuum", available: 5 },
    { id: "mop", name: "Professional Mop Set", available: 8 },
    { id: "chemicals", name: "Cleaning Chemicals", available: 12 },
    { id: "gloves", name: "Protective Gloves", available: 20 }
  ]

  const handleCreateJob = async () => {
    if (!formData.client || !formData.service || !formData.date || !formData.time || !formData.address) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    
    try {
      // First create or get the client
      let clientId = null
      
      // Check if client already exists
      const { data: existingClient } = await supabase
        .from('clients')
        .select('id')
        .eq('name', formData.client)
        .single()

      if (existingClient) {
        clientId = existingClient.id
      } else {
        // Create new client
        const { data: newClient, error: clientError } = await supabase
          .from('clients')
          .insert({
            name: formData.client,
            address: formData.address
          })
          .select('id')
          .single()

        if (clientError) throw clientError
        clientId = newClient.id
      }

      // Create the job
      const selectedServiceType = serviceTypes.find(s => s.id === formData.service)
      
      const { data: job, error: jobError } = await supabase
        .from('jobs')
        .insert({
          client_id: clientId,
          title: selectedServiceType?.name || 'Cleaning Service',
          service_type: formData.service,
          location: formData.address,
          scheduled_date: formData.date,
          scheduled_time: formData.time,
          estimated_duration: parseInt(formData.duration) || 2,
          special_instructions: formData.notes,
          status: 'scheduled',
          priority: 'normal'
        })
        .select('id')
        .single()

      if (jobError) throw jobError

      // Assign staff to the job
      if (formData.staff.length > 0) {
        const staffAssignments = formData.staff.map(staffId => ({
          job_id: job.id,
          staff_id: staffId
        }))

        const { error: staffError } = await supabase
          .from('job_staff')
          .insert(staffAssignments)

        if (staffError) throw staffError
      }

      toast({
        title: "Success",
        description: "Job created successfully!",
      })

      // Reset form
      setFormData({
        client: "",
        service: "",
        date: "",
        time: "",
        duration: "",
        address: "",
        staff: [],
        equipment: [],
        notes: ""
      })
      setCurrentStep(1)
      
      // Call the callback to refresh data
      if (onJobCreated) {
        onJobCreated()
      }
      
      onClose()
    } catch (error) {
      console.error('Error creating job:', error)
      toast({
        title: "Error",
        description: "Failed to create job. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Create New Job</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center p-4 border-b border-gray-100">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= step ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 mx-2 ${currentStep > step ? "bg-primary" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Content */}
        <div className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Job Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client">Client *</Label>
                  <Input
                    id="client"
                    placeholder="Search or add new client..."
                    value={formData.client}
                    onChange={(e) => setFormData({...formData, client: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    placeholder="Job location address..."
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label>Service Type *</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {serviceTypes.map((service) => (
                    <Card 
                      key={service.id} 
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        formData.service === service.id ? "ring-2 ring-primary bg-blue-50" : ""
                      }`}
                      onClick={() => setFormData({...formData, service: service.id})}
                    >
                      <CardContent className="p-4">
                        <div className="text-2xl mb-2">{service.icon}</div>
                        <h4 className="font-semibold text-gray-900">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.duration}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Start Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="2.5"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Staff Assignment</h3>
              
              <div className="space-y-3">
                {availableStaff.map((staff) => (
                  <div 
                    key={staff.id} 
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                      formData.staff.includes(staff.id) ? "border-primary bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    } ${staff.status !== "available" ? "opacity-50" : ""}`}
                    onClick={() => {
                      if (staff.status === "available") {
                        const newStaff = formData.staff.includes(staff.id)
                          ? formData.staff.filter(id => id !== staff.id)
                          : [...formData.staff, staff.id]
                        setFormData({...formData, staff: newStaff})
                      }
                    }}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {staff.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{staff.name}</h4>
                      <div className="flex gap-1 mt-1">
                        {staff.skills.map(skill => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Badge className={staff.status === "available" ? "bg-green-500" : "bg-orange-500"}>
                      {staff.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Equipment & Notes</h3>
              
              <div>
                <Label>Required Equipment</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {equipment.map((item) => (
                    <div 
                      key={item.id}
                      className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
                        formData.equipment.includes(item.id) ? "border-primary bg-blue-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => {
                        const newEquipment = formData.equipment.includes(item.id)
                          ? formData.equipment.filter(id => id !== item.id)
                          : [...formData.equipment, item.id]
                        setFormData({...formData, equipment: newEquipment})
                      }}
                    >
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <Badge variant="outline">{item.available} available</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Special Instructions</Label>
                <textarea
                  id="notes"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg resize-none"
                  rows={4}
                  placeholder="Any special instructions or requirements for this job..."
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <Button 
            variant="outline" 
            onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : onClose()}
          >
            {currentStep > 1 ? "Previous" : "Cancel"}
          </Button>
          
          <Button 
            onClick={() => currentStep < 3 ? setCurrentStep(currentStep + 1) : handleCreateJob()}
            className="bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : currentStep < 3 ? "Next" : "Create Job"}
          </Button>
        </div>
      </div>
    </div>
  )
}
