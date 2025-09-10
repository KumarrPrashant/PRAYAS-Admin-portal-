"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PriorityBreakdownChartProps {
  timeRange: string
}

const priorityData = [
  { priority: "Critical", count: 45, percentage: 12.5, color: "bg-destructive", trend: "+5" },
  { priority: "High", count: 128, percentage: 35.6, color: "bg-chart-1", trend: "+12" },
  { priority: "Medium", count: 142, percentage: 39.4, color: "bg-chart-4", trend: "-3" },
  { priority: "Low", count: 45, percentage: 12.5, color: "bg-chart-3", trend: "-8" },
]

export function PriorityBreakdownChart({ timeRange }: PriorityBreakdownChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Priority Breakdown</CardTitle>
        <CardDescription>Issues distribution by priority level</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {priorityData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="font-medium">{item.priority}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">{item.count}</span>
                <Badge variant={item.trend.startsWith("+") ? "default" : "secondary"} className="text-xs">
                  {item.trend}
                </Badge>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }}></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{item.percentage}%</span>
              <span>of total issues</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
