"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Clock, User, Search, AlertTriangle } from "lucide-react"

interface UnassignedIssuesProps {
  onSelectIssue: (issueId: string) => void
  selectedIssue: string | null
}

const unassignedIssues = [
  {
    id: "ISS-006",
    title: "Traffic Signal Malfunction",
    description: "Traffic lights not working at major intersection causing congestion",
    location: "CP Metro Station, Central Delhi",
    priority: "Critical",
    category: "Infrastructure",
    reportedBy: "Traffic Police",
    timeAgo: "30 minutes ago",
    urgency: "immediate",
  },
  {
    id: "ISS-007",
    title: "Manhole Cover Missing",
    description: "Open manhole creating safety hazard for pedestrians and vehicles",
    location: "Lajpat Nagar Market",
    priority: "High",
    category: "Infrastructure",
    reportedBy: "Local Resident",
    timeAgo: "1 hour ago",
    urgency: "urgent",
  },
  {
    id: "ISS-008",
    title: "Illegal Dumping Site",
    description: "Large amount of construction waste dumped illegally in residential area",
    location: "Vasant Kunj, Sector C",
    priority: "Medium",
    category: "Sanitation",
    reportedBy: "RWA President",
    timeAgo: "3 hours ago",
    urgency: "normal",
  },
  {
    id: "ISS-009",
    title: "Water Pipeline Burst",
    description: "Major water pipeline burst causing flooding and water shortage",
    location: "Karol Bagh Main Road",
    priority: "Critical",
    category: "Water Supply",
    reportedBy: "Area Supervisor",
    timeAgo: "45 minutes ago",
    urgency: "immediate",
  },
  {
    id: "ISS-010",
    title: "Street Vendor Encroachment",
    description: "Unauthorized vendors blocking pedestrian walkway",
    location: "Chandni Chowk",
    priority: "Low",
    category: "Public Order",
    reportedBy: "Beat Officer",
    timeAgo: "2 hours ago",
    urgency: "normal",
  },
]

const priorityColors = {
  Critical: "bg-destructive text-destructive-foreground shadow-sm",
  High: "bg-secondary text-secondary-foreground shadow-sm",
  Medium: "bg-chart-4 text-white shadow-sm",
  Low: "bg-chart-2 text-white shadow-sm",
}

const urgencyColors = {
  immediate: "border-l-4 border-l-destructive bg-destructive/5",
  urgent: "border-l-4 border-l-secondary bg-secondary/5",
  normal: "border-l-4 border-l-chart-4 bg-chart-4/5",
}

export function UnassignedIssues({ onSelectIssue, selectedIssue }: UnassignedIssuesProps) {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-secondary/10 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <span className="text-xl font-serif">Unassigned Issues</span>
              <p className="text-sm text-muted-foreground font-normal">
                {unassignedIssues.length} issues awaiting assignment
              </p>
            </div>
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search unassigned issues..."
              className="pl-12 w-72 h-12 bg-card border-border/50 focus:border-primary rounded-xl"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {unassignedIssues.map((issue, index) => (
          <div
            key={issue.id}
            className={`border border-border/50 rounded-xl p-6 space-y-4 cursor-pointer transition-all duration-300 hover:shadow-md card-hover ${
              selectedIssue === issue.id ? "bg-primary/5 border-primary shadow-md" : "hover:bg-muted/30"
            } ${urgencyColors[issue.urgency as keyof typeof urgencyColors]}`}
            onClick={() => onSelectIssue(issue.id)}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center space-x-3 flex-wrap gap-2">
                  <h4 className="font-serif font-semibold text-lg text-foreground">{issue.title}</h4>
                  <Badge className={priorityColors[issue.priority as keyof typeof priorityColors]}>
                    {issue.priority}
                  </Badge>
                  {issue.urgency === "immediate" && (
                    <Badge className="bg-destructive text-destructive-foreground animate-pulse shadow-sm">URGENT</Badge>
                  )}
                </div>
                <p className="text-muted-foreground leading-relaxed line-clamp-2">{issue.description}</p>
              </div>
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary shadow-md rounded-xl ml-4"
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectIssue(issue.id)
                }}
              >
                Assign Now
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <div className="p-1 bg-muted/50 rounded-lg">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{issue.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <div className="p-1 bg-muted/50 rounded-lg">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{issue.reportedBy}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <div className="p-1 bg-muted/50 rounded-lg">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{issue.timeAgo}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="rounded-lg border-primary/20 text-primary">
                    {issue.category}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="text-sm text-muted-foreground font-mono">ID: {issue.id}</div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground font-medium">Status:</span>
                <Badge className="bg-secondary text-secondary-foreground shadow-sm">Unassigned</Badge>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
