import { useState } from "react"
import { Calendar, Clock, MapPin, User, Settings, Filter, Plus, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { JobCard } from "@/components/JobCard"
import { StaffAvailabilityPanel } from "@/components/StaffAvailabilityPanel"
import { JobAnalytics } from "@/components/JobAnalytics"
import { CreateJobModal } from "@/components/CreateJobModal"

const JobScheduling = () => {
  const [currentView, setCurrentView] = useState<"week" | "day" | "month">("week")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showCreateModal, setShowCreateModal] = useState(false)

  const todaysJobs = [
    {
      id: "1",
      client: "Sunshine Office Complex",
      service: "Deep Clean",
      time: "9:00 AM - 12:00 PM",
      address: "123 Business Park, Downtown",
      staff: ["John Smith", "Maria Garcia"],
      status: "scheduled" as const,
      priority: "normal" as const,
      serviceType: "office-cleaning",
      duration: 180,
      completionPercentage: 0
    },
    {
      id: "2", 
      client: "Metro Hospital",
      service: "Medical Cleaning", 
      time: "8:00 AM - 10:00 AM",
      address: "456 Health Plaza",
      staff: ["David Chen"],
      status: "in-progress" as const,
      priority: "urgent" as const,
      serviceType: "medical-cleaning",
      duration: 120,
      completionPercentage: 65
    },
    {
      id: "3",
      client: "Riverside Restaurant", 
      service: "Kitchen Deep Clean",
      time: "6:00 AM - 8:00 AM", 
      address: "789 Waterfront St",
      staff: ["Sarah Wilson", "Mike Johnson"],
      status: "completed" as const,
      priority: "normal" as const,
      serviceType: "restaurant-cleaning",
      duration: 120,
      completionPercentage: 100
    }
  ]

  const staffData = [
    { name: "Sarah Johnson", status: "available" as const, avatar: "SJ", currentLocation: "Downtown Office", nextJob: "2:00 PM - Office Complex", phone: "+1-555-0123", jobsToday: 3 },
    { name: "Mike Chen", status: "on-job" as const, avatar: "MC", currentLocation: "Residential Area", nextJob: "3:30 PM - Apartment Clean", phone: "+1-555-0124", jobsToday: 4 },
    { name: "Emma Wilson", status: "busy" as const, avatar: "EW", currentLocation: "Business District", nextJob: "4:00 PM - Deep Clean", phone: "+1-555-0125", jobsToday: 2 },
    { name: "David Rodriguez", status: "offline" as const, avatar: "DR", currentLocation: "Off Duty", phone: "+1-555-0126", jobsToday: 0 }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-6 p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Scheduling</h1>
            <p className="text-gray-600">Manage and optimize your cleaning schedules</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="border-gray-300 hover:bg-gray-50"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Quick Schedule
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90 shadow-md"
              onClick={() => setShowCreateModal(true)}
            >
              <Calendar className="h-4 w-4 mr-2" />
              New Job
            </Button>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              {["week", "day", "month"].map((view) => (
                <Button
                  key={view}
                  variant={currentView === view ? "default" : "ghost"}
                  size="sm"
                  className={`capitalize ${currentView === view ? "bg-white shadow-sm" : ""}`}
                  onClick={() => setCurrentView(view as "week" | "day" | "month")}
                >
                  {view}
                </Button>
              ))}
            </div>

            {/* Date Navigation */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-semibold text-gray-900 min-w-[140px] text-center">
                {selectedDate.toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric',
                  day: currentView === 'day' ? 'numeric' : undefined 
                })}
              </span>
              <Button variant="ghost" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <Button variant="outline" size="sm">
              Today
            </Button>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search jobs, clients..."
                className="pl-10 w-64 bg-gray-50 border-gray-200"
              />
            </div>

            {/* Filters */}
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>

            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar/Schedule View */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg border-gray-200 bg-white">
              <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {currentView === "week" ? "Weekly Schedule" : 
                     currentView === "day" ? "Daily Schedule" : "Monthly Overview"}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500 text-white">12 Scheduled</Badge>
                    <Badge className="bg-orange-500 text-white">3 In Progress</Badge>
                    <Badge className="bg-green-500 text-white">8 Completed</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {currentView === "week" ? (
                  <WeekView jobs={todaysJobs} staff={staffData} />
                ) : currentView === "day" ? (
                  <DayView jobs={todaysJobs} />
                ) : (
                  <MonthView jobs={todaysJobs} />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <StaffAvailabilityPanel staff={staffData} />
            <JobAnalytics />
          </div>
        </div>
      </div>

      {showCreateModal && (
        <CreateJobModal 
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  )
}

// Week View Component
const WeekView = ({ jobs, staff }: { jobs: any[], staff: any[] }) => {
  const timeSlots = Array.from({ length: 17 }, (_, i) => `${i + 6}:00`)
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px] grid grid-cols-8 gap-2 p-4">
        {/* Time header */}
        <div className="text-sm font-medium text-gray-500 p-2">Time</div>
        {weekDays.map(day => (
          <div key={day} className="text-sm font-medium text-gray-900 p-2 text-center">
            {day}
          </div>
        ))}

        {/* Time slots */}
        {timeSlots.map(time => (
          <div key={time} className="contents">
            <div className="text-xs text-gray-500 p-2 border-r border-gray-100">
              {time}
            </div>
            {weekDays.map(day => (
              <div key={`${day}-${time}`} className="min-h-[60px] border border-gray-100 p-1">
                {time === "9:00" && day === "Mon" && (
                  <div className="bg-blue-50 border-l-4 border-blue-500 rounded p-2 text-xs">
                    <div className="font-medium text-blue-900">Sunshine Office</div>
                    <div className="text-blue-600">Deep Clean</div>
                  </div>
                )}
                {time === "8:00" && day === "Tue" && (
                  <div className="bg-orange-50 border-l-4 border-orange-500 rounded p-2 text-xs">
                    <div className="font-medium text-orange-900">Metro Hospital</div>
                    <div className="text-orange-600">Medical Clean</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// Day View Component  
const DayView = ({ jobs }: { jobs: any[] }) => {
  return (
    <div className="p-6 space-y-4">
      {jobs.map(job => (
        <JobCard key={job.id} {...job} expanded={true} />
      ))}
    </div>
  )
}

// Month View Component
const MonthView = ({ jobs }: { jobs: any[] }) => {
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1)
  
  return (
    <div className="p-4">
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-sm font-medium text-gray-500 p-2 text-center">
            {day}
          </div>
        ))}
        {daysInMonth.map(day => (
          <div key={day} className="min-h-[100px] border border-gray-200 rounded p-2">
            <div className="text-sm font-medium text-gray-900 mb-1">{day}</div>
            {day === 15 && (
              <div className="space-y-1">
                <div className="w-full h-2 bg-blue-200 rounded"></div>
                <div className="w-full h-2 bg-green-200 rounded"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default JobScheduling
