
import { Badge } from "@/components/ui/badge"

interface JobTimeSlotCardProps {
  job: any
}

export function JobTimeSlotCard({ job }: JobTimeSlotCardProps) {
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
