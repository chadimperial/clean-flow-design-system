
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter, Search, Settings, ChevronLeft, ChevronRight } from "lucide-react"

interface ControlsBarProps {
  currentView: "week" | "day" | "month"
  setCurrentView: (view: "week" | "day" | "month") => void
  dateRangeText: string
  onNavigateDate: (direction: 'prev' | 'next') => void
  onTodayClick: () => void
}

export function ControlsBar({
  currentView,
  setCurrentView,
  dateRangeText,
  onNavigateDate,
  onTodayClick
}: ControlsBarProps) {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-200">
      <div className="flex items-center gap-4">
        {/* View Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {["week", "day", "month"].map((view) => (
            <Button
              key={view}
              variant={currentView === view ? "default" : "ghost"}
              size="sm"
              className={`capitalize ${currentView === view ? "bg-white shadow-sm" : ""}`}
              onClick={() => setCurrentView(view as "week" | "day" | "month")}
            >
              {view}
            </Button>
          ))}
        </div>

        {/* Date Navigation */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => onNavigateDate('prev')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-semibold text-gray-900 min-w-[180px] text-center">
            {dateRangeText}
          </span>
          <Button variant="ghost" size="sm" onClick={() => onNavigateDate('next')}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="outline" size="sm" onClick={onTodayClick}>
          Today
        </Button>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search jobs, clients..."
            className="pl-10 w-64 bg-gray-50 border-gray-200"
          />
        </div>

        {/* Filters */}
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>

        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
