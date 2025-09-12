"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface IssueHeatmapProps {
  timeRange: string
}

const heatmapData = [
  { area: "Vaishali Colony", issues: 145, intensity: "high" },
  { area: "Kaushambi", issues: 98, intensity: "medium" },
  { area: "Raj Nagar Extension", issues: 132, intensity: "high" },
  { area: "Indirapuram", issues: 76, intensity: "medium" },
  { area: "Crossings Republik", issues: 89, intensity: "medium" },
  { area: "Govindpuram", issues: 156, intensity: "high" },
  { area: "Mohan Nagar", issues: 45, intensity: "low" },
  { area: "Sahibabad", issues: 67, intensity: "medium" },
]

const intensityColors = {
  high: "bg-destructive",
  medium: "bg-chart-1",
  low: "bg-chart-2",
}

export function IssueHeatmap({ timeRange }: IssueHeatmapProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Geographic Issue Heatmap</CardTitle>
        <CardDescription>Issue concentration across different areas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {heatmapData.map((area, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg text-white ${intensityColors[area.intensity as keyof typeof intensityColors]}`}
            >
              <div className="text-sm font-medium">{area.area}</div>
              <div className="text-2xl font-bold">{area.issues}</div>
              <div className="text-xs opacity-80">issues</div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Issue Density Legend</h4>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-chart-2 rounded"></div>
                <span>Low (0-50)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-chart-1 rounded"></div>
                <span>Medium (51-100)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-destructive rounded"></div>
                <span>High (100+)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium mb-2">Top Issue Areas</h5>
              <div className="space-y-2">
                {heatmapData
                  .sort((a, b) => b.issues - a.issues)
                  .slice(0, 4)
                  .map((area, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{area.area}</span>
                      <Badge variant="outline">{area.issues} issues</Badge>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-2">Area Performance</h5>
              <div className="space-y-2">
                {heatmapData.slice(0, 4).map((area, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{area.area}</span>
                    <Badge
                      className={
                        area.intensity === "high"
                          ? "bg-destructive text-white"
                          : area.intensity === "medium"
                            ? "bg-chart-1 text-white"
                            : "bg-chart-2 text-white"
                      }
                    >
                      {area.intensity}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
