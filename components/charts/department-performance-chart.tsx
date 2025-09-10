"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface DepartmentPerformanceChartProps {
  timeRange: string
}

const data = [
  { department: "PWD", resolved: 145, pending: 23, efficiency: 86.3 },
  { department: "Sanitation", resolved: 132, pending: 18, efficiency: 88.0 },
  { department: "Electricity", resolved: 98, pending: 15, efficiency: 86.7 },
  { department: "Water", resolved: 87, pending: 12, efficiency: 87.9 },
  { department: "Transport", resolved: 76, pending: 19, efficiency: 80.0 },
  { department: "Health", resolved: 54, pending: 8, efficiency: 87.1 },
]

const chartConfig = {
  resolved: {
    label: "Resolved",
    color: "hsl(var(--chart-2))",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-5))",
  },
}

export function DepartmentPerformanceChart({ timeRange }: DepartmentPerformanceChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Performance</CardTitle>
        <CardDescription>Issues resolved vs pending by department</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} layout="horizontal">
              <XAxis type="number" />
              <YAxis dataKey="department" type="category" width={80} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="resolved" stackId="a" fill={chartConfig.resolved.color} radius={[0, 4, 4, 0]} />
              <Bar dataKey="pending" stackId="a" fill={chartConfig.pending.color} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 space-y-2">
          <div className="text-sm font-medium">Efficiency Rates</div>
          {data.map((dept, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{dept.department}</span>
              <span className="font-medium">{dept.efficiency}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
