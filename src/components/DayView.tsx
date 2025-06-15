
import { format } from "date-fns"
import { Calendar } from "lucide-react"
import { JobCardReference } from "./JobCardReference"

interface DayViewProps {
  jobs: any[]
  selectedDate: Date
  onUpdate: () => void
  onJobDetailsOpen: (job: any) => void
}

export function DayView({ jobs, selectedDate, onUpdate, onJobDetailsOpen }: DayViewProps) {
  const sortedJobs = jobs.sort((a, b) => {
    if (!a.scheduledTime && !b.scheduledTime) return 0
    if (!a.scheduledTime) return 1
    if (!b.scheduledTime) return -1
    return a.scheduledTime.localeCompare(b.scheduledTime)
  })

  console.log('DayView - Total jobs passed:', jobs.length)
  console.log('DayView - Sorted jobs:', sortedJobs)

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
          <JobCardReference key={job.id} job={job} onUpdate={onUpdate} onViewDetails={onJobDetailsOpen} />
        ))
      )}
    </div>
  )
}
