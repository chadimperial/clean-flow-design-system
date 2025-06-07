
import { Calendar, Users, Building2, DollarSign, Clock, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react"
import { MetricCard } from "@/components/MetricCard"
import { JobCard } from "@/components/JobCard"
import { StaffCard } from "@/components/StaffCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useJobs, useStaff, useClients, useInvoices } from "@/hooks/useSupabaseQuery"
import { format } from "date-fns"
import { useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"

const Index = () => {
  const { data: jobs = [], refetch: refetchJobs } = useJobs()
  const { data: staff = [] } = useStaff()
  const { data: clients = [] } = useClients()
  const { data: invoices = [] } = useInvoices()

  // Set up real-time subscription for jobs
  useEffect(() => {
    const channel = supabase
      .channel('jobs-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'jobs'
        },
        () => {
          refetchJobs()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [refetchJobs])

  // Filter today's jobs
  const today = new Date().toISOString().split('T')[0]
  const todaysJobs = jobs.filter(job => 
    job.scheduled_date === today
  ).map(job => ({
    id: job.id,
    client: job.clients?.name || 'Unknown Client',
    service: job.title,
    time: job.scheduled_time ? format(new Date(`2000-01-01T${job.scheduled_time}`), 'h:mm a') : 'No time set',
    address: job.location || 'No address',
    staff: job.job_staff?.map(js => js.staff?.name).filter(Boolean) || [],
    status: job.status as "scheduled" | "in-progress" | "completed",
    priority: job.priority as "low" | "normal" | "high" | "urgent",
    serviceType: job.service_type,
    duration: job.estimated_duration || 0,
    completionPercentage: job.status === 'completed' ? 100 : job.status === 'in-progress' ? 50 : 0
  }))

  // Transform staff data
  const staffMembers = staff.slice(0, 3).map(member => ({
    name: member.name,
    role: member.role,
    status: member.status as "available" | "on-job" | "offline" | "break",
    location: member.location || 'No location',
    nextJob: "No jobs scheduled",
    phone: member.phone || 'No phone',
    rating: Number(member.rating) || 0,
    jobsToday: member.jobs_today || 0
  }))

  // Calculate metrics
  const totalJobs = todaysJobs.length
  const completedJobs = todaysJobs.filter(job => job.status === 'completed').length
  const inProgressJobs = todaysJobs.filter(job => job.status === 'in-progress').length
  const urgentJobs = todaysJobs.filter(job => job.priority === 'urgent').length
  
  const monthlyRevenue = invoices
    .filter(invoice => {
      const invoiceDate = new Date(invoice.created_at)
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()
      return invoiceDate.getMonth() === currentMonth && invoiceDate.getFullYear() === currentYear
    })
    .reduce((total, invoice) => total + Number(invoice.total_amount || 0), 0)

  const activeStaff = staff.filter(member => member.status !== 'offline').length
  const totalStaff = staff.length

  const pendingInvoices = invoices
    .filter(invoice => invoice.status === 'pending')
    .reduce((total, invoice) => total + Number(invoice.total_amount || 0), 0)

  const overdueInvoices = invoices.filter(invoice => {
    if (invoice.status !== 'pending' || !invoice.due_date) return false
    return new Date(invoice.due_date) < new Date()
  }).length

  const completionRate = totalJobs > 0 ? Math.round((completedJobs / totalJobs) * 100) : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-8 p-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Good morning!</h1>
            <p className="text-gray-600">Here's what's happening with your cleaning business today.</p>
          </div>
          <div className="flex gap-3">
            <Button size="sm" variant="outline" className="border-gray-300 hover:bg-gray-50">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Job
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-md">
              <Users className="h-4 w-4 mr-2" />
              Manage Staff
            </Button>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Today's Jobs"
            value={totalJobs.toString()}
            icon={Calendar}
            color="blue"
            trend={{ value: `${inProgressJobs} in progress`, positive: true }}
            badge={{ text: `${urgentJobs} urgent`, variant: urgentJobs > 0 ? "warning" : "default" }}
          />
          <MetricCard
            title="Revenue This Month"
            value={`$${monthlyRevenue.toLocaleString()}`}
            icon={DollarSign}
            color="green"
            trend={{ value: "Based on paid invoices", positive: true }}
          />
          <MetricCard
            title="Active Staff"
            value={`${activeStaff}/${totalStaff}`}
            icon={Users}
            color="blue"
            badge={{ text: `${totalStaff - activeStaff} offline`, variant: "secondary" }}
          />
          <MetricCard
            title="Pending Invoices"
            value={`$${pendingInvoices.toLocaleString()}`}
            icon={AlertTriangle}
            color="red"
            badge={{ text: `${overdueInvoices} overdue`, variant: overdueInvoices > 0 ? "destructive" : "secondary" }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Jobs */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-gray-200 bg-white">
              <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900">Today's Jobs</CardTitle>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-500 text-white px-3 py-1 font-medium">
                      {completionRate}% Complete
                    </Badge>
                    <Button size="sm" variant="outline" className="border-gray-300">
                      View All
                    </Button>
                  </div>
                </div>
                <Progress value={completionRate} className="h-3 bg-gray-200" />
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {todaysJobs.length > 0 ? (
                  todaysJobs.map((job) => (
                    <JobCard key={job.id} {...job} />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No jobs scheduled for today</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Staff Status */}
          <div>
            <Card className="shadow-lg border-gray-200 bg-white">
              <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                <CardTitle className="text-xl font-bold text-gray-900">Staff Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {staffMembers.length > 0 ? (
                  staffMembers.map((staff, index) => (
                    <StaffCard key={index} {...staff} />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No staff members found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="shadow-lg border-gray-200 bg-white">
            <CardHeader className="border-b border-gray-100 bg-gray-50/50">
              <CardTitle className="text-xl font-bold text-gray-900">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {jobs.slice(0, 3).map((job, index) => (
                <div key={job.id} className={`flex items-center gap-4 p-4 rounded-lg border ${
                  job.status === 'completed' ? 'bg-green-50 border-green-200' :
                  job.status === 'in-progress' ? 'bg-orange-50 border-orange-200' :
                  'bg-blue-50 border-blue-200'
                }`}>
                  <div className={`w-3 h-3 rounded-full ${
                    job.status === 'completed' ? 'bg-green-500' :
                    job.status === 'in-progress' ? 'bg-orange-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{job.title} - {job.clients?.name}</p>
                    <p className="text-xs text-gray-500">
                      {job.status === 'completed' ? 'Completed' : 
                       job.status === 'in-progress' ? 'In Progress' : 'Scheduled'} • 
                      {job.scheduled_date ? format(new Date(job.scheduled_date), 'MMM d') : 'No date'}
                    </p>
                  </div>
                </div>
              ))}
              {jobs.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No recent activity</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="shadow-lg border-gray-200 bg-white">
            <CardHeader className="border-b border-gray-100 bg-gray-50/50">
              <CardTitle className="text-xl font-bold text-gray-900">Performance Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Jobs Completion Rate</span>
                  <span className="text-sm font-bold text-green-600">{completionRate}%</span>
                </div>
                <Progress value={completionRate} className="h-3 bg-gray-200" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Staff Utilization</span>
                  <span className="text-sm font-bold text-orange-600">{Math.round((activeStaff / Math.max(totalStaff, 1)) * 100)}%</span>
                </div>
                <Progress value={Math.round((activeStaff / Math.max(totalStaff, 1)) * 100)} className="h-3 bg-gray-200" />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Total Clients</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{clients.length}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">Monthly Jobs</span>
                </div>
                <span className="text-sm font-bold text-green-600">{jobs.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Index
