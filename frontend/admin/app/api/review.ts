const API_URL = 'http://localhost:3000/api/review';

export interface Review {
    review_id: number;
    product_id: number;
    customer_id: number;
    rating: number; 
    comment: string;
    liked: boolean;
    images: string;
    shop_reply: string;
    created_at?: string;
    updated_at?: string;
}

export const ReviewService = {
    getAll: async (): Promise<Review[]> => {
        const response = await fetch(`${API_URL}/get-all`);
        if (!response.ok) {
            throw new Error('Failed to fetch reviews');
        }
        return response.json();
    },

    getById: async (id: number): Promise<Review> => {
        const response = await fetch(`${API_URL}/get-id/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch review');
        }
        return response.json();
    },

    create: async (review: Omit<Review, 'review_id' | 'created_at' | 'updated_at'>): Promise<Review> => {
        const response = await fetch(`${API_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(review),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to create review');
        }
        return response.json();
    },

    update: async (review: Review): Promise<Review> => {
        if (!review.review_id) {
            throw new Error('Review ID is required for update');
        }

        const response = await fetch(`${API_URL}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(review),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to update review');
        }

        return response.json();
    },

    delete: async (reviewId: number): Promise<void> => {
        const response = await fetch(`${API_URL}/delete/${reviewId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to delete review');
        }
    }
}; 