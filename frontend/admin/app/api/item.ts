const API_URL = 'http://localhost:3000/api/item';

export interface Item {
    item_id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;
    created_at?: string;
    updated_at?: string;
}

export const ItemService = {
    getAll: async (): Promise<Item[]> => {
        const response = await fetch(`${API_URL}/get-all`);
        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }
        return response.json();
    },

    getById: async (id: number): Promise<Item> => {
        const response = await fetch(`${API_URL}/get-id/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch item');
        }
        return response.json();
    },

    create: async (item: Omit<Item, 'item_id' | 'created_at' | 'updated_at'>): Promise<Item> => {
        const response = await fetch(`${API_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to create item');
        }
        return response.json();
    },

    update: async (item: Item): Promise<Item> => {
        if (!item.item_id) {
            throw new Error('Item ID is required for update');
        }

        const response = await fetch(`${API_URL}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to update item');
        }

        return response.json();
    },

    delete: async (itemId: number): Promise<void> => {
        const response = await fetch(`${API_URL}/delete/${itemId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to delete item');
        }
    }
}; 