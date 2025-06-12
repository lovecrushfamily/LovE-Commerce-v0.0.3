const API_URL = 'http://localhost:3000/api/customer';

export interface Customer {
    customer_id: number;
    customer_name: string;
    gender: string;
    phone: string;
    avatar: string;
    date_of_birth: string;
    nationality: string;
    address: string;
    created_at?: string;
    updated_at?: string;
}

export const CustomerService = {
    getAll: async (): Promise<Customer[]> => {
        const response = await fetch(`${API_URL}/get-all`);
        if (!response.ok) {
            throw new Error('Failed to fetch customers');
        }
        return response.json();
    },

    getById: async (id: number): Promise<Customer> => {
        const response = await fetch(`${API_URL}/get-id/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch customer');
        }
        return response.json();
    },

    create: async (customer: Omit<Customer, 'created_at' | 'updated_at'>): Promise<Customer> => {
        const response = await fetch(`${API_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to create customer');
        }
        return response.json();
    },

    update: async (customer: Customer): Promise<Customer> => {
        if (!customer.customer_id) {
            throw new Error('Customer ID is required for update');
        }

        const response = await fetch(`${API_URL}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to update customer');
        }

        return response.json();
    },

    delete: async (customerId: number): Promise<void> => {
        const response = await fetch(`${API_URL}/delete/${customerId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to delete customer');
        }
    }
}; 