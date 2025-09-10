"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Users, UserPlus, Settings, TrendingUp } from "lucide-react"

const teams = [
  {
    id: "pwd-a",
    name: "PWD Team A",
    department: "Public Works Department",
    members: 8,
    activeAssignments: 12,
    completedThisMonth: 45,
    efficiency: 87,
    status: "active",
    lead: "Rajesh Sharma",
  },
  {
    id: "sanitation-1",
    name: "Sanitation Team 1",
    department: "Sanitation Department",
    members: 6,
    activeAssignments: 8,
    completedThisMonth: 32,
    efficiency: 92,
    status: "active",
    lead: "Priya Gupta",
  },
  {
    id: "electrical-a",
    name: "Electrical Team A",
    department: "Electricity Board",
    members: 5,
    activeAssignments: 15,
    completedThisMonth: 28,
    efficiency: 78,
    status: "overloaded",
    lead: "Amit Kumar",
  },
  {
    id: "water-1",
    name: "Water Team 1",
    department: "Water Supply Department",
    members: 7,
    activeAssignments: 6,
    completedThisMonth: 38,
    efficiency: 89,
    status: "available",
    lead: "Sunita Devi",
  },
]

const statusColors = {
  active: "bg-chart-1 text-white",
  available: "bg-chart-2 text-white",
  overloaded: "bg-destructive text-destructive-foreground",
  inactive: "bg-muted text-muted-foreground",
}

export function TeamManagement() {
  return (
    <div className="space-y-6">
      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
            <Users className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Across all departments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Teams</CardTitle>
            <UserPlus className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">8</div>
            <p className="text-xs text-muted-foreground">Ready for new assignments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Efficiency</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-2">↑ 3.2%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Teams List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Team Management</CardTitle>
            <Button className="bg-primary text-primary-foreground">
              <UserPlus className="w-4 h-4 mr-2" />
              Add New Team
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {teams.map((team) => (
            <div key={team.id} className="border border-border rounded-lg p-6 space-y-4">
              {/* Team Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold">{team.name}</h3>
                    <Badge className={statusColors[team.status as keyof typeof statusColors]}>{team.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{team.department}</p>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage
                </Button>
              </div>

              {/* Team Lead */}
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    {team.lead
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{team.lead}</p>
                  <p className="text-xs text-muted-foreground">Team Lead</p>
                </div>
              </div>

              {/* Team Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-chart-4">{team.members}</div>
                  <p className="text-xs text-muted-foreground">Members</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-chart-1">{team.activeAssignments}</div>
                  <p className="text-xs text-muted-foreground">Active Tasks</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-chart-2">{team.completedThisMonth}</div>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{team.efficiency}%</div>
                  <p className="text-xs text-muted-foreground">Efficiency</p>
                </div>
              </div>

              {/* Efficiency Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Team Efficiency</span>
                  <span className="font-medium">{team.efficiency}%</span>
                </div>
                <Progress value={team.efficiency} className="h-2" />
              </div>

              {/* Workload Indicator */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Current Workload:</span>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      team.activeAssignments > 12
                        ? "bg-destructive"
                        : team.activeAssignments > 8
                          ? "bg-chart-1"
                          : "bg-chart-2"
                    }`}
                  ></div>
                  <span>{team.activeAssignments > 12 ? "High" : team.activeAssignments > 8 ? "Medium" : "Light"}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
