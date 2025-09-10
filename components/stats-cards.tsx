import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Issues",
    value: "1,247",
    change: "+12%",
    changeType: "increase" as const,
    icon: AlertTriangle,
    color: "text-primary",
    bgColor: "bg-primary/10",
    description: "All reported issues",
  },
  {
    title: "Resolved Issues",
    value: "892",
    change: "+8%",
    changeType: "increase" as const,
    icon: CheckCircle,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    description: "Successfully resolved",
  },
  {
    title: "Pending Issues",
    value: "355",
    change: "-5%",
    changeType: "decrease" as const,
    icon: Clock,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    description: "Awaiting resolution",
  },
  {
    title: "Resolution Rate",
    value: "71.5%",
    change: "+3.2%",
    changeType: "increase" as const,
    icon: TrendingUp,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    description: "Overall efficiency",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          className="relative overflow-hidden border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 card-hover group"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div className="space-y-1">
              <CardTitle className="text-sm font-semibold text-muted-foreground">{stat.title}</CardTitle>
              <p className="text-xs text-muted-foreground/70">{stat.description}</p>
            </div>
            <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-3xl font-serif font-bold text-foreground">{stat.value}</div>
              <Badge
                variant={stat.changeType === "increase" ? "default" : "secondary"}
                className={cn(
                  "font-semibold",
                  stat.changeType === "increase"
                    ? "bg-chart-2 text-white hover:bg-chart-2/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/90",
                )}
              >
                {stat.change}
              </Badge>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className={`mr-1 ${stat.changeType === "increase" ? "text-chart-2" : "text-secondary"}`}>
                {stat.changeType === "increase" ? "↗" : "↘"}
              </span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
