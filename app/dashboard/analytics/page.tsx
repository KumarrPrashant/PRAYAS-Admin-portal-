import { DashboardLayout } from "@/components/dashboard-layout"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import PageTransition from "@/components/page-transition"

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <PageTransition>
        <div className="space-y-8">
          <div className="flex flex-col space-y-4 fade-in-up">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-4xl font-serif font-bold text-primary">Analytics & Reports</h1>
                <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                  Comprehensive insights into civic issue patterns, department performance, and resolution metrics with
                  real-time data visualization
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Data Updated</p>
                  <p className="text-sm font-semibold text-chart-2">Live</p>
                </div>
                <div className="w-3 h-3 bg-chart-2 rounded-full animate-pulse"></div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>PRAYAS</span>
              <span>/</span>
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-primary font-medium">Analytics</span>
            </div>
          </div>

          <div className="slide-in-right">
            <AnalyticsDashboard />
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  )
}
