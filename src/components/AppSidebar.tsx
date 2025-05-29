
import { useState } from "react"
import { Calendar, Users, Building2, DollarSign, Package, BarChart, Settings, LayoutDashboard, Plus, Search, Bell } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Job Scheduling", url: "/scheduling", icon: Calendar },
  { title: "Staff Management", url: "/staff", icon: Users },
  { title: "Client CRM", url: "/clients", icon: Building2 },
  { title: "Finance & Payroll", url: "/finance", icon: DollarSign },
  { title: "Inventory & Equipment", url: "/inventory", icon: Package },
  { title: "Reports & Analytics", url: "/reports", icon: BarChart },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/"
    }
    return currentPath.startsWith(path)
  }

  const getNavCls = (path: string) =>
    isActive(path) 
      ? "bg-white/20 text-white font-semibold border-r-4 border-white backdrop-blur-sm" 
      : "hover:bg-white/10 text-white/80 hover:text-white transition-all duration-200"

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} bg-gradient-to-b from-primary to-indigo-700 shadow-2xl`} collapsible="icon">
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-primary font-bold text-lg">CF</span>
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-bold text-xl text-white">CleanFlow</h1>
              <p className="text-xs text-white/70">Professional</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent className="px-3 py-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-12 rounded-xl">
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"} 
                      className={getNavCls(item.url)}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="ml-3 font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="mt-8 px-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="font-semibold text-sm text-white mb-4 uppercase tracking-wide">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left text-sm p-3 rounded-lg hover:bg-white/20 flex items-center gap-3 text-white/90 hover:text-white transition-all duration-200">
                  <Plus className="h-4 w-4" />
                  New Job
                </button>
                <button className="w-full text-left text-sm p-3 rounded-lg hover:bg-white/20 flex items-center gap-3 text-white/90 hover:text-white transition-all duration-200">
                  <Users className="h-4 w-4" />
                  Add Client
                </button>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}
