
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
    <div className="min-h-screen bg-background">
      <div className="space-y-6 p-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-navy">Good morning, John!</h1>
            <p className="text-muted-foreground">Here's what's happening with your cleaning business today.</p>
          </div>
          <div className="flex gap-3">
            <Button size="sm" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Job
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
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
            trend={{ value: "8% vs yesterday", positive: true }}
            badge={{ text: "3 urgent", variant: "warning" }}
          />
          <MetricCard
            title="Revenue This Month"
            value="$28,450"
            icon={DollarSign}
            trend={{ value: "12% vs last month", positive: true }}
          />
          <MetricCard
            title="Active Staff"
            value="8/12"
            icon={Users}
            badge={{ text: "4 available", variant: "success" }}
          />
          <MetricCard
            title="Pending Invoices"
            value="$5,240"
            icon={AlertTriangle}
            badge={{ text: "6 overdue", variant: "destructive" }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Jobs */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Today's Jobs</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-success text-white">
                      67% Complete
                    </Badge>
                    <Button size="sm" variant="outline">
                      View All
                    </Button>
                  </div>
                </div>
                <Progress value={67} className="h-2" />
              </CardHeader>
              <CardContent className="space-y-4">
                {todaysJobs.map((job) => (
                  <JobCard key={job.id} {...job} />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Staff Status */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Staff Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {staffMembers.map((staff, index) => (
                  <StaffCard key={index} {...staff} />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Job completed at Metro Hospital</p>
                  <p className="text-xs text-muted-foreground">David Chen • 10 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New client registration</p>
                  <p className="text-xs text-muted-foreground">ABC Corporation • 25 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Equipment maintenance due</p>
                  <p className="text-xs text-muted-foreground">Vacuum #V-001 • 1 hour ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Performance Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Customer Satisfaction</span>
                <span className="text-sm font-bold text-success">4.8/5.0</span>
              </div>
              <Progress value={96} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">On-Time Completion</span>
                <span className="text-sm font-bold text-success">94%</span>
              </div>
              <Progress value={94} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Staff Utilization</span>
                <span className="text-sm font-bold text-warning">78%</span>
              </div>
              <Progress value={78} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Equipment Uptime</span>
                <span className="text-sm font-bold text-success">99%</span>
              </div>
              <Progress value={99} className="h-2" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Index
