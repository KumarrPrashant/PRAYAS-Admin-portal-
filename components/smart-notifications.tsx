"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Bell, BellRing, Clock, MapPin, AlertTriangle, CheckCircle } from "lucide-react"
import { AnimatedButton } from "./animated-button"
import { useNotificationToast } from "./notification-toast"

interface SmartNotification {
  id: string
  type: "urgent" | "update" | "reminder" | "achievement"
  title: string
  message: string
  timestamp: Date
  location?: string
  actionRequired?: boolean
  read: boolean
}

export function SmartNotifications() {
  const [notifications, setNotifications] = useState<SmartNotification[]>([])
  const [smartNotificationsEnabled, setSmartNotificationsEnabled] = useState(true)
  const [locationBasedAlerts, setLocationBasedAlerts] = useState(true)
  const { showToast } = useNotificationToast()

  // Mock smart notifications
  useEffect(() => {
    const mockNotifications: SmartNotification[] = [
      {
        id: "1",
        type: "urgent",
        title: "Critical Issue Nearby",
        message: "Water main burst reported 500m from your location in Vaishali Colony",
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        location: "Vaishali Colony, Ghaziabad",
        actionRequired: true,
        read: false,
      },
      {
        id: "2",
        type: "update",
        title: "Issue Resolution Update",
        message: "Street light repair on MG Road has been completed successfully",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        location: "MG Road, Sector 15",
        actionRequired: false,
        read: false,
      },
      {
        id: "3",
        type: "reminder",
        title: "Weekly Report Due",
        message: "Your weekly department report is due in 2 hours",
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        actionRequired: true,
        read: true,
      },
      {
        id: "4",
        type: "achievement",
        title: "Resolution Target Met",
        message: "Congratulations! Your team resolved 95% of issues this week",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        actionRequired: false,
        read: false,
      },
    ]

    setNotifications(mockNotifications)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
    showToast({
      type: "success",
      title: "All Notifications Read",
      message: "All notifications have been marked as read.",
    })
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "update":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "reminder":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "achievement":
        return <CheckCircle className="w-4 h-4 text-blue-500" />
      default:
        return <Bell className="w-4 h-4 text-gray-500" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "urgent":
        return "border-l-red-500 bg-red-50/50"
      case "update":
        return "border-l-green-500 bg-green-50/50"
      case "reminder":
        return "border-l-yellow-500 bg-yellow-50/50"
      case "achievement":
        return "border-l-blue-500 bg-blue-50/50"
      default:
        return "border-l-gray-500 bg-gray-50/50"
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <div className="relative">
              <BellRing className="w-5 h-5 text-primary" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <span>Smart Notifications</span>
          </CardTitle>
          {unreadCount > 0 && (
            <AnimatedButton variant="outline" size="sm" onClick={markAllAsRead} withAudio={true}>
              Mark All Read
            </AnimatedButton>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Notification Settings */}
        <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
          <h4 className="font-semibold text-sm">Notification Preferences</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Smart Notifications</span>
                <p className="text-xs text-muted-foreground">AI-powered relevant alerts</p>
              </div>
              <Switch checked={smartNotificationsEnabled} onCheckedChange={setSmartNotificationsEnabled} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Location-Based Alerts</span>
                <p className="text-xs text-muted-foreground">Notifications for nearby issues</p>
              </div>
              <Switch checked={locationBasedAlerts} onCheckedChange={setLocationBasedAlerts} />
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Recent Notifications</h4>
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`border-l-4 p-3 rounded-r-lg cursor-pointer transition-all hover:shadow-sm ${getNotificationColor(
                    notification.type,
                  )} ${notification.read ? "opacity-60" : ""}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h5 className="font-semibold text-sm truncate">{notification.title}</h5>
                        <span className="text-xs text-muted-foreground">
                          {new Date(notification.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      {notification.location && (
                        <div className="flex items-center space-x-1 mt-2">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{notification.location}</span>
                        </div>
                      )}
                      {notification.actionRequired && (
                        <Badge variant="outline" className="mt-2 text-xs">
                          Action Required
                        </Badge>
                      )}
                    </div>
                    {!notification.read && <div className="w-2 h-2 bg-primary rounded-full mt-1"></div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
