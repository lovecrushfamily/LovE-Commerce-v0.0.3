const API_URL = 'http://localhost:3000/api/delivery';

export interface Delivery {
    delivery_id: number;
    name: string;
    cost: number;
    category_id: number;
    description: string;
    created_at?: string;
    updated_at?: string;
}

export const DeliveryService = {
    getAll: async (): Promise<Delivery[]> => {
        const response = await fetch(`${API_URL}/get-all`);
        if (!response.ok) {
            throw new Error('Failed to fetch deliveries');
        }
        return response.json();
    },

    getById: async (id: number): Promise<Delivery> => {
        const response = await fetch(`${API_URL}/get-id/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch delivery');
        }
        return response.json();
    },

    create: async (delivery: Omit<Delivery, 'delivery_id' | 'created_at' | 'updated_at'>): Promise<Delivery> => {
        const response = await fetch(`${API_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(delivery),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to create delivery');
        }
        return response.json();
    },

    update: async (delivery: Delivery): Promise<Delivery> => {
        if (!delivery.delivery_id) {
            throw new Error('Delivery ID is required for update');
        }

        const response = await fetch(`${API_URL}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(delivery),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to update delivery');
        }

        return response.json();
    },

    delete: async (deliveryId: number): Promise<void> => {
        const response = await fetch(`${API_URL}/delete/${deliveryId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to delete delivery');
        }
    }
}; 