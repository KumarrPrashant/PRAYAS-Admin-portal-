"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, User, Eye, List, Search } from "lucide-react"

interface IssueTableProps {
  searchQuery: string
  statusFilter: string
  priorityFilter: string
  categoryFilter: string
  onSelectIssue: (issueId: string) => void
  selectedIssue: string | null
}

const mockIssues = [
  {
    id: "ISS-001",
    title: "Broken Street Light on MG Road",
    description: "Street light pole damaged, causing safety concerns for pedestrians during night hours",
    location: "MG Road, Sector 15, New Delhi",
    priority: "High",
    status: "In Progress",
    category: "Infrastructure",
    reportedBy: "Rajesh Kumar",
    reporterPhone: "+91 98765 43210",
    timeAgo: "2 hours ago",
    assignedTo: "PWD Team A",
    images: 3,
  },
  {
    id: "ISS-002",
    title: "Water Logging in Residential Area",
    description: "Severe water logging after recent rainfall, affecting daily commute and causing health hazards",
    location: "Green Park Colony, Block C",
    priority: "Critical",
    status: "Pending",
    category: "Drainage",
    reportedBy: "Priya Sharma",
    reporterPhone: "+91 87654 32109",
    timeAgo: "4 hours ago",
    assignedTo: "Unassigned",
    images: 5,
  },
  {
    id: "ISS-003",
    title: "Garbage Collection Delay",
    description: "Garbage not collected for 3 days, causing hygiene issues and bad odor in the locality",
    location: "Nehru Nagar, Ward 12",
    priority: "Medium",
    status: "Assigned",
    category: "Sanitation",
    reportedBy: "Amit Singh",
    reporterPhone: "+91 76543 21098",
    timeAgo: "6 hours ago",
    assignedTo: "Sanitation Dept",
    images: 2,
  },
  {
    id: "ISS-004",
    title: "Pothole on Main Highway",
    description: "Large pothole causing vehicle damage and traffic congestion during peak hours",
    location: "NH-1, Near Metro Station",
    priority: "High",
    status: "In Progress",
    category: "Roads",
    reportedBy: "Sunita Devi",
    reporterPhone: "+91 65432 10987",
    timeAgo: "8 hours ago",
    assignedTo: "Road Maintenance",
    images: 4,
  },
  {
    id: "ISS-005",
    title: "Power Outage in Commercial Area",
    description: "Frequent power cuts affecting businesses and causing economic losses",
    location: "Connaught Place, Central Delhi",
    priority: "Critical",
    status: "Resolved",
    category: "Electricity",
    reportedBy: "Vikram Gupta",
    reporterPhone: "+91 54321 09876",
    timeAgo: "1 day ago",
    assignedTo: "Electricity Board",
    images: 1,
  },
]

const priorityColors = {
  Critical: "bg-destructive text-destructive-foreground shadow-sm",
  High: "bg-secondary text-secondary-foreground shadow-sm",
  Medium: "bg-chart-3 text-white shadow-sm",
  Low: "bg-chart-2 text-white shadow-sm",
}

const statusColors = {
  Pending: "bg-chart-5 text-white shadow-sm",
  "In Progress": "bg-primary text-primary-foreground shadow-sm",
  Assigned: "bg-chart-4 text-white shadow-sm",
  Resolved: "bg-chart-2 text-white shadow-sm",
}

export function IssueTable({
  searchQuery,
  statusFilter,
  priorityFilter,
  categoryFilter,
  onSelectIssue,
  selectedIssue,
}: IssueTableProps) {
  // Filter issues based on search and filters
  const filteredIssues = mockIssues.filter((issue) => {
    const matchesSearch =
      searchQuery === "" ||
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.reportedBy.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || issue.status.toLowerCase().replace(" ", "-") === statusFilter
    const matchesPriority = priorityFilter === "all" || issue.priority.toLowerCase() === priorityFilter
    const matchesCategory = categoryFilter === "all" || issue.category.toLowerCase() === categoryFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory
  })

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <List className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="text-xl font-serif">Issues Overview</span>
              <p className="text-sm text-muted-foreground font-normal">
                {filteredIssues.length} of {mockIssues.length} issues
              </p>
            </div>
          </div>
          <Badge variant="outline" className="px-3 py-1 rounded-lg border-primary/20">
            {filteredIssues.length} results
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredIssues.map((issue, index) => (
          <div
            key={issue.id}
            className={`border border-border/50 rounded-xl p-6 space-y-4 cursor-pointer transition-all duration-300 hover:shadow-md card-hover ${
              selectedIssue === issue.id ? "bg-primary/5 border-primary shadow-md" : "hover:bg-muted/30"
            }`}
            onClick={() => onSelectIssue(issue.id)}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center space-x-3">
                  <h4 className="font-serif font-semibold text-lg text-foreground">{issue.title}</h4>
                  <Badge className={priorityColors[issue.priority as keyof typeof priorityColors]}>
                    {issue.priority}
                  </Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed line-clamp-2">{issue.description}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className={statusColors[issue.status as keyof typeof statusColors]}>{issue.status}</Badge>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-lg border-border/50 hover:border-primary bg-transparent"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
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
                  <div>
                    <span className="font-medium">{issue.reportedBy}</span>
                    <span className="text-xs ml-2 opacity-70">({issue.reporterPhone})</span>
                  </div>
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
                  <span className="text-muted-foreground font-medium">Assigned to:</span>
                  <Badge variant="outline" className="rounded-lg border-border/50">
                    {issue.assignedTo}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="rounded-lg border-primary/20 text-primary">
                  {issue.category}
                </Badge>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <div className="w-2 h-2 bg-chart-2 rounded-full"></div>
                  <span className="text-sm font-medium">{issue.images} photos</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground font-mono">ID: {issue.id}</div>
            </div>
          </div>
        ))}

        {filteredIssues.length === 0 && (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-muted/50 rounded-2xl flex items-center justify-center mx-auto">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <p className="text-lg font-medium text-foreground">No issues found</p>
              <p className="text-muted-foreground">
                Try adjusting your filters or search query to find what you're looking for.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
