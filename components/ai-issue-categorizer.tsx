"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Brain, Zap, CheckCircle, AlertTriangle } from "lucide-react"
import { AnimatedButton } from "./animated-button"
import { useNotificationToast } from "./notification-toast"

interface CategorySuggestion {
  category: string
  confidence: number
  priority: "Low" | "Medium" | "High" | "Critical"
  department: string
  estimatedResolution: string
  reasoning: string
}

export function AIIssueCategorizer() {
  const [issueDescription, setIssueDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [suggestions, setSuggestions] = useState<CategorySuggestion[]>([])
  const { showToast } = useNotificationToast()

  // Mock AI categorization logic
  const analyzeIssue = async () => {
    if (!issueDescription.trim()) {
      showToast({
        type: "warning",
        title: "Description Required",
        message: "Please enter an issue description to analyze.",
      })
      return
    }

    setIsAnalyzing(true)

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock AI analysis based on keywords
    const mockSuggestions: CategorySuggestion[] = []

    if (issueDescription.toLowerCase().includes("water") || issueDescription.toLowerCase().includes("leak")) {
      mockSuggestions.push({
        category: "Water Supply",
        confidence: 92,
        priority: "High",
        department: "Water Supply Department",
        estimatedResolution: "2-3 days",
        reasoning: "Keywords indicate water-related infrastructure issue requiring immediate attention.",
      })
    }

    if (issueDescription.toLowerCase().includes("road") || issueDescription.toLowerCase().includes("pothole")) {
      mockSuggestions.push({
        category: "Roads & Infrastructure",
        confidence: 88,
        priority: "Medium",
        department: "Public Works Department",
        estimatedResolution: "5-7 days",
        reasoning: "Road maintenance issue identified. Standard repair timeline applies.",
      })
    }

    if (issueDescription.toLowerCase().includes("garbage") || issueDescription.toLowerCase().includes("waste")) {
      mockSuggestions.push({
        category: "Sanitation",
        confidence: 95,
        priority: "Medium",
        department: "Sanitation Department",
        estimatedResolution: "1-2 days",
        reasoning: "Waste management issue with high confidence match.",
      })
    }

    if (issueDescription.toLowerCase().includes("light") || issueDescription.toLowerCase().includes("electricity")) {
      mockSuggestions.push({
        category: "Electricity",
        confidence: 90,
        priority: "High",
        department: "Electricity Board",
        estimatedResolution: "1-2 days",
        reasoning: "Electrical infrastructure issue requiring prompt resolution.",
      })
    }

    // Default suggestion if no specific keywords found
    if (mockSuggestions.length === 0) {
      mockSuggestions.push({
        category: "General Infrastructure",
        confidence: 75,
        priority: "Medium",
        department: "Municipal Corporation",
        estimatedResolution: "3-5 days",
        reasoning: "General civic issue requiring municipal attention.",
      })
    }

    setSuggestions(mockSuggestions)
    setIsAnalyzing(false)

    showToast({
      type: "success",
      title: "Analysis Complete",
      message: `Found ${mockSuggestions.length} category suggestion(s) with AI analysis.`,
    })
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600 bg-green-50"
    if (confidence >= 80) return "text-blue-600 bg-blue-50"
    if (confidence >= 70) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-500 text-white"
      case "High":
        return "bg-orange-500 text-white"
      case "Medium":
        return "bg-yellow-500 text-white"
      case "Low":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-primary" />
          <span>AI Issue Categorizer</span>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            BETA
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Issue Description</label>
          <Textarea
            placeholder="Describe the civic issue in detail... (e.g., 'There is a water leak on MG Road causing flooding')"
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>

        <AnimatedButton
          onClick={analyzeIssue}
          disabled={isAnalyzing}
          withAudio={true}
          successFeedback={true}
          className="w-full bg-gradient-to-r from-primary to-primary/90"
        >
          {isAnalyzing ? (
            <>
              <Zap className="w-4 h-4 mr-2 animate-pulse" />
              Analyzing with AI...
            </>
          ) : (
            <>
              <Brain className="w-4 h-4 mr-2" />
              Analyze Issue
            </>
          )}
        </AnimatedButton>

        {suggestions.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>AI Suggestions</span>
            </h4>

            {suggestions.map((suggestion, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="font-semibold text-lg">{suggestion.category}</h5>
                  <Badge className={getConfidenceColor(suggestion.confidence)}>
                    {suggestion.confidence}% confidence
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Priority:</span>
                    <Badge className={`ml-2 ${getPriorityColor(suggestion.priority)}`}>{suggestion.priority}</Badge>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Est. Resolution:</span>
                    <span className="ml-2 font-medium">{suggestion.estimatedResolution}</span>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground">Department:</span>
                  <Badge variant="outline" className="ml-2">
                    {suggestion.department}
                  </Badge>
                </div>

                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-blue-500 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium">AI Reasoning:</span>
                      <p className="text-sm text-muted-foreground mt-1">{suggestion.reasoning}</p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  Use This Categorization
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
