"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, UserCheck, Clock, AlertTriangle } from "lucide-react"
import { format } from "date-fns"

interface AssignmentFormProps {
  selectedIssue: string | null
}

const departments = [
  { id: "pwd", name: "Public Works Department", teams: ["PWD Team A", "PWD Team B", "PWD Team C"] },
  { id: "sanitation", name: "Sanitation Department", teams: ["Sanitation Team 1", "Sanitation Team 2"] },
  { id: "electricity", name: "Electricity Board", teams: ["Electrical Team A", "Electrical Team B"] },
  { id: "water", name: "Water Supply Department", teams: ["Water Team 1", "Water Team 2"] },
  { id: "transport", name: "Transport Department", teams: ["Traffic Team A", "Traffic Team B"] },
]

export function AssignmentForm({ selectedIssue }: AssignmentFormProps) {
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedTeam, setSelectedTeam] = useState("")
  const [priority, setPriority] = useState("")
  const [deadline, setDeadline] = useState<Date>()
  const [instructions, setInstructions] = useState("")

  const handleAssign = () => {
    if (!selectedIssue || !selectedDepartment || !selectedTeam || !priority || !deadline) {
      return
    }

    // Handle assignment logic here
    console.log("Assigning issue:", {
      issueId: selectedIssue,
      department: selectedDepartment,
      team: selectedTeam,
      priority,
      deadline,
      instructions,
    })

    // Reset form
    setSelectedDepartment("")
    setSelectedTeam("")
    setPriority("")
    setDeadline(undefined)
    setInstructions("")
  }

  if (!selectedIssue) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center text-muted-foreground">
            <UserCheck className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Select an Issue</p>
            <p className="text-sm">Choose an unassigned issue to create assignment</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const selectedDept = departments.find((dept) => dept.id === selectedDepartment)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <UserCheck className="w-5 h-5" />
          <span>Assign Task</span>
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">Issue ID: {selectedIssue}</Badge>
          <Badge className="bg-chart-5 text-white">Unassigned</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Department Selection */}
        <div className="space-y-2">
          <Label htmlFor="department">Department *</Label>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.id}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Team Selection */}
        <div className="space-y-2">
          <Label htmlFor="team">Assign to Team *</Label>
          <Select value={selectedTeam} onValueChange={setSelectedTeam} disabled={!selectedDepartment}>
            <SelectTrigger>
              <SelectValue placeholder="Select team" />
            </SelectTrigger>
            <SelectContent>
              {selectedDept?.teams.map((team) => (
                <SelectItem key={team} value={team}>
                  {team}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Priority Level */}
        <div className="space-y-2">
          <Label htmlFor="priority">Priority Level *</Label>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger>
              <SelectValue placeholder="Set priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="critical">Critical - Immediate Action</SelectItem>
              <SelectItem value="high">High - Within 24 hours</SelectItem>
              <SelectItem value="medium">Medium - Within 3 days</SelectItem>
              <SelectItem value="low">Low - Within 1 week</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Deadline */}
        <div className="space-y-2">
          <Label>Deadline *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {deadline ? format(deadline, "PPP") : "Select deadline"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={deadline} onSelect={setDeadline} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        {/* Special Instructions */}
        <div className="space-y-2">
          <Label htmlFor="instructions">Special Instructions</Label>
          <Textarea
            id="instructions"
            placeholder="Add any specific instructions or notes for the assigned team..."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={3}
          />
        </div>

        {/* Assignment Summary */}
        {selectedDepartment && selectedTeam && priority && deadline && (
          <div className="bg-muted rounded-lg p-4 space-y-2">
            <h4 className="font-semibold flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Assignment Summary</span>
            </h4>
            <div className="text-sm space-y-1">
              <p>
                <span className="text-muted-foreground">Department:</span> {selectedDept?.name}
              </p>
              <p>
                <span className="text-muted-foreground">Team:</span> {selectedTeam}
              </p>
              <p>
                <span className="text-muted-foreground">Priority:</span>{" "}
                <Badge
                  className={
                    priority === "critical"
                      ? "bg-destructive text-destructive-foreground"
                      : priority === "high"
                        ? "bg-chart-1 text-white"
                        : priority === "medium"
                          ? "bg-chart-4 text-white"
                          : "bg-chart-3 text-white"
                  }
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </Badge>
              </p>
              <p>
                <span className="text-muted-foreground">Deadline:</span> {format(deadline, "PPP")}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            onClick={handleAssign}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={!selectedDepartment || !selectedTeam || !priority || !deadline}
          >
            <UserCheck className="w-4 h-4 mr-2" />
            Assign Task
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            <Clock className="w-4 h-4 mr-2" />
            Schedule for Later
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
