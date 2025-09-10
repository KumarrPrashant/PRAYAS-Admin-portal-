import { DashboardLayout } from "@/components/dashboard-layout"
import { IssueManagement } from "@/components/issue-management"
import PageTransition from "@/components/page-transition"

export default function IssuesPage() {
  return (
    <DashboardLayout>
      <PageTransition>
        <div className="space-y-8">
          <div className="flex flex-col space-y-4 fade-in-up">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-4xl font-serif font-bold text-primary">Issue Management</h1>
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  Monitor, track, and manage all civic issues reported by citizens with advanced filtering and real-time
                  updates
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Active Issues</p>
                  <p className="text-2xl font-serif font-bold text-primary">247</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>PRAYAS</span>
              <span>/</span>
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-primary font-medium">Issues</span>
            </div>
          </div>

          <div className="slide-in-right">
            <IssueManagement />
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  )
}
