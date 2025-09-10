"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

interface CategoryDistributionChartProps {
  timeRange: string
}

const data = [
  { name: "Infrastructure", value: 285, color: "hsl(var(--chart-1))" },
  { name: "Sanitation", value: 198, color: "hsl(var(--chart-2))" },
  { name: "Drainage", value: 156, color: "hsl(var(--chart-3))" },
  { name: "Electricity", value: 142, color: "hsl(var(--chart-4))" },
  { name: "Roads", value: 128, color: "hsl(var(--chart-5))" },
  { name: "Water Supply", value: 98, color: "hsl(var(--primary))" },
]

const chartConfig = {
  infrastructure: {
    label: "Infrastructure",
    color: "hsl(var(--chart-1))",
  },
  sanitation: {
    label: "Sanitation",
    color: "hsl(var(--chart-2))",
  },
  drainage: {
    label: "Drainage",
    color: "hsl(var(--chart-3))",
  },
  electricity: {
    label: "Electricity",
    color: "hsl(var(--chart-4))",
  },
  roads: {
    label: "Roads",
    color: "hsl(var(--chart-5))",
  },
  water: {
    label: "Water Supply",
    color: "hsl(var(--primary))",
  },
}

export function CategoryDistributionChart({ timeRange }: CategoryDistributionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Issues by Category</CardTitle>
        <CardDescription>Distribution of issues across different categories</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={2} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-muted-foreground">{item.name}</span>
              <span className="font-medium ml-auto">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
