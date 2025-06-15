
import { useState, useEffect } from "react"
import { Calendar, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatusCards } from "@/components/StatusCards"
import { ControlsBar } from "@/components/ControlsBar"
import { WeekView } from "@/components/WeekView"
import { DayView } from "@/components/DayView"
import { MonthView } from "@/components/MonthView"
import { StaffAvailabilityPanel } from "@/components/StaffAvailabilityPanel"
import { JobAnalytics } from "@/components/JobAnalytics"
import { CreateJobModal } from "@/components/CreateJobModal"
import { JobDetailsModal } from "@/components/JobDetailsModal"
import { useJobs, useStaff } from "@/hooks/useSupabaseQuery"
import { supabase } from "@/integrations/supabase/client"
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, addMonths, subMonths, startOfMonth, endOfMonth, parseISO } from "date-fns"

const JobScheduling = () => {
  const [currentView, setCurrentView] = useState<"week" | "day" | "month">("day")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [showJobDetails, setShowJobDetails] = useState(false)
  
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
    
    // Safe access to staff data - handle the relationship structure properly
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

  // Filter jobs for current date range based on view - IMPROVED LOGIC
  const getFilteredJobs = () => {
    if (!transformedJobs || transformedJobs.length === 0) {
      console.log('No jobs to filter')
      return []
    }

    if (currentView === 'day') {
      const selectedDateStr = format(selectedDate, 'yyyy-MM-dd')
      console.log('Filtering for date:', selectedDateStr)
      
      // Show jobs that match the selected date OR jobs without a scheduled date
      const filtered = transformedJobs.filter(job => {
        // Always show jobs that match the selected date
        if (job.scheduledDate === selectedDateStr) {
          console.log(`Job ${job.id} matches selected date ${selectedDateStr}`)
          return true
        }
        
        // For today's view, also show jobs without scheduled dates
        const isToday = selectedDateStr === format(new Date(), 'yyyy-MM-dd')
        if (isToday && !job.scheduledDate) {
          console.log(`Job ${job.id} has no date, showing in today's view`)
          return true
        }
        
        return false
      })
      
      console.log(`Day view filtered jobs for ${selectedDateStr}:`, filtered)
      return filtered
    } else if (currentView === 'week') {
      const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 })
      const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 })
      const filtered = transformedJobs.filter(job => {
        if (!job.scheduledDate) return true // Show jobs without dates
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
        if (!job.scheduledDate) return true // Show jobs without dates
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

  const handleJobDetailsOpen = (job: any) => {
    console.log('Opening job details for:', job)
    setSelectedJob(job)
    setShowJobDetails(true)
  }

  const handleJobDetailsClose = () => {
    setShowJobDetails(false)
    setSelectedJob(null)
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

        {/* Status Cards */}
        <StatusCards 
          scheduledJobs={scheduledJobs}
          inProgressJobs={inProgressJobs}
          completedJobs={completedJobs}
        />

        {/* Controls Bar */}
        <ControlsBar
          currentView={currentView}
          setCurrentView={setCurrentView}
          dateRangeText={getDateRangeText()}
          onNavigateDate={navigateDate}
          onTodayClick={() => setSelectedDate(new Date())}
        />

        {/* Debug Info */}
        <div className="text-sm text-gray-500 bg-white p-3 rounded">
          <p>Total jobs in database: {transformedJobs.length} | Filtered jobs for current view: {filteredJobs.length}</p>
          <p>Current view: {currentView} | Selected date: {format(selectedDate, 'yyyy-MM-dd')}</p>
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
                  <DayView jobs={filteredJobs} selectedDate={selectedDate} onUpdate={refetchJobs} onJobDetailsOpen={handleJobDetailsOpen} />
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

      {showJobDetails && selectedJob && (
        <JobDetailsModal
          isOpen={showJobDetails}
          onClose={handleJobDetailsClose}
          job={selectedJob}
          onUpdate={refetchJobs}
        />
      )}
    </div>
  )
}

export default JobScheduling
