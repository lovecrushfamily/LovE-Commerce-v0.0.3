const API_URL = 'http://localhost:3000/api/coupon';

export interface Coupon {
    coupon_id: number;
    coupon_name: string;
    discount: number;
    min_amount: number;
    max_amount: number;
    limit: number;
    image: string;
    start_day: string;
    end_day: string;
    created_at?: string;
    updated_at?: string;
}

export const CouponService = {
    getAll: async (): Promise<Coupon[]> => {
        const response = await fetch(`${API_URL}/get-all`);
        if (!response.ok) {
            throw new Error('Failed to fetch coupons');
        }
        return response.json();
    },

    getById: async (id: number): Promise<Coupon> => {
        const response = await fetch(`${API_URL}/get-id/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch coupon');
        }
        return response.json();
    },

    create: async (coupon: Omit<Coupon, 'coupon_id' | 'created_at' | 'updated_at'>): Promise<Coupon> => {
        const response = await fetch(`${API_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(coupon),
        });
        if (!response.ok) {
            throw new Error('Failed to create coupon');
        }
        return response.json();
    },

    update: async (coupon:any): Promise<any> => {
        const response = await fetch(`${API_URL}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(coupon),
        });
        if (!response.ok) {
            throw new Error('Failed to update coupon');
        }
        return response.json();
    },

    delete: async (couponId: number): Promise<void> => {
        const response = await fetch(`${API_URL}/delete/${couponId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete coupon');
        }
    }
}; 