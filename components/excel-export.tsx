"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileSpreadsheet } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function ExcelExport() {
  const [exportType, setExportType] = useState("all")
  const [dateRange, setDateRange] = useState("30d")
  const { toast } = useToast()

  const handleExport = () => {
    const issueData = [
      [
        "Issue ID",
        "Title",
        "Status",
        "Priority",
        "Category",
        "Location",
        "Reporter",
        "Assigned To",
        "Date Created",
        "Last Updated",
      ],
      [
        "ISS-001",
        "Broken Street Light on MG Road",
        "In Progress",
        "High",
        "Infrastructure",
        "MG Road, Sector 15, Ghaziabad",
        "Prabhat",
        "PWD Team A",
        "2024-01-15",
        "2024-01-16",
      ],
      [
        "ISS-002",
        "Water Logging in Residential Area",
        "Pending",
        "Critical",
        "Drainage",
        "Vaishali Colony, Sector 4, Ghaziabad",
        "Prashant",
        "Unassigned",
        "2024-01-15",
        "2024-01-15",
      ],
      [
        "ISS-003",
        "Garbage Collection Delay",
        "Assigned",
        "Medium",
        "Sanitation",
        "Kaushambi, Sector 12, Ghaziabad",
        "Mridul",
        "Sanitation Dept",
        "2024-01-14",
        "2024-01-15",
      ],
      [
        "ISS-004",
        "Pothole on Main Highway",
        "In Progress",
        "High",
        "Roads",
        "NH-24, Near Anand Vihar, Ghaziabad",
        "Pratham",
        "Road Maintenance",
        "2024-01-14",
        "2024-01-16",
      ],
      [
        "ISS-005",
        "Power Outage in Commercial Area",
        "Completed",
        "Critical",
        "Electricity",
        "Raj Nagar Extension, Ghaziabad",
        "Pragati",
        "Electricity Board",
        "2024-01-13",
        "2024-01-16",
      ],
    ]

    // Convert to CSV
    const csvContent = issueData.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `ghaziabad_issues_${exportType}_${new Date().toISOString().split("T")[0]}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    toast({
      title: "Export Successful",
      description: `Issues exported to Excel format (${issueData.length - 1} records)`,
    })
  }

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="p-2 bg-chart-2/10 rounded-xl">
            <FileSpreadsheet className="w-5 h-5 text-chart-2" />
          </div>
          <span className="text-lg font-serif">Excel Export</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Export Type</label>
            <Select value={exportType} onValueChange={setExportType}>
              <SelectTrigger className="h-10 bg-card border-border/50 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Issues</SelectItem>
                <SelectItem value="pending">Pending Issues</SelectItem>
                <SelectItem value="completed">Completed Issues</SelectItem>
                <SelectItem value="critical">Critical Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date Range</label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="h-10 bg-card border-border/50 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 3 months</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={handleExport} className="w-full bg-gradient-to-r from-chart-2 to-chart-2/90">
          <Download className="w-4 h-4 mr-2" />
          Export to Excel
        </Button>
      </CardContent>
    </Card>
  )
}
