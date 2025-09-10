import { DashboardLayout } from "@/components/dashboard-layout"
import { StatsCards } from "@/components/stats-cards"
import { RecentIssues } from "@/components/recent-issues"
import { IssueMap } from "@/components/issue-map"
import { QuickActions } from "@/components/quick-actions"
import PageTransition from "@/components/page-transition"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-orange-50 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-200/40 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute top-1/3 right-0 w-80 h-80 bg-gradient-to-bl from-orange-200/40 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-green-200/40 to-transparent rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 space-y-8">
            <div className="flex flex-col space-y-4 fade-in-up">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h1 className="text-5xl font-serif font-bold bg-gradient-to-r from-cyan-700 via-cyan-600 to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
                    Dashboard Overview
                  </h1>
                  <p className="text-xl text-cyan-700 max-w-2xl leading-relaxed font-medium">
                    Monitor civic issues and track resolution progress across your jurisdiction with real-time insights
                  </p>
                </div>
                <div className="hidden md:flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-cyan-200 shadow-lg">
                  <div className="text-right">
                    <p className="text-sm text-cyan-600 font-semibold">Last Updated</p>
                    <p className="text-sm font-bold text-cyan-800">2 minutes ago</p>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 w-fit border border-cyan-200">
                <span className="text-cyan-700 font-semibold">PRAYAS</span>
                <span className="text-orange-500">/</span>
                <span className="text-orange-600 font-bold">Dashboard</span>
              </div>
            </div>

            <div className="slide-in-right">
              <StatsCards />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Recent Issues - Takes 3 columns on extra large screens */}
              <div className="xl:col-span-3 space-y-6">
                <RecentIssues />
              </div>

              {/* Sidebar Content - Takes 1 column */}
              <div className="space-y-6">
                <QuickActions />
                <IssueMap />
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  )
}
