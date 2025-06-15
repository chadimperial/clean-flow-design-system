
import { Badge } from "@/components/ui/badge"

interface StatusCardsProps {
  scheduledJobs: number
  inProgressJobs: number
  completedJobs: number
}

export function StatusCards({ scheduledJobs, inProgressJobs, completedJobs }: StatusCardsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex items-center gap-1 bg-blue-500 text-white px-6 py-3 rounded-full shadow-md">
        <span className="text-lg font-bold">{scheduledJobs}</span>
        <span className="text-sm font-medium">Scheduled</span>
      </div>
      <div className="flex items-center gap-1 bg-orange-500 text-white px-6 py-3 rounded-full shadow-md">
        <span className="text-lg font-bold">{inProgressJobs}</span>
        <span className="text-sm font-medium">In Progress</span>
      </div>
      <div className="flex items-center gap-1 bg-green-500 text-white px-6 py-3 rounded-full shadow-md">
        <span className="text-lg font-bold">{completedJobs}</span>
        <span className="text-sm font-medium">Completed</span>
      </div>
    </div>
  )
}
