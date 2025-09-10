"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { TrendingUp } from "lucide-react"

interface IssuesTrendChartProps {
  timeRange: string
}

const data = [
  { date: "Jan 1", reported: 45, resolved: 38, pending: 7 },
  { date: "Jan 2", reported: 52, resolved: 41, pending: 18 },
  { date: "Jan 3", reported: 38, resolved: 45, pending: 11 },
  { date: "Jan 4", reported: 61, resolved: 52, pending: 20 },
  { date: "Jan 5", reported: 42, resolved: 48, pending: 14 },
  { date: "Jan 6", reported: 55, resolved: 43, pending: 26 },
  { date: "Jan 7", reported: 48, resolved: 51, pending: 23 },
  { date: "Jan 8", reported: 39, resolved: 46, pending: 16 },
  { date: "Jan 9", reported: 58, resolved: 44, pending: 30 },
  { date: "Jan 10", reported: 44, resolved: 49, pending: 25 },
]

const chartConfig = {
  reported: {
    label: "Reported",
    color: "hsl(var(--primary))",
  },
  resolved: {
    label: "Resolved",
    color: "hsl(var(--chart-2))",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--secondary))",
  },
}

export function IssuesTrendChart({ timeRange }: IssuesTrendChartProps) {
  return (
    <Card className="border-border/50 shadow-sm card-hover">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-chart-2 to-secondary"></div>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-serif flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              Issues Trend Analysis
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Daily reported vs resolved issues over time with trend indicators
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <ChartTooltip
                cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1, strokeDasharray: "5 5" }}
                content={<ChartTooltipContent className="rounded-xl border-primary/20 shadow-lg" />}
              />
              <Area
                type="monotone"
                dataKey="resolved"
                stackId="1"
                stroke={chartConfig.resolved.color}
                fill={chartConfig.resolved.color}
                fillOpacity={0.8}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="pending"
                stackId="1"
                stroke={chartConfig.pending.color}
                fill={chartConfig.pending.color}
                fillOpacity={0.7}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="reported"
                stackId="2"
                stroke={chartConfig.reported.color}
                fill={chartConfig.reported.color}
                fillOpacity={0.6}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
