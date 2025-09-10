"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, Search, Filter, CheckCircle, User } from "lucide-react"

const assignmentHistory = [
  {
    id: "ASSIGN-001",
    issueId: "ISS-001",
    issueTitle: "Broken Street Light on MG Road",
    assignedTo: "PWD Team A",
    assignedBy: "Admin Officer",
    assignedAt: "2024-01-15 16:45:00",
    priority: "High",
    status: "Completed",
    completedAt: "2024-01-17 14:30:00",
    resolutionTime: "1.9 days",
  },
  {
    id: "ASSIGN-002",
    issueId: "ISS-002",
    issueTitle: "Water Logging in Residential Area",
    assignedTo: "Drainage Team 1",
    assignedBy: "Department Head",
    assignedAt: "2024-01-15 18:20:00",
    priority: "Critical",
    status: "In Progress",
    completedAt: null,
    resolutionTime: "2.1 days (ongoing)",
  },
  {
    id: "ASSIGN-003",
    issueId: "ISS-003",
    issueTitle: "Garbage Collection Delay",
    assignedTo: "Sanitation Team 1",
    assignedBy: "Admin Officer",
    assignedAt: "2024-01-14 10:15:00",
    priority: "Medium",
    status: "Completed",
    completedAt: "2024-01-16 09:45:00",
    resolutionTime: "1.9 days",
  },
  {
    id: "ASSIGN-004",
    issueId: "ISS-004",
    issueTitle: "Pothole on Main Highway",
    assignedTo: "Road Maintenance",
    assignedBy: "Field Supervisor",
    assignedAt: "2024-01-14 14:30:00",
    priority: "High",
    status: "Overdue",
    completedAt: null,
    resolutionTime: "3.2 days (overdue)",
  },
  {
    id: "ASSIGN-005",
    issueId: "ISS-005",
    issueTitle: "Power Outage in Commercial Area",
    assignedTo: "Electrical Team A",
    assignedBy: "Emergency Coordinator",
    assignedAt: "2024-01-13 22:15:00",
    priority: "Critical",
    status: "Completed",
    completedAt: "2024-01-14 08:30:00",
    resolutionTime: "10.3 hours",
  },
]

const statusColors = {
  Completed: "bg-chart-2 text-white",
  "In Progress": "bg-chart-1 text-white",
  Overdue: "bg-destructive text-destructive-foreground",
  Cancelled: "bg-muted text-muted-foreground",
}

const priorityColors = {
  Critical: "bg-destructive text-destructive-foreground",
  High: "bg-chart-1 text-white",
  Medium: "bg-chart-4 text-white",
  Low: "bg-chart-3 text-white",
}

export function AssignmentHistory() {
  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Assignment History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search assignments..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All Teams" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                <SelectItem value="pwd">PWD Teams</SelectItem>
                <SelectItem value="sanitation">Sanitation Teams</SelectItem>
                <SelectItem value="electrical">Electrical Teams</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Last 30 days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 3 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Assignment History List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Assignments ({assignmentHistory.length})</CardTitle>
            <Button variant="outline" size="sm">
              Export History
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {assignmentHistory.map((assignment) => (
            <div key={assignment.id} className="border border-border rounded-lg p-4 space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-foreground">{assignment.issueTitle}</h4>
                    <Badge className={priorityColors[assignment.priority as keyof typeof priorityColors]}>
                      {assignment.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Issue ID: {assignment.issueId}</p>
                </div>
                <Badge className={statusColors[assignment.status as keyof typeof statusColors]}>
                  {assignment.status}
                </Badge>
              </div>

              {/* Assignment Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>Assigned to: {assignment.assignedTo}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Assigned: {new Date(assignment.assignedAt).toLocaleString()}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Avatar className="w-4 h-4">
                      <AvatarFallback className="text-xs">
                        {assignment.assignedBy
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>By: {assignment.assignedBy}</span>
                  </div>
                  {assignment.completedAt && (
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4" />
                      <span>Completed: {new Date(assignment.completedAt).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Resolution Time */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Resolution Time:</span>
                  <Badge
                    variant="outline"
                    className={
                      assignment.status === "Overdue"
                        ? "border-destructive text-destructive"
                        : assignment.status === "Completed"
                          ? "border-chart-2 text-chart-2"
                          : ""
                    }
                  >
                    {assignment.resolutionTime}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">Assignment ID: {assignment.id}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
