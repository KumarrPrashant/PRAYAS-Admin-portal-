"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, AlertTriangle, Users } from "lucide-react"

export function DashboardStatsUpdater() {
  const [stats, setStats] = useState({
    totalIssues: 342,
    resolvedIssues: 89,
    inProgress: 156,
    pendingAssignment: 23,
  })

  useEffect(() => {
    const handleStatusChange = (event: CustomEvent) => {
      const { newStatus, type } = event.detail

      setStats((prevStats) => {
        const newStats = { ...prevStats }

        if (type === "resolved") {
          newStats.resolvedIssues += 1
          newStats.inProgress -= 1
        }

        return newStats
      })
    }

    const handleAssignment = (event: CustomEvent) => {
      setStats((prevStats) => ({
        ...prevStats,
        pendingAssignment: prevStats.pendingAssignment - 1,
        inProgress: prevStats.inProgress + 1,
      }))
    }

    window.addEventListener("issueStatusChanged", handleStatusChange as EventListener)
    window.addEventListener("assignmentMade", handleAssignment as EventListener)

    return () => {
      window.removeEventListener("issueStatusChanged", handleStatusChange as EventListener)
      window.removeEventListener("assignmentMade", handleAssignment as EventListener)
    }
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <Card className="border-border/50 shadow-sm card-hover group">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/50"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-semibold text-muted-foreground">Total Issues</CardTitle>
          <div className="p-2 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform">
            <AlertTriangle className="h-5 w-5 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-3xl font-serif font-bold text-foreground">{stats.totalIssues}</div>
          <p className="text-sm text-muted-foreground">All reported issues</p>
        </CardContent>
      </Card>

      <Card className="border-border/50 shadow-sm card-hover group">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-chart-2 to-chart-2/50"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-semibold text-muted-foreground">Resolved Issues</CardTitle>
          <div className="p-2 bg-chart-2/10 rounded-xl group-hover:scale-110 transition-transform">
            <CheckCircle className="h-5 w-5 text-chart-2" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-3xl font-serif font-bold text-foreground">{stats.resolvedIssues}</div>
          <p className="text-sm text-muted-foreground">Successfully completed</p>
        </CardContent>
      </Card>

      <Card className="border-border/50 shadow-sm card-hover group">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-secondary/50"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-semibold text-muted-foreground">In Progress</CardTitle>
          <div className="p-2 bg-secondary/10 rounded-xl group-hover:scale-110 transition-transform">
            <Clock className="h-5 w-5 text-secondary" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-3xl font-serif font-bold text-foreground">{stats.inProgress}</div>
          <p className="text-sm text-muted-foreground">Currently being worked on</p>
        </CardContent>
      </Card>

      <Card className="border-border/50 shadow-sm card-hover group">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-chart-4 to-chart-4/50"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-semibold text-muted-foreground">Pending Assignment</CardTitle>
          <div className="p-2 bg-chart-4/10 rounded-xl group-hover:scale-110 transition-transform">
            <Users className="h-5 w-5 text-chart-4" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-3xl font-serif font-bold text-foreground">{stats.pendingAssignment}</div>
          <p className="text-sm text-muted-foreground">Awaiting team assignment</p>
        </CardContent>
      </Card>
    </div>
  )
}
