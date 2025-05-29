
import { Calendar, Users, Building2, DollarSign, Clock, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react"
import { MetricCard } from "@/components/MetricCard"
import { JobCard } from "@/components/JobCard"
import { StaffCard } from "@/components/StaffCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const todaysJobs = [
  {
    id: "1",
    client: "Sunshine Office Complex",
    service: "Deep Clean",
    time: "9:00 AM - 12:00 PM",
    address: "123 Business Park, Downtown",
    staff: ["John Smith", "Maria Garcia"],
    status: "scheduled" as const,
    priority: "normal" as const
  },
  {
    id: "2",
    client: "Metro Hospital",
    service: "Medical Cleaning",
    time: "8:00 AM - 10:00 AM",
    address: "456 Health Plaza",
    staff: ["David Chen"],
    status: "in-progress" as const,
    priority: "urgent" as const
  },
  {
    id: "3",
    client: "Riverside Restaurant",
    service: "Kitchen Deep Clean",
    time: "6:00 AM - 8:00 AM",
    address: "789 Waterfront St",
    staff: ["Sarah Wilson", "Mike Johnson"],
    status: "completed" as const,
    priority: "normal" as const
  }
]

const staffMembers = [
  {
    name: "John Smith",
    role: "Senior Cleaner",
    status: "on-job" as const,
    location: "Downtown Business District",
    phone: "(555) 123-4567",
    rating: 4.8,
    jobsToday: 3
  },
  {
    name: "Maria Garcia",
    role: "Team Lead",
    status: "online" as const,
    phone: "(555) 234-5678",
    rating: 4.9,
    jobsToday: 2
  },
  {
    name: "David Chen",
    role: "Specialist",
    status: "on-job" as const,
    location: "Metro Hospital",
    phone: "(555) 345-6789",
    rating: 4.7,
    jobsToday: 4
  }
]

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-8 p-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Good morning, John!</h1>
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
            value="12"
            icon={Calendar}
            color="blue"
            trend={{ value: "8% vs yesterday", positive: true }}
            badge={{ text: "3 urgent", variant: "warning" }}
          />
          <MetricCard
            title="Revenue This Month"
            value="$28,450"
            icon={DollarSign}
            color="green"
            trend={{ value: "12% vs last month", positive: true }}
          />
          <MetricCard
            title="Active Staff"
            value="8/12"
            icon={Users}
            color="blue"
            badge={{ text: "4 available", variant: "success" }}
          />
          <MetricCard
            title="Pending Invoices"
            value="$5,240"
            icon={AlertTriangle}
            color="red"
            badge={{ text: "6 overdue", variant: "destructive" }}
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
                      67% Complete
                    </Badge>
                    <Button size="sm" variant="outline" className="border-gray-300">
                      View All
                    </Button>
                  </div>
                </div>
                <Progress value={67} className="h-3 bg-gray-200" />
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {todaysJobs.map((job) => (
                  <JobCard key={job.id} {...job} />
                ))}
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
                {staffMembers.map((staff, index) => (
                  <StaffCard key={index} {...staff} />
                ))}
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
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Job completed at Metro Hospital</p>
                  <p className="text-xs text-gray-500">David Chen • 10 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">New client registration</p>
                  <p className="text-xs text-gray-500">ABC Corporation • 25 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Equipment maintenance due</p>
                  <p className="text-xs text-gray-500">Vacuum #V-001 • 1 hour ago</p>
                </div>
              </div>
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
                  <span className="text-sm font-medium text-gray-700">Customer Satisfaction</span>
                  <span className="text-sm font-bold text-green-600">4.8/5.0</span>
                </div>
                <Progress value={96} className="h-3 bg-gray-200" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">On-Time Completion</span>
                  <span className="text-sm font-bold text-green-600">94%</span>
                </div>
                <Progress value={94} className="h-3 bg-gray-200" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Staff Utilization</span>
                  <span className="text-sm font-bold text-orange-600">78%</span>
                </div>
                <Progress value={78} className="h-3 bg-gray-200" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Equipment Uptime</span>
                  <span className="text-sm font-bold text-green-600">99%</span>
                </div>
                <Progress value={99} className="h-3 bg-gray-200" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Index
