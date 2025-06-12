const API_URL = 'http://localhost:3000/api/shop';

export interface Shop {
    shop_id: number;
    seller_id: number;
    shop_name: string;
    description: string;
    image: string;
    address: string;
    phone_no: string;
    rating: number;
    status: 'verify' | 'unverify';
    created_at: string;
    updated_at: string;
}

export const ShopService = {
    getAll: async (): Promise<Shop[]> => {
        const response = await fetch(`${API_URL}/get-all`);
        if (!response.ok) {
            throw new Error('Failed to fetch shops');
        }
        return response.json();
    },

    getById: async (id: number): Promise<Shop> => {
        const response = await fetch(`${API_URL}/get-id/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch shop');
        }
        return response.json();
    },

    create: async (shop: Omit<Shop, 'shop_id' | 'created_at' | 'updated_at'>): Promise<Shop> => {
        const response = await fetch(`${API_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(shop),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to create shop');
        }
        return response.json();
    },

    update: async (shop: Shop): Promise<Shop> => {
        if (!shop.shop_id) {
            throw new Error('Shop ID is required for update');
        }

        const response = await fetch(`${API_URL}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(shop),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to update shop');
        }

        return response.json();
    },

    delete: async (shopId: number): Promise<void> => {
        const response = await fetch(`${API_URL}/delete/${shopId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to delete shop');
        }
    }
}; 