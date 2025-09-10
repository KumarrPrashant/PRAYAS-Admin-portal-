"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Filter, Layers, ZoomIn, ZoomOut } from "lucide-react"
import { useState } from "react"

export default function MapPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all")
  const [mapView, setMapView] = useState<"satellite" | "street">("street")

  const issueTypes = [
    { value: "all", label: "All Issues", color: "gray", count: 30 },
    { value: "electricity", label: "Electricity Issues", color: "red", count: 8 },
    { value: "pothole", label: "Pothole Issues", color: "orange", count: 12 },
    { value: "water", label: "Water Issues", color: "blue", count: 6 },
    { value: "streetlight", label: "Street Light Issues", color: "yellow", count: 4 },
  ]

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-orange-50 relative overflow-hidden animate-in fade-in duration-700">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-200/40 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-bl from-orange-200/40 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 space-y-8">
          <div className="flex flex-col space-y-4 animate-in slide-in-from-top-4 duration-500">
            <h1 className="text-5xl font-serif font-bold bg-gradient-to-r from-cyan-700 via-cyan-600 to-orange-600 bg-clip-text text-transparent">
              Interactive Map View
            </h1>
            <p className="text-xl text-cyan-700 font-medium">
              Geographic visualization of civic issues across your jurisdiction
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <Card className="animate-in slide-in-from-left-4 duration-500 delay-100">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Filter className="w-5 h-5" />
                    <span>Filter Issues</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      {issueTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full bg-${type.color}-500`}></div>
                            <span>{type.label}</span>
                            <Badge variant="outline">{type.count}</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="space-y-2">
                    {issueTypes.map((type) => (
                      <div key={type.value} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full bg-${type.color}-500`}></div>
                          <span>{type.label}</span>
                        </div>
                        <Badge variant="outline">{type.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Card className="animate-in slide-in-from-right-4 duration-500 delay-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5" />
                      <span>Live Issue Map</span>
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button
                        variant={mapView === "street" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setMapView("street")}
                      >
                        <Layers className="w-4 h-4 mr-1" />
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
                  <div className="h-96 bg-gradient-to-br from-green-100 via-blue-50 to-green-100 rounded-lg relative overflow-hidden border-2 border-green-200">
                    <div
                      className={`absolute inset-0 rounded-lg transition-all duration-500 ${
                        mapView === "satellite"
                          ? "bg-gradient-to-br from-green-800 via-green-600 to-blue-800"
                          : "bg-gradient-to-br from-green-200 via-blue-100 to-green-300"
                      }`}
                    >
                      {/* Roads/Streets */}
                      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-400 opacity-60"></div>
                      <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-400 opacity-60"></div>
                      <div className="absolute top-1/4 left-1/4 right-1/4 h-0.5 bg-gray-400 opacity-40 rotate-45"></div>

                      {/* Interactive issue markers */}
                      <div className="absolute top-1/4 left-1/3 group cursor-pointer transform hover:scale-110 transition-transform">
                        <div className="w-5 h-5 bg-red-500 rounded-full animate-pulse shadow-lg border-2 border-white"></div>
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          Electricity Issue - High Priority
                        </div>
                      </div>

                      <div className="absolute top-1/2 right-1/4 group cursor-pointer transform hover:scale-110 transition-transform">
                        <div className="w-5 h-5 bg-orange-500 rounded-full animate-pulse shadow-lg border-2 border-white"></div>
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          Pothole Issue - Medium Priority
                        </div>
                      </div>

                      <div className="absolute bottom-1/3 left-1/2 group cursor-pointer transform hover:scale-110 transition-transform">
                        <div className="w-5 h-5 bg-blue-500 rounded-full animate-pulse shadow-lg border-2 border-white"></div>
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          Water Issue - Critical
                        </div>
                      </div>

                      <div className="absolute top-3/4 right-1/3 group cursor-pointer transform hover:scale-110 transition-transform">
                        <div className="w-5 h-5 bg-yellow-500 rounded-full animate-pulse shadow-lg border-2 border-white"></div>
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          Street Light Issue - Low Priority
                        </div>
                      </div>
                    </div>

                    {/* Map controls */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
                      <Button size="sm" variant="secondary">
                        <ZoomIn className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <ZoomOut className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
