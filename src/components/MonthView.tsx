
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isToday } from "date-fns"

interface MonthViewProps {
  jobs: any[]
  selectedDate: Date
  onJobDetailsOpen?: (job: any) => void
}

export function MonthView({ jobs, selectedDate, onJobDetailsOpen }: MonthViewProps) {
  const monthStart = startOfMonth(selectedDate)
  const monthEnd = endOfMonth(selectedDate)
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 })
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 })
  const dateRange = eachDayOfInterval({ start: startDate, end: endDate })

  const getJobsForDay = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return jobs.filter(job => job.scheduledDate === dateStr)
  }

  const handleJobClick = (job: any) => {
    if (onJobDetailsOpen) {
      onJobDetailsOpen(job)
    }
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
                  <div 
                    key={job.id} 
                    className={`text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 transition-opacity ${
                      job.status === 'completed' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                      job.status === 'in-progress' ? 'bg-orange-100 text-orange-800 hover:bg-orange-200' :
                      'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    }`}
                    onClick={() => handleJobClick(job)}
                    title={`${job.service} - ${job.client} at ${job.time}`}
                  >
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
