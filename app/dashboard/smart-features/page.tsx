"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AIIssueCategorizer } from "@/components/ai-issue-categorizer"
import { SmartNotifications } from "@/components/smart-notifications"
import { CitizenFeedbackSystem } from "@/components/citizen-feedback-system"
import { PageTransition } from "@/components/page-transition"
import { Zap, Brain, Bell, MessageSquare } from "lucide-react"

export default function SmartFeaturesPage() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Smart Features
            </h1>
            <p className="text-muted-foreground">
              AI-powered tools and intelligent systems for enhanced civic management
            </p>
          </div>
        </div>

        {/* Feature Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-primary/20">
            <CardContent className="p-4 text-center">
              <Brain className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">AI Categorization</h3>
              <p className="text-sm text-muted-foreground">Intelligent issue classification</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20">
            <CardContent className="p-4 text-center">
              <Bell className="w-8 h-8 text-secondary mx-auto mb-2" />
              <h3 className="font-semibold">Smart Alerts</h3>
              <p className="text-sm text-muted-foreground">Context-aware notifications</p>
            </CardContent>
          </Card>

          <Card className="border-chart-2/20">
            <CardContent className="p-4 text-center">
              <MessageSquare className="w-8 h-8 text-chart-2 mx-auto mb-2" />
              <h3 className="font-semibold">Citizen Feedback</h3>
              <p className="text-sm text-muted-foreground">Real-time satisfaction tracking</p>
            </CardContent>
          </Card>

          <Card className="border-chart-4/20">
            <CardContent className="p-4 text-center">
              <Zap className="w-8 h-8 text-chart-4 mx-auto mb-2" />
              <h3 className="font-semibold">Automation</h3>
              <p className="text-sm text-muted-foreground">Streamlined workflows</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="space-y-6">
            <AIIssueCategorizer />
            <SmartNotifications />
          </div>
          <div>
            <CitizenFeedbackSystem />
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
