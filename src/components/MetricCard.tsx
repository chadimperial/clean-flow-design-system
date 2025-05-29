
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
}

export function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  badge,
  className = "" 
}: MetricCardProps) {
  return (
    <Card className={`metric-card ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-navy">{value}</div>
        <div className="flex items-center justify-between mt-2">
          {trend && (
            <p className={`text-xs ${trend.positive ? 'text-success' : 'text-error'}`}>
              {trend.positive ? '+' : ''}{trend.value}
            </p>
          )}
          {badge && (
            <Badge 
              variant={badge.variant === "success" ? "default" : badge.variant}
              className={`
                ${badge.variant === "success" ? "bg-success text-white" : ""}
                ${badge.variant === "warning" ? "bg-warning text-white" : ""}
                ${badge.variant === "destructive" ? "bg-error text-white" : ""}
              `}
            >
              {badge.text}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
