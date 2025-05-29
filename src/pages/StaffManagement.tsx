
import { useState } from "react"
import { 
  Users, 
  Search, 
  Filter, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Plus,
  Clock,
  Star,
  TrendingUp,
  Award,
  Calendar,
  Settings,
  Eye,
  Edit,
  MoreVertical,
  AlertCircle,
  CheckCircle,
  Timer,
  DollarSign
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { StaffCard } from "@/components/StaffCard"
import { StaffPerformanceChart } from "@/components/StaffPerformanceChart"
import { CreateStaffModal } from "@/components/CreateStaffModal"

interface StaffMember {
  id: string
  name: string
  role: string
  status: "active" | "on-break" | "off-duty" | "on-job" | "late"
  avatar: string
  phone: string
  email: string
  currentLocation?: string
  jobsToday: number
  hoursWorked: number
  rating: number
  joinDate: string
  skills: string[]
  certifications: string[]
  performance: {
    punctuality: number
    satisfaction: number
    efficiency: number
    revenue: number
  }
}

const staffMembers: StaffMember[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Team Leader",
    status: "active",
    avatar: "SJ",
    phone: "+1-555-0123",
    email: "sarah.johnson@cleanflow.com",
    currentLocation: "Downtown Office Complex",
    jobsToday: 5,
    hoursWorked: 6.5,
    rating: 4.9,
    joinDate: "2023-01-15",
    skills: ["Deep Cleaning", "Carpet Care", "Window Cleaning"],
    certifications: ["Lead Cleaning Specialist", "Safety Certified"],
    performance: { punctuality: 98, satisfaction: 96, efficiency: 94, revenue: 1250 }
  },
  {
    id: "2",
    name: "Mike Chen",
    role: "Senior Cleaner",
    status: "on-job",
    avatar: "MC",
    phone: "+1-555-0124",
    email: "mike.chen@cleanflow.com",
    currentLocation: "Residential District",
    jobsToday: 4,
    hoursWorked: 5.2,
    rating: 4.7,
    joinDate: "2023-03-20",
    skills: ["Floor Care", "Sanitization", "Equipment Maintenance"],
    certifications: ["Biohazard Cleaning", "Equipment Certified"],
    performance: { punctuality: 92, satisfaction: 94, efficiency: 91, revenue: 980 }
  },
  {
    id: "3",
    name: "Emma Wilson",
    role: "Junior Cleaner",
    status: "on-break",
    avatar: "EW",
    phone: "+1-555-0125",
    email: "emma.wilson@cleanflow.com",
    currentLocation: "Break Room",
    jobsToday: 3,
    hoursWorked: 4.0,
    rating: 4.5,
    joinDate: "2024-01-10",
    skills: ["Basic Cleaning", "Customer Service"],
    certifications: ["Basic Safety Training"],
    performance: { punctuality: 88, satisfaction: 89, efficiency: 85, revenue: 720 }
  },
  {
    id: "4",
    name: "David Rodriguez",
    role: "Specialist Cleaner",
    status: "off-duty",
    avatar: "DR",
    phone: "+1-555-0126",
    email: "david.rodriguez@cleanflow.com",
    jobsToday: 0,
    hoursWorked: 0,
    rating: 4.8,
    joinDate: "2022-11-05",
    skills: ["Carpet Cleaning", "Upholstery", "Stain Removal"],
    certifications: ["Carpet Care Specialist", "Advanced Cleaning"],
    performance: { punctuality: 95, satisfaction: 97, efficiency: 93, revenue: 1100 }
  }
]

export default function StaffManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [showCreateModal, setShowCreateModal] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500"
      case "on-job": return "bg-blue-500"
      case "on-break": return "bg-orange-500"
      case "late": return "bg-red-500"
      case "off-duty": return "bg-gray-500"
      default: return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Available"
      case "on-job": return "On Job"
      case "on-break": return "On Break"
      case "late": return "Late/Missing"
      case "off-duty": return "Off Duty"
      default: return "Unknown"
    }
  }

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === "all" || staff.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  const activeStaffCount = staffMembers.filter(s => s.status === "active" || s.status === "on-job").length
  const totalHoursToday = staffMembers.reduce((sum, s) => sum + s.hoursWorked, 0)
  const averageRating = staffMembers.reduce((sum, s) => sum + s.rating, 0) / staffMembers.length

  return (
    <div className="flex-1 space-y-6 p-6 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600 mt-1">Manage your cleaning team and monitor performance</p>
        </div>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Staff</p>
                <p className="text-2xl font-bold text-gray-900">{activeStaffCount}</p>
                <p className="text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +2 from yesterday
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hours Today</p>
                <p className="text-2xl font-bold text-gray-900">{totalHoursToday.toFixed(1)}</p>
                <p className="text-xs text-blue-600 mt-1">
                  <Clock className="h-3 w-3 inline mr-1" />
                  On track for target
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
                <p className="text-xs text-yellow-600 mt-1">
                  <Star className="h-3 w-3 inline mr-1" />
                  Excellent performance
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue Today</p>
                <p className="text-2xl font-bold text-gray-900">$3,450</p>
                <p className="text-xs text-green-600 mt-1">
                  <DollarSign className="h-3 w-3 inline mr-1" />
                  +15% vs yesterday
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search staff by name, role, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedFilter === "all" ? "default" : "outline"}
                onClick={() => setSelectedFilter("all")}
                size="sm"
              >
                All Staff
              </Button>
              <Button
                variant={selectedFilter === "active" ? "default" : "outline"}
                onClick={() => setSelectedFilter("active")}
                size="sm"
              >
                Available
              </Button>
              <Button
                variant={selectedFilter === "on-job" ? "default" : "outline"}
                onClick={() => setSelectedFilter("on-job")}
                size="sm"
              >
                On Job
              </Button>
              <Button
                variant={selectedFilter === "on-break" ? "default" : "outline"}
                onClick={() => setSelectedFilter("on-break")}
                size="sm"
              >
                On Break
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white">
          <TabsTrigger value="overview">Staff Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Staff Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff.map((staff) => (
              <Card key={staff.id} className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16 ring-2 ring-gray-200">
                        <AvatarImage src={`/placeholder-avatar-${staff.id}.jpg`} alt={staff.name} />
                        <AvatarFallback className="bg-indigo-100 text-indigo-700 text-lg font-semibold">
                          {staff.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${getStatusColor(staff.status)} rounded-full border-2 border-white`}></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 truncate">{staff.name}</h3>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              View Schedule
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" />
                              Settings
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{staff.role}</p>
                      
                      <Badge className={`${getStatusColor(staff.status)} text-white text-xs mb-3`}>
                        {getStatusText(staff.status)}
                      </Badge>
                      
                      {staff.currentLocation && (
                        <div className="flex items-center gap-1 mb-2">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-600 truncate">{staff.currentLocation}</span>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 mb-4">
                        <div>
                          <p className="font-medium">Jobs Today</p>
                          <p className="text-lg font-semibold text-gray-900">{staff.jobsToday}</p>
                        </div>
                        <div>
                          <p className="font-medium">Hours</p>
                          <p className="text-lg font-semibold text-gray-900">{staff.hoursWorked}h</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{staff.rating}</span>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <StaffPerformanceChart staff={staffMembers} />
        </TabsContent>

        <TabsContent value="scheduling" className="space-y-6">
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle>Staff Scheduling (Coming Soon)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Advanced scheduling features will be available here including shift management, availability tracking, and automated scheduling.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle>Staff Analytics (Coming Soon)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Comprehensive analytics including productivity metrics, performance trends, and workforce optimization insights.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateStaffModal 
        open={showCreateModal} 
        onOpenChange={setShowCreateModal} 
      />
    </div>
  )
}
