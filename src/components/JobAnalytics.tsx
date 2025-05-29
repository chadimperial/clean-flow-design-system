
import { TrendingUp, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function JobAnalytics() {
  const analytics = {
    completionRate: 94,
    avgJobDuration: 2.5,
    onTimePerformance: 87,
    customerSatisfaction: 4.8
  }

  const todayStats = {
    scheduled: 12,
    inProgress: 3,
    completed: 8,
    overdue: 1
  }

  return (
    <Card className="shadow-lg border-gray-200 bg-white">
      <CardHeader className="border-b border-gray-100 bg-gray-50/50">
        <CardTitle className="text-lg font-bold text-gray-900">Today's Analytics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{todayStats.scheduled}</div>
            <div className="text-xs text-blue-600">Scheduled</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{todayStats.inProgress}</div>
            <div className="text-xs text-orange-600">In Progress</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{todayStats.completed}</div>
            <div className="text-xs text-green-600">Completed</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{todayStats.overdue}</div>
            <div className="text-xs text-red-600">Overdue</div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Completion Rate</span>
              <span className="text-sm font-bold text-green-600">{analytics.completionRate}%</span>
            </div>
            <Progress value={analytics.completionRate} className="h-2 bg-gray-200" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">On-Time Performance</span>
              <span className="text-sm font-bold text-orange-600">{analytics.onTimePerformance}%</span>
            </div>
            <Progress value={analytics.onTimePerformance} className="h-2 bg-gray-200" />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-700">Avg Duration</span>
            </div>
            <span className="text-sm font-bold text-gray-900">{analytics.avgJobDuration}h</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-700">Customer Rating</span>
            </div>
            <span className="text-sm font-bold text-green-600">{analytics.customerSatisfaction}/5.0</span>
          </div>
        </div>

        {/* Alerts */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-900">Today's Alerts</h4>
          <div className="flex items-center gap-2 p-2 bg-red-50 rounded text-xs">
            <AlertTriangle className="h-3 w-3 text-red-500" />
            <span className="text-red-700">1 job running behind schedule</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-green-50 rounded text-xs">
            <CheckCircle className="h-3 w-3 text-green-500" />
            <span className="text-green-700">Metro Hospital job completed early</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
