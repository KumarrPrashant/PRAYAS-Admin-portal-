"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Filter } from "lucide-react"
import { useState } from "react"
import { EnhancedMap } from "@/components/enhanced-map"

export default function MapPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all")

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
              <div className="animate-in slide-in-from-right-4 duration-500 delay-200">
                <EnhancedMap showHeatmap={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
