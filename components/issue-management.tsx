"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IssueTable } from "@/components/issue-table"
import { IssueMapView } from "@/components/issue-map-view"
import { IssueDetails } from "@/components/issue-details"
import { Search, Filter, MapPin, List, Plus, Download, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"

export function IssueManagement() {
  const [view, setView] = useState<"table" | "map">("table")
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const router = useRouter()

  const handleRefresh = () => {
    window.location.reload()
  }

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8,Issue ID,Title,Status,Priority,Category,Date\n"
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "issues_export.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleNewIssue = () => {
    router.push("/dashboard/issues/new")
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setStatusFilter("all")
    setPriorityFilter("all")
    setCategoryFilter("all")
  }

  const hasActiveFilters = searchQuery || statusFilter !== "all" || priorityFilter !== "all" || categoryFilter !== "all"

  return (
    <div className="space-y-8">
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Filter className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-xl font-serif">Filters & Search</span>
                <p className="text-sm text-muted-foreground font-normal">Refine your issue search criteria</p>
              </div>
            </CardTitle>
            <div className="flex items-center space-x-3">
              <Button size="sm" variant="outline" className="border-border/50 bg-transparent" onClick={handleRefresh}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button size="sm" variant="outline" className="border-border/50 bg-transparent" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-primary/90 shadow-md"
                onClick={handleNewIssue}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Issue
              </Button>
              <div className="flex items-center bg-muted/50 rounded-xl p-1 border border-border/50">
                <Button
                  variant={view === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView("table")}
                  className="h-9 px-4 rounded-lg"
                >
                  <List className="w-4 h-4 mr-2" />
                  Table
                </Button>
                <Button
                  variant={view === "map" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView("map")}
                  className="h-9 px-4 rounded-lg"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Map
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            <div className="xl:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search issues, locations, or reporters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-card border-border/50 focus:border-primary rounded-xl"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-12 bg-card border-border/50 focus:border-primary rounded-xl">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-primary/20">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="h-12 bg-card border-border/50 focus:border-primary rounded-xl">
                <SelectValue placeholder="All Priority" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-primary/20">
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-12 bg-card border-border/50 focus:border-primary rounded-xl">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-primary/20">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electricity">Electricity Issue</SelectItem>
                <SelectItem value="pothole">Pothole Issue</SelectItem>
                <SelectItem value="streetlight">Street Light Issue</SelectItem>
                <SelectItem value="water">Water Issue</SelectItem>
                <SelectItem value="drainage">Drainage Issue</SelectItem>
                <SelectItem value="sanitation">Sanitation Issue</SelectItem>
                <SelectItem value="roads">Road Issue</SelectItem>
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-3 p-4 bg-muted/30 rounded-xl border border-border/50">
              <span className="text-sm font-medium text-foreground">Active Filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center space-x-2 px-3 py-1 rounded-lg">
                  <span>Search: {searchQuery}</span>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="ml-1 hover:bg-muted-foreground/20 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {statusFilter !== "all" && (
                <Badge variant="secondary" className="flex items-center space-x-2 px-3 py-1 rounded-lg">
                  <span>Status: {statusFilter}</span>
                  <button
                    onClick={() => setStatusFilter("all")}
                    className="ml-1 hover:bg-muted-foreground/20 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {priorityFilter !== "all" && (
                <Badge variant="secondary" className="flex items-center space-x-2 px-3 py-1 rounded-lg">
                  <span>Priority: {priorityFilter}</span>
                  <button
                    onClick={() => setPriorityFilter("all")}
                    className="ml-1 hover:bg-muted-foreground/20 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {categoryFilter !== "all" && (
                <Badge variant="secondary" className="flex items-center space-x-2 px-3 py-1 rounded-lg">
                  <span>Category: {categoryFilter}</span>
                  <button
                    onClick={() => setCategoryFilter("all")}
                    className="ml-1 hover:bg-muted-foreground/20 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground ml-2"
              >
                Clear All
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Issues List/Map - Takes 3 columns on extra large screens */}
        <div className="xl:col-span-3">
          {view === "table" ? (
            <IssueTable
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              priorityFilter={priorityFilter}
              categoryFilter={categoryFilter}
              onSelectIssue={setSelectedIssue}
              selectedIssue={selectedIssue}
            />
          ) : (
            <IssueMapView
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              priorityFilter={priorityFilter}
              categoryFilter={categoryFilter}
              onSelectIssue={setSelectedIssue}
            />
          )}
        </div>

        {/* Issue Details - Takes 1 column */}
        <div className="xl:col-span-1">
          <IssueDetails issueId={selectedIssue} />
        </div>
      </div>
    </div>
  )
}
