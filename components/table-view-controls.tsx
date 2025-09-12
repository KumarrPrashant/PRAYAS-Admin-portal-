"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { List, Grid, Folder, Table, Eye } from "lucide-react"

interface TableViewControlsProps {
  onViewChange: (view: string) => void
  currentView: string
}

export function TableViewControls({ onViewChange, currentView }: TableViewControlsProps) {
  const [sortBy, setSortBy] = useState("date")
  const [groupBy, setGroupBy] = useState("none")

  const viewOptions = [
    { id: "table", label: "Table View", icon: Table },
    { id: "list", label: "List View", icon: List },
    { id: "grid", label: "Grid View", icon: Grid },
    { id: "folder", label: "Folder View", icon: Folder },
  ]

  const handleViewChange = (viewId: string) => {
    onViewChange(viewId)
  }

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Eye className="w-5 h-5 text-primary" />
          </div>
          <span className="text-lg font-serif">View Controls</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2 bg-muted/50 rounded-xl p-2 border border-border/50">
          {viewOptions.map((option) => (
            <Button
              key={option.id}
              variant={currentView === option.id ? "default" : "ghost"}
              size="sm"
              onClick={() => handleViewChange(option.id)}
              className="flex-1 h-10 rounded-lg font-medium"
            >
              <option.icon className="w-4 h-4 mr-2" />
              {option.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full h-10 px-3 bg-card border border-border/50 rounded-lg focus:border-primary"
            >
              <option value="date">Date Created</option>
              <option value="priority">Priority</option>
              <option value="status">Status</option>
              <option value="location">Location</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Group By</label>
            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
              className="w-full h-10 px-3 bg-card border border-border/50 rounded-lg focus:border-primary"
            >
              <option value="none">No Grouping</option>
              <option value="category">Category</option>
              <option value="department">Department</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Current View: </span>
          <Badge variant="outline" className="rounded-lg">
            {viewOptions.find((v) => v.id === currentView)?.label}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
