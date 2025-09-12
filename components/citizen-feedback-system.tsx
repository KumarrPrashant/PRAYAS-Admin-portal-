"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Star, MessageSquare, ThumbsUp, ThumbsDown, Send } from "lucide-react"
import { AnimatedButton } from "./animated-button"
import { useNotificationToast } from "./notification-toast"

interface FeedbackItem {
  id: string
  issueId: string
  issueTitle: string
  rating: number
  feedback: string
  timestamp: Date
  citizenName: string
  status: "pending" | "reviewed" | "responded"
}

export function CitizenFeedbackSystem() {
  const [selectedIssue, setSelectedIssue] = useState("")
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [feedbackList] = useState<FeedbackItem[]>([
    {
      id: "1",
      issueId: "ISS-001",
      issueTitle: "Broken Street Light on MG Road",
      rating: 5,
      feedback:
        "Excellent work! The street light was fixed within 2 days as promised. Very satisfied with the quick response.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      citizenName: "Prabhat",
      status: "reviewed",
    },
    {
      id: "2",
      issueId: "ISS-002",
      issueTitle: "Water Logging in Residential Area",
      rating: 3,
      feedback: "The issue was resolved but took longer than expected. Communication could have been better.",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      citizenName: "Prashant",
      status: "pending",
    },
    {
      id: "3",
      issueId: "ISS-003",
      issueTitle: "Garbage Collection Delay",
      rating: 4,
      feedback: "Good resolution. The garbage collection schedule has improved significantly after reporting.",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      citizenName: "Mridul",
      status: "responded",
    },
  ])

  const { showToast } = useNotificationToast()

  const mockIssues = [
    { id: "ISS-001", title: "Broken Street Light on MG Road" },
    { id: "ISS-002", title: "Water Logging in Residential Area" },
    { id: "ISS-003", title: "Garbage Collection Delay" },
    { id: "ISS-004", title: "Pothole on Main Highway" },
  ]

  const submitFeedback = () => {
    if (!selectedIssue || rating === 0 || !feedback.trim()) {
      showToast({
        type: "warning",
        title: "Incomplete Feedback",
        message: "Please select an issue, provide a rating, and write your feedback.",
      })
      return
    }

    // Simulate feedback submission
    showToast({
      type: "success",
      title: "Feedback Submitted",
      message: "Thank you for your feedback! It helps us improve our services.",
    })

    // Reset form
    setSelectedIssue("")
    setRating(0)
    setFeedback("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "reviewed":
        return "bg-blue-100 text-blue-800"
      case "responded":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const averageRating = feedbackList.reduce((sum, item) => sum + item.rating, 0) / feedbackList.length

  return (
    <div className="space-y-6">
      {/* Feedback Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            <span>Citizen Feedback Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{feedbackList.length}</div>
              <div className="text-sm text-muted-foreground">Total Feedback</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="text-2xl font-bold text-primary">{averageRating.toFixed(1)}</span>
              </div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {feedbackList.filter((f) => f.rating >= 4).length}
              </div>
              <div className="text-sm text-muted-foreground">Positive Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {feedbackList.filter((f) => f.status === "pending").length}
              </div>
              <div className="text-sm text-muted-foreground">Pending Review</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit New Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Submit Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Issue</label>
            <select
              value={selectedIssue}
              onChange={(e) => setSelectedIssue(e.target.value)}
              className="w-full p-2 border rounded-lg bg-background"
            >
              <option value="">Choose an issue...</option>
              {mockIssues.map((issue) => (
                <option key={issue.id} value={issue.id}>
                  {issue.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Rating</label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)} className="transition-colors hover:scale-110">
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating ? "text-yellow-500 fill-current" : "text-gray-300"
                    } transition-all`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating > 0 && `${rating} star${rating > 1 ? "s" : ""}`}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Your Feedback</label>
            <Textarea
              placeholder="Share your experience with the issue resolution..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
            />
          </div>

          <AnimatedButton onClick={submitFeedback} withAudio={true} successFeedback={true} className="w-full">
            <Send className="w-4 h-4 mr-2" />
            Submit Feedback
          </AnimatedButton>
        </CardContent>
      </Card>

      {/* Recent Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Citizen Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feedbackList.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{item.issueTitle}</h4>
                    <p className="text-sm text-muted-foreground">by {item.citizenName}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= item.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-sm">{item.feedback}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{item.timestamp.toLocaleString()}</span>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="w-3 h-3 mr-1" />
                      Helpful
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ThumbsDown className="w-3 h-3 mr-1" />
                      Not Helpful
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
