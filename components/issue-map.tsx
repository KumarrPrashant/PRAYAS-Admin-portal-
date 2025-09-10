"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, ZoomIn } from "lucide-react"
import { useState } from "react"

export function IssueMap() {
  const [mapView, setMapView] = useState<"satellite" | "street">("street")

  return (
    <Card className="animate-in slide-in-from-bottom-4 duration-500">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Interactive Issue Map</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant={mapView === "street" ? "default" : "outline"}
              size="sm"
              onClick={() => setMapView("street")}
            >
              Street
            </Button>
            <Button
              variant={mapView === "satellite" ? "default" : "outline"}
              size="sm"
              onClick={() => setMapView("satellite")}
            >
              Satellite
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="aspect-square bg-gradient-to-br from-green-100 via-blue-50 to-green-100 rounded-lg flex items-center justify-center relative overflow-hidden border-2 border-green-200">
          <div
            className={`absolute inset-4 rounded-lg transition-all duration-300 ${
              mapView === "satellite"
                ? "bg-gradient-to-br from-green-800 via-green-600 to-blue-800"
                : "bg-gradient-to-br from-green-200 via-blue-100 to-green-300"
            }`}
          >
            <div className="relative w-full h-full">
              {/* Roads/Streets */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-400 opacity-60"></div>
              <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-400 opacity-60"></div>

              {/* Issue markers with enhanced styling */}
              <div className="absolute top-1/4 left-1/3 group cursor-pointer">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg border-2 border-white"></div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Electricity Issue
                </div>
              </div>

              <div className="absolute top-1/2 right-1/4 group cursor-pointer">
                <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse shadow-lg border-2 border-white"></div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Pothole Issue
                </div>
              </div>

              <div className="absolute bottom-1/3 left-1/2 group cursor-pointer">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg border-2 border-white"></div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Water Issue
                </div>
              </div>

              <div className="absolute top-3/4 right-1/3 group cursor-pointer">
                <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse shadow-lg border-2 border-white"></div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Street Light Issue
                </div>
              </div>
            </div>
          </div>

          <Button className="absolute top-4 right-4 z-10" size="sm" variant="secondary">
            <ZoomIn className="w-4 h-4 mr-1" />
            Full Map
          </Button>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Electricity Issues</span>
            </div>
            <Badge variant="outline">8</Badge>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Pothole Issues</span>
            </div>
            <Badge variant="outline">12</Badge>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Water Issues</span>
            </div>
            <Badge variant="outline">6</Badge>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Street Light Issues</span>
            </div>
            <Badge variant="outline">4</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
