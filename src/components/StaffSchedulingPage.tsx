
import { useState, useEffect } from "react"
import { Calendar, Clock, User, Plus, Filter, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useStaffSchedules, useJobs, useStaff } from "@/hooks/useSupabaseQuery"
import { format, parseISO, startOfWeek, endOfWeek, addDays } from "date-fns"

export function StaffSchedulingPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState("")
  
  const { data: schedules = [] } = useStaffSchedules()
  const { data: jobs = [] } = useJobs()
  const { data: staff = [] } = useStaff()

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 })
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  // Get jobs scheduled for this week with assigned staff
  const weekJobs = jobs.filter(job => {
    if (!job.scheduled_date) return false
    const jobDate = parseISO(job.scheduled_date)
    return jobDate >= weekStart && jobDate <= endOfWeek(selectedDate, { weekStartsOn: 1 })
  })

  // Get staff schedules for this week
  const weekSchedules = schedules.filter(schedule => {
    if (!schedule.schedule_date) return false
    const scheduleDate = parseISO(schedule.schedule_date)
    return scheduleDate >= weekStart && scheduleDate <= endOfWeek(selectedDate, { weekStartsOn: 1 })
  })

  const getJobsForDay = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return weekJobs.filter(job => job.scheduled_date === dateStr)
  }

  const getStaffForDay = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return weekSchedules.filter(schedule => schedule.schedule_date === dateStr)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500'
      case 'on-job': return 'bg-blue-500'
      case 'on-break': return 'bg-orange-500'
      case 'offline': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff Scheduling</h1>
          <p className="text-gray-600 mt-1">Manage staff schedules and job assignments</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Schedule
          </Button>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Create Shift
          </Button>
        </div>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search staff or jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                Week of {format(weekStart, 'MMM d, yyyy')}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="weekly" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="weekly">Weekly View</TabsTrigger>
          <TabsTrigger value="staff">Staff Assignments</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-8 gap-2">
                {/* Time column */}
                <div className="text-sm font-medium text-gray-500 p-2">Time</div>
                {weekDays.map(day => (
                  <div key={day.toISOString()} className="text-sm font-medium text-gray-900 p-2 text-center">
                    <div>{format(day, 'EEE')}</div>
                    <div className="text-xs text-gray-500">{format(day, 'MMM d')}</div>
                  </div>
                ))}

                {/* Time slots */}
                {Array.from({ length: 12 }, (_, i) => i + 8).map(hour => (
                  <div key={hour} className="contents">
                    <div className="text-xs text-gray-500 p-2 border-r border-gray-100">
                      {hour}:00
                    </div>
                    {weekDays.map(day => {
                      const dayJobs = getJobsForDay(day)
                      const daySchedules = getStaffForDay(day)
                      
                      return (
                        <div key={`${day.toISOString()}-${hour}`} className="min-h-[60px] border border-gray-100 p-1">
                          {dayJobs.map(job => {
                            const jobTime = job.scheduled_time ? parseInt(job.scheduled_time.split(':')[0]) : 0
                            if (jobTime === hour) {
                              return (
                                <div key={job.id} className="bg-blue-50 border-l-4 border-blue-500 rounded p-2 text-xs mb-1">
                                  <div className="font-medium text-blue-900 truncate">{job.clients?.name}</div>
                                  <div className="text-blue-600 truncate">{job.title}</div>
                                  <div className="text-blue-500 text-xs">
                                    {job.job_staff?.length || 0} staff assigned
                                  </div>
                                </div>
                              )
                            }
                            return null
                          })}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Staff Assignments This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {staff.map(member => {
                  const staffJobs = weekJobs.filter(job => 
                    job.job_staff?.some(js => js.staff?.name === member.name)
                  )
                  
                  return (
                    <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-indigo-100 text-indigo-700">
                              {member.name.split(' ').map((n: string) => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(member.status)} rounded-full border-2 border-white`}></div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{staffJobs.length} jobs</p>
                        <p className="text-xs text-gray-600">this week</p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Assignments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {weekJobs.map(job => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{job.title}</h4>
                        <p className="text-sm text-gray-600">{job.clients?.name}</p>
                      </div>
                      <Badge className={`
                        ${job.status === 'scheduled' ? 'bg-blue-500' :
                          job.status === 'in-progress' ? 'bg-orange-500' :
                          job.status === 'completed' ? 'bg-green-500' : 'bg-gray-500'}
                        text-white
                      `}>
                        {job.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{format(parseISO(job.scheduled_date), 'MMM d, yyyy')}</span>
                      {job.scheduled_time && (
                        <>
                          <Clock className="h-4 w-4 ml-2" />
                          <span>{job.scheduled_time}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {job.job_staff?.length || 0} staff assigned
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="availability" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Staff Availability Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-8 gap-2">
                <div className="text-sm font-medium text-gray-500 p-2">Staff</div>
                {weekDays.map(day => (
                  <div key={day.toISOString()} className="text-sm font-medium text-gray-900 p-2 text-center">
                    <div>{format(day, 'EEE')}</div>
                    <div className="text-xs text-gray-500">{format(day, 'MMM d')}</div>
                  </div>
                ))}

                {staff.map(member => (
                  <div key={member.id} className="contents">
                    <div className="flex items-center gap-2 p-2 border-r border-gray-100">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs">
                          {member.name.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium truncate">{member.name}</span>
                    </div>
                    {weekDays.map(day => {
                      const daySchedule = weekSchedules.find(schedule => 
                        schedule.schedule_date === format(day, 'yyyy-MM-dd') && 
                        schedule.staff?.name === member.name
                      )
                      
                      return (
                        <div key={`${member.id}-${day.toISOString()}`} className="min-h-[50px] border border-gray-100 p-2">
                          {daySchedule ? (
                            <div className="bg-green-50 border border-green-200 rounded p-1 text-xs">
                              <div className="font-medium text-green-800">
                                {daySchedule.start_time} - {daySchedule.end_time}
                              </div>
                              {daySchedule.is_available ? (
                                <div className="text-green-600">Available</div>
                              ) : (
                                <div className="text-red-600">Unavailable</div>
                              )}
                            </div>
                          ) : (
                            <div className="bg-gray-50 border border-gray-200 rounded p-1 text-xs text-center">
                              <div className="text-gray-500">No schedule</div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
