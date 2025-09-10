"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Layers } from "lucide-react"

interface IssueMapViewProps {
  searchQuery: string
  statusFilter: string
  priorityFilter: string
  categoryFilter: string
  onSelectIssue: (issueId: string) => void
}

export function IssueMapView({
  searchQuery,
  statusFilter,
  priorityFilter,
  categoryFilter,
  onSelectIssue,
}: IssueMapViewProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Issue Map View</span>
          </CardTitle>
          <Button variant="outline" size="sm">
            <Layers className="w-4 h-4 mr-2" />
            Layers
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
          {/* Interactive Map Placeholder */}
          <div className="absolute inset-4 bg-gradient-to-br from-chart-2/20 to-chart-1/20 rounded-lg">
            <div className="relative w-full h-full">
              {/* Issue markers with different colors based on priority */}
              <div
                className="absolute top-1/4 left-1/3 w-4 h-4 bg-destructive rounded-full animate-pulse cursor-pointer"
                onClick={() => onSelectIssue("ISS-002")}
                title="Critical Issue - Water Logging"
              ></div>
              <div
                className="absolute top-1/2 right-1/4 w-4 h-4 bg-chart-1 rounded-full animate-pulse cursor-pointer"
                onClick={() => onSelectIssue("ISS-001")}
                title="High Priority - Broken Street Light"
              ></div>
              <div
                className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-chart-4 rounded-full animate-pulse cursor-pointer"
                onClick={() => onSelectIssue("ISS-003")}
                title="Medium Priority - Garbage Collection"
              ></div>
              <div
                className="absolute top-3/4 right-1/3 w-4 h-4 bg-chart-2 rounded-full cursor-pointer"
                onClick={() => onSelectIssue("ISS-005")}
                title="Resolved - Power Outage"
              ></div>
              <div
                className="absolute top-1/6 left-2/3 w-4 h-4 bg-chart-1 rounded-full animate-pulse cursor-pointer"
                onClick={() => onSelectIssue("ISS-004")}
                title="High Priority - Pothole"
              ></div>

              {/* Area boundaries */}
              <div className="absolute top-0 left-0 w-full h-full border-2 border-dashed border-muted-foreground/20 rounded-lg"></div>
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-dashed border-muted-foreground/30 rounded"></div>
            </div>
          </div>

          <div className="text-center z-10 bg-background/80 backdrop-blur-sm rounded-lg p-4">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-sm font-medium text-foreground">Interactive Issue Map</p>
            <p className="text-xs text-muted-foreground">Click on markers to view issue details</p>
          </div>
        </div>

        {/* Map Legend */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Priority Levels</h4>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-destructive rounded-full"></div>
                  <span>Critical</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  2
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-chart-1 rounded-full"></div>
                  <span>High</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  3
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-chart-4 rounded-full"></div>
                  <span>Medium</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  1
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Status</h4>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-chart-5 rounded-full"></div>
                  <span>Pending</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  1
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-chart-1 rounded-full animate-pulse"></div>
                  <span>In Progress</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  2
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-chart-2 rounded-full"></div>
                  <span>Resolved</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  1
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
