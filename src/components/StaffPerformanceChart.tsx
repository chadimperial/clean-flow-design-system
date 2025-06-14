
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { TrendingUp, TrendingDown, Star, Clock, Users, DollarSign, Plus } from "lucide-react"
import { useStaffPerformance } from "@/hooks/useSupabaseQuery"
import { PerformanceGradingModal } from "./PerformanceGradingModal"

interface StaffMember {
  id: string
  name: string
  role: string
  avatar: string
  rating: number
  performance: {
    punctuality: number
    satisfaction: number
    efficiency: number
    revenue: number
  }
}

interface StaffPerformanceChartProps {
  staff: StaffMember[]
}

export function StaffPerformanceChart({ staff }: StaffPerformanceChartProps) {
  const [selectedStaff, setSelectedStaff] = useState<any>(null)
  const [showGradingModal, setShowGradingModal] = useState(false)
  const { data: performanceData = [], refetch } = useStaffPerformance()

  const getPerformanceColor = (score: number) => {
    if (score >= 95) return "text-green-600 bg-green-50"
    if (score >= 90) return "text-blue-600 bg-blue-50"
    if (score >= 85) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  const getPerformanceIcon = (score: number) => {
    if (score >= 90) return <TrendingUp className="h-4 w-4" />
    return <TrendingDown className="h-4 w-4" />
  }

  // Merge staff data with performance data
  const staffWithPerformance = staff.map(member => {
    const latestPerformance = performanceData
      .filter(p => p.staff?.name === member.name)
      .sort((a, b) => new Date(b.performance_date).getTime() - new Date(a.performance_date).getTime())[0]

    return {
      ...member,
      performance: {
        punctuality: latestPerformance?.punctuality_score || 0,
        satisfaction: latestPerformance?.satisfaction_score || 0,
        efficiency: latestPerformance?.efficiency_score || 0,
        revenue: latestPerformance?.revenue_generated || 0
      }
    }
  })

  const topPerformers = [...staffWithPerformance].sort((a, b) => {
    const aAvg = (a.performance.punctuality + a.performance.satisfaction + a.performance.efficiency) / 3
    const bAvg = (b.performance.punctuality + b.performance.satisfaction + b.performance.efficiency) / 3
    return bAvg - aAvg
  }).slice(0, 3)

  const handleGradePerformance = (staffMember: any) => {
    setSelectedStaff(staffMember)
    setShowGradingModal(true)
  }

  const handlePerformanceUpdate = () => {
    refetch()
    setShowGradingModal(false)
  }

  return (
    <div className="space-y-6">
      {/* Top Performers */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Top Performers This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topPerformers.map((staff, index) => {
              const avgScore = (staff.performance.punctuality + staff.performance.satisfaction + staff.performance.efficiency) / 3
              return (
                <div key={staff.id} className="relative">
                  {index === 0 && (
                    <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      #1
                    </div>
                  )}
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg border border-indigo-200">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-12 w-12 ring-2 ring-indigo-200">
                        <AvatarFallback className="bg-indigo-100 text-indigo-700 font-semibold">
                          {staff.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{staff.name}</h3>
                        <p className="text-sm text-gray-600">{staff.role}</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Overall Score</span>
                        <span className="font-bold text-indigo-600">{avgScore.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Customer Rating</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{staff.rating}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Revenue</span>
                        <span className="font-medium text-green-600">${staff.performance.revenue}</span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleGradePerformance(staff)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Grade Performance
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance Matrix */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle>Performance Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Staff Member</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="h-4 w-4" />
                      Punctuality
                    </div>
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4" />
                      Satisfaction
                    </div>
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">
                    <div className="flex items-center justify-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      Efficiency
                    </div>
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">
                    <div className="flex items-center justify-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      Revenue
                    </div>
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffWithPerformance.map((member) => (
                  <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-indigo-100 text-indigo-700 text-sm">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge className={`${getPerformanceColor(member.performance.punctuality)} border-0`}>
                        {member.performance.punctuality}%
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge className={`${getPerformanceColor(member.performance.satisfaction)} border-0`}>
                        {member.performance.satisfaction}%
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge className={`${getPerformanceColor(member.performance.efficiency)} border-0`}>
                        {member.performance.efficiency}%
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="font-medium text-gray-900">${member.performance.revenue}</span>
                        {getPerformanceIcon(member.performance.efficiency)}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleGradePerformance(member)}
                      >
                        Grade
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle>Team Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Performance Tracking</span>
              </div>
              <p className="text-sm text-green-700">
                {performanceData.length} performance reviews recorded. Click "Grade" to add new evaluations.
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">Real-time Data</span>
              </div>
              <p className="text-sm text-blue-700">
                All performance metrics are stored in the database and update in real-time.
              </p>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">Interactive Grading</span>
              </div>
              <p className="text-sm text-yellow-700">
                Use the grading system to track punctuality, satisfaction, and efficiency scores.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle>Revenue Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {staffWithPerformance.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-indigo-100 text-indigo-700 text-sm">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-900">{member.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${member.performance.revenue}</p>
                    <p className="text-xs text-gray-600">This month</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">Total Team Revenue</span>
                <span className="text-xl font-bold text-indigo-600">
                  ${staffWithPerformance.reduce((sum, member) => sum + member.performance.revenue, 0)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <PerformanceGradingModal
        open={showGradingModal}
        onOpenChange={setShowGradingModal}
        staffMember={selectedStaff}
        onUpdate={handlePerformanceUpdate}
      />
    </div>
  )
}
