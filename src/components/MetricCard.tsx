
import { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MetricCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: string
    positive: boolean
  }
  badge?: {
    text: string
    variant: "default" | "success" | "warning" | "destructive"
  }
  className?: string
  color?: "blue" | "green" | "orange" | "red" | "gray"
}

export function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  badge,
  className = "",
  color = "blue"
}: MetricCardProps) {
  const getCardColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
      case "green":
        return "bg-gradient-to-br from-green-50 to-green-100 border-green-200"
      case "orange":
        return "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200"
      case "red":
        return "bg-gradient-to-br from-red-50 to-red-100 border-red-200"
      default:
        return "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200"
    }
  }

  const getIconColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "text-blue-600 bg-blue-100"
      case "green":
        return "text-green-600 bg-green-100"
      case "orange":
        return "text-orange-600 bg-orange-100"
      case "red":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  // Map custom variants to supported Badge variants
  const getBadgeVariant = (variant: "default" | "success" | "warning" | "destructive") => {
    switch (variant) {
      case "success":
        return "default" as const
      case "warning":
        return "secondary" as const
      case "destructive":
        return "destructive" as const
      default:
        return "default" as const
    }
  }

  const getBadgeClassName = (variant: "default" | "success" | "warning" | "destructive") => {
    switch (variant) {
      case "success":
        return "bg-green-500 text-white hover:bg-green-600"
      case "warning":
        return "bg-orange-500 text-white hover:bg-orange-600"
      case "destructive":
        return "bg-red-500 text-white hover:bg-red-600"
      default:
        return "bg-blue-500 text-white hover:bg-blue-600"
    }
  }

  return (
    <Card className={`${getCardColorClasses(color)} border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wide">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${getIconColorClasses(color)}`}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        <div className="flex items-center justify-between">
          {trend && (
            <div className="flex items-center gap-1">
              <span className={`text-sm font-medium ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.positive ? '↗' : '↘'} {trend.value}
              </span>
            </div>
          )}
          {badge && (
            <Badge 
              variant={getBadgeVariant(badge.variant)}
              className={`${getBadgeClassName(badge.variant)} font-medium px-3 py-1`}
            >
              {badge.text}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
