import { LoginForm } from "@/components/login-form"
import { MarqueeSlogan } from "@/components/marquee-slogan"

export default function LoginPage() {
  return (
    <div className="min-h-screen relative flex flex-col bg-gradient-to-br from-cyan-50 via-white to-cyan-50">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(22,78,99,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.1),transparent_50%)]"></div>
      </div>

      {/* Top Marquee Banner */}
      <MarqueeSlogan />

      {/* Main Login Content */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <div className="flex flex-col items-center text-center space-y-8 fade-in-up">
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-8xl font-serif font-bold tracking-tight">
                <span className="bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent drop-shadow-sm">
                  PRAYAS
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-slate-600 font-semibold max-w-2xl leading-relaxed">
                Problem Reporting and Action for Your Area's Security
              </p>

              <div className="glass-effect rounded-2xl p-8 border border-primary/20 shadow-xl max-w-2xl">
                <p className="text-primary font-serif font-bold text-2xl lg:text-3xl tracking-wide mb-3">
                  "Digital India Initiative"
                </p>
                <p className="text-slate-600 font-semibold text-lg">Transparent Civic Engagement Platform</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-2xl">
              <div className="text-center p-4 rounded-xl bg-card border border-border card-hover">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-serif font-semibold text-primary mb-1">Transparent</h3>
                <p className="text-sm text-muted-foreground">Real-time tracking</p>
              </div>

              <div className="text-center p-4 rounded-xl bg-card border border-border card-hover">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-serif font-semibold text-primary mb-1">Efficient</h3>
                <p className="text-sm text-muted-foreground">Quick resolution</p>
              </div>

              <div className="text-center p-4 rounded-xl bg-card border border-border card-hover">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-serif font-semibold text-primary mb-1">Accessible</h3>
                <p className="text-sm text-muted-foreground">For all citizens</p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex justify-center slide-in-right">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card/50 backdrop-blur-sm border-t border-border p-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
          <p className="font-medium">© 2024 Government of India. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <span className="font-medium">Ministry of Electronics & Information Technology</span>
            <div className="w-8 h-6 bg-gradient-to-r from-secondary via-white to-primary rounded border border-border shadow-sm"></div>
          </div>
        </div>
      </footer>
    </div>
  )
}
