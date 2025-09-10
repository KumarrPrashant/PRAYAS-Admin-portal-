import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, User } from "lucide-react"

const recentIssues = [
  {
    id: "ISS-001",
    title: "Broken Street Light on MG Road",
    description: "Street light pole damaged, causing safety concerns for pedestrians",
    location: "MG Road, Sector 15",
    priority: "High",
    status: "In Progress",
    reportedBy: "Rajesh Kumar",
    timeAgo: "2 hours ago",
    category: "Infrastructure",
  },
  {
    id: "ISS-002",
    title: "Water Logging in Residential Area",
    description: "Severe water logging after recent rainfall, affecting daily commute",
    location: "Green Park Colony",
    priority: "Critical",
    status: "Pending",
    reportedBy: "Priya Sharma",
    timeAgo: "4 hours ago",
    category: "Drainage",
  },
  {
    id: "ISS-003",
    title: "Garbage Collection Delay",
    description: "Garbage not collected for 3 days, causing hygiene issues",
    location: "Nehru Nagar",
    priority: "Medium",
    status: "Assigned",
    reportedBy: "Amit Singh",
    timeAgo: "6 hours ago",
    category: "Sanitation",
  },
]

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

export function RecentIssues() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Issues</CardTitle>
            <CardDescription>Latest civic issues reported by citizens</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentIssues.map((issue) => (
          <div key={issue.id} className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-foreground">{issue.title}</h4>
                  <Badge className={priorityColors[issue.priority as keyof typeof priorityColors]}>
                    {issue.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{issue.description}</p>
              </div>
              <Badge className={statusColors[issue.status as keyof typeof statusColors]}>{issue.status}</Badge>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{issue.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span>{issue.reportedBy}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{issue.timeAgo}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Badge variant="outline">{issue.category}</Badge>
              <Button size="sm" variant="outline">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
