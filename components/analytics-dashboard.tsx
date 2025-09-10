"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IssuesTrendChart } from "@/components/charts/issues-trend-chart"
import { CategoryDistributionChart } from "@/components/charts/category-distribution-chart"
import { DepartmentPerformanceChart } from "@/components/charts/department-performance-chart"
import { ResolutionTimeChart } from "@/components/charts/resolution-time-chart"
import { IssueHeatmap } from "@/components/charts/issue-heatmap"
import { PriorityBreakdownChart } from "@/components/charts/priority-breakdown-chart"
import { Calendar, Download, Filter, TrendingUp, BarChart3, RefreshCw, Share } from "lucide-react"

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("30d")
  const [department, setDepartment] = useState("all")

  return (
    <div className="space-y-8">
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Filter className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-xl font-serif">Analytics Controls</span>
                <p className="text-sm text-muted-foreground font-normal">Customize your data view and export reports</p>
              </div>
            </CardTitle>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="border-border/50 rounded-xl bg-transparent">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="border-border/50 rounded-xl bg-transparent">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-primary to-primary/90 shadow-md rounded-xl">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Time Range
              </label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-48 h-12 bg-card border-border/50 focus:border-primary rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-primary/20">
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 3 months</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                Department
              </label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="w-56 h-12 bg-card border-border/50 focus:border-primary rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-primary/20">
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="pwd">Public Works Dept</SelectItem>
                  <SelectItem value="sanitation">Sanitation Dept</SelectItem>
                  <SelectItem value="electricity">Electricity Board</SelectItem>
                  <SelectItem value="water">Water Supply</SelectItem>
                  <SelectItem value="transport">Transport Dept</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="border-border/50 shadow-sm card-hover group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-chart-2 to-chart-2/50"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Avg Resolution Time</CardTitle>
            <div className="p-2 bg-chart-2/10 rounded-xl group-hover:scale-110 transition-transform">
              <TrendingUp className="h-5 w-5 text-chart-2" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-serif font-bold text-foreground">4.2 days</div>
            <p className="text-sm text-muted-foreground flex items-center">
              <span className="text-chart-2 font-semibold mr-1">↓ 12%</span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm card-hover group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/50"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Resolution Rate</CardTitle>
            <div className="p-2 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-serif font-bold text-foreground">78.5%</div>
            <p className="text-sm text-muted-foreground flex items-center">
              <span className="text-chart-2 font-semibold mr-1">↑ 5.2%</span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm card-hover group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-secondary/50"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Citizen Satisfaction</CardTitle>
            <div className="p-2 bg-secondary/10 rounded-xl group-hover:scale-110 transition-transform">
              <TrendingUp className="h-5 w-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-serif font-bold text-foreground">4.1/5</div>
            <p className="text-sm text-muted-foreground flex items-center">
              <span className="text-chart-2 font-semibold mr-1">↑ 0.3</span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm card-hover group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-chart-4 to-chart-4/50"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Active Issues</CardTitle>
            <div className="p-2 bg-chart-4/10 rounded-xl group-hover:scale-110 transition-transform">
              <Calendar className="h-5 w-5 text-chart-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-serif font-bold text-foreground">342</div>
            <p className="text-sm text-muted-foreground flex items-center">
              <span className="text-chart-5 font-semibold mr-1">↑ 23</span>
              from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <IssuesTrendChart timeRange={timeRange} />
        <CategoryDistributionChart timeRange={timeRange} />
        <DepartmentPerformanceChart timeRange={timeRange} />
        <ResolutionTimeChart timeRange={timeRange} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <PriorityBreakdownChart timeRange={timeRange} />
        <div className="xl:col-span-2">
          <IssueHeatmap timeRange={timeRange} />
        </div>
      </div>
    </div>
  )
}
