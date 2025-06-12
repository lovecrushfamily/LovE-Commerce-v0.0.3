const API_URL = 'http://localhost:3000/api/account';

export interface Account {
    account_id: number;
    user_name: string;
    email: string;
    password: string;
    role: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export const AccountService = {
    getAll: async (): Promise<Account[]> => {
        const response = await fetch(`${API_URL}/get-all`);
        if (!response.ok) {
            throw new Error('Failed to fetch accounts');
        }
        return response.json();
    },

    create: async (account: Omit<Account, 'account_id' | 'created_at' | 'updated_at'>): Promise<Account> => {
        const response = await fetch(`${API_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(account),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to create account');
        }
        return response.json();
    },

    update: async (account: Account): Promise<Account> => {
        if (!account.account_id) {
            throw new Error('Account ID is required for update');
        }

        const response = await fetch(`${API_URL}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(account),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to update account');
        }

        return response.json();
    },

    delete: async (accountId: number): Promise<void> => {
        const response = await fetch(`${API_URL}/delete/${accountId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to delete account');
        }
    }
}; 