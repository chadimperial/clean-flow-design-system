
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
import { StaffSchedulingPage } from "@/components/StaffSchedulingPage"
import { CreateStaffModal } from "@/components/CreateStaffModal"
import { StaffProfileModal } from "@/components/StaffProfileModal"
import { useStaff } from "@/hooks/useSupabaseQuery"

export default function StaffManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<any>(null)
  const [showProfileModal, setShowProfileModal] = useState(false)
  
  // Use real data from Supabase
  const { data: staff = [], refetch: refetchStaff } = useStaff()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-500"
      case "on-job": return "bg-blue-500"
      case "on-break": return "bg-orange-500"
      case "late": return "bg-red-500"
      case "off-duty": return "bg-gray-500"
      case "offline": return "bg-gray-500"
      default: return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "available": return "Available"
      case "on-job": return "On Job"
      case "on-break": return "On Break"
      case "late": return "Late/Missing"
      case "off-duty": return "Off Duty"
      case "offline": return "Off Duty"
      default: return "Unknown"
    }
  }

  // Transform staff data to match component expectations
  const transformedStaff = staff.map(member => ({
    id: member.id,
    name: member.name,
    role: member.role,
    status: member.status,
    avatar: member.name.split(' ').map(n => n[0]).join('').toUpperCase(),
    phone: member.phone || 'No phone',
    email: member.email || 'No email',
    currentLocation: member.location,
    jobsToday: member.jobs_today || 0,
    hoursWorked: 0, // This would need to be calculated from job assignments
    rating: member.rating || 0,
    joinDate: member.hire_date || member.created_at,
    skills: [], // This would need to be added to the database schema
    certifications: [], // This would need to be added to the database schema
    performance: { 
      punctuality: 90, 
      satisfaction: 95, 
      efficiency: 88, 
      revenue: Math.floor(Math.random() * 1000) + 500 
    }
  }))

  const filteredStaff = transformedStaff.filter(staffMember => {
    const matchesSearch = staffMember.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staffMember.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === "all" || staffMember.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  const activeStaffCount = transformedStaff.filter(s => s.status === "available" || s.status === "on-job").length
  const totalHoursToday = transformedStaff.reduce((sum, s) => sum + s.hoursWorked, 0)
  const averageRating = transformedStaff.length > 0 ? transformedStaff.reduce((sum, s) => sum + s.rating, 0) / transformedStaff.length : 0

  const handleStaffCreated = () => {
    refetchStaff()
    setShowCreateModal(false)
  }

  const handleViewProfile = (staffMember: any) => {
    setSelectedStaff(staffMember)
    setShowProfileModal(true)
  }

  const handleEditDetails = (staffMember: any) => {
    setSelectedStaff(staffMember)
    setShowProfileModal(true)
  }

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
                  {transformedStaff.length} total staff
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
                variant={selectedFilter === "available" ? "default" : "outline"}
                onClick={() => setSelectedFilter("available")}
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
            {filteredStaff.length > 0 ? (
              filteredStaff.map((staffMember) => (
                <Card key={staffMember.id} className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <Avatar className="h-16 w-16 ring-2 ring-gray-200">
                          <AvatarImage src={`/placeholder-avatar-${staffMember.id}.jpg`} alt={staffMember.name} />
                          <AvatarFallback className="bg-indigo-100 text-indigo-700 text-lg font-semibold">
                            {staffMember.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${getStatusColor(staffMember.status)} rounded-full border-2 border-white`}></div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 truncate">{staffMember.name}</h3>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewProfile(staffMember)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditDetails(staffMember)}>
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
                        
                        <p className="text-sm text-gray-600 mb-3">{staffMember.role}</p>
                        
                        <Badge className={`${getStatusColor(staffMember.status)} text-white text-xs mb-3`}>
                          {getStatusText(staffMember.status)}
                        </Badge>
                        
                        {staffMember.currentLocation && (
                          <div className="flex items-center gap-1 mb-2">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-600 truncate">{staffMember.currentLocation}</span>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 mb-4">
                          <div>
                            <p className="font-medium">Jobs Today</p>
                            <p className="text-lg font-semibold text-gray-900">{staffMember.jobsToday}</p>
                          </div>
                          <div>
                            <p className="font-medium">Hours</p>
                            <p className="text-lg font-semibold text-gray-900">{staffMember.hoursWorked}h</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{staffMember.rating}</span>
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
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No staff members found</p>
                <Button onClick={() => setShowCreateModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Staff Member
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <StaffPerformanceChart staff={transformedStaff} />
        </TabsContent>

        <TabsContent value="scheduling" className="space-y-6">
          <StaffSchedulingPage />
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
        onStaffCreated={handleStaffCreated}
      />

      <StaffProfileModal
        open={showProfileModal}
        onOpenChange={setShowProfileModal}
        staffMember={selectedStaff}
        onUpdate={refetchStaff}
      />
    </div>
  )
}
