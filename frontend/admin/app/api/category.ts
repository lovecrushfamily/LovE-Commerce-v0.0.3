const API_URL = 'http://localhost:3000/api/category';

export interface Category {
    category_id: number;
    category_name: string;
    traits: string;
    parent_id: null;
    description: string;
    created_at?: string;
    updated_at?: string;
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
        if (!category.category_id) {
            throw new Error('Category ID is required for update');
        }

        const response = await fetch(`${API_URL}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to update category');
        }

        const result = await response.json();
        return result.data;
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