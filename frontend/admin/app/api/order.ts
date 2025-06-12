const API_URL = 'http://localhost:3000/api/order';

export interface Order {
    order_id: number;
    account_id: number;
    total_amount: number;
    status: 'pending' | 'delivery' | 'completed' | 'cancelled';
    address: string;
    payment: string;
    coupon_id: number;
    created_at?: string;
    updated_at?: string;
}

export const OrderService = {
    getAll: async (): Promise<Order[]> => {
        const response = await fetch(`${API_URL}/get-all`);
        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }
        return response.json();
    },

    getById: async (id: number): Promise<Order> => {
        const response = await fetch(`${API_URL}/get-id/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch order');
        }
        return response.json();
    },

    create: async (order: Omit<Order, 'order_id' | 'created_at' | 'updated_at'>): Promise<Order> => {
        const response = await fetch(`${API_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to create order');
        }
        return response.json();
    },

    update: async (order: Order): Promise<Order> => {
        if (!order.order_id) {
            throw new Error('Order ID is required for update');
        }

        const response = await fetch(`${API_URL}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to update order');
        }

        return response.json();
    },

    delete: async (orderId: number): Promise<void> => {
        const response = await fetch(`${API_URL}/delete/${orderId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to delete order');
        }
    }
}; 