const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class InventoryService {
    public async getAllInventories(): Promise<any> {
        try {
            const response = await fetch(`${API_URL}/api/inventory`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch inventories:', error);
            throw error;
        }
    }

    public async getInventoryByProductId(productId: number): Promise<any> {
        try {
            const response = await fetch(`${API_URL}/api/inventory/${productId}`);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Inventory not found');
                }
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Failed to fetch inventory for product ID ${productId}:`, error);
            throw error;
        }
    }

    public async addInventory(productId: number, quantity: number): Promise<any> {
        try {
            const response = await fetch(`${API_URL}/api/inventory`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, quantity }),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to add inventory:', error);
            throw error;
        }
    }

    
    public async updateInventory(productId: number, quantity: number): Promise<any> {
        try {
            const response = await fetch(`${API_URL}/api/inventory/update`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, quantity }),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to update inventory:', error);
            throw error;
        }
    }
}
