
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
      ? "bg-primary text-primary-foreground font-medium border-r-2 border-primary" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">CF</span>
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-bold text-lg text-navy">CleanFlow</h1>
              <p className="text-xs text-muted-foreground">Professional</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-11">
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"} 
                      className={getNavCls(item.url)}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="mt-6 px-3">
            <div className="bg-primary/10 rounded-lg p-4">
              <h3 className="font-semibold text-sm text-navy mb-2">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left text-sm p-2 rounded hover:bg-primary/20 flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Job
                </button>
                <button className="w-full text-left text-sm p-2 rounded hover:bg-primary/20 flex items-center gap-2">
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
