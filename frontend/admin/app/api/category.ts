const API_URL = 'http://localhost:3001/api/category';

export interface Category {
    category_id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export const CategoryService = {
    getAll: async (): Promise<Category[]> => {
        const response = await fetch(`${API_URL}/get-all`);
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        return response.json();
    },

    create: async (category: Omit<Category, 'category_id' | 'created_at' | 'updated_at'>): Promise<Category> => {
        const response = await fetch(`${API_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        });
        if (!response.ok) {
            throw new Error('Failed to create category');
        }
        return response.json();
    },

    update: async (category: Category): Promise<Category> => {
        const response = await fetch(`${API_URL}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        });
        if (!response.ok) {
            throw new Error('Failed to update category');
        }
        return response.json();
    },

    delete: async (categoryId: number): Promise<void> => {
        const response = await fetch(`${API_URL}/delete/${categoryId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete category');
        }
    }
}; 