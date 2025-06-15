import { useState, useEffect } from "react"
import { Calendar, Clock, MapPin, User, Settings, Filter, Plus, ChevronLeft, ChevronRight, Search, Building2, Star, Phone, MessageCircle } from "lucide-react"
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
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addWeeks, subWeeks, addMonths, subMonths, startOfMonth, endOfMonth, isSameDay, parseISO, isToday } from "date-fns"

const JobScheduling = () => {
  const [currentView, setCurrentView] = useState<"week" | "day" | "month">("week")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showCreateModal, setShowCreateModal] = useState(false)
  
  const { data: jobs = [], refetch: refetchJobs, isLoading: jobsLoading, error: jobsError } = useJobs()
  const { data: staff = [], isLoading: staffLoading, error: staffError } = useStaff()

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
          console.log('Job change detected, refetching...')
          refetchJobs()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [refetchJobs])

  // Debug logging
  useEffect(() => {
    console.log('Jobs loading:', jobsLoading, 'Jobs error:', jobsError)
    console.log('Staff loading:', staffLoading, 'Staff error:', staffError)
    console.log('Raw jobs data:', jobs)
    console.log('Raw staff data:', staff)
  }, [jobs, staff, jobsLoading, jobsError, staffLoading, staffError])

  // Transform jobs data with better error handling and validation
  const transformedJobs = jobs?.map(job => {
    console.log('Processing job:', job)
    
    // Safe access to nested data
    const clientName = job.clients?.name || 'Unknown Client'
    const serviceTitle = job.title || 'Cleaning Service'
    
    // Handle time formatting safely
    let jobTime = 'No time set'
    if (job.scheduled_time) {
      try {
        jobTime = format(new Date(`2000-01-01T${job.scheduled_time}`), 'h:mm a')
      } catch (error) {
        console.error('Error formatting time:', error)
        jobTime = job.scheduled_time.toString()
      }
    }
    
    const jobAddress = job.location || 'No address'
    
    // Safe access to staff data - handle the new relationship structure
    const assignedStaff = job.job_staff?.map(js => {
      console.log('Processing job_staff:', js)
      return js.staff?.name || 'Unknown Staff'
    }).filter(Boolean) || []
    
    return {
      id: job.id,
      client: clientName,
      service: serviceTitle,
      time: jobTime,
      address: jobAddress,
      staff: assignedStaff,
      status: (job.status as "scheduled" | "in-progress" | "completed") || "scheduled",
      priority: (job.priority as "low" | "normal" | "high" | "urgent") || "normal",
      serviceType: job.service_type || 'General Cleaning',
      duration: job.estimated_duration || 2,
      completionPercentage: job.status === 'completed' ? 100 : job.status === 'in-progress' ? 50 : 0,
      scheduledDate: job.scheduled_date,
      scheduledTime: job.scheduled_time,
      description: job.description || '',
      price: job.price || 0
    }
  }) || []

  console.log('Transformed jobs:', transformedJobs)

  // Filter jobs for current date range based on view
  const getFilteredJobs = () => {
    if (!transformedJobs || transformedJobs.length === 0) {
      console.log('No jobs to filter')
      return []
    }

    const today = format(new Date(), 'yyyy-MM-dd')
    
    if (currentView === 'day') {
      const selectedDateStr = format(selectedDate, 'yyyy-MM-dd')
      const filtered = transformedJobs.filter(job => job.scheduledDate === selectedDateStr)
      console.log(`Day view filtered jobs for ${selectedDateStr}:`, filtered)
      return filtered
    } else if (currentView === 'week') {
      const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 })
      const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 })
      const filtered = transformedJobs.filter(job => {
        if (!job.scheduledDate) return false
        try {
          const jobDate = parseISO(job.scheduledDate)
          return jobDate >= weekStart && jobDate <= weekEnd
        } catch (error) {
          console.error('Error parsing job date:', job.scheduledDate, error)
          return false
        }
      })
      console.log(`Week view filtered jobs:`, filtered)
      return filtered
    } else {
      const monthStart = startOfMonth(selectedDate)
      const monthEnd = endOfMonth(selectedDate)
      const filtered = transformedJobs.filter(job => {
        if (!job.scheduledDate) return false
        try {
          const jobDate = parseISO(job.scheduledDate)
          return jobDate >= monthStart && jobDate <= monthEnd
        } catch (error) {
          console.error('Error parsing job date:', job.scheduledDate, error)
          return false
        }
      })
      console.log(`Month view filtered jobs:`, filtered)
      return filtered
    }
  }

  const filteredJobs = getFilteredJobs()

  // Transform staff data to match the correct interface
  const staffData = staff?.map(member => ({
    name: member.name || 'Unknown Staff',
    status: (member.status as "available" | "on-job" | "offline" | "break") || "available",
    avatar: (member.name || 'U').split(' ').map(n => n[0]).join(''),
    currentLocation: member.location || 'No location',
    nextJob: "No scheduled jobs",
    phone: member.phone || 'No phone',
    jobsToday: member.jobs_today || 0
  })) || []

  // Calculate stats
  const scheduledJobs = transformedJobs.filter(job => job.status === 'scheduled').length
  const inProgressJobs = transformedJobs.filter(job => job.status === 'in-progress').length
  const completedJobs = transformedJobs.filter(job => job.status === 'completed').length

  const handleJobCreated = () => {
    console.log('Job created, refetching data...')
    refetchJobs()
  }

  const navigateDate = (direction: 'prev' | 'next') => {
    if (currentView === 'week') {
      setSelectedDate(direction === 'prev' ? subWeeks(selectedDate, 1) : addWeeks(selectedDate, 1))
    } else if (currentView === 'month') {
      setSelectedDate(direction === 'prev' ? subMonths(selectedDate, 1) : addMonths(selectedDate, 1))
    } else {
      setSelectedDate(direction === 'prev' ? new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000) : new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000))
    }
  }

  const getDateRangeText = () => {
    if (currentView === 'day') {
      return format(selectedDate, 'MMMM d, yyyy')
    } else if (currentView === 'week') {
      const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 })
      const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 })
      return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`
    } else {
      return format(selectedDate, 'MMMM yyyy')
    }
  }

  // Show loading state
  if (jobsLoading || staffLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job scheduling data...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (jobsError || staffError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Data</h3>
            <p className="text-red-600 mb-4">
              {jobsError?.message || staffError?.message || 'Failed to load data'}
            </p>
            <Button onClick={() => {
              refetchJobs()
              window.location.reload()
            }}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

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
              <Button variant="ghost" size="sm" onClick={() => navigateDate('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-semibold text-gray-900 min-w-[180px] text-center">
                {getDateRangeText()}
              </span>
              <Button variant="ghost" size="sm" onClick={() => navigateDate('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
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

        {/* Debug Info */}
        <div className="text-sm text-gray-500 bg-white p-3 rounded">
          <p>Total jobs in database: {transformedJobs.length} | Filtered jobs for current view: {filteredJobs.length}</p>
          <p>Jobs loading: {jobsLoading ? 'Yes' : 'No'} | Staff loading: {staffLoading ? 'Yes' : 'No'}</p>
          {(jobsError || staffError) && (
            <p className="text-red-600">Error: {jobsError?.message || staffError?.message}</p>
          )}
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
                  <WeekView jobs={filteredJobs} selectedDate={selectedDate} />
                ) : currentView === "day" ? (
                  <DayView jobs={filteredJobs} selectedDate={selectedDate} onUpdate={refetchJobs} />
                ) : (
                  <MonthView jobs={filteredJobs} selectedDate={selectedDate} />
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
          onJobCreated={handleJobCreated}
        />
      )}
    </div>
  )
}

// Week View Component
const WeekView = ({ jobs, selectedDate }: { jobs: any[], selectedDate: Date }) => {
  const timeSlots = Array.from({ length: 17 }, (_, i) => `${String(i + 6).padStart(2, '0')}:00`)
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 })
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })

  const getJobsForDay = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return jobs.filter(job => job.scheduledDate === dateStr)
  }

  const getJobsForTimeSlot = (date: Date, timeSlot: string) => {
    const dayJobs = getJobsForDay(date)
    return dayJobs.filter(job => {
      if (!job.scheduledTime) return timeSlot === '06:00' // Default to first slot if no time
      const jobHour = parseInt(job.scheduledTime.split(':')[0])
      const slotHour = parseInt(timeSlot.split(':')[0])
      return jobHour === slotHour
    })
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[900px]">
        {/* Header with days */}
        <div className="grid grid-cols-8 gap-1 border-b border-gray-200">
          <div className="p-3 text-sm font-medium text-gray-500">Time</div>
          {weekDays.map(day => (
            <div key={day.toISOString()} className="p-3 text-center">
              <div className={`font-medium ${isToday(day) ? 'text-blue-600' : 'text-gray-900'}`}>
                {format(day, 'EEE')}
              </div>
              <div className={`text-sm ${isToday(day) ? 'text-blue-600' : 'text-gray-600'}`}>
                {format(day, 'MMM d')}
              </div>
            </div>
          ))}
        </div>

        {/* Time slots grid */}
        <div className="max-h-[600px] overflow-y-auto">
          {timeSlots.map(time => (
            <div key={time} className="grid grid-cols-8 gap-1 border-b border-gray-100">
              <div className="p-3 text-xs text-gray-500 border-r border-gray-200 bg-gray-50">
                {time}
              </div>
              {weekDays.map(day => {
                const dayJobs = getJobsForTimeSlot(day, time)
                return (
                  <div key={`${day.toISOString()}-${time}`} className="min-h-[80px] p-2">
                    {dayJobs.map(job => (
                      <JobTimeSlotCard key={job.id} job={job} />
                    ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Day View Component  
const DayView = ({ jobs, selectedDate, onUpdate }: { jobs: any[], selectedDate: Date, onUpdate: () => void }) => {
  const sortedJobs = jobs.sort((a, b) => {
    if (!a.scheduledTime && !b.scheduledTime) return 0
    if (!a.scheduledTime) return 1
    if (!b.scheduledTime) return -1
    return a.scheduledTime.localeCompare(b.scheduledTime)
  })

  return (
    <div className="p-6 space-y-4">
      {sortedJobs.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs scheduled</h3>
          <p className="text-gray-600">No jobs are scheduled for {format(selectedDate, 'MMMM d, yyyy')}</p>
        </div>
      ) : (
        sortedJobs.map(job => (
          <JobDetailCard key={job.id} job={job} onUpdate={onUpdate} />
        ))
      )}
    </div>
  )
}

// Month View Component
const MonthView = ({ jobs, selectedDate }: { jobs: any[], selectedDate: Date }) => {
  const monthStart = startOfMonth(selectedDate)
  const monthEnd = endOfMonth(selectedDate)
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 })
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 })
  const dateRange = eachDayOfInterval({ start: startDate, end: endDate })

  const getJobsForDay = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return jobs.filter(job => job.scheduledDate === dateStr)
  }
  
  return (
    <div className="p-4">
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-sm font-medium text-gray-500 p-2 text-center">
            {day}
          </div>
        ))}
        {dateRange.map(date => {
          const dayJobs = getJobsForDay(date)
          const isCurrentMonth = date.getMonth() === selectedDate.getMonth()
          
          return (
            <div key={date.toISOString()} className={`min-h-[120px] border border-gray-200 rounded p-2 ${
              !isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'
            } ${isToday(date) ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}>
              <div className={`text-sm font-medium mb-1 ${isToday(date) ? 'text-blue-600' : 'text-gray-900'}`}>
                {format(date, 'd')}
              </div>
              <div className="space-y-1">
                {dayJobs.slice(0, 3).map(job => (
                  <div key={job.id} className={`text-xs p-1 rounded truncate ${
                    job.status === 'completed' ? 'bg-green-100 text-green-800' :
                    job.status === 'in-progress' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {job.service}
                  </div>
                ))}
                {dayJobs.length > 3 && (
                  <div className="text-xs text-gray-500">+{dayJobs.length - 3} more</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Job Time Slot Card Component for Week View
const JobTimeSlotCard = ({ job }: { job: any }) => {
  return (
    <div className={`rounded-lg p-2 text-xs border-l-4 mb-1 ${
      job.status === 'completed' ? 'bg-green-50 border-green-500' :
      job.status === 'in-progress' ? 'bg-orange-50 border-orange-500' :
      'bg-blue-50 border-blue-500'
    }`}>
      <div className="font-medium text-gray-900 truncate">{job.service}</div>
      <div className="text-gray-600 truncate">{job.client}</div>
      <div className="text-gray-500">{job.time}</div>
      <Badge className={`text-xs mt-1 ${
        job.status === 'completed' ? 'bg-green-100 text-green-800' :
        job.status === 'in-progress' ? 'bg-orange-100 text-orange-800' :
        'bg-blue-100 text-blue-800'
      }`}>
        {job.status}
      </Badge>
    </div>
  )
}

// Job Detail Card Component for Day View (styled like the reference images)
const JobDetailCard = ({ job, onUpdate }: { job: any, onUpdate: () => void }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-orange-100 text-orange-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'normal': return 'bg-blue-100 text-blue-800'
      case 'low': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow border border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{job.client}</h3>
              <p className="text-gray-600">{job.serviceType}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(job.status)}>
              {job.status}
            </Badge>
            {job.priority !== 'normal' && (
              <Badge className={getPriorityColor(job.priority)}>
                {job.priority}
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Time</span>
            </div>
            <p className="text-lg font-semibold text-blue-900">{job.time}</p>
          </div>

          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-green-600 mb-1">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">Duration</span>
            </div>
            <p className="text-lg font-semibold text-green-900">{job.duration}h</p>
          </div>

          <div className="bg-yellow-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-yellow-600 mb-1">
              <Star className="h-4 w-4" />
              <span className="text-sm font-medium">Service</span>
            </div>
            <p className="text-lg font-semibold text-yellow-900">{job.service}</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-purple-600 mb-1">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">Staff</span>
            </div>
            <p className="text-lg font-semibold text-purple-900">{job.staff.length || 0}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{job.address}</span>
            </div>
            {job.price && (
              <div className="text-lg font-bold text-green-600">
                ${Number(job.price).toLocaleString()}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4 mr-1" />
              Message
            </Button>
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-1" />
              Call
            </Button>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default JobScheduling
