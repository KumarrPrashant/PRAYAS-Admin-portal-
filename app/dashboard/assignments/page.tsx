import { DashboardLayout } from "@/components/dashboard-layout"
import { TaskAssignmentDashboard } from "@/components/task-assignment-dashboard"

export default function AssignmentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col space-y-4 fade-in-up">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-serif font-bold text-primary">Task Assignment</h1>
              <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                Efficiently assign civic issues to departments and teams with priority levels, deadlines, and real-time
                tracking
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Pending Assignments</p>
                <p className="text-2xl font-serif font-bold text-secondary">23</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>PRAYAS</span>
            <span>/</span>
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-primary font-medium">Assignments</span>
          </div>
        </div>

        <div className="slide-in-right">
          <TaskAssignmentDashboard />
        </div>
      </div>
    </DashboardLayout>
  )
}
