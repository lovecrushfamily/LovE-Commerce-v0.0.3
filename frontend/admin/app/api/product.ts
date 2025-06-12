const API_URL = 'http://localhost:3000/api/product';

export interface Product {
    product_id?: number;
    product_name: string;
    description: string;
    traits: string;
    stock: number;
    sale_off: number;
    price: number;
    images: string;
    status: 'pending' | 'sold-out';
    rating: number;
    category_id: number;
    shop_id: number;
    created_at?: string;
    updated_at?: string;
}

export const ProductService = {
    getAll: async (): Promise<Product[]> => {
        const response = await fetch(`${API_URL}/get-all`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return response.json();
    },

    getById: async (id: number): Promise<Product> => {
        const response = await fetch(`${API_URL}/get-id/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        return response.json();
    },

    create: async (product: Omit<Product, 'product_id' | 'created_at' | 'updated_at'>): Promise<Product> => {
        const response = await fetch(`${API_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to create product');
        }
        return response.json();
    },

    update: async (product: Product): Promise<Product> => {
        if (!product.product_id) {
            throw new Error('Product ID is required for update');
        }

        const response = await fetch(`${API_URL}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to update product');
        }

        return response.json();
    },

    delete: async (productId: number): Promise<void> => {
        const response = await fetch(`${API_URL}/delete/${productId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to delete product');
        }
    }
}; 