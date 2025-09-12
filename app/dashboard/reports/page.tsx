"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Calendar, Filter, BarChart3, TrendingUp, Users, Clock } from "lucide-react"
import { PageTransition } from "@/components/page-transition"

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState("monthly")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [dateRange, setDateRange] = useState("last-30-days")

  const reportTypes = [
    { id: "monthly", name: "Monthly Summary", description: "Comprehensive monthly performance report" },
    { id: "department", name: "Department Performance", description: "Individual department analysis" },
    { id: "issue-trends", name: "Issue Trends", description: "Category and priority trend analysis" },
    { id: "resolution-time", name: "Resolution Time", description: "Average resolution time metrics" },
  ]

  const mockReportData = {
    totalIssues: 1247,
    resolvedIssues: 892,
    avgResolutionTime: "4.2 days",
    topDepartment: "Public Works",
    criticalIssues: 23,
    satisfactionRate: "87%",
  }

  const handleGenerateReport = () => {
    // Simulate report generation
    alert(`Generating ${reportTypes.find((r) => r.id === selectedReport)?.name} report...`)
  }

  const handleDownloadReport = () => {
    // Simulate download
    alert("Report downloaded successfully!")
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Reports & Analytics
            </h1>
            <p className="text-muted-foreground">Generate comprehensive reports and export data insights</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleDownloadReport}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button onClick={handleGenerateReport} className="bg-gradient-to-r from-primary to-primary/90">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Report Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-primary" />
              <span>Report Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <Select value={selectedReport} onValueChange={setSelectedReport}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="pwd">Public Works Department</SelectItem>
                    <SelectItem value="sanitation">Sanitation Department</SelectItem>
                    <SelectItem value="electricity">Electricity Board</SelectItem>
                    <SelectItem value="water">Water Supply Department</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                    <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                    <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                    <SelectItem value="last-year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Selected Report:</strong> {reportTypes.find((r) => r.id === selectedReport)?.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Total Issues</span>
              </div>
              <p className="text-2xl font-bold text-foreground mt-1">{mockReportData.totalIssues}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-chart-2" />
                <span className="text-sm font-medium text-muted-foreground">Resolved</span>
              </div>
              <p className="text-2xl font-bold text-foreground mt-1">{mockReportData.resolvedIssues}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-chart-4" />
                <span className="text-sm font-medium text-muted-foreground">Avg Resolution</span>
              </div>
              <p className="text-2xl font-bold text-foreground mt-1">{mockReportData.avgResolutionTime}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-chart-1" />
                <span className="text-sm font-medium text-muted-foreground">Top Dept</span>
              </div>
              <p className="text-lg font-bold text-foreground mt-1">{mockReportData.topDepartment}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-destructive rounded-full" />
                <span className="text-sm font-medium text-muted-foreground">Critical</span>
              </div>
              <p className="text-2xl font-bold text-foreground mt-1">{mockReportData.criticalIssues}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-chart-2 rounded-full" />
                <span className="text-sm font-medium text-muted-foreground">Satisfaction</span>
              </div>
              <p className="text-2xl font-bold text-foreground mt-1">{mockReportData.satisfactionRate}</p>
            </CardContent>
          </Card>
        </div>

        {/* Available Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary" />
              <span>Available Report Types</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportTypes.map((report) => (
                <div
                  key={report.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedReport === report.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedReport(report.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{report.name}</h4>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                    {selectedReport === report.id && (
                      <Badge variant="default" className="bg-primary">
                        Selected
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Completed Issues Report */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-chart-2" />
              <span>Completed Issues Report</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left p-3 font-semibold">Issue ID</th>
                    <th className="text-left p-3 font-semibold">Category</th>
                    <th className="text-left p-3 font-semibold">Department</th>
                    <th className="text-left p-3 font-semibold">Completed By</th>
                    <th className="text-left p-3 font-semibold">Completion Date</th>
                    <th className="text-left p-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: "ISS-005",
                      category: "Electricity",
                      department: "Electricity Board",
                      completedBy: "Prerna Singh (Senior Engineer)",
                      completionDate: "2024-01-16",
                      status: "Completed",
                    },
                    {
                      id: "ISS-008",
                      category: "Roads",
                      department: "PWD",
                      completedBy: "Prabhat Kumar (Road Inspector)",
                      completionDate: "2024-01-15",
                      status: "Completed",
                    },
                    {
                      id: "ISS-012",
                      category: "Sanitation",
                      department: "Sanitation Dept",
                      completedBy: "Prashant Sharma (Supervisor)",
                      completionDate: "2024-01-14",
                      status: "Resolved",
                    },
                    {
                      id: "ISS-015",
                      category: "Water Supply",
                      department: "Water Board",
                      completedBy: "Mridul Gupta (Technical Officer)",
                      completionDate: "2024-01-13",
                      status: "Completed",
                    },
                    {
                      id: "ISS-018",
                      category: "Infrastructure",
                      department: "PWD",
                      completedBy: "Pratham Singh (Project Manager)",
                      completionDate: "2024-01-12",
                      status: "Resolved",
                    },
                  ].map((issue, index) => (
                    <tr key={index} className="border-b border-border/20 hover:bg-muted/30">
                      <td className="p-3 font-mono text-sm">{issue.id}</td>
                      <td className="p-3">
                        <Badge variant="outline" className="rounded-lg">
                          {issue.category}
                        </Badge>
                      </td>
                      <td className="p-3 text-sm">{issue.department}</td>
                      <td className="p-3 text-sm font-medium">{issue.completedBy}</td>
                      <td className="p-3 text-sm text-muted-foreground">
                        {new Date(issue.completionDate).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                        <Badge
                          className={issue.status === "Completed" ? "bg-chart-2 text-white" : "bg-primary text-white"}
                        >
                          {issue.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>Recent Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Monthly Summary - December 2024", date: "2024-01-01", size: "2.4 MB", status: "Ready" },
                { name: "Department Performance - Q4 2024", date: "2023-12-28", size: "1.8 MB", status: "Ready" },
                { name: "Issue Trends - November 2024", date: "2023-12-01", size: "3.1 MB", status: "Ready" },
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Generated on {new Date(report.date).toLocaleDateString()} • {report.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-chart-2/10 text-chart-2">
                      {report.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}
