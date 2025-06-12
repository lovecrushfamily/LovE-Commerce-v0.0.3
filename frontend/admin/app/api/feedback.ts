const API_URL = 'http://localhost:3000/api/feedback';

export interface Feedback {
    feedback_id: number;
    account_id: number;
    rating: number;
    content: string;
    created_at?: string;
    updated_at?: string;
}

export const FeedbackService = {
    getAll: async (): Promise<Feedback[]> => {
        const response = await fetch(`${API_URL}/get-all`);
        if (!response.ok) {
            throw new Error('Failed to fetch feedbacks');
        }
        return response.json();
    },

    getById: async (id: number): Promise<Feedback> => {
        const response = await fetch(`${API_URL}/get-id/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch feedback');
        }
        return response.json();
    },

    create: async (feedback: Omit<Feedback, 'feedback_id' | 'created_at' | 'updated_at'>): Promise<Feedback> => {
        const response = await fetch(`${API_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedback),
        });
        if (!response.ok) {
            throw new Error('Failed to create feedback');
        }
        return response.json();
    },

    update: async (feedback: Feedback): Promise<Feedback> => {
        const response = await fetch(`${API_URL}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedback),
        });
        if (!response.ok) {
            throw new Error('Failed to update feedback');
        }
        return response.json();
    },

    delete: async (feedbackId: number): Promise<void> => {
        const response = await fetch(`${API_URL}/delete/${feedbackId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete feedback');
        }
    }
}; 