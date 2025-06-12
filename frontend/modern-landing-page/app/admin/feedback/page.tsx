"use client"

import { useEffect, useState } from "react"
import { Star, MessageSquare, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Feedback } from "@/apis/feedback"
import { FeedbackAPI } from "@/apis/feedback"

export default function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "pending" | "reviewed" | "resolved">("all")

  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        const data = await FeedbackAPI.getAllFeedbacks()
        setFeedbacks(data)
      } catch (error) {
        console.error("Error loading feedbacks:", error)
      } finally {
        setLoading(false)
      }
    }

    loadFeedbacks()
  }, [])

  const updateStatus = async (id: number, status: Feedback["status"]) => {
    try {
      await FeedbackAPI.updateFeedbackStatus(id, status)
      setFeedbacks((prev) => prev.map((feedback) => (feedback.id === id ? { ...feedback, status } : feedback)))
    } catch (error) {
      console.error("Error updating feedback status:", error)
    }
  }

  const filteredFeedbacks = feedbacks.filter((feedback) => filter === "all" || feedback.status === filter)

  const getStatusIcon = (status: Feedback["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "reviewed":
        return <AlertCircle className="w-4 h-4" />
      case "resolved":
        return <CheckCircle className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: Feedback["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "reviewed":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
    }
  }

  const averageRating = feedbacks.length > 0 ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <MessageSquare className="w-8 h-8 mr-3" />
          Customer Feedback
        </h1>
        <p className="text-muted-foreground">Manage and respond to customer feedback</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Total Feedback</span>
            </div>
            <p className="text-2xl font-bold mt-2">{feedbacks.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium">Average Rating</span>
            </div>
            <p className="text-2xl font-bold mt-2">{averageRating.toFixed(1)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium">Pending</span>
            </div>
            <p className="text-2xl font-bold mt-2">{feedbacks.filter((f) => f.status === "pending").length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Resolved</span>
            </div>
            <p className="text-2xl font-bold mt-2">{feedbacks.filter((f) => f.status === "resolved").length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Feedback List</h2>
        <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Feedback</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="reviewed">Reviewed</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Feedback List */}
      {filteredFeedbacks.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="w-24 h-24 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No feedback found</h3>
          <p className="text-muted-foreground">
            {filter === "all" ? "No feedback has been submitted yet." : `No ${filter} feedback found.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFeedbacks.map((feedback) => (
            <Card key={feedback.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">{feedback.rating}/5</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Submitted on {new Date(feedback.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={getStatusColor(feedback.status)}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(feedback.status)}
                      <span>{feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}</span>
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedback.content && (
                    <div>
                      <p className="text-sm font-medium mb-2">Customer Comment:</p>
                      <p className="text-muted-foreground bg-muted/50 p-3 rounded-lg">{feedback.content}</p>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    {feedback.status === "pending" && (
                      <Button variant="outline" size="sm" onClick={() => updateStatus(feedback.id, "reviewed")}>
                        Mark as Reviewed
                      </Button>
                    )}
                    {feedback.status !== "resolved" && (
                      <Button size="sm" onClick={() => updateStatus(feedback.id, "resolved")}>
                        Mark as Resolved
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
