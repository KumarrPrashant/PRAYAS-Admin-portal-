"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface ResolutionTimeChartProps {
  timeRange: string
}

const data = [
  { week: "Week 1", avgTime: 5.2, target: 4.0 },
  { week: "Week 2", avgTime: 4.8, target: 4.0 },
  { week: "Week 3", avgTime: 4.5, target: 4.0 },
  { week: "Week 4", avgTime: 4.2, target: 4.0 },
  { week: "Week 5", avgTime: 3.9, target: 4.0 },
  { week: "Week 6", avgTime: 4.1, target: 4.0 },
  { week: "Week 7", avgTime: 3.8, target: 4.0 },
  { week: "Week 8", avgTime: 4.0, target: 4.0 },
]

const chartConfig = {
  avgTime: {
    label: "Avg Resolution Time",
    color: "hsl(var(--chart-1))",
  },
  target: {
    label: "Target",
    color: "hsl(var(--chart-2))",
  },
}

export function ResolutionTimeChart({ timeRange }: ResolutionTimeChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resolution Time Trends</CardTitle>
        <CardDescription>Average resolution time vs target (in days)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="week" />
              <YAxis domain={[3, 6]} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="avgTime"
                stroke={chartConfig.avgTime.color}
                strokeWidth={3}
                dot={{ fill: chartConfig.avgTime.color, strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke={chartConfig.target.color}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
