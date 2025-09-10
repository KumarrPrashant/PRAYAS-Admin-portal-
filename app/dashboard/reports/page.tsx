import { DashboardLayout } from "@/components/dashboard-layout"

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-orange-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-200/40 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-green-200/40 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 space-y-8">
          <div className="flex flex-col space-y-4">
            <h1 className="text-5xl font-serif font-bold bg-gradient-to-r from-cyan-700 via-cyan-600 to-orange-600 bg-clip-text text-transparent">
              Reports
            </h1>
            <p className="text-xl text-cyan-700 font-medium">Generate comprehensive reports and export data insights</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-cyan-200 shadow-xl">
            <div className="h-96 bg-gradient-to-br from-cyan-100 to-orange-100 rounded-xl flex items-center justify-center">
              <p className="text-cyan-700 font-semibold text-lg">Reports Dashboard Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
