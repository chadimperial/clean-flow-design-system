import { useState, useEffect } from "react"
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
import { useJobs, useStaff } from "@/hooks/useSupabaseQuery"
import { supabase } from "@/integrations/supabase/client"
import { format } from "date-fns"

const JobScheduling = () => {
  const [currentView, setCurrentView] = useState<"week" | "day" | "month">("week")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showCreateModal, setShowCreateModal] = useState(false)
  
  const { data: jobs = [], refetch: refetchJobs } = useJobs()
  const { data: staff = [] } = useStaff()

  // Set up real-time subscription for jobs
  useEffect(() => {
    const channel = supabase
      .channel('jobs-changes-scheduling')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'jobs'
        },
        () => {
          refetchJobs()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [refetchJobs])

  // Transform jobs data
  const transformedJobs = jobs.map(job => ({
    id: job.id,
    client: job.clients?.name || 'Unknown Client',
    service: job.title,
    time: job.scheduled_time ? format(new Date(`2000-01-01T${job.scheduled_time}`), 'h:mm a') : 'No time set',
    address: job.location || 'No address',
    staff: job.job_staff?.map(js => js.staff?.name).filter(Boolean) || [],
    status: job.status as "scheduled" | "in-progress" | "completed",
    priority: job.priority as "low" | "normal" | "high" | "urgent",
    serviceType: job.service_type,
    duration: job.estimated_duration || 0,
    completionPercentage: job.status === 'completed' ? 100 : job.status === 'in-progress' ? 50 : 0
  }))

  // Transform staff data to match the correct interface
  const staffData = staff.map(member => ({
    name: member.name,
    status: member.status as "available" | "on-job" | "offline" | "break",
    avatar: member.name.split(' ').map(n => n[0]).join(''),
    currentLocation: member.location || 'No location',
    nextJob: "No scheduled jobs",
    phone: member.phone || 'No phone',
    jobsToday: member.jobs_today || 0
  }))

  // Calculate stats
  const scheduledJobs = transformedJobs.filter(job => job.status === 'scheduled').length
  const inProgressJobs = transformedJobs.filter(job => job.status === 'in-progress').length
  const completedJobs = transformedJobs.filter(job => job.status === 'completed').length

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
                    <Badge className="bg-blue-500 text-white">{scheduledJobs} Scheduled</Badge>
                    <Badge className="bg-orange-500 text-white">{inProgressJobs} In Progress</Badge>
                    <Badge className="bg-green-500 text-white">{completedJobs} Completed</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {currentView === "week" ? (
                  <WeekView jobs={transformedJobs} staff={staffData} />
                ) : currentView === "day" ? (
                  <DayView jobs={transformedJobs} />
                ) : (
                  <MonthView jobs={transformedJobs} />
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
