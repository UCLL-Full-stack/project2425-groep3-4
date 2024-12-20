const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class InventoryService {
    public async getAllInventories(): Promise<any> {
        const response = await fetch(`${API_URL}/api/inventory`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json();
    }

    public async getInventoryById(id: number): Promise<any> {
        const response = await fetch(`${API_URL}/api/inventory/${id}`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Inventory not found');
            }
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json();
    }

    public async addInventory(details: { productId: number; quantity: number }[]): Promise<any> {
        const response = await fetch(`${API_URL}/api/inventory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ details }),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json();
    }

    public async deleteInventory(id: number): Promise<any> {
        const response = await fetch(`${API_URL}/api/inventory/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Inventory not found');
            }
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json();
    }

    public async updateInventory(id: number, details: { productId: number; quantity: number }[]): Promise<any> {
        const response = await fetch(`${API_URL}/api/inventory/update`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, details }),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json();
    }
}
