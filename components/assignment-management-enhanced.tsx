"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserCheck, Users, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function AssignmentManagementEnhanced() {
  const [selectedIssue, setSelectedIssue] = useState("")
  const [selectedTeam, setSelectedTeam] = useState("")
  const { toast } = useToast()

  const handleAssignment = () => {
    if (!selectedIssue || !selectedTeam) return

    toast({
      title: "Assignment Successful",
      description: `Issue ${selectedIssue} assigned to ${selectedTeam}`,
    })

    window.dispatchEvent(
      new CustomEvent("assignmentMade", {
        detail: { issueId: selectedIssue, team: selectedTeam },
      }),
    )

    setSelectedIssue("")
    setSelectedTeam("")
  }

  const unassignedIssues = [
    { id: "ISS-002", title: "Water Logging in Residential Area", priority: "Critical", location: "Vaishali Colony" },
    { id: "ISS-006", title: "Street Light Maintenance", priority: "Medium", location: "Kaushambi" },
    { id: "ISS-007", title: "Road Repair Required", priority: "High", location: "Raj Nagar" },
  ]

  const availableTeams = [
    { id: "PWD-A", name: "PWD Team A", workload: 3, status: "Available" },
    { id: "PWD-B", name: "PWD Team B", workload: 5, status: "Busy" },
    { id: "ELEC-1", name: "Electricity Board", workload: 2, status: "Available" },
    { id: "SAN-1", name: "Sanitation Dept", workload: 4, status: "Available" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 bg-secondary/10 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-secondary" />
            </div>
            <span className="text-lg font-serif">Unassigned Issues</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {unassignedIssues.map((issue) => (
            <div
              key={issue.id}
              className={`p-4 border border-border/50 rounded-lg cursor-pointer transition-all ${
                selectedIssue === issue.id ? "bg-primary/5 border-primary" : "hover:bg-muted/30"
              }`}
              onClick={() => setSelectedIssue(issue.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{issue.title}</h4>
                <Badge variant={issue.priority === "Critical" ? "destructive" : "secondary"}>{issue.priority}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{issue.location}</p>
              <div className="text-xs text-muted-foreground mt-1">ID: {issue.id}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <span className="text-lg font-serif">Available Teams</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {availableTeams.map((team) => (
              <div
                key={team.id}
                className={`p-4 border border-border/50 rounded-lg cursor-pointer transition-all ${
                  selectedTeam === team.id ? "bg-primary/5 border-primary" : "hover:bg-muted/30"
                }`}
                onClick={() => setSelectedTeam(team.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{team.name}</h4>
                  <Badge variant={team.status === "Available" ? "default" : "secondary"}>{team.status}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Current workload: {team.workload} tasks</span>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${team.workload < 4 ? "bg-green-500" : "bg-yellow-500"}`} />
                    <span>{team.workload < 4 ? "Available" : "Busy"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={handleAssignment}
            disabled={!selectedIssue || !selectedTeam}
            className="w-full bg-gradient-to-r from-primary to-primary/90"
          >
            <UserCheck className="w-4 h-4 mr-2" />
            Assign Task
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
