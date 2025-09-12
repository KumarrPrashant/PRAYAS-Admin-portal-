"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Clock, UserCheck, AlertTriangle, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface StatusManagementProps {
  issueId: string
  currentStatus: string
  onStatusChange: (newStatus: string) => void
}

export function StatusManagement({ issueId, currentStatus, onStatusChange }: StatusManagementProps) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus)
  const { toast } = useToast()

  const statusOptions = [
    { value: "pending", label: "Pending", icon: Clock, color: "bg-chart-5" },
    { value: "assigned", label: "Assigned", icon: UserCheck, color: "bg-chart-4" },
    { value: "in-progress", label: "In Progress", icon: AlertTriangle, color: "bg-primary" },
    { value: "completed", label: "Completed", icon: CheckCircle, color: "bg-chart-2" },
    { value: "resolved", label: "Resolved", icon: CheckCircle, color: "bg-chart-2" },
  ]

  const handleStatusUpdate = () => {
    onStatusChange(selectedStatus)
    toast({
      title: "Status Updated",
      description: `Issue ${issueId} status changed to ${selectedStatus}`,
    })

    if (selectedStatus === "completed" || selectedStatus === "resolved") {
      // Trigger dashboard update for resolved issues count
      window.dispatchEvent(
        new CustomEvent("issueStatusChanged", {
          detail: { issueId, newStatus: selectedStatus, type: "resolved" },
        }),
      )
    }
  }

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="p-2 bg-primary/10 rounded-xl">
            <UserCheck className="w-4 h-4 text-primary" />
          </div>
          <span className="text-lg font-serif">Status Management</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Current Status</label>
          <Badge className="bg-muted text-foreground">{currentStatus}</Badge>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Update Status</label>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="h-12 bg-card border-border/50 focus:border-primary rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-primary/20">
              {statusOptions.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  <div className="flex items-center space-x-2">
                    <status.icon className="w-4 h-4" />
                    <span>{status.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleStatusUpdate}
          className="w-full bg-gradient-to-r from-primary to-primary/90"
          disabled={selectedStatus === currentStatus}
        >
          <Save className="w-4 h-4 mr-2" />
          Update Status
        </Button>
      </CardContent>
    </Card>
  )
}
