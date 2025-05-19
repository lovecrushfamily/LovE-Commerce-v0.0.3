import { Demo, Admin } from '../../types';

const API_URL = 'http://localhost:3001/api/product';

export const ProductService = {
    // Demo methods
    getProductsSmall() {
        return fetch('/demo/data/products-small.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Product[]);
    },

    getProducts() {
        return fetch('/demo/data/products.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Product[]);
    },

    getProductsWithOrdersSmall() {
        return fetch('/demo/data/products-orders-small.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Product[]);
    },

    // Real API methods
    getAll: async (): Promise<Admin.Product[]> => {
        const response = await fetch(`${API_URL}/get-all`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return response.json();
    },

    getById: async (id: number): Promise<Admin.Product> => {
        const response = await fetch(`${API_URL}/get-id/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        return response.json();
    },

    create: async (product: Omit<Admin.Product, 'product_id' | 'created_at' | 'updated_at'>): Promise<Admin.Product> => {
        const response = await fetch(`${API_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            throw new Error('Failed to create product');
        }
        return response.json();
    },

    update: async (product: Admin.Product): Promise<Admin.Product> => {
        const response = await fetch(`${API_URL}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            throw new Error('Failed to update product');
        }
        return response.json();
    },

    delete: async (id: number): Promise<void> => {
        const response = await fetch(`${API_URL}/delete/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete product');
        }
    },

    getByCategory: async (categoryId: number): Promise<Admin.Product[]> => {
        const response = await fetch(`${API_URL}/get-category/${categoryId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch products by category');
        }
        return response.json();
    },

    getByShop: async (shopId: number): Promise<Admin.Product[]> => {
        const response = await fetch(`${API_URL}/get-shop/${shopId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch products by shop');
        }
        return response.json();
    },

    search: async (query: string): Promise<Admin.Product[]> => {
        const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Failed to search products');
        }
        return response.json();
    },

    updateStatus: async (id: number, status: 'pending' | 'sold-out'): Promise<Admin.Product> => {
        const response = await fetch(`${API_URL}/update-status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product_id: id, status }),
        });
        if (!response.ok) {
            throw new Error('Failed to update product status');
        }
        return response.json();
    },

    updateStock: async (id: number, stock: number): Promise<Admin.Product> => {
        const response = await fetch(`${API_URL}/update-stock`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product_id: id, stock }),
        });
        if (!response.ok) {
            throw new Error('Failed to update product stock');
        }
        return response.json();
    },

    updatePrice: async (id: number, price: number): Promise<Admin.Product> => {
        const response = await fetch(`${API_URL}/update-price`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product_id: id, price }),
        });
        if (!response.ok) {
            throw new Error('Failed to update product price');
        }
        return response.json();
    },

    updateSaleOff: async (id: number, saleOff: number): Promise<Admin.Product> => {
        const response = await fetch(`${API_URL}/update-sale-off`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product_id: id, sale_off: saleOff }),
        });
        if (!response.ok) {
            throw new Error('Failed to update product sale off');
        }
        return response.json();
    }
};
