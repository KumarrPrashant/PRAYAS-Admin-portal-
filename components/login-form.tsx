"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, User, Lock, ArrowRight } from "lucide-react"

export function LoginForm() {
  const [role, setRole] = useState("")
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (role && credentials.username && credentials.password) {
      console.log("Login successful:", { role, credentials })
      router.push("/dashboard")
    }
  }

  return (
    <Card className="w-full max-w-lg glass-effect shadow-2xl border border-primary/20 card-hover">
      <CardHeader className="text-center space-y-6 pb-8">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
          <Shield className="w-10 h-10 text-primary-foreground" />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-3xl font-serif font-bold text-primary">PRAYAS Admin</CardTitle>
          <CardDescription className="text-slate-600 font-medium text-lg">
            Secure Government Portal Access
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-8 px-8 pb-8">
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Role Selection */}
          <div className="space-y-3">
            <Label htmlFor="role" className="text-sm font-semibold text-foreground flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Select Role
            </Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="h-12 bg-card border-2 border-border focus:border-primary transition-colors rounded-xl">
                <SelectValue placeholder="Choose your role" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-primary/20">
                <SelectItem value="super-admin" className="rounded-lg">
                  Super Administrator
                </SelectItem>
                <SelectItem value="dept-officer" className="rounded-lg">
                  Department Officer
                </SelectItem>
                <SelectItem value="field-staff" className="rounded-lg">
                  Field Staff
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Username */}
          <div className="space-y-3">
            <Label htmlFor="username" className="text-sm font-semibold text-foreground flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Government ID / Username
            </Label>
            <div className="relative">
              <User className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
              <Input
                id="username"
                type="text"
                placeholder="Enter your government ID"
                value={credentials.username}
                onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
                className="h-12 pl-12 bg-card border-2 border-border focus:border-primary transition-colors rounded-xl"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-3">
            <Label htmlFor="password" className="text-sm font-semibold text-foreground flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                className="h-12 pl-12 bg-card border-2 border-border focus:border-primary transition-colors rounded-xl"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-14 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
            disabled={!role || !credentials.username || !credentials.password}
          >
            Secure Login
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>

        <div className="text-center space-y-4 pt-6 border-t border-border/50">
          <p className="text-sm text-muted-foreground">Forgot your credentials? Contact IT Support</p>
          <div className="flex justify-center items-center space-x-3 text-sm text-muted-foreground">
            <span className="font-medium">Powered by</span>
            <div className="w-6 h-4 bg-gradient-to-r from-primary via-card to-secondary rounded border border-border shadow-sm"></div>
            <span className="font-medium">Digital India</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
