import { Star, ThumbsUp, Image as ImageIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Review {
  review_id: number;
  customer_id: number;
  product_id: number;
  rating: number;
  comment: string;
  liked: boolean;
  images: string;
  shop_reply: string;
  created_at: string;
  customer_name?: string;
}

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const reviewsWithImages = reviews.filter(review => review.images).length;
  const reviewsWithReplies = reviews.filter(review => review.shop_reply).length;

  return (
    <div className="space-y-8">
      {/* Review Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold">{reviews.length}</div>
              <p className="text-sm text-muted-foreground">Total Reviews</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold">{reviewsWithImages}</div>
              <p className="text-sm text-muted-foreground">Reviews with Images</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold">{reviewsWithReplies}</div>
              <p className="text-sm text-muted-foreground">Shop Replies</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.review_id}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Review Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.customer_name || review.customer_id}`} />
                      <AvatarFallback>{review.customer_name?.[0] || review.customer_id}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{review.customer_name || `User ${review.customer_id}`}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    {review.liked && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        Liked
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Review Content */}
                <p className="text-muted-foreground">{review.comment}</p>

                {/* Review Images */}
                {review.images && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {review.images.split(',').map((image, index) => (
                      <div key={index} className="aspect-square relative rounded-lg overflow-hidden bg-muted">
                        <img
                          src={image}
                          alt={`Review image ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Shop Reply */}
                {review.shop_reply && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="font-medium mb-2">Shop Reply</p>
                    <p className="text-muted-foreground">{review.shop_reply}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 