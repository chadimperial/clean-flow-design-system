
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isToday } from "date-fns"
import { JobTimeSlotCard } from "./JobTimeSlotCard"

interface WeekViewProps {
  jobs: any[]
  selectedDate: Date
}

export function WeekView({ jobs, selectedDate }: WeekViewProps) {
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
