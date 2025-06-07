import { Calendar, Users, Building2, DollarSign, Clock, CheckCircle, AlertTriangle, TrendingUp, Plus, Star } from "lucide-react"
import { MetricCard } from "@/components/MetricCard"
import { JobCard } from "@/components/JobCard"
import { StaffCard } from "@/components/StaffCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useJobs, useStaff, useClients, useInvoices } from "@/hooks/useSupabaseQuery"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"

const Index = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  
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

  // Transform jobs data
  const transformedJobs = jobs.map(job => ({
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
  const transformedStaff = staff.map(member => ({
    name: member.name,
    role: member.role,
    status: member.status as "available" | "on-job" | "offline" | "break",
    location: member.location || 'No location',
    phone: member.phone || 'No phone',
    rating: member.rating || 0,
    jobsToday: member.jobs_today || 0
  }))

  // Calculate metrics from real data
  const totalJobs = jobs.length
  const activeJobs = jobs.filter(job => job.status === 'in-progress').length
  const completedJobs = jobs.filter(job => job.status === 'completed').length
  const scheduledJobs = jobs.filter(job => job.status === 'scheduled').length

  const totalRevenue = invoices
    .filter(invoice => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + (Number(invoice.total_amount) || 0), 0)

  const totalStaff = staff.length
  const activeStaff = staff.filter(member => member.status === 'available' || member.status === 'on-job').length

  const pendingInvoices = invoices
    .filter(invoice => invoice.status === 'pending')
    .reduce((sum, invoice) => sum + (Number(invoice.total_amount) || 0), 0)
  
  const overdueInvoices = invoices.filter(invoice => invoice.status === 'overdue').length

  const handleJobCreated = () => {
    refetchJobs()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="space-y-8 p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Welcome to CleanOps Pro
            </h1>
            <p className="text-gray-600 text-lg">
              Manage your cleaning operations with ease and efficiency
            </p>
          </div>
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="h-5 w-5 mr-2" />
              Quick Add
            </Button>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 shadow-lg transition-all duration-200 hover:shadow-xl"
              onClick={() => setShowCreateModal(true)}
            >
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Job
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Jobs"
            value={totalJobs.toString()}
            icon={Calendar}
            color="blue"
            badge={{ text: `${scheduledJobs} scheduled`, variant: "default" }}
          />
          <MetricCard
            title="Revenue This Month"
            value={`$${totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            color="green"
            badge={{ text: "+12% from last month", variant: "success" }}
          />
          <MetricCard
            title="Active Staff"
            value={`${activeStaff}/${totalStaff}`}
            icon={Users}
            color="blue"
            badge={{ text: `${totalStaff - activeStaff} offline`, variant: "default" }}
          />
          <MetricCard
            title="Pending Invoices"
            value={`$${pendingInvoices.toLocaleString()}`}
            icon={AlertTriangle}
            color="red"
            badge={{ text: `${overdueInvoices} overdue`, variant: overdueInvoices > 0 ? "destructive" : "default" }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Jobs */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-gray-200 bg-white">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <Clock className="h-6 w-6 text-primary" />
                    Today's Schedule
                  </CardTitle>
                  <Badge className="bg-primary text-white px-3 py-1 text-sm">
                    {activeJobs} Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {transformedJobs.slice(0, 4).map((job) => (
                    <JobCard key={job.id} {...job} onUpdate={refetchJobs} />
                  ))}
                  {transformedJobs.length === 0 && (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No jobs scheduled for today</p>
                      <Button 
                        className="mt-4" 
                        onClick={() => setShowCreateModal(true)}
                      >
                        Schedule a Job
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Staff Status */}
          <div className="space-y-6">
            <Card className="shadow-xl border-gray-200 bg-white">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-green-50 to-white">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <Users className="h-5 w-5 text-green-600" />
                  Staff Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {transformedStaff.slice(0, 3).map((member, index) => (
                    <StaffCard key={index} {...member} />
                  ))}
                  {transformedStaff.length === 0 && (
                    <div className="text-center py-4">
                      <p className="text-gray-500">No staff members found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-xl border-gray-200 bg-white">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-yellow-50 to-white">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-yellow-600" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-900 font-medium">Completed Today</span>
                    <Badge className="bg-blue-500 text-white">{completedJobs}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-green-900 font-medium">Active Clients</span>
                    <Badge className="bg-green-500 text-white">{clients.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="text-yellow-900 font-medium">Avg Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-semibold text-yellow-900">4.8</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <CreateJobModal 
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onJobCreated={handleJobCreated}
        />
      )}
    </div>
  )
}

export default Index
