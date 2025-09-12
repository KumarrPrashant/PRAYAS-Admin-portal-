"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Layers, Satellite, Map, Navigation } from "lucide-react"

interface EnhancedMapProps {
  issues?: any[]
  onIssueSelect?: (issueId: string) => void
  showHeatmap?: boolean
}

export function EnhancedMap({ issues = [], onIssueSelect, showHeatmap = false }: EnhancedMapProps) {
  const [mapType, setMapType] = useState<"street" | "satellite">("street")
  const [showTraffic, setShowTraffic] = useState(false)

  const ghaziabadIssues = [
    { id: "ISS-001", lat: 28.6692, lng: 77.4538, priority: "High", location: "Vaishali Colony, Sector 4" },
    { id: "ISS-002", lat: 28.6448, lng: 77.4362, priority: "Critical", location: "Kaushambi, Sector 12" },
    { id: "ISS-003", lat: 28.6562, lng: 77.4221, priority: "Medium", location: "Raj Nagar Extension" },
    { id: "ISS-004", lat: 28.6789, lng: 77.4456, priority: "High", location: "NH-24, Near Anand Vihar" },
    { id: "ISS-005", lat: 28.6334, lng: 77.4123, priority: "Low", location: "Indirapuram, Sector 14" },
  ]

  const priorityColors = {
    Critical: "#ef4444",
    High: "#f97316",
    Medium: "#eab308",
    Low: "#22c55e",
  }

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-xl">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <span className="text-lg font-serif">Enhanced Issue Map</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant={mapType === "street" ? "default" : "outline"}
              size="sm"
              onClick={() => setMapType("street")}
              className="rounded-lg"
            >
              <Map className="w-4 h-4 mr-1" />
              Street
            </Button>
            <Button
              variant={mapType === "satellite" ? "default" : "outline"}
              size="sm"
              onClick={() => setMapType("satellite")}
              className="rounded-lg"
            >
              <Satellite className="w-4 h-4 mr-1" />
              Satellite
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowTraffic(!showTraffic)} className="rounded-lg">
              <Layers className="w-4 h-4 mr-1" />
              Traffic
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="aspect-[4/3] bg-gradient-to-br from-green-100 via-blue-50 to-green-50 rounded-xl relative overflow-hidden border border-border/20">
          <div className="absolute inset-0">
            {/* Street grid pattern */}
            <svg className="w-full h-full opacity-30" viewBox="0 0 400 300">
              <defs>
                <pattern id="streets" patternUnits="userSpaceOnUse" width="40" height="40">
                  <rect width="40" height="40" fill="#f8fafc" />
                  <path d="M 0 20 L 40 20 M 20 0 L 20 40" stroke="#e2e8f0" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#streets)" />

              {/* Major roads */}
              <path d="M 0 150 Q 200 120 400 150" stroke="#94a3b8" strokeWidth="3" fill="none" />
              <path d="M 200 0 Q 180 150 200 300" stroke="#94a3b8" strokeWidth="3" fill="none" />
            </svg>
          </div>

          {ghaziabadIssues.map((issue, index) => (
            <div
              key={issue.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${20 + index * 15}%`,
                top: `${25 + index * 12}%`,
              }}
              onClick={() => onIssueSelect?.(issue.id)}
            >
              <div
                className="w-6 h-6 rounded-full border-2 border-white shadow-lg animate-pulse group-hover:scale-125 transition-transform"
                style={{ backgroundColor: priorityColors[issue.priority as keyof typeof priorityColors] }}
              />
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {issue.location}
                <div className="text-xs text-muted-foreground">{issue.priority} Priority</div>
              </div>
            </div>
          ))}

          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
            <div className="text-sm font-semibold text-foreground">Ghaziabad Municipal Area</div>
            <div className="text-xs text-muted-foreground">Real-time Issue Tracking</div>
          </div>

          {/* Navigation controls */}
          <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
            <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
              <Navigation className="w-4 h-4" />
            </Button>
          </div>

          {/* Traffic overlay */}
          {showTraffic && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/3 left-0 right-0 h-1 bg-red-500/60 animate-pulse" />
              <div className="absolute top-2/3 left-0 right-0 h-1 bg-yellow-500/60" />
            </div>
          )}
        </div>

        {/* Enhanced legend */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Issue Priority</h4>
            <div className="space-y-1">
              {Object.entries(priorityColors).map(([priority, color]) => (
                <div key={priority} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                    <span>{priority}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {ghaziabadIssues.filter((i) => i.priority === priority).length}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Map Features</h4>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div>• Real-time issue locations</div>
              <div>• Interactive markers</div>
              <div>• Traffic overlay available</div>
              <div>• Satellite view option</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
