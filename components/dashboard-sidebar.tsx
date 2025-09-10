"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, AlertTriangle, BarChart3, Users, Settings, FileText, MapPin, Bell, X, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface DashboardSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navigationItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard", badge: null },
  { icon: AlertTriangle, label: "Issues", href: "/dashboard/issues", badge: "23" },
  { icon: MapPin, label: "Map View", href: "/dashboard/map", badge: null },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics", badge: null },
  { icon: Users, label: "Assignments", href: "/dashboard/assignments", badge: "5" },
  { icon: FileText, label: "Reports", href: "/dashboard/reports", badge: "5" },
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications", badge: "12" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings", badge: null },
]

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-72 bg-gradient-to-b from-cyan-50 via-white to-orange-50 border-r border-border transform transition-all duration-300 ease-in-out lg:relative lg:translate-x-0 shadow-xl lg:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-cyan-600/10 via-white/50 to-orange-500/10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <div className="w-6 h-6 bg-gradient-to-r from-orange-400 via-white to-green-500 rounded-full"></div>
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl bg-gradient-to-r from-cyan-700 to-orange-600 bg-clip-text text-transparent">
                PRAYAS
              </h2>
              <p className="text-sm text-cyan-700 font-semibold">Admin Portal</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden text-muted-foreground hover:bg-muted rounded-xl"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="p-6 space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href} onClick={onClose}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-12 rounded-xl transition-all duration-200 group",
                    isActive
                      ? "bg-gradient-to-r from-cyan-600 to-cyan-700 text-white shadow-lg hover:from-cyan-700 hover:to-cyan-800"
                      : "text-cyan-800 hover:bg-gradient-to-r hover:from-cyan-100 hover:to-orange-50 hover:text-cyan-900",
                  )}
                >
                  <item.icon className="w-5 h-5 mr-4" />
                  <span className="flex-1 text-left font-semibold">{item.label}</span>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-xs font-bold",
                        isActive ? "bg-white/20 text-white" : "bg-orange-500 text-white",
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                  {isActive && <ChevronRight className="w-4 h-4 ml-2 opacity-70" />}
                </Button>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border bg-gradient-to-r from-cyan-100/50 to-orange-100/50">
          <div className="flex items-center space-x-4 p-4 bg-white/80 rounded-xl border border-cyan-200 shadow-lg backdrop-blur-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-orange-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-cyan-800 truncate">Admin Officer</p>
              <p className="text-xs text-cyan-600 font-semibold truncate">Department Head</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-xs text-cyan-600 font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
