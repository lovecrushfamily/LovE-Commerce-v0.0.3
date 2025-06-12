"use client";

import { useState } from "react";
import { MessageSquare, Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface FeedbackPopupProps {
    onSubmit?: (feedback: { rating: number; content: string }) => void;
}

export function FeedbackPopup({ onSubmit }: FeedbackPopupProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async () => {
        if (rating === 0) {
            alert("Please select a rating!");
            return;
        }

        setIsSubmitting(true);

        try {
            // Make API call to create feedback
            const response = await fetch(
                "http://localhost:3000/api/feedback/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        account_id: 4, // You might want to get this from your auth context
                        rating,
                        content,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to submit feedback");
            }

            // Call the onSubmit callback if provided
            // Use the provided create function to add new feedback
            // Assuming API_URL is 'http://localhost:3000/api/feedback'
            const API_URL = "http://localhost:3000/api/feedback";
            const create = async (feedback: {
                feedback_id: number;
                rating: number;
                content: string;
            }) => {
                const response = await fetch(`${API_URL}/create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(feedback),
                });
                if (!response.ok) {
                    throw new Error("Failed to create feedback");
                }
                return response.json();
            };

            await create({ account_id: 4, rating, content });

            if (onSubmit) {
                await onSubmit({ rating, content });
            }

            setIsSubmitted(true);

            // Reset form after 2 seconds and close dialog
            setTimeout(() => {
                setRating(0);
                setContent("");
                setIsSubmitted(false);
                setIsOpen(false);
            }, 2000);
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("Failed to submit feedback. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setRating(0);
        setHoveredRating(0);
        setContent("");
        setIsSubmitted(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow z-50"
                    onClick={() => {
                        setIsOpen(true);
                        resetForm();
                    }}
                >
                    <MessageSquare className="w-6 h-6" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                        <MessageSquare className="w-5 h-5" />
                        <span>Share Your Feedback</span>
                    </DialogTitle>
                    <DialogDescription>
                        Help us improve by sharing your experience with our
                        platform.
                    </DialogDescription>
                </DialogHeader>

                {isSubmitted ? (
                    <div className="text-center py-8 space-y-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <Send className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-green-600">
                            Thank You!
                        </h3>
                        <p className="text-muted-foreground">
                            Your feedback has been submitted successfully.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Rating Section */}
                        <div className="space-y-3">
                            <Label className="text-sm font-medium">
                                How would you rate your experience?
                            </Label>
                            <div className="flex items-center justify-center space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        className="p-1 hover:scale-110 transition-transform"
                                        onMouseEnter={() =>
                                            setHoveredRating(star)
                                        }
                                        onMouseLeave={() => setHoveredRating(0)}
                                        onClick={() => setRating(star)}
                                    >
                                        <Star
                                            className={`w-8 h-8 transition-colors ${
                                                star <=
                                                (hoveredRating || rating)
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300 hover:text-yellow-200"
                                            }`}
                                        />
                                    </button>
                                ))}
                            </div>
                            {rating > 0 && (
                                <p className="text-center text-sm text-muted-foreground">
                                    {rating === 1 &&
                                        "Poor - We'll work harder to improve"}
                                    {rating === 2 &&
                                        "Fair - There's room for improvement"}
                                    {rating === 3 &&
                                        "Good - We're on the right track"}
                                    {rating === 4 &&
                                        "Very Good - We're doing well"}
                                    {rating === 5 &&
                                        "Excellent - Thank you for the love!"}
                                </p>
                            )}
                        </div>

                        {/* Comment Section */}
                        <div className="space-y-3">
                            <Label
                                htmlFor="feedback-content"
                                className="text-sm font-medium"
                            >
                                Tell us more about your experience (optional)
                            </Label>
                            <Textarea
                                id="feedback-content"
                                placeholder="What did you like? What could we improve? Any suggestions?"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={4}
                                className="resize-none"
                            />
                            <p className="text-xs text-muted-foreground">
                                Your feedback helps us make the platform better
                                for everyone.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => setIsOpen(false)}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="flex-1"
                                onClick={handleSubmit}
                                disabled={rating === 0 || isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 mr-2" />
                                        Submit Feedback
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
