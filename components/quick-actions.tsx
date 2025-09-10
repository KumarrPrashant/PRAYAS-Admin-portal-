"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Users, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"

const quickActions = [
  {
    title: "New Issue",
    description: "Report a new civic issue",
    icon: Plus,
    color: "bg-primary text-primary-foreground hover:bg-primary/90",
    href: "/dashboard/issues/new",
  },
  {
    title: "Generate Report",
    description: "Create department report",
    icon: FileText,
    color: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    href: "/dashboard/reports",
  },
  {
    title: "Assign Task",
    description: "Assign issue to team",
    icon: Users,
    color: "bg-chart-1 text-white hover:bg-chart-1/90",
    href: "/dashboard/assignments",
  },
  {
    title: "View Analytics",
    description: "Check performance metrics",
    icon: BarChart3,
    color: "bg-chart-4 text-white hover:bg-chart-4/90",
    href: "/dashboard/analytics",
  },
]

export function QuickActions() {
  const router = useRouter()

  const handleActionClick = (href: string) => {
    router.push(href)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => (
          <Button
            key={action.title}
            variant="outline"
            className={`h-auto p-4 flex flex-col items-center space-y-2 ${action.color} border-0 transition-transform hover:scale-105`}
            onClick={() => handleActionClick(action.href)}
          >
            <action.icon className="w-6 h-6" />
            <div className="text-center">
              <div className="font-semibold text-sm">{action.title}</div>
              <div className="text-xs opacity-80">{action.description}</div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
