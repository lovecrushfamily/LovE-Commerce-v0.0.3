const API_URL = 'http://localhost:3000/api/wishlist';

export interface Wishlist {
    wishlist_id: number;
    account_id: number;
    product_id: number;
    created_at?: string;
    updated_at?: string;
}

export const WishlistService = {
    getAll: async (): Promise<Wishlist[]> => {
        const response = await fetch(`${API_URL}/get-all`);
        if (!response.ok) {
            throw new Error('Failed to fetch wishlists');
        }
        return response.json();
    },

    getById: async (id: number): Promise<Wishlist> => {
        const response = await fetch(`${API_URL}/get-id/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch wishlist');
        }
        return response.json();
    },

    create: async (wishlist: Omit<Wishlist, 'wishlist_id' | 'created_at' | 'updated_at'>): Promise<Wishlist> => {
        const response = await fetch(`${API_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(wishlist),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to create wishlist');
        }
        return response.json();
    },

    update: async (wishlist: Wishlist): Promise<Wishlist> => {
        if (!wishlist.wishlist_id) {
            throw new Error('Wishlist ID is required for update');
        }

        const response = await fetch(`${API_URL}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(wishlist),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to update wishlist');
        }

        return response.json();
    },

    delete: async (wishlistId: number): Promise<void> => {
        const response = await fetch(`${API_URL}/delete/${wishlistId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to delete wishlist');
        }
    }
}; 