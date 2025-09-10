"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { MapPin, Clock, User, Phone, Camera, Edit, MessageSquare, CheckCircle } from "lucide-react"

interface IssueDetailsProps {
  issueId: string | null
}

const mockIssueDetails = {
  "ISS-001": {
    id: "ISS-001",
    title: "Broken Street Light on MG Road",
    description:
      "Street light pole damaged, causing safety concerns for pedestrians during night hours. The light has been non-functional for the past 3 days, creating a hazardous situation for evening commuters and residents.",
    location: "MG Road, Sector 15, New Delhi",
    coordinates: "28.6139° N, 77.2090° E",
    priority: "High",
    status: "In Progress",
    category: "Infrastructure",
    reportedBy: "Rajesh Kumar",
    reporterPhone: "+91 98765 43210",
    reportedAt: "2024-01-15 14:30:00",
    assignedTo: "PWD Team A",
    assignedAt: "2024-01-15 16:45:00",
    estimatedResolution: "2024-01-17 18:00:00",
    images: ["/broken-street-light-pole.jpg", "/dark-street-at-night.jpg", "/damaged-electrical-equipment.jpg"],
    updates: [
      {
        timestamp: "2024-01-15 16:45:00",
        user: "PWD Officer",
        action: "Assigned to PWD Team A",
        note: "Team dispatched for assessment",
      },
      {
        timestamp: "2024-01-15 17:30:00",
        user: "Field Engineer",
        action: "Site inspection completed",
        note: "Electrical fault identified, replacement parts ordered",
      },
    ],
  },
}

const priorityColors = {
  Critical: "bg-destructive text-destructive-foreground",
  High: "bg-chart-1 text-white",
  Medium: "bg-chart-4 text-white",
  Low: "bg-chart-3 text-white",
}

const statusColors = {
  Pending: "bg-chart-5 text-white",
  "In Progress": "bg-chart-1 text-white",
  Assigned: "bg-chart-4 text-white",
  Resolved: "bg-chart-2 text-white",
}

export function IssueDetails({ issueId }: IssueDetailsProps) {
  if (!issueId) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center text-muted-foreground">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Select an Issue</p>
            <p className="text-sm">Choose an issue from the list to view details</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const issue = mockIssueDetails[issueId as keyof typeof mockIssueDetails]

  if (!issue) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center text-muted-foreground">
            <p>Issue not found</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{issue.title}</CardTitle>
            <p className="text-sm text-muted-foreground">ID: {issue.id}</p>
          </div>
          <Button size="sm" variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Status and Priority */}
        <div className="flex items-center space-x-2">
          <Badge className={statusColors[issue.status as keyof typeof statusColors]}>{issue.status}</Badge>
          <Badge className={priorityColors[issue.priority as keyof typeof priorityColors]}>{issue.priority}</Badge>
          <Badge variant="outline">{issue.category}</Badge>
        </div>

        {/* Description */}
        <div>
          <h4 className="font-semibold mb-2">Description</h4>
          <p className="text-sm text-muted-foreground">{issue.description}</p>
        </div>

        {/* Location */}
        <div>
          <h4 className="font-semibold mb-2 flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Location
          </h4>
          <p className="text-sm text-muted-foreground">{issue.location}</p>
          <p className="text-xs text-muted-foreground">{issue.coordinates}</p>
        </div>

        {/* Reporter Info */}
        <div>
          <h4 className="font-semibold mb-2 flex items-center">
            <User className="w-4 h-4 mr-2" />
            Reported By
          </h4>
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback>
                {issue.reportedBy
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{issue.reportedBy}</p>
              <p className="text-xs text-muted-foreground flex items-center">
                <Phone className="w-3 h-3 mr-1" />
                {issue.reporterPhone}
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            <Clock className="w-3 h-3 inline mr-1" />
            {new Date(issue.reportedAt).toLocaleString()}
          </p>
        </div>

        {/* Assignment Info */}
        <div>
          <h4 className="font-semibold mb-2">Assignment</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Assigned to:</span>
              <Badge variant="outline">{issue.assignedTo}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Assigned at:</span>
              <span className="text-sm">{new Date(issue.assignedAt).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Est. Resolution:</span>
              <span className="text-sm">{new Date(issue.estimatedResolution).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Images */}
        <div>
          <h4 className="font-semibold mb-2 flex items-center">
            <Camera className="w-4 h-4 mr-2" />
            Photos ({issue.images.length})
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {issue.images.map((image, index) => (
              <img
                key={index}
                src={image || "/placeholder.svg"}
                alt={`Issue photo ${index + 1}`}
                className="rounded-lg border border-border aspect-video object-cover"
              />
            ))}
          </div>
        </div>

        {/* Updates Timeline */}
        <div>
          <h4 className="font-semibold mb-2">Updates</h4>
          <div className="space-y-3">
            {issue.updates.map((update, index) => (
              <div key={index} className="flex space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{update.action}</p>
                    <span className="text-xs text-muted-foreground">{new Date(update.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{update.note}</p>
                  <p className="text-xs text-muted-foreground">by {update.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button className="w-full bg-chart-2 text-white hover:bg-chart-2/90">
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark as Resolved
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            <MessageSquare className="w-4 h-4 mr-2" />
            Add Update
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
