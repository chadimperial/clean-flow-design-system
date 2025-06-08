
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Clock, User, MapPin, Plus, Filter } from "lucide-react"
import { useStaffSchedules, useStaff, useJobs } from "@/hooks/useSupabaseQuery"
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addWeeks, subWeeks } from "date-fns"

export function StaffSchedulingPage() {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const { data: schedules = [] } = useStaffSchedules()
  const { data: staff = [] } = useStaff()
  const { data: jobs = [] } = useJobs()

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 })
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })

  const getStaffScheduleForDay = (staffId: string, date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return schedules.find(schedule => 
      schedule.staff_id === staffId && 
      schedule.schedule_date === dateStr
    )
  }

  const getJobsForStaff = (staffId: string, date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return jobs.filter(job => 
      job.scheduled_date === dateStr && 
      job.job_staff?.some((js: any) => js.staff?.id === staffId)
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800"
      case "on-job": return "bg-blue-100 text-blue-800"
      case "on-break": return "bg-orange-100 text-orange-800"
      case "off-duty": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Staff Scheduling</h2>
          <p className="text-gray-600">
            Week of {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
          >
            Previous
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setCurrentWeek(new Date())}
          >
            Today
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
          >
            Next
          </Button>
          <Button className="ml-4">
            <Plus className="h-4 w-4 mr-2" />
            Add Schedule
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Staff</p>
                <p className="text-xl font-bold">{staff.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Available Today</p>
                <p className="text-xl font-bold">
                  {staff.filter(s => s.status === 'available').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Scheduled Jobs</p>
                <p className="text-xl font-bold">
                  {jobs.filter(j => {
                    const today = format(new Date(), 'yyyy-MM-dd')
                    return j.scheduled_date === today
                  }).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">On Jobs</p>
                <p className="text-xl font-bold">
                  {staff.filter(s => s.status === 'on-job').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Schedule Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weekly Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Header with days */}
              <div className="grid grid-cols-8 gap-2 mb-4">
                <div className="font-medium text-gray-600 p-2">Staff</div>
                {weekDays.map(day => (
                  <div key={day.toISOString()} className="text-center p-2">
                    <div className="font-medium text-gray-900">
                      {format(day, 'EEE')}
                    </div>
                    <div className="text-sm text-gray-600">
                      {format(day, 'MMM d')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Staff rows */}
              <div className="space-y-2">
                {staff.map(staffMember => (
                  <div key={staffMember.id} className="grid grid-cols-8 gap-2 border border-gray-200 rounded-lg p-2">
                    {/* Staff info */}
                    <div className="flex items-center gap-3 p-2">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-indigo-100 text-indigo-700">
                          {staffMember.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{staffMember.name}</p>
                        <p className="text-xs text-gray-600">{staffMember.role}</p>
                        <Badge className={`text-xs ${getStatusColor(staffMember.status)}`}>
                          {staffMember.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Daily schedule */}
                    {weekDays.map(day => {
                      const schedule = getStaffScheduleForDay(staffMember.id, day)
                      const dayJobs = getJobsForStaff(staffMember.id, day)
                      
                      return (
                        <div key={day.toISOString()} className="p-2 min-h-[100px] border border-gray-100 rounded">
                          {schedule && (
                            <div className="space-y-1">
                              <div className="text-xs font-medium text-gray-900">
                                {schedule.start_time} - {schedule.end_time}
                              </div>
                              {schedule.break_start && (
                                <div className="text-xs text-orange-600">
                                  Break: {schedule.break_start} - {schedule.break_end}
                                </div>
                              )}
                              <Badge 
                                className={`text-xs ${schedule.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                              >
                                {schedule.is_available ? 'Available' : 'Unavailable'}
                              </Badge>
                            </div>
                          )}
                          
                          {dayJobs.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {dayJobs.map(job => (
                                <div key={job.id} className="bg-blue-50 border border-blue-200 rounded p-1">
                                  <div className="text-xs font-medium text-blue-900">
                                    {job.title}
                                  </div>
                                  <div className="text-xs text-blue-700">
                                    {job.scheduled_time || 'No time set'}
                                  </div>
                                  <Badge className="text-xs bg-blue-100 text-blue-800">
                                    {job.status}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {!schedule && dayJobs.length === 0 && (
                            <div className="text-xs text-gray-400 italic">
                              No schedule
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Staff Availability Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Staff Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {staff.filter(s => s.status === 'available').map(staffMember => (
                <div key={staffMember.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-green-100 text-green-700">
                        {staffMember.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{staffMember.name}</p>
                      <p className="text-xs text-gray-600">{staffMember.role}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Available</Badge>
                </div>
              ))}
              {staff.filter(s => s.status === 'available').length === 0 && (
                <p className="text-gray-500 text-center py-4">No staff available</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staff on Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {staff.filter(s => s.status === 'on-job').map(staffMember => (
                <div key={staffMember.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {staffMember.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{staffMember.name}</p>
                      <p className="text-xs text-gray-600">{staffMember.role}</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">On Job</Badge>
                </div>
              ))}
              {staff.filter(s => s.status === 'on-job').length === 0 && (
                <p className="text-gray-500 text-center py-4">No staff currently on jobs</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
