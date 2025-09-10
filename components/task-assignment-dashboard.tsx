"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UnassignedIssues } from "@/components/unassigned-issues"
import { AssignmentForm } from "@/components/assignment-form"
import { TeamManagement } from "@/components/team-management"
import { AssignmentHistory } from "@/components/assignment-history"
import { Users, UserPlus, Clock, CheckCircle, UserCheck } from "lucide-react"

export function TaskAssignmentDashboard() {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"assign" | "teams" | "history">("assign")

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="border-border/50 shadow-sm card-hover group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-secondary/50"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Unassigned Issues</CardTitle>
            <div className="p-2 bg-secondary/10 rounded-xl group-hover:scale-110 transition-transform">
              <Clock className="h-5 w-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-serif font-bold text-foreground">23</div>
            <p className="text-sm text-muted-foreground">Awaiting assignment</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm card-hover group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/50"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Active Assignments</CardTitle>
            <div className="p-2 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-serif font-bold text-foreground">156</div>
            <p className="text-sm text-muted-foreground">Currently assigned</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm card-hover group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-chart-2 to-chart-2/50"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Completed Today</CardTitle>
            <div className="p-2 bg-chart-2/10 rounded-xl group-hover:scale-110 transition-transform">
              <CheckCircle className="h-5 w-5 text-chart-2" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-serif font-bold text-foreground">18</div>
            <p className="text-sm text-muted-foreground">Tasks completed</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm card-hover group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-chart-4 to-chart-4/50"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Available Teams</CardTitle>
            <div className="p-2 bg-chart-4/10 rounded-xl group-hover:scale-110 transition-transform">
              <UserPlus className="h-5 w-5 text-chart-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-serif font-bold text-foreground">12</div>
            <p className="text-sm text-muted-foreground">Ready for assignment</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <UserCheck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-xl font-serif">Assignment Management</span>
                <p className="text-sm text-muted-foreground font-normal">
                  Manage task assignments and team coordination
                </p>
              </div>
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2 bg-muted/50 rounded-xl p-2 border border-border/50 mt-4">
            <Button
              variant={activeTab === "assign" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("assign")}
              className="flex-1 h-10 rounded-lg font-medium"
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Assign Tasks
            </Button>
            <Button
              variant={activeTab === "teams" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("teams")}
              className="flex-1 h-10 rounded-lg font-medium"
            >
              <Users className="w-4 h-4 mr-2" />
              Manage Teams
            </Button>
            <Button
              variant={activeTab === "history" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("history")}
              className="flex-1 h-10 rounded-lg font-medium"
            >
              <Clock className="w-4 h-4 mr-2" />
              Assignment History
            </Button>
          </div>
        </CardHeader>
      </Card>

      {activeTab === "assign" && (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3">
            <UnassignedIssues onSelectIssue={setSelectedIssue} selectedIssue={selectedIssue} />
          </div>
          <div className="xl:col-span-1">
            <AssignmentForm selectedIssue={selectedIssue} />
          </div>
        </div>
      )}

      {activeTab === "teams" && <TeamManagement />}

      {activeTab === "history" && <AssignmentHistory />}
    </div>
  )
}
